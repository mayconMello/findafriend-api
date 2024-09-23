import { FindPetsParams, PetsRepository } from '@/repositories/pets.repository'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      ...data,
      id: randomUUID(),
    }

    this.items.push(pet)

    return pet
  }

  async findAll({
    city,
    size,
    breed,
    age,
    energy_level,
    environment,
  }: FindPetsParams): Promise<Pet[]> {
    const orgs = this.orgsRepository.items.filter((org) => org.city === city)

    return this.items
      .filter((pet) => orgs.some((org) => org.id === pet.org_id))
      .filter((pet) => (size ? pet.size === size : true))
      .filter((pet) => (breed ? pet.breed === breed : true))
      .filter((pet) => (age ? pet.age === age : true))
      .filter((pet) =>
        energy_level ? pet.energy_level === energy_level : true,
      )
      .filter((pet) => (environment ? pet.environment === environment : true))
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id) ?? null

    return pet
  }
}
