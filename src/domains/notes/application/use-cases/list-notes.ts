import { NotesRepository } from '../repositories/notes-repository'

export class ListNotesUseCase {
  constructor(private readonly notesRepository: NotesRepository) {}

  async execute() {
    const notes = await this.notesRepository.findAll()

    return { notes }
  }
}
