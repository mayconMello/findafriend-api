import { PetsRepository } from '@/repositories/pets.repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: 'puppy' | 'adult' | 'senior'
  size: 'small' | 'medium' | 'large' | 'extra_large'
  breed: string
  energy_level: 'low' | 'medium' | 'high' | 'very_high'
  environment: 'indoor' | 'outdoor' | 'both' | 'farm' | 'small_space'
  org_id: string
}

export class CreatePetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    breed,
    energy_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest) {
    const pet = await this.petRepository.create({
      name,
      description,
      age,
      size,
      breed,
      energy_level,
      environment,
      org_id,
    })

    return { pet }
  }
}
