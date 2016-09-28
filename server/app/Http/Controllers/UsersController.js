'use strict'

const User = use('App/Model/User');
const Friend = use('App/Model/Friend');
const Database = use('Database');

class UsersController {
  * singeUser (request, response) {
    let email = request.all().email;
    console.log(email);
    const user = yield Database.from('users').where('email', email)
    response.ok(user);
  }

  * findFriends (request, response) {
    // const items = yield Database.from('items').where('user', request.param('id'))
    let term = request.all();
    console.log('term: ', term)
    const users = yield Database.from('users').whereRaw('firstName LIKE ?', '%' + term.term + '%');
    const user = yield User.find(term.id)
    const friends = yield user.friends().fetch();
    console.log(friends);
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
    yield response.ok(friends);
  }

  * confirmFriend (request, response) {
    let id = request.all().id;
    console.log('the id: ', id)
    yield Database.table('friends').where('id', id).update('confirmed', '1')
    response.ok({ success: true });
  }

}

module.exports = UsersController
