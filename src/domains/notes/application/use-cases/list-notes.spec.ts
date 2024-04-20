import { InMemoryNotesRepository } from '@/test/repositories/in-memory-notes-repository'
import { ListNotesUseCase } from './list-notes'
import { Note } from '@/notes/enterprise/entities/note'

describe('List Notes Use Case', () => {
  let notesRepository: InMemoryNotesRepository
  let sut: ListNotesUseCase

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new ListNotesUseCase(notesRepository)
  })

  it('should be able to list all notes', async () => {
    await Promise.all([
      notesRepository.create(
        Note.create({ title: 'Note 01', content: 'Note: 01 Content' }),
      ),
      notesRepository.create(
        Note.create({ title: 'Note 02', content: 'Note: 02 Content' }),
      ),
      notesRepository.create(
        Note.create({ title: 'Note 03', content: 'Note: 03 Content' }),
      ),
      notesRepository.create(
        Note.create({ title: 'Note 04', content: 'Note: 04 Content' }),
      ),
    ])

    const { notes } = await sut.execute()

    expect(notes).toHaveLength(4)
    expect(notesRepository.items).toHaveLength(4)
  })
})
