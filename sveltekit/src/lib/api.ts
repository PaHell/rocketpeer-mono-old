import type { users } from '$src/database';
import { http } from '$src/lib/http';

export class Auth {
	static async login(payload: App.DB.Login) {
		return await http<App.DB.AccessToken>('POST', `/login`, payload);
	}
	static async register(payload: App.DB.Register) {
		return await http<App.DB.AccessToken>('POST', `/create_user`, payload);
	}
	static async me() {
		return await http<users>('GET', `/me`);
	}
}
