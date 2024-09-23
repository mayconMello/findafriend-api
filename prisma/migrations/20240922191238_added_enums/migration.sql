/*
  Warnings:

  - The values [puppy,adult,senior] on the enum `AgeCategory` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `energy_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `environment` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('INDOOR', 'OUTDOOR', 'BOTH', 'FARM', 'SMALL_SPACE');

-- AlterEnum
BEGIN;
CREATE TYPE "AgeCategory_new" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');
ALTER TABLE "pets" ALTER COLUMN "age" TYPE "AgeCategory_new" USING ("age"::text::"AgeCategory_new");
ALTER TYPE "AgeCategory" RENAME TO "AgeCategory_old";
ALTER TYPE "AgeCategory_new" RENAME TO "AgeCategory";
DROP TYPE "AgeCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "energy_level",
ADD COLUMN     "energy_level" "EnergyLevel" NOT NULL,
DROP COLUMN "environment",
ADD COLUMN     "environment" "Environment" NOT NULL;
