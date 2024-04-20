import { InMemoryNotesRepository } from '@/test/repositories/in-memory-notes-repository'
import { GetNoteUseCase } from './get-note'
import { Note } from '@/notes/enterprise/entities/note'

describe('Get Note Use Case', () => {
  let notesRepository: InMemoryNotesRepository
  let sut: GetNoteUseCase

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new GetNoteUseCase(notesRepository)
  })

  it('should be able to get a note', async () => {
    const existingNote = await notesRepository.create(
      Note.create({
        content: 'Example content',
        title: 'Example title',
      }),
    )

    const noteId = existingNote.id.toString()

    const { note } = await sut.execute({ id: noteId })

    expect(note).toEqual(
      expect.objectContaining({
        content: 'Example content',
        title: 'Example title',
        createdAt: expect.any(Date),
        updatedAt: null,
      }),
    )
    expect(notesRepository.items).toHaveLength(1)
    expect(notesRepository.items[0]).toEqual(note)
  })

  it('should not be able to get a note that does not exists', async () => {
    await expect(() => sut.execute({ id: 'example-id' })).rejects.toThrowError(
      'Note not found',
    )
  })
})
