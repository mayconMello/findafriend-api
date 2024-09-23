import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '@/use-cases/erros/org-already-exists-error'

export interface CreateOrgUseCaseRequest {
  owner: string
  name: string
  whatsapp: string
  email: string
  password: string
  cep: string
  address: string
  city: string
  state: string
  neighborhood: string
  latitude: number
  longitude: number
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    owner,
    name,
    whatsapp,
    email,
    password,
    cep,
    address,
    neighborhood,
    city,
    state,
    longitude,
    latitude,
  }: CreateOrgUseCaseRequest) {
    const orgAlreadyExists = await this.orgsRepository.finbByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      owner,
      name,
      whatsapp,
      email,
      password_hash,
      cep,
      address,
      city,
      state,
      neighborhood,
      latitude,
      longitude,
    })

    return { org }
  }
}
