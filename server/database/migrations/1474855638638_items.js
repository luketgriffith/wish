'use strict'

const Schema = use('Schema')

class ItemsSchema extends Schema {

  up () {
    this.create('items', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }

}

module.exports = ItemsSchema
