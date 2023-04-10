import type { User } from '$src/database';
import { http } from '$src/lib/http';

export class UserResource {
	static login(payload: App.DB.Login) {
		return http<App.DB.AccessToken>('POST', `/login`, payload);
	}
	static register(payload: App.DB.Register) {
		return http<App.DB.AccessToken>('POST', `/user`, payload);
	}
	static me() {
		return http<User>('GET', `/user/me`);
	}
	static one(number: number) {
		return http<User>('GET', `/user/${number}`);
	}
	static all() {
		return http<User[]>('GET', `/user`);
	}
}
