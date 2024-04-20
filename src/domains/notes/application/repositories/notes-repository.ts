import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { Note } from '@notes/enterprise/entities/note'

export interface NotesRepository {
  create(note: Note): Promise<Note>
  findById(id: UniqueEntityId): Promise<Note | null>
  findByTitle(title: string): Promise<Note | null>
  findAll(): Promise<Note[]>
}
