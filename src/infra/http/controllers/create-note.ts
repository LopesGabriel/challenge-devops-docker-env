import { CreateNoteUseCase } from '@/notes/application/use-cases/create-note'
import { PrismaNotesRepository } from '../../database/prisma/repositories/prisma-notes-repository'
import { FastifyHandler } from '../fastify-handler'
import { z } from 'zod'
import { NotePresenter } from './presenters/note-presenter'

const notesRepository = new PrismaNotesRepository()
const createNoteUseCase = new CreateNoteUseCase(notesRepository)

export const createNoteHandler: FastifyHandler = async (request, reply) => {
  const bodySchema = z.object({
    title: z.string(),
    content: z.string(),
  })

  const data = bodySchema.parse(request.body)

  const { note } = await createNoteUseCase.execute(data)

  return reply.code(201).send({
    data: NotePresenter.toHTTP(note),
  })
}
