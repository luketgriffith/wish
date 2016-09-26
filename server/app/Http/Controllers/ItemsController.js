'use strict'

const Item = use('App/Model/Item')


class ItemsController {
  * index (request, response) {
    const items = yield Item.all()
    yield response.ok(items)
  }
}

module.exports = ItemsController
