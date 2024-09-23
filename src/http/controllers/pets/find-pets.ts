import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindPetsUseCase } from '@/use-cases/factories/make-find-pets-use-case'

export async function findPets(request: FastifyRequest, reply: FastifyReply) {
  const findPetsQuerySchema = z.object({
    city: z.string(),
    breed: z.string().optional(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, breed, age, size, energy_level, environment } =
    findPetsQuerySchema.parse(request.query)

  const findPetsUseCase = makeFindPetsUseCase()

  const { pets } = await findPetsUseCase.execute({
    city,
    breed,
    age,
    size,
    energy_level,
    environment,
  })
  return reply.status(200).send({ pets })
}
