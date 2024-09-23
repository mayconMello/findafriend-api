import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'
import { GetPetUseCase } from '@/use-cases/get-pet'
import { makePet } from '@/utils/tests/make-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository(new InMemoryOrgsRepository())
    sut = new GetPetUseCase(petsRepository)
  })
  it('should be able to get pet by id', async () => {
    const createUseCase = new CreatePetUseCase(petsRepository)
    const { pet: createdPet } = await createUseCase.execute(makePet())
    const { pet } = await sut.execute(createdPet.id)

    expect(pet).toEqual(
      expect.objectContaining({
        name: createdPet.name,
      }),
    )
  })
  it('should be able to get pet by invalid id', async () => {
    const createUseCase = new CreatePetUseCase(petsRepository)
    await createUseCase.execute(makePet())
    const { pet } = await sut.execute('invalid-id')

    expect(pet).toEqual(null)
  })
})
