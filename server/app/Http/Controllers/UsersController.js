'use strict'

const User = use('App/Model/User');
const Friend = use('App/Model/Friend');
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
    const user = yield User.find(term.user)
    // console.log('user...', user);
    const friends = yield user.friends().fetch();
    const friendsList = friends.toJSON();
    console.log(friendsList)
    let newArray = users.map((user) => {

      let found = friendsList.find((friend) => friend.user_id === user.id)
      let newUser = user;

      if (found && found.confirmed === 0){
        newUser.friend = 'pending';
        return newUser
      } else {
        newUser.friend = false;
        return newUser;
      }
    })
    response.ok(newArray);
  }

  * add (request, response) {
    let data = request.all();
    const user = yield User.create(data);
    yield response.ok(user);
  }

  * addFriend (request, response) {
    let data = request.all();
    let friend = data.friend;
    let user = yield User.findBy('uid', data.user);
    let newFriend = new Friend();
    newFriend.firstName = friend.firstName;
    newFriend.lastName = friend.lastName;
    newFriend.email = friend.email;
    newFriend.confirmed = false;
    yield user.friends().save(newFriend);
    response.ok(addFriend);
  }


  * getFriends (request, response) {
    let id = request.param('id')
    let user = yield User.findBy('uid', id);
    let friends = yield user.friends().fetch();
    response.ok(friends);
  }

  * confirmFriend (request, response) {
    let id = request.all().id;
    console.log('the id: ', id)
    yield Database.table('friends').where('id', id).update('confirmed', '1')
    response.ok({ success: true });
  }

}

module.exports = UsersController
