/*
  Warnings:

  - You are about to drop the `Ledger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Ledger` DROP FOREIGN KEY `Ledger_userEthAddress_fkey`;

-- DropTable
DROP TABLE `Ledger`;
