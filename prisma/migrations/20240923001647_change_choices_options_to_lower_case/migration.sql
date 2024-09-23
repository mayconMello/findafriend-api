/*
  Warnings:

  - The values [PUPPY,ADULT,SENIOR] on the enum `AgeCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [LOW,MEDIUM,HIGH,VERY_HIGH] on the enum `EnergyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [INDOOR,OUTDOOR,BOTH,FARM,SMALL_SPACE] on the enum `Environment` will be removed. If these variants are still used in the database, this will fail.
  - The values [SMALL,MEDIUM,LARGE,EXTRA_LARGE] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AgeCategory_new" AS ENUM ('puppy', 'adult', 'senior');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "AgeCategory_new" USING ("age"::text::"AgeCategory_new");
ALTER TYPE "AgeCategory" RENAME TO "AgeCategory_old";
ALTER TYPE "AgeCategory_new" RENAME TO "AgeCategory";
DROP TYPE "AgeCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EnergyLevel_new" AS ENUM ('low', 'medium', 'high', 'very_high');
ALTER TABLE "pets" ALTER COLUMN "energy_level" TYPE "EnergyLevel_new" USING ("energy_level"::text::"EnergyLevel_new");
ALTER TYPE "EnergyLevel" RENAME TO "EnergyLevel_old";
ALTER TYPE "EnergyLevel_new" RENAME TO "EnergyLevel";
DROP TYPE "EnergyLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Environment_new" AS ENUM ('indoor', 'outdoor', 'both', 'farm', 'small_space');
ALTER TABLE "pets" ALTER COLUMN "environment" TYPE "Environment_new" USING ("environment"::text::"Environment_new");
ALTER TYPE "Environment" RENAME TO "Environment_old";
ALTER TYPE "Environment_new" RENAME TO "Environment";
DROP TYPE "Environment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('small', 'medium', 'large', 'extra_large');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
COMMIT;
