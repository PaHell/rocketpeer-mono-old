import type { User } from '$src/database';
import { http } from '$src/lib/http';

export class UserResource {
	static async login(payload: App.DB.Login) {
		return await http<App.DB.AccessToken>('POST', `/login`, payload);
	}
	static async register(payload: App.DB.Register) {
		return await http<App.DB.AccessToken>('POST', `/user`, payload);
	}
	static async me() {
		return await http<User>('GET', `/user/me`);
	}
	static async one(number: number) {
		return await http<User>('GET', `/user/${number}`);
	}
	static async all() {
		return await http<User[]>('GET', `/user`);
	}
}
