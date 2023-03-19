import { http } from '$src/lib/http';

export class Auth {
	static async login(user: App.Database.Auth.Login) {
		return await http<App.Database.Auth.Token>('POST', `/login`, user);
	}
}
