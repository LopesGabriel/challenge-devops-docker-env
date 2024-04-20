import { Note } from '@notes/enterprise/entities/note'
import { NotesRepository } from '../repositories/notes-repository'

interface ExecuteProps {
  title: string
  content: string
}

export class CreateNoteUseCase {
  constructor(private readonly notesRepository: NotesRepository) {}

  async execute({ content, title }: ExecuteProps) {
    const existingNote = await this.notesRepository.findByTitle(title)

    if (existingNote) {
      throw new Error('Note already exists')
    }

    const note = await this.notesRepository.create(
      Note.create({ content, title }),
    )

    return { note }
  }
}
