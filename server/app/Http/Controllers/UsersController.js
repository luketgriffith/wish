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
    let term = request.all();
    const users = yield Database.from('users').whereRaw('firstName LIKE ?', '%' + term.term + '%');
    const user = yield User.find(term.user);
    console.log('user...', user.toJSON());
    const friends = yield user.friends().whereRaw('firstName LIKE ?', '%' + term.term + '%').fetch();
    const pending = yield Database.from('friend_requests').where('from_id', term.user);

    let friendsArray = friends.toJSON();

    function* getUser (id) {
      yield User.find(id);
    }

    let pendingArray = [];

    for( var i = 0; i < pending.length; i++ ) {
      const getUser = yield User.find(pending[i].to_id)
      let gotUser = getUser.toJSON()
      pendingArray.push(gotUser)
    }

    let newArray = [];

    users.forEach((user2) => {
      let isFriend = friendsArray.find((f) => f.profile_id === user2.id )
      let isPending = pendingArray.find((p) => p.id === user2.id )
      if(!isFriend && !isPending) {
        newArray.push(user2);
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
    console.log('data...', data)

    let req = {
      to_id: data.friend,
      from_id: data.user.id
    }

    const newRequest = yield FriendRequest.create(req);
    response.ok({ success: true });
  }


  * getFriends (request, response) {
    let id = request.param('id');
    let user = yield User.find(id);
    let friends = yield user.friends().fetch();
    let friendsArray = friends.toJSON();
    let pending = yield Database.from('friend_requests').where('to_id', id);
    let pendingArray = [];
    if (Array.isArray(pending)){
      for (var i = 0; i < pending.length; i++) {
        let otherUser = yield User.find(pending[i].from_id)
        pendingArray.push(otherUser);
      }
    } else {
      let otherUser2 = yield User.find(pending[i].from_id)
      pendingArray.push(otherUser2);
    }

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
    newFriend.profile_id = data.friend.id;

    yield user.friends().save(newFriend)
    yield user.friendRequests().where('from_id', data.friend.id).where('to_id', data.user.id).delete();
    response.ok({ success: true });
  }

}

module.exports = UsersController
