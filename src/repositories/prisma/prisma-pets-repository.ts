import { prisma } from '@/lib/prisma'
import { FindPetsParams, PetsRepository } from '@/repositories/pets.repository'
import { Prisma, Pet } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findAll(params: FindPetsParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        breed: params.breed,
        energy_level: params.energy_level,
        environment: params.environment,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })
    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id } })

    return pet
  }
}
