'use strict'

const Item = use('App/Model/Item')


class ItemsController {
  * index (request, response) {
    const items = yield Item.all()
    yield response.ok(items)
  }

  * add (request, response) {
    let data = request.all();
    yield Item.create(data);
    yield response.status(200).json({ success: true })
  }
}

module.exports = ItemsController
