-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_patient_id_fkey";

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "patient_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
