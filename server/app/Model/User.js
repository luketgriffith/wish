'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  friends() {
        return this.hasMany('App/Model/Friend')
    }

  friendRequests() {
    return this.belongsToMany('App/Model/FriendRequest')
  }

  items() {
    return this.hasMany('App/Model/Item')
  }
}

module.exports = User
