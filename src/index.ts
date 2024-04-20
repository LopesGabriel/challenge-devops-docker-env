import { z } from 'zod'
import { fastify } from './infra/http/server'

const env = z
  .object({
    PORT: z.coerce.number().optional().default(3000),
  })
  .parse(process.env)

async function main() {
  await fastify.listen({
    host: '::',
    port: env.PORT,
  })
}

main()
