import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Photo from 'App/Models/Photo'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CommentsController {
  public async getAll(ctx: HttpContextContract) {
    try {
      const comments = await Comment.query().where('photo_id', ctx.params.photo_id)
      return ctx.response.ok(comments)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        text: schema.string(),
      }),
    })

    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

      const comment = await Comment.create({
        text: payload.text,
        photoId: photo.id,
      })

      return ctx.response.created(comment)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      const comment = await Comment.find(ctx.params.comment_id)
      if (!comment) return ctx.response.notFound({ message: 'Comment not found' })
      await comment.delete()
      return ctx.response.noContent()
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }
}
