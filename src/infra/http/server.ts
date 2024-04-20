import Fastify from 'fastify'
import { createNoteHandler } from './controllers/create-note'
import { listNoteHandler } from './controllers/list-notes'
import { getNoteHandler } from './controllers/get-note'

const fastify = Fastify({
  logger: true,
})

fastify.setErrorHandler((err, request, reply) => {
  request.log.trace(err)

  if (err instanceof Error) {
    if (err.message === 'Note already exists') {
      return reply.code(409).send({ message: err.message })
    }
  }

  return reply.code(500).send({ message: 'Internal Server Error' })
})

fastify.post('/', createNoteHandler)
fastify.get('/', listNoteHandler)
fastify.get('/:id', getNoteHandler)

export { fastify }
