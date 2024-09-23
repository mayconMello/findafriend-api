import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from '@/use-cases/create-org'
import { AuthenticateOrgUseCase } from '@/use-cases/authenticate-org'
import { makeOrg } from '@/utils/tests/make-org'
import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

let createOrgUseCase: CreateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
    createOrgUseCase = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate an org', async () => {
    const { org } = await createOrgUseCase.execute(
      makeOrg({ password: '123456' }),
    )

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password: '123456',
    })

    expect(authenticatedOrg).toEqual(org)
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const { org } = await createOrgUseCase.execute(
      makeOrg({ password: '123456' }),
    )

    await expect(() =>
      sut.execute({
        email: org.email,
        password: 'different-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
