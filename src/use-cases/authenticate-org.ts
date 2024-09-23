import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repositories/orgs-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.finbByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, org.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
