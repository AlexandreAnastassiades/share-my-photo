import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Comment extends BaseModel {
  public static table = 'app.comment'
  @column({ isPrimary: true })
  public id: number
  @column({ columnName: 'text' })
  public text: string
  @column.dateTime({ autoCreate: true })
  public created: DateTime
  @column({ columnName: 'photo_id' })
  public photoId: number
}
