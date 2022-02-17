import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Photo from 'App/Models/Photo'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

const { v4: uuidv4 } = require('uuid')

export default class PhotosController {
  public async getAll(ctx: HttpContextContract) {
    try {
      const photos = await Photo.all()
      return ctx.response.ok(photos)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async get(ctx: HttpContextContract) {
    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

      return ctx.response.ok(photo)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        tags: schema.array
          .optional([rules.distinct('*')])
          .members(schema.string.optional({ trim: true, escape: true })),
        file: schema.file({
          size: '100mb',
        }),
      }),
    })

    try {
      const filename = uuidv4() + '.' + payload.file.extname
      await payload.file.moveToDisk('', { name: filename })

      const photo = await Photo.create({
        title: payload.title,
        description: payload.description,
        tags: payload.tags,
        filename,
      })

      return ctx.response.created(photo)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async update(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        title: schema.string(),
        description: schema.string(),
        tags: schema.array
          .optional([rules.distinct('*')])
          .members(schema.string.optional({ trim: true, escape: true })),
      }),
    })
    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })

      await photo.merge({ ...payload }).save()

      return ctx.response.noContent()
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      const photo = await Photo.find(ctx.request.param('photo_id'))
      if (!photo) return ctx.response.notFound({ message: 'Photo not found' })
      await photo.delete()
      return ctx.response.noContent()
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }

  public async search(ctx: HttpContextContract) {
    const payload = await ctx.request.validate({
      schema: schema.create({
        q: schema.string(),
      }),
    })
    try {
      const research = `%${payload.q}%`
      const photos = await Photo.query()
        .where('title', 'ILIKE', research)
        .orWhere('description', 'ILIKE', research)
        .orWhereRaw(`array_to_string(tags, ',') ILIKE '${research}'`)

      return ctx.response.ok(photos)
    } catch (e) {
      ctx.logger.error(e)
      return ctx.response.internalServerError()
    }
  }
}
