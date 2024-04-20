import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Note } from '@/notes/enterprise/entities/note'
import { Note as PrismaNote, Prisma } from '@prisma/client'

export class NotePrismaMapper {
  static toPersistance(note: Note): Prisma.NoteUncheckedCreateInput {
    return {
      content: note.content,
      title: note.title,
      createdAt: note.createdAt,
      id: note.id.toString(),
      updatedAt: note.updatedAt ?? undefined,
    }
  }

  static toDomain(data: PrismaNote): Note {
    return Note.create(
      {
        content: data.content,
        title: data.title,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      new UniqueEntityId(data.id),
    )
  }
}
