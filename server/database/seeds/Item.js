'use strict'

const Factory = use('Factory')

class ItemSeeder {

  * run () {
    // run model/database factories here
    yield Factory.model('App/Model/Item').create(5)
  }

}

module.exports = ItemSeeder
