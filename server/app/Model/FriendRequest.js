'use strict'

const Lucid = use('Lucid')

class FriendRequest extends Lucid {
  user () {
        return this.belongsToMany('App/Model/User')
    }
}

module.exports = FriendRequest
