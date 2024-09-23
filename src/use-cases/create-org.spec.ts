import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from '@/use-cases/create-org'
import { compare } from 'bcryptjs'
import { makeOrg } from '@/utils/tests/make-org'
import { OrgAlreadyExistsError } from '@/use-cases/erros/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute(makeOrg())
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute(
      makeOrg({ password: 'StrongPassword123' }),
    )
    const isPasswordCorrectlyHashed = await compare(
      'StrongPassword123',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhondoe@example.com'

    await sut.execute(makeOrg({ email }))
    expect(async () => {
      await sut.execute(makeOrg({ email }))
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
