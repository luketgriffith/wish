'use strict'

const User = use('App/Model/User');
const Friend = use('App/Model/Friend');
const FriendRequest = use('App/Model/FriendRequest');
const Database = use('Database');

class UsersController {
  * singeUser (request, response) {
    let email = request.all().email;
    const user = yield Database.from('users').where('email', email)
    response.ok(user);
  }

  * findFriends (request, response) {
    // const items = yield Database.from('items').where('user', request.param('id'))
    let term = request.all();
    const users = yield Database.from('users').whereRaw('firstName LIKE ?', '%' + term.term + '%');
    const user = yield User.find(term.user);
    // // console.log('user...', user);
    const friends = yield user.friends().whereRaw('firstName LIKE ?', '%' + term.term + '%').fetch();
    const pending = yield user.friendRequests().fetch();

    console.log('users: ', users)
    console.log('frinds:', friends.toJSON());
    console.log('pending: ', pending.toJSON());

    let friendsArray = friends.toJSON();
    let pendingArray = pending.toJSON();

    let newArray = [];

    users.forEach((user) => {
      let isFriend = friendsArray.find((f) => f.profile_id === user.id )
      console.log('isFriend: ', isFriend);
      let isPending = pendingArray.find((p) => p.from === user.id )
      console.log('isPending: ', isPending);

      if(!isFriend && !isPending) {
        newArray.push(user);
      }
    });

    response.ok({
      users: newArray,
      friends: friendsArray,
      pending: pendingArray
    });
  }

  * add (request, response) {
    let data = request.all();
    const user = yield User.create(data);
    yield response.ok(user);
  }

  * addFriend (request, response) {
    let data = request.all();

    let user = yield User.find(data.friend);

    let newFriend = new FriendRequest();
    newFriend.wat = 'meow';
    // newFriend.from = data.user.id;
    // newFriend.firstName = data.user.firstName;
    // newFriend.lastName = data.user.lastName;
    // newFriend.img_url = data.user.img_url;

    yield user.friendRequests().save(newFriend)
    response.ok({ success: true });
  }


  * getFriends (request, response) {
    let id = request.param('id');
    let user = yield User.find(id);
    let friends = yield user.friends().fetch();
    let friendsArray = friends.toJSON();
    let pending = yield user.friendRequests().fetch();
    let pendingArray = pending.toJSON();

    response.ok({ friends: friendsArray, requests: pendingArray });
  }

  * confirmFriend (request, response) {
    let data = request.all();
    console.log('the data: ', data);
    let user = yield User.find(data.user.id);
    let newFriend = new Friend();
    newFriend.email = data.friend.email;
    newFriend.firstName = data.friend.firstName;
    newFriend.lastName = data.friend.lastName;
    newFriend.img_url = data.friend.img_url;
    newFriend.profile_id = data.friend.from;

    yield user.friends().save(newFriend)
    yield user.friendRequests().where('from', data.friend.from).delete();
    response.ok({ success: true });
  }

}

module.exports = UsersController
