export enum PayloadType {
	Text,
	Image,
	Video,
	Audio,
	File
	//Deleted,
}

export enum UserStatus {
	Online,
	Busy,
	Away,
	Offline
}

export const UserStatusColors = ['bg-success-500', 'bg-warning-500', 'bg-danger-500', 'hidden'];

export enum PrivacyLevel {
	Public,
	Friends,
	SharedServerAndFriends,
	Private
}

export enum ApplicationRole {
	Admin,
	User
}

export enum UserFriendStatus {
	Pending,
	Accepted
}

export enum ServerRole {
	None,
	Moderator,
	Admin,
	Owner
}

export enum ServerTagColor {
	_Online,
	_Offline,
	Lime,
	Green,
	Teal,
	Blue,
	Indigo,
	Purple,
	Pink,
	Red,
	Orange,
	Yellow
}
