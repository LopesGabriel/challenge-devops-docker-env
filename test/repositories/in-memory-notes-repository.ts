import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { NotesRepository } from '@notes/application/repositories/notes-repository'
import { Note } from '@notes/enterprise/entities/note'

export class InMemoryNotesRepository implements NotesRepository {
  public items: Note[] = []

  async create(note: Note): Promise<Note> {
    this.items.push(note)
    return note
  }

  async findById(id: UniqueEntityId): Promise<Note | null> {
    return this.items.find((note) => note.id.equals(id)) ?? null
  }

  async findByTitle(title: string): Promise<Note | null> {
    return this.items.find((note) => note.title === title) ?? null
  }

  async findAll(): Promise<Note[]> {
    return this.items
  }
}
