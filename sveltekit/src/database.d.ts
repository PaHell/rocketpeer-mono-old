export interface users {
    id: number;
    user_name: string;
    password: string;
    first_name: string;
    image: string;
    email: string;
    privacy_level: users_privacy_level;
    created_at: string;
    access_token: access_token;
    message_sender: message[];
    text_channel_messages: text_channel_messages[];
    friends_user_2: user_friends[];
    users_servers: users_servers[];

}

export interface user_friends {
    id: number;
    user_1_id: number;
    created_at: string;
    friends_user_1: users;
    friends_user_2: users;

}

export interface message {
    id: number;
    sender_id: number;
    type: message_type;
    created_at: string;
    deleted_at: DateTime;
    message_sender: users;

}

export interface access_token {
    id: number;
    user_id: number;
    access_token: string;
    users: users;

}

export interface users_servers {
    id: number;
    user_id: number;
    display_name: string;
    user_server_tags: user_server_tags[];
    users: users;

}

export interface servers {
    id: number;
    name: string;
    text_channel_id: number;
    description: string;
    channel_groups: channel_groups[];
    server_tags: server_tags[];
    text_channels: text_channels[];
    users_servers: users_servers[];
    voice_channel: voice_channel[];

}

export interface server_tags {
    id: number;
    server_id: number;
    name: string;
    servers: servers;
    user_server_tags: user_server_tags[];

}

export interface user_server_tags {
    id: number;
    server_tag_id: number;
    server_tags: server_tags;
    users_servers: users_servers;

}

export interface channel_groups {
    id: number;
    server_id: number;
    name: string;
    text_channels: text_channels[];

}

export interface voice_channel {
    id: number;
    server_id: number;
    order: number;
    max_users: number;
    servers: servers;

}

export interface text_channels {
    id: number;
    server_id: number;
    order: number;
    topic: string;
    channel_groups: channel_groups;
    servers: servers;

}

export interface text_channel_messages {
    id: number;
    sender_id: number;
    type: message_type;
    created_at: string;
    deleted_at: string;
    users: users;

}

export enum users_status {
    Online,
    Away,
    DoNotDisturb,
    Offline,
}
export enum colors {
    Black,
    White,
    Purple,
}
export enum users_privacy_level {
    Default,
}
export enum users_role {
    Administrator,
    Default,
}
export enum server_role {
    Administrator,
    Default,
}
export enum message_type {
    Text,
    Picture,
    Video,
    Gif,
    Deleted,
    ,
}
