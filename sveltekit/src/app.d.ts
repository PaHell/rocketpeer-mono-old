// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
			interface Element {
				id: number;
			}
			interface Timestamped {
				created_at: string;
				updated_at: string | null;
				deleted_at: string | null;
			}
			interface User extends Element, Timestamped {
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
			namespace Chat {
				interface Message extends Element, Timestamped {
					user_id: User['id'];
					_user?: User;
					channel_id: Servers.Channels.Channel['id'];
					content: string;
				}
			}
			namespace Servers {
				interface Server extends Element {
					name: string;
					unread: number;
					main_text_channel_id: number;
				}
				namespace Channels {
					interface ChannelGroup extends Element {
						name: string;
						order: number;
						_channels?: (TextChannel | VoiceChannel)[];
					}
					interface VoiceChannelUser extends Element {
						user_id: User['id'];
						_user?: User;
						channel_id: VoiceChannel['id'];
						is_live: boolean;
						is_talking: boolean;
					}
					interface Channel extends Element {
						server_id: Server['id'];
						name: string;
						order: number;
						channel_group_id: null | ChannelGroup['id'];
					}
					interface TextChannel extends Channel {
						messages: Chat.Message[];
					}
					interface VoiceChannel extends Channel {
						voice_users: VoiceChannelUser[];
						messages: Chat.Message[];
					}
				}
			}
		}
	}
}

export {};
