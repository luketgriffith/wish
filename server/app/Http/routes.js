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
Route.get('/items/:id', 'ItemsController.index')
Route.post('/items', 'ItemsController.add')
Route.post('/users', 'UsersController.add')
Route.post('/findFriends', 'UsersController.findFriends')
