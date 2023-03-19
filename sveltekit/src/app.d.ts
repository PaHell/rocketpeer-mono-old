// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { ContentType, RoleColor } from "./lib/enum";

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
			interface RequestError {
				error: string;
			}
			interface Country {
				iso3: string;
				name: string;
				flag: string;
			}
		}
		namespace Database {
			interface PrimaryKeyed {
				id: number;
			}
			interface Timestamped {
				created_at: string;
				updated_at: string | null;
				deleted_at: string | null;
			}
			interface User extends PrimaryKeyed, Timestamped {
				username: string;
				display_name: string;
				img: string;
				status: UserStatus;
			}
			namespace Auth {
				interface Login {
					username: string;
					password: string;
				}
				interface Token {
					access_token: string;
					refresh_token: string;
				}
			}
			namespace Messages {
				interface Message extends PrimaryKeyed, Timestamped {
					sender_id: User['id'];
					_sender?: User;
					recipient_id: User['id'];
					_recipient?: User;
					type: ContentType;
					payload: string;
				}
			}
			namespace Chat {
				interface Message extends PrimaryKeyed, Timestamped {
					user_id: User['id'];
					_user?: User;
					channel_id: Servers.Channels.Channel['id'];
					content: string;
				}
			}
			namespace Servers {
				interface Server extends PrimaryKeyed {
					name: string;
					unread: number;
					main_text_channel_id: number;
				}
				interface ServerUser {
					server_id: Server['id'];
					user_id: User['id'];
					display_name: string;
					_user?: User;
				}
				interface ServerRole extends PrimaryKeyed {
					server_id: Server['id'];
					name: string;
					color: RoleColor;
					order: number;
				}
				interface ServerRoleUser {
					server_role_id: ServerRole['id'];
					server_user_id: ServerUser['id'];
				}
				namespace Channels {
					interface ChannelGroup extends PrimaryKeyed {
						name: string;
						order: number;
						_channels?: (TextChannel | VoiceChannel)[];
					}
					interface VoiceChannelUser extends PrimaryKeyed {
						user_id: User['id'];
						_user?: User;
						channel_id: VoiceChannel['id'];
						is_live: boolean;
						is_talking: boolean;
					}
					interface Channel extends PrimaryKeyed {
						server_id: Server['id'];
						name: string;
						order: number;
						channel_group_id: null | ChannelGroup['id'];
					}
					interface TextChannel extends Channel {
						messages?: Chat.Message[];
					}
					interface VoiceChannel extends Channel {
						voice_users?: VoiceChannelUser[];
						messages?: Chat.Message[];
					}
				}
			}
		}
	}
}

export {};
