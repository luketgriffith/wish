'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.timestamps()
      table.string('firstName')
      table.string('lastName')
      table.string('email')
      table.string('uid')
      table.string('img_url')
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersSchema
