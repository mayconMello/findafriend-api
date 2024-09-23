import { PetsRepository, FindPetsParams } from '@/repositories/pets.repository'

export class FindPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    size,
    age,
    breed,
    environment,
    energy_level,
  }: FindPetsParams) {
    const pets = await this.petsRepository.findAll({
      city,
      size,
      age,
      breed,
      environment,
      energy_level,
    })

    return { pets }
  }
}
