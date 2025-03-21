CREATE TABLE `userCredential` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
); 