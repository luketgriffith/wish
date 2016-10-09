'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
Route.post('/getList', 'ItemsController.index')
Route.post('/getUser', 'UsersController.singeUser')
Route.post('/items', 'ItemsController.add')
Route.post('/users', 'UsersController.add')
Route.post('/findFriends', 'UsersController.findFriends')
Route.post('/addFriend', 'UsersController.addFriend')
Route.get('/friends/:id', 'UsersController.getFriends')
Route.post('/confirmFriend', 'UsersController.confirmFriend')
