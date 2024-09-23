import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindPetsUseCase } from '@/use-cases/find-pets'
import { makePet } from '@/utils/tests/make-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { makeOrg } from '@/utils/tests/make-org'
import { CreateOrgUseCase } from '@/use-cases/create-org'

let orgsRepository: InMemoryOrgsRepository
let createOrgUseCase: CreateOrgUseCase

let petsRepository: InMemoryPetsRepository
let sut: FindPetsUseCase

describe('Find Pets Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)

    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new FindPetsUseCase(petsRepository)
  })

  it('should be able to filter pet by city', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(makePet({ org_id: org.id }))
    await petsRepository.create(makePet())

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })

  it('should be able to filter pet by city and size', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(
      makePet({ size: 'small', org_id: org.id }),
    )
    await petsRepository.create(makePet({ size: 'medium' }))

    const { pets } = await sut.execute({ size: 'small', city: org.city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })
  it('should be able to filter pet by city and breed', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(
      makePet({ breed: 'Pinscher', org_id: org.id }),
    )
    await petsRepository.create(makePet())

    const { pets } = await sut.execute({ breed: 'Pinscher', city: org.city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })
  it('should be able to filter pet by city and age', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(
      makePet({ age: 'puppy', org_id: org.id }),
    )
    await petsRepository.create(makePet({ age: 'senior' }))

    const { pets } = await sut.execute({ age: 'puppy', city: org.city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })
  it('should be able to filter pet by city and energy level', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(
      makePet({ energy_level: 'low', org_id: org.id }),
    )
    await petsRepository.create(makePet({ energy_level: 'medium' }))

    const { pets } = await sut.execute({ energy_level: 'low', city: org.city })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })
  it('should be able to filter pet by city and environment', async () => {
    const { org } = await createOrgUseCase.execute(makeOrg())
    const pet = await petsRepository.create(
      makePet({ environment: 'indoor', org_id: org.id }),
    )
    await petsRepository.create(makePet({ environment: 'both' }))

    const { pets } = await sut.execute({
      environment: 'indoor',
      city: org.city,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: pet.name,
      }),
    ])
  })
})
