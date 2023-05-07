DROP TYPE IF EXISTS "public"."status";
CREATE TYPE "public"."status" AS ENUM ('Online', 'Away', 'DoNotDisturb', 'Offline');
DROP TYPE IF EXISTS "public"."privacy_level";
CREATE TYPE "public"."privacy_level" AS ENUM ('Public', 'Friends', 'SharedServerAndFriends', 'Private');
DROP TYPE IF EXISTS "public"."role";
CREATE TYPE "public"."role" AS ENUM ('None', 'Moderator', 'Administrator', 'Owner');
DROP TYPE IF EXISTS "public"."message_type";
CREATE TYPE "public"."message_type" AS ENUM ('Text', 'Image', 'Video', 'Audio', 'File', 'Deleted');
DROP TYPE IF EXISTS "public"."role";
CREATE TYPE "public"."role" AS ENUM ('None', 'Moderator', 'Administrator', 'Owner');
DROP TYPE IF EXISTS "public"."color";
CREATE TYPE "public"."color" AS ENUM ('Lime', 'Green', 'Teal', 'Blue', 'Indigo', 'Purple', 'Pink', 'Red', 'Orange', 'Yellow');
DROP TYPE IF EXISTS "public"."message_type";
CREATE TYPE "public"."message_type" AS ENUM ('Text', 'Image', 'Video', 'Audio', 'File', 'Deleted');

-- Table Definition
CREATE TABLE "public"."access_tokens" (
    "id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "access_token" varchar(200) NOT NULL,
    "refresh_token" varchar(200) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."channel_groups" (
    "id" uuid NOT NULL,
    "server_id" uuid NOT NULL,
    "order" int4 NOT NULL,
    "name" varchar(200) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."chat_messages" (
    "id" uuid NOT NULL,
    "chat_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "type" "public"."message_type" NOT NULL,
    "payload" varchar(400) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."chat_users" (
    "id" uuid NOT NULL,
    "chat_id" uuid NOT NULL,
    "user_id" uuid,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "deleted_at" timestamptz,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."chats" (
    "id" uuid NOT NULL,
    "name" varchar(200) NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "user_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."server_tags" (
    "id" uuid NOT NULL,
    "server_id" uuid NOT NULL,
    "order" int4 NOT NULL,
    "name" varchar(200) NOT NULL,
    "color" "public"."color" NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."server_user_tags" (
    "id" uuid NOT NULL,
    "server_tag_id" uuid,
    "server_user_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."server_users" (
    "id" uuid NOT NULL,
    "user_id" uuid,
    "server_id" uuid,
    "order" int4,
    "display_name" varchar(200),
    "created_at" timestamptz DEFAULT now(),
    "deleted_at" timestamptz,
    "role" "public"."role",
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."servers" (
    "id" uuid NOT NULL,
    "name" varchar(200) NOT NULL,
    "image" varchar(200),
    "description" varchar(200),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "general_text_chat" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."text_channel_messages" (
    "id" uuid NOT NULL,
    "text_channel_id" uuid,
    "server_user_id" uuid,
    "type" "public"."message_type",
    "payload" varchar(200),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz,
    "deleted_at" timestamptz,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."text_channels" (
    "id" uuid NOT NULL,
    "order" int4,
    "name" varchar(200),
    "topic" varchar(200),
    "channel_group_id" uuid,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

DROP TYPE IF EXISTS "public"."friend_request_status";
CREATE TYPE "public"."friend_request_status" AS ENUM ('Pending', 'Accepted', 'Blocked');

-- Table Definition
CREATE TABLE "public"."user_friends" (
    "id" uuid NOT NULL,
    "sender_id" uuid,
    "recipient_id" uuid,
    "created_at" timestamptz,
    "status" "public"."friend_request_status" NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.
-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL,
    "username" varchar(200) NOT NULL,
    "password" varchar(200) NOT NULL,
    "display_name" varchar(200) DEFAULT NULL::character varying,
    "first_name" varchar(200) NOT NULL,
    "last_name" varchar(200) NOT NULL,
    "image" varchar(200) DEFAULT NULL::character varying,
    "status" "public"."status" NOT NULL,
    "email" varchar(200) NOT NULL,
    "privacy_level" "public"."privacy_level" NOT NULL,
    "role" "public"."role" NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."voice_channel" (
    "id" uuid NOT NULL,
    "server_id" uuid,
    "channel_group_id" uuid,
    "order" int4,
    "name" varchar(200),
    "max_users" int4,
    PRIMARY KEY ("id")
);

ALTER TABLE "public"."access_tokens" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."channel_groups" ADD FOREIGN KEY ("server_id") REFERENCES "public"."servers"("id");
ALTER TABLE "public"."chat_messages" ADD FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id");
ALTER TABLE "public"."chat_messages" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."chat_users" ADD FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id");
ALTER TABLE "public"."chat_users" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."chats" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."server_tags" ADD FOREIGN KEY ("server_id") REFERENCES "public"."servers"("id");
ALTER TABLE "public"."server_user_tags" ADD FOREIGN KEY ("server_tag_id") REFERENCES "public"."server_tags"("id");
ALTER TABLE "public"."server_user_tags" ADD FOREIGN KEY ("server_user_id") REFERENCES "public"."server_users"("id");
ALTER TABLE "public"."server_users" ADD FOREIGN KEY ("server_id") REFERENCES "public"."servers"("id");
ALTER TABLE "public"."server_users" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."servers" ADD FOREIGN KEY ("general_text_chat") REFERENCES "public"."text_channels"("id");
ALTER TABLE "public"."text_channel_messages" ADD FOREIGN KEY ("text_channel_id") REFERENCES "public"."text_channels"("id");
ALTER TABLE "public"."text_channel_messages" ADD FOREIGN KEY ("server_user_id") REFERENCES "public"."server_users"("id");
ALTER TABLE "public"."text_channels" ADD FOREIGN KEY ("channel_group_id") REFERENCES "public"."channel_groups"("id");
ALTER TABLE "public"."user_friends" ADD FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."user_friends" ADD FOREIGN KEY ("recipient_id") REFERENCES "public"."users"("id");
ALTER TABLE "public"."voice_channel" ADD FOREIGN KEY ("server_id") REFERENCES "public"."servers"("id");
ALTER TABLE "public"."voice_channel" ADD FOREIGN KEY ("channel_group_id") REFERENCES "public"."channel_groups"("id") ON DELETE RESTRICT;
