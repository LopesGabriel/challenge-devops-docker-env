import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { NotesRepository } from '@notes/application/repositories/notes-repository'
import { Note } from '@notes/enterprise/entities/note'
import { dbClient } from '../client'
import { NotePrismaMapper } from '../mappers/note-mapper'

export class PrismaNotesRepository implements NotesRepository {
  async create(note: Note): Promise<Note> {
    const prismaNote = await dbClient.note.create({
      data: NotePrismaMapper.toPersistance(note),
    })

    return NotePrismaMapper.toDomain(prismaNote)
  }

  async findById(id: UniqueEntityId): Promise<Note | null> {
    const prismaNote = await dbClient.note.findUnique({
      where: { id: id.toString() },
    })

    if (!prismaNote) return null

    return NotePrismaMapper.toDomain(prismaNote)
  }

  async findByTitle(title: string): Promise<Note | null> {
    const prismaNote = await dbClient.note.findFirst({
      where: { title },
    })

    if (!prismaNote) return null

    return NotePrismaMapper.toDomain(prismaNote)
  }

  async findAll(): Promise<Note[]> {
    const prismaNotes = await dbClient.note.findMany()

    return prismaNotes.map(NotePrismaMapper.toDomain)
  }
}
