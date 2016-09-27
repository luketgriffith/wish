'use strict'

const Item = use('App/Model/Item');
const Database = use('Database');


class ItemsController {
  * index (request, response) {
    const items = yield Database.from('items').where('user', request.param('id'))
    yield response.ok(items)
  }

  * add (request, response) {
    let data = request.all();
    const item = yield Item.create(data);
    yield response.ok(item);
  }
}

module.exports = ItemsController
