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
    const friends = yield user.friends().fetch();
    const pending = yield user.friendRequests().fetch();
    // const friendsList = friends.toJSON();
    // let usersArray = [];
    // let pendingArray = [];
    // let friendsArray = [];
    // users.forEach((user) => {
    //   friendsList.find((friend) => friend.id === )
    // })
    // console.log(friendsList)

    response.ok(users);
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

    newFriend.from = data.user.id;
    newFriend.firstName = data.friend.firstName;
    newFriend.lastName = data.friend.lastName;
    newFriend.img_url = data.friend.img_url;

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
    let id = request.all().id;
    console.log('the id: ', id)
    yield Database.table('friends').where('id', id).update('confirmed', '1')
    response.ok({ success: true });
  }

}

module.exports = UsersController
