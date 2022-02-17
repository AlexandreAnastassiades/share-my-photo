import Route from '@ioc:Adonis/Core/Route'

Route.get('/photos/:photo_id/comments', 'CommentsController.getAll')
Route.post('/photos/:photo_id/comments', 'CommentsController.create').where(
  'photo_id',
  Route.matchers.number()
)
Route.delete('/photos/:photo_id/comments', 'CommentsController.delete').where(
  'photo_id',
  Route.matchers.number()
)
