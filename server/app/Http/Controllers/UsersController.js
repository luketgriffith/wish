'use strict'

const User = use('App/Model/User');
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
}

module.exports = UsersController
