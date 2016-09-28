'use strict'

const User = use('App/Model/User');
const Friend = use('App/Model/Friend');
const Database = use('Database');

class UsersController {
  * findFriends (request, response) {
    // const items = yield Database.from('items').where('user', request.param('id'))
    let term = request.all();
    console.log('term: ', term)
    const users = yield Database.from('users').whereRaw('firstName LIKE ?', '%' + term.term + '%')
    yield response.ok(users);
  }
  * add (request, response) {
    let data = request.all();
    const user = yield User.create(data);
    yield response.ok(user);
  }

  * addFriend (request, response) {
    let data = request.all();
    let friend = data.friend;
    console.log(friend);
    let user = yield User.findBy('uid', data.user);
    // console.log('the user: ', user)
    let newFriend = new Friend();
    newFriend.firstName = friend.firstName;
    newFriend.lastName = friend.lastName;
    newFriend.email = friend.email;
    newFriend.confirmed = false;
    let addFriend = yield user.friends().save(newFriend);
    yield response.ok(addFriend);
  }
}

module.exports = UsersController
