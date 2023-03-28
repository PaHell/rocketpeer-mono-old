import type { PayloadType, RoleColor, ServerRole } from "./lib/enum";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Message {
			type: PayloadType;
			payload: string;
		}
		namespace P2P {
			interface VoiceChatUser extends DB.PrimaryKey {
				user_id: DB.User['id'];
				_user?: DB.User;
				chat_id: DB.VoiceChannel['id'];
				connected: boolean;
				is_live: boolean;
				is_talking: boolean;
			}
			interface VoiceChatMessage extends DB.PrimaryKey, DB.Timestamp, Message {
				chat_id: DB.VoiceChannel['id'];
				user_id: User['id'];
				_user?: User;
			}
			interface VoiceChannelUser extends DB.PrimaryKey {
				server_user_id: DB.ServerUser['id'];
				_server_user?: DB.ServerUser;
				channel_id: DB.VoiceChannel['id'];
				is_live: boolean;
				is_talking: boolean;
			}
			interface VoiceChannelMessage extends DB.PrimaryKey, DB.Timestamp, Message {
				channel_id: DB.VoiceChannel['id'];
				server_user_id: ServerUser['id'];
				_server_user?: User;
			}
		}
		namespace API {
			interface RequestError {
				error: string;
			}
		}
		namespace DB {
			// underscore keys are not on api
			interface PrimaryKey {
				id: number;
			}
			interface CreatedAt {
				created_at: string;
			}
			interface Timestamp extends CreatedAt {
				updated_at: string | null;
				deleted_at: string | null;
			}
			interface Login {
				usernameEmail: string;
				password: string;
			}
			interface Register {
				username: string;
				password: string;
				first_name: string;
				last_name: string;
				email: string;
			}
			interface AccessToken extends PrimaryKey, CreatedAt {
				user_id: User['id'];
				access_token: string;
				refresh_token: string;
				expires_at: string;
			}
			interface User extends PrimaryKey, CreatedAt {
				username: string;
				//password: string;
				display_name: string;
				first_name: string;
				last_name: string;
				image: string | null;
				status: UserStatus;
				email: string;
				// UserFriend result split into 3
				_friends?: UserFriend[];
				_friends_pending?: UserFriend[];
				_friend_requests?: UserFriend[];
			}
			interface UserFriend extends PrimaryKey, CreatedAt {
				sender_id: User['id'];
				recipient_id: User['id'];
				_other?: User; // determined chat partner, not yourself
				status: UserFriendStatus;
			}
			interface ChatUser extends PrimaryKey, CreatedAt {
				chat_id: Chat['id'];
				user_id: User['id'];
			}
			interface Chat extends PrimaryKey, CreatedAt {
				name: string | null; // null if private chat or group chat without name
				users?: User[];
				_messages?: ChatMessage[];
			}
			interface ChatMessage extends PrimaryKey, Timestamp, Message {
				chat_id: Chat['id'];
				user_id: User['id'];
				_user?: User;
			}
			interface Server extends PrimaryKey, CreatedAt {
				name: string;
				image: string | null;
				text_channel_id: number;
				description: string;
			}
			interface ServerUser extends PrimaryKey, CreatedAt {
				server_id: Server['id'];
				_server?: Server;
				user_id: User['id'];
				user?: User;
				order?: number; // only visible for yourself
				display_name: string | null;
				role: ServerRole;
				_tags?: ServerTag[];
			}
			interface ServerTag extends PrimaryKey {
				server_id: Server['id'];
				order: number;
				name: string;
				color: ServerTagColor;
			}
			interface ServerTagUser extends PrimaryKey {
				server_user_id: ServerUser['id'];
				server_tag_id: ServerTag['id'];
			}
			interface ChannelGroup extends PrimaryKey {
				server_id: Server['id'];
				order: number;
				name: string;
				_channels?: (TextChannel | VoiceChannel)[];
			}
			interface Channel extends PrimaryKey {
				server_id: Server['id'];
				channel_group_id: null | ChannelGroup['id'];
				order: number;
				name: string;
			}
			interface TextChannel extends Channel {
			}
			interface VoiceChannel extends Channel {
				max_users: null | number;
				_voice_users?: VoiceChannelUser[];
			}
			interface TextChannelMessage extends PrimaryKey, Timestamp, Message {
				channel_id: TextChannel['id'];
				server_user_id: ServerUser['id'];
				_server_user?: ServerUser;
			}
		}
	}
}

export {};
