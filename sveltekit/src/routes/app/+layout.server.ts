import { getStores } from '$app/stores';
import { Icons } from '$src/components/general/Icon.svelte';
import { UserStatus, ServerRole } from '$src/lib/enum';
import type { LayoutServerLoad } from './$types';

const servers: App.DB.Server[] = [
	{
		id: 1,
		name: 'Server 1',
		image: 'https://cdn.discordapp.com/icons/1/1.png',
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

let userServers: App.DB.UserServer[] = [
	{
		id: 1,
		server_id: 1,
		user_id: 1,
		order: 1,
		display_name: 'Pat der Parteinahe',
<<<<<<< HEAD
		role: ServerRole.Owner,
=======
		role: ServerRole.Creator,
>>>>>>> fb61932 (rebase)
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
<<<<<<< HEAD
	{
		id: 3,
		server_id: 3,
		user_id: 1,
		order: 2,
		display_name: null,
		role: ServerRole.None,
		created_at: '2021-01-01T00:00:00.000Z',
	},
	{
		id: 4,
		server_id: 4,
		user_id: 3,
		order: 0,
		display_name: null,
		role: ServerRole.Owner,
		created_at: '2021-01-01T00:00:00.000Z',
	},
=======
>>>>>>> fb61932 (rebase)
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
<<<<<<< HEAD
// output ServerUser[] of joined servers
// with _server loaded
// property "order" is not visibile to others
server_users.forEach((userServer) => {
=======
// output UserServer[] of joined servers
// with _server loaded
userServers.forEach((userServer) => {
>>>>>>> fb61932 (rebase)
	userServer._server = servers.find((server) =>
		server.id === userServer.server_id
	);
});

export const load = (async ({ params }) => {
	return {
<<<<<<< HEAD
		_all_users,
		user,
		server_users,
=======
		user,
		userServers,
>>>>>>> fb61932 (rebase)
	};
}) satisfies LayoutServerLoad;
