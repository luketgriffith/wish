'use strict'

const Item = use('App/Model/Item');
const User = use('App/Model/User');
const Database = use('Database');


class ItemsController {
  * index (request, response) {
    const user = yield User.find(request.param('id'));
    const items = yield user.items().fetch();
    console.log('the items: ', items)
    const itemsJson = items.toJSON();
    response.ok(itemsJson)
  }

  * add (request, response) {
    let data = request.all();
    console.log('the data...', data)
    let user = yield User.find(data.user);
    let item = new Item();
    item.img_url = data.img_url;
    item.description = data.description;
    yield user.items().save(item);

    response.ok(item);
  }
}

module.exports = ItemsController
