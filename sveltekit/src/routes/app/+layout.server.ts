import { getStores } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserStatus, ServerRole } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

let _all_users: App.DB.User[] = [
	{
		id: 1,
		username: 'obi_wan_kenobi',
		display_name: 'Obi-Wan Kenobi',
		first_name: 'Obi-Wan',
		last_name: 'Kenobi',
		image: null,
		status: UserStatus.Online,
		email: 'obiwan@gmx.de',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 2,
		username: 'general_grievous',
		display_name: 'General Grievous',
		first_name: 'General',
		last_name: 'Grievous',
		image: null,
		status: UserStatus.Busy,
		email: 'gg@gmail.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 3,
		username: 'palpatine',
		display_name: 'Dart Sidious',
		first_name: 'Darth',
		last_name: 'Sidious',
		image: null,
		status: UserStatus.Away,
		email: 'palpatine@outlook.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 4,
		username: 'anakin_skywalker',
		display_name: 'Darth Vader',
		first_name: 'Darth',
		last_name: 'Vader',
		image: '',
		status: UserStatus.Offline,
		email: 'anakin@sky.de',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 5,
		username: 'boba_fett',
		display_name: 'Boba Fett',
		first_name: 'Boba',
		last_name: 'Fett',
		image: '',
		status: UserStatus.Online,
		email: 'boba@tatooine.global',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 6,
		username: 'yoda',
		display_name: 'Master Yoda',
		first_name: 'Master',
		last_name: 'Yoda',
		image: '',
		status: UserStatus.Away,
		email: 'yoda@dagobaah.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 7,
		username: 'jar_jar_binks',
		display_name: 'Jar Jar Binks',
		first_name: 'Jar Jar',
		last_name: 'Binks',
		image: '',
		status: UserStatus.Busy,
		email: 'jarjar@bing.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 8,
		username: 'ashoka_tano',
		display_name: 'Ashoka Tano',
		first_name: 'Ashoka',
		last_name: 'Tano',
		image: '',
		status: UserStatus.Offline,
		email: 'ashoka@icloud.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 9,
		username: 'darth_maul',
		display_name: 'Darth Maul',
		first_name: 'Darth',
		last_name: 'Maul',
		image: '',
		status: UserStatus.Online,
		email: 'darth@corruscant.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 10,
		username: 'jabba_the_hutt',
		display_name: 'Jabba the Hutt',
		first_name: 'Jabba',
		last_name: 'the Hutt',
		image: '',
		status: UserStatus.Online,
		email: 'jabba@tatooine.com',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 11,
		username: 'grogu',
		display_name: 'Grogu',
		first_name: 'Grogu',
		last_name: '',
		image: '',
		status: UserStatus.Online,
		email: '',
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 12,
		username: 'the_mandalorian',
		display_name: 'The Mandalorian',
		first_name: 'Din',
		last_name: 'Djarin',
		image: '',
		status: UserStatus.Online,
		email: '',
		created_at: '2021-01-01T00:00:00.000Z',
	},
];

const servers: App.DB.Server[] = [
	{
		id: 1,
		name: 'Server 1',
		image: null,
		text_channel_id: 1,
		description: 'This is a server description',
		created_at: '2021-01-01T00:00:00.000Z'
	},
	{
		id: 2,
		name: 'Server 2',
		image: null,
		text_channel_id: 1,
		description: 'This is a server description',
		created_at: '2021-01-01T00:00:00.000Z'
	}
];

let server_users: App.DB.ServerUser[] = [
	{
		id: 1,
		server_id: 1,
		user_id: 1,
		order: 1,
		display_name: 'Pat der Parteinahe',
		role: ServerRole.Owner,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 2,
		server_id: 2,
		user_id: 1,
		order: 0,
		display_name: null,
		role: ServerRole.Moderator,
		created_at: '2021-01-01T00:00:00.000Z',
	},
];

const user: App.DB.User = {
	id: 1,
	username: 'redesiigner',
	display_name: 'redesiigner',
	first_name: 'Patrick',
	last_name: 'Hellebrand',
	image: null,
	status: UserStatus.Busy,
	email: 'pat@redesiigner.com',
	created_at: '2021-01-01T00:00:00.000Z',
};

// API: GET /api/servers
// output ServerUser[] of joined servers
// with _server loaded
// property "order" is not visibile to others
server_users.forEach((userServer) => {
	userServer._server = servers.find((server) =>
		server.id === userServer.server_id
	);
});

export const load = (async ({ params }) => {
	return {
		_all_users,
		user,
		server_users,
	};
}) satisfies LayoutServerLoad;
