export interface User {
  id: number;
  username: string;
  password: string;
  first_name: string;
  image: String;
  email: string;
  privacy_level: UserPrivacyLevel;
  created_at: string;
  access_tokens: AccessToken;
  chat_users: ChatUser[];
  server_users: ServerUser[];

}

export interface UserFriend {
  id: number;
  sender_id: number;
  status: UserFriendStatus;
  users_user_friends_recipient_idTousers: User;
  users_user_friends_sender_idTousers: User;

}

export interface Chat {
  id: number;
  name: String;
  userId: Int;
  chat_users: ChatUser[];

}

export interface ChatMessage {
  id: number;
  chat_id: number;
  type: PayloadType;
  created_at: string;
  updated_at: DateTime;
  chats: Chat;
  users: User;

}

export interface ChatUser {
  id: number;
  chat_id: number;
  created_at: string;
  deleted_at: DateTime;
  users: User;

}

export interface AccessToken {
  id: number;
  user_id: number;
  access_token: string;
  users: User;

}

export interface Server {
  id: number;
  text_channel_id: Int;
  image: String;
  created_at: string;
  channel_groups: ChannelGroup[];
  server_users: ServerUser[];
  text_channels: TextChannel[];

}

export interface ServerUser {
  id: number;
  user_id: number;
  order: number;
  created_at: string;
  deleted_at: DateTime;
  ServerUserTag: ServerUserTag[];
  users: User;
  TextChannelMessage: TextChannelMessage[];

}

export interface ServerTag {
  id: number;
  server_id: number;
  name: string;
  servers: Server;
  user_server_tags: ServerUserTag[];

}

export interface ServerUserTag {
  id: number;
  server_tag_id: number;
  server_tag: ServerTag;
  server_user: ServerUser;

}

export interface ChannelGroup {
  id: number;
  server_id: number;
  name: string;
  text_channels: TextChannel[];

}

export interface VoiceChannel {
  id: number;
  server_id: number;
  order: number;
  max_users: Int;
  server: Server;

}

export interface TextChannel {
  id: number;
  server_id: number;
  order: number;
  topic: string;
  text_channel_messages: TextChannelMessage[];
  server: Server;

}

export interface TextChannelMessage {
  id: number;
  text_channel_id: number;
  type: PayloadType;
  created_at: string;
  updated_at: DateTime;
  text_channel: TextChannel;
  server_user: ServerUser;

}

export enum UserStatus {
  Online,
  Away,
  DoNotDisturb,
  Offline,
}
export enum UserFriendStatus {
  Pending,
  Accepted,
}
export enum Color {
  Lime,
  Green,
  Teal,
  Blue,
  Indigo,
  Purple,
  Pink,
  Red,
  Orange,
  Yellow,
}
export enum UserPrivacyLevel {
  Public,
  Friends,
  SharedServerAndFriends,
  Private,
}
export enum UserRole {
  Administrator,
  Default,
}
export enum ServerRole {
  None,
  Moderator,
  Administrator,
  Owner,
}
export enum PayloadType {
  Text,
  Image,
  Video,
  Audio,
  File,
  Deleted,
}
