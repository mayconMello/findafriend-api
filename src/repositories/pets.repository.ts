import { Pet, Prisma } from '@prisma/client'

export interface FindPetsParams {
  city: string
  size?: string
  breed?: string
  age?: string
  energy_level?: string
  environment?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  findAll(params: FindPetsParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
