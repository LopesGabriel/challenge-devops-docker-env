import { UniqueEntityId } from '@core/entities/unique-entity-id'
import { NotesRepository } from '../repositories/notes-repository'

interface ExecuteProps {
  id: string
}

export class GetNoteUseCase {
  constructor(private readonly notesRepository: NotesRepository) {}

  async execute({ id }: ExecuteProps) {
    const note = await this.notesRepository.findById(new UniqueEntityId(id))

    if (!note) {
      throw new Error('Note not found')
    }

    return { note }
  }
}
