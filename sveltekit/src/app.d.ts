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
			interface DatabaseElement {
				id: number;
			}
			interface User extends DatabaseElement {
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
			namespace ServerModels {
				interface Server extends DatabaseElement {
					name: string;
					unread: number;
					text_channel_id: number;
					channels: Channel[];
				}
				interface ChannelGroup extends DatabaseElement {
					name: string;
					order: number;
					_channels: Channel[];
				}
				interface Channel extends DatabaseElement {
					server_id: Server["id"];
					name: string;
					order: number;
					is_voice_channel: boolean;
					channel_group_id?: ChannelGroup["id"];
				}
			}
		}

	}
}

export {};
