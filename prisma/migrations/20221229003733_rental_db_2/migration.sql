-- AlterTable
ALTER TABLE `users` ADD COLUMN `userType` ENUM('customer', 'Admin') NOT NULL DEFAULT 'customer';
