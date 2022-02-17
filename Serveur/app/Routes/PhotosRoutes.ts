import Route from '@ioc:Adonis/Core/Route'

Route.get('/photos', 'PhotosController.getAll')
Route.get('/photos/:photo_id', 'PhotosController.get').where('photo_id', Route.matchers.number())
Route.post('/photos', 'PhotosController.create')
Route.patch('/photos/:photo_id', 'PhotosController.update').where(
  'photo_id',
  Route.matchers.number()
)
Route.delete('/photos/:photo_id', 'PhotosController.delete').where(
  'photo_id',
  Route.matchers.number()
)

Route.get('/search', 'PhotosController.search')
