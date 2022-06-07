-- CreateTable
CREATE TABLE `Ledger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userEthAddress` VARCHAR(191) NOT NULL,
    `token` ENUM('ETHEREUM', 'USDC') NOT NULL,
    `action` ENUM('DEPOSIT') NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ledger` ADD CONSTRAINT `Ledger_userEthAddress_fkey` FOREIGN KEY (`userEthAddress`) REFERENCES `User`(`ethAddress`) ON DELETE RESTRICT ON UPDATE CASCADE;
