import { PrismaNotesRepository } from '../../database/prisma/repositories/prisma-notes-repository'
import { FastifyHandler } from '../fastify-handler'
import { NotePresenter } from './presenters/note-presenter'
import { ListNotesUseCase } from '@/notes/application/use-cases/list-notes'

const notesRepository = new PrismaNotesRepository()
const listNoteUseCase = new ListNotesUseCase(notesRepository)

export const listNoteHandler: FastifyHandler = async (_, reply) => {
  const { notes } = await listNoteUseCase.execute()

  return reply.code(200).send({
    data: notes.map(NotePresenter.toHTTP),
  })
}
