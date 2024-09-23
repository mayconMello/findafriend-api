import { faker } from '@faker-js/faker'
import crypto from 'node:crypto'

type OverwritePet = {
  org_id?: string
  age?: 'puppy' | 'adult' | 'senior'
  size?: 'small' | 'medium' | 'large' | 'extra_large'
  breed?: string
  energy_level?: 'low' | 'medium' | 'high' | 'very_high'
  environment?: 'indoor' | 'outdoor' | 'both' | 'farm' | 'small_space'
}

export function makePet(overwrite?: OverwritePet) {
  return {
    org_id: overwrite?.org_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    description: faker.lorem.paragraph(),
    breed: overwrite?.breed ?? faker.animal.type(),
    age:
      overwrite?.age ??
      faker.helpers.arrayElement(['puppy', 'adult', 'senior']),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['small', 'medium', 'large', 'extra_large']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement(['low', 'medium', 'high', 'very_high']),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement([
        'indoor',
        'outdoor',
        'both',
        'farm',
        'small_space',
      ]),
  }
}
