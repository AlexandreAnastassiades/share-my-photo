import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Photo extends BaseModel {
  public static table = 'app.photo'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'title' })
  public title: string

  @column({ columnName: 'description' })
  public description: string

  @column({ columnName: 'tags' })
  public tags: (string | undefined)[]

  @column({ columnName: 'filename' })
  public filename: string
}
