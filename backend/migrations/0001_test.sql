CREATE TABLE `access_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` varchar(191)  NOT NULL,
  `refresh_token` varchar(191)  NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `channel_groups`
--

CREATE TABLE `channel_groups` (
  `id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `name` varchar(191)  NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `name` varchar(191)  DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `userId` int(11) DEFAULT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('Text','Image','Video','Audio','File','Deleted')  NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `chat_users`
--

CREATE TABLE `chat_users` (
  `id` int(11) NOT NULL,
  `chat_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `deleted_at` datetime(3) DEFAULT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `image` varchar(191)  DEFAULT NULL,
  `description` varchar(191)  NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `general_text_channel` int(11) DEFAULT NULL
);
--
-- Table structure for table `server_tags`
--

CREATE TABLE `server_tags` (
  `id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `name` varchar(191)  NOT NULL,
  `color` enum('Lime','Green','Teal','Blue','Indigo','Purple','Pink','Red','Orange','Yellow')  NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `server_users`
--

CREATE TABLE `server_users` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `display_name` varchar(191)  DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  `role` enum('None','Moderator','Administrator','Owner') NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `server_user_tags`
--

CREATE TABLE `server_user_tags` (
  `id` int(11) NOT NULL,
  `server_tag_id` int(11) NOT NULL,
  `server_user_id` int(11) NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `text_channels`
--

CREATE TABLE `text_channels` (
  `id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `channel_group_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `topic` varchar(191) NOT NULL
);
--
-- Table structure for table `text_channel_messages`
--

CREATE TABLE `text_channel_messages` (
  `id` int(11) NOT NULL,
  `text_channel_id` int(11) NOT NULL,
  `server_user_id` int(11) NOT NULL,
  `type` enum('Text','Image','Video','Audio','File','Deleted') NOT NULL,
  `payload` varchar(191) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `display_name` varchar(191) DEFAULT NULL,
  `first_name` varchar(191) NOT NULL,
  `last_name` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `status` enum('Online','Away','DoNotDisturb','Offline') NOT NULL,
  `email` varchar(191) NOT NULL,
  `privacy_level` enum('Public','Friends','SharedServerAndFriends','Private') NOT NULL,
  `role` enum('Administrator','Default')  NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);
--
-- Table structure for table `user_friends`
--

CREATE TABLE `user_friends` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `status` enum('Pending','Accepted') NOT NULL,
  `created_at` datetime NOT NULL
);
-- --------------------------------------------------------

--
-- Table structure for table `voice_channels`
--

CREATE TABLE `voice_channels` (
  `id` int(11) NOT NULL,
  `server_id` int(11) NOT NULL,
  `channel_group_id` int(11) DEFAULT NULL,
  `order` int(11) NOT NULL,
  `name` varchar(191)  NOT NULL,
  `max_users` int(11) DEFAULT NULL
);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `access_tokens_user_id_key` (`user_id`),
  ADD KEY `at_user_id` (`user_id`);

--
-- Indexes for table `channel_groups`
--
ALTER TABLE `channel_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cg_server_id` (`server_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cm_chat_id` (`chat_id`),
  ADD KEY `cm_user_id` (`user_id`);

--
-- Indexes for table `chat_users`
--
ALTER TABLE `chat_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cu_chat_id` (`chat_id`),
  ADD KEY `cu_user_id` (`user_id`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `server_name` (`name`),
  ADD KEY `general_text_channel_id` (`general_text_channel`);

--
-- Indexes for table `server_tags`
--
ALTER TABLE `server_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `st_server_id` (`server_id`);

--
-- Indexes for table `server_users`
--
ALTER TABLE `server_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `su_user_id` (`user_id`),
  ADD KEY `su_server_id` (`server_id`);

--
-- Indexes for table `server_user_tags`
--
ALTER TABLE `server_user_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sut_server_tag_id` (`server_tag_id`),
  ADD KEY `sut_server_user_id` (`server_user_id`);

--
-- Indexes for table `text_channels`
--
ALTER TABLE `text_channels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tc_server_id` (`server_id`),
  ADD KEY `text_channel_group` (`channel_group_id`);

--
-- Indexes for table `text_channel_messages`
--
ALTER TABLE `text_channel_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tcm_text_channel_id` (`text_channel_id`),
  ADD KEY `tcm_server_user_id` (`server_user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_key` (`username`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `user_username` (`username`),
  ADD KEY `user_display_name` (`display_name`),
  ADD KEY `user_first_name` (`first_name`),
  ADD KEY `user_last_name` (`last_name`),
  ADD KEY `user_email` (`email`);

--
-- Indexes for table `user_friends`
--
ALTER TABLE `user_friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uf_sender_id` (`sender_id`),
  ADD KEY `uf_recipient_id` (`recipient_id`);

--
-- Indexes for table `voice_channels`
--
ALTER TABLE `voice_channels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vc_server_id` (`server_id`),
  ADD KEY `voice_channel_id` (`channel_group_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `access_tokens`
--
ALTER TABLE `access_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `channel_groups`
--
ALTER TABLE `channel_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_users`
--
ALTER TABLE `chat_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `server_tags`
--
ALTER TABLE `server_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `server_users`
--
ALTER TABLE `server_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `server_user_tags`
--
ALTER TABLE `server_user_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `text_channels`
--
ALTER TABLE `text_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `text_channel_messages`
--
ALTER TABLE `text_channel_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_friends`
--
ALTER TABLE `user_friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `voice_channels`
--
ALTER TABLE `voice_channels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `access_tokens`
--
ALTER TABLE `access_tokens`
  ADD CONSTRAINT `user_access_key` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `channel_groups`
--
ALTER TABLE `channel_groups`
  ADD CONSTRAINT `channel_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `chat_user_id` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_message_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `chat_message_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `chat_users`
--
ALTER TABLE `chat_users`
  ADD CONSTRAINT `chat_id` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `general_text_channel_id` FOREIGN KEY (`general_text_channel`) REFERENCES `text_channels` (`id`);

--
-- Constraints for table `server_tags`
--
ALTER TABLE `server_tags`
  ADD CONSTRAINT `server_id_from_tags` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Constraints for table `server_users`
--
ALTER TABLE `server_users`
  ADD CONSTRAINT `server_users_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`),
  ADD CONSTRAINT `server_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `server_user_tags`
--
ALTER TABLE `server_user_tags`
  ADD CONSTRAINT `server_tag` FOREIGN KEY (`server_tag_id`) REFERENCES `server_tags` (`id`),
  ADD CONSTRAINT `user_servers_id` FOREIGN KEY (`server_user_id`) REFERENCES `server_users` (`id`);

--
-- Constraints for table `text_channels`
--
ALTER TABLE `text_channels`
  ADD CONSTRAINT `text_channel_group` FOREIGN KEY (`channel_group_id`) REFERENCES `channel_groups` (`id`),
  ADD CONSTRAINT `text_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);

--
-- Constraints for table `text_channel_messages`
--
ALTER TABLE `text_channel_messages`
  ADD CONSTRAINT `text_channel_id` FOREIGN KEY (`text_channel_id`) REFERENCES `text_channels` (`id`),
  ADD CONSTRAINT `text_sender_id` FOREIGN KEY (`server_user_id`) REFERENCES `server_users` (`id`);

--
-- Constraints for table `user_friends`
--
ALTER TABLE `user_friends`
  ADD CONSTRAINT `friendrequest_receiver` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friendrequest_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `voice_channels`
--
ALTER TABLE `voice_channels`
  ADD CONSTRAINT `voice_channel_id` FOREIGN KEY (`channel_group_id`) REFERENCES `channel_groups` (`id`),
  ADD CONSTRAINT `voice_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`);
COMMIT;

