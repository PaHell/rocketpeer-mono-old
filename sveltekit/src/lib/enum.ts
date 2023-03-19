export enum RoleColor {
    Lime = "text-lime-500",
    Green = "text-green-500",
    Teal = "text-teal-500",
    Blue = "text-blue-500",
    Indigo = "text-indigo-500",
    Purple = "text-purple-500",
    Pink = "text-pink-500",
    Red = "text-red-500",
    Orange = "text-orange-500",
    Yellow = "text-yellow-500",
    _Online = "pri",
    _Offline = "sec",
}

export enum ContentType {
    Text,
    Image,
    Video,
    Audio,
    File,
}

export enum UserStatus {
	Online,
	Busy,
	Away,
	Offline
}

export const UserStatusColors = ['bg-success-500', 'bg-warning-500', 'bg-danger-500', 'hidden'];