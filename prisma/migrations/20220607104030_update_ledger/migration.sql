/*
  Warnings:

  - Added the required column `balance` to the `Ledger` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ledger` ADD COLUMN `balance` DECIMAL(65, 30) NOT NULL;
