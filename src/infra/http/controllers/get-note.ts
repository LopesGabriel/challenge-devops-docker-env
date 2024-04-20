import { GetNoteUseCase } from '@/notes/application/use-cases/get-note'
import { PrismaNotesRepository } from '../../database/prisma/repositories/prisma-notes-repository'
import { FastifyHandler } from '../fastify-handler'
import { z } from 'zod'
import { NotePresenter } from './presenters/note-presenter'

const notesRepository = new PrismaNotesRepository()
const getNoteUseCase = new GetNoteUseCase(notesRepository)

export const getNoteHandler: FastifyHandler = async (request, reply) => {
  const pathSchema = z.object({
    id: z.string(),
  })

  const { id } = pathSchema.parse(request.params)

  const { note } = await getNoteUseCase.execute({ id })

  return reply.code(200).send({
    data: NotePresenter.toHTTP(note),
  })
}
