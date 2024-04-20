import { InMemoryNotesRepository } from '@/test/repositories/in-memory-notes-repository'
import { CreateNoteUseCase } from './create-note'
import { Note } from '@/notes/enterprise/entities/note'

describe('Create Note Use Case', () => {
  let notesRepository: InMemoryNotesRepository
  let sut: CreateNoteUseCase

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new CreateNoteUseCase(notesRepository)
  })

  it('should be able to create a new note', async () => {
    const { note } = await sut.execute({
      content: 'Example content',
      title: 'Example title',
    })

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

  it('should not be able to create a note with same title', async () => {
    const existingNote = Note.create({
      title: 'Note 01',
      content: 'Content 01',
    })
    await notesRepository.create(existingNote)

    await expect(() =>
      sut.execute({
        content: 'Example content',
        title: 'Note 01',
      }),
    ).rejects.toThrowError('Note already exists')
  })
})
