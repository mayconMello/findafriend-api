import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from '@/use-cases/create-pet'
import { makePet } from '@/utils/tests/make-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(new InMemoryOrgsRepository())
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to register', async () => {
    const { pet } = await sut.execute(makePet())
    expect(pet.id).toEqual(expect.any(String))
  })
})
