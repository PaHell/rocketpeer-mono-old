// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PayloadType, RoleColor, ServerRole } from "./lib/enum";

// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		namespace Components {
			namespace Table {
				interface TableContext<T> {
					registerColumn: (
						name: string,
						width: string,
						css: string,
						sortKey: keyof T | null
					) => void;
					getRowContext: (item: T, changed: () => void) => RowContext<T>;
				}
				interface RowContext<T> {
					item: T;
					index: number;
					state: RowState;
					initialState: RowState;
					changed: (state: RowState) => void;
				}
				interface Column<T> {
					title: string;
					width: string;
					css: string;
					sortKey: keyof T | null;
				}
			}
		}
		namespace Lib {
			interface Country {
				iso3: string;
				name: string;
				flag: string;
			}
		}
		namespace P2P {
			interface VoiceChannelUser extends PrimaryKey {
				user_id: User['id'];
				_uer_server?: UserServer;
				channel_id: VoiceChannel['id'];
				is_live: boolean;
				is_talking: boolean;
			}
		}
		namespace API {
			interface RequestError {
				error: string;
			}
		}
		namespace DB {
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
				_friends?: UserFriend[];
				_friends_pending?: UserFriend[];
				_friend_requests?: UserFriend[];
			}
			interface UserFriend extends PrimaryKey, CreatedAt {
				sender_id: User['id'];
				recipient_id: User['id'];
				status: UserFriendStatus;
			}
			interface UserChat extends PrimaryKey, CreatedAt {
				user_id: User['id'];
				chat_id: Chat['id'];
			}
			interface Chat extends PrimaryKey, CreatedAt {
				name?: string; // null if private chat or group chat without name
				_users?: User[];
				_messages?: ChatMessage[];
			}
			interface Message {
				user_id: User['id'];
				_user?: User;
				type: PayloadType;
				payload: string;
			}
			interface ChatMessage extends PrimaryKey, Timestamp, Message {
				chat_id: Chat['id'];
			}
			interface Server extends PrimaryKey, CreatedAt {
				name: string;
				image: string | null;
				text_channel_id: number;
				description: string;
			}
			interface UserServer extends PrimaryKey, CreatedAt {
				server_id: Server['id'];
				user_id: User['id'];
				_user?: User;
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
				user_server_id: UserServer['id'];
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
				messages?: Chat.Message[];
			}
			interface VoiceChannel extends Channel {
				max_users: null | number;
				voice_users?: VoiceChannelUser[];
				messages?: Chat.Message[];
			}
			interface TextChannelMessage extends PrimaryKey, Timestamp, Message {
				channel_id: TextChannel['id'];
			}
		}
	}
}

export {};
