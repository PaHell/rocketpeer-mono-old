use crate::types::{UserPrivacyLevel, UserRole, UserStatus};
use std::str::FromStr;

impl ToString for UserStatus {
    fn to_string(&self) -> String {
        match self {
            UserStatus::Away => "Away".to_string(),
            UserStatus::DoNotDisturb => "DoNotDisturb".to_string(),
            UserStatus::Offline => "Offline".to_string(),
            UserStatus::Online => "Online".to_string(),
        }
    }
}

impl ToString for UserRole {
    fn to_string(&self) -> String {
        match self {
            UserRole::None => "None".to_string(),
            UserRole::Moderator => "Moderator".to_string(),
            UserRole::Administrator => "Administrator".to_string(),
            UserRole::Owner => "Owner".to_string(),
        }
    }
}

impl ToString for UserPrivacyLevel {
    fn to_string(&self) -> String {
        match self {
            UserPrivacyLevel::Public => "Public".to_string(),
            UserPrivacyLevel::Friends => "Friends".to_string(),
            UserPrivacyLevel::SharedServerAndFriends => "SharedServerAndFriends".to_string(),
            UserPrivacyLevel::Private => "Private".to_string(),
        }
    }
}

impl FromStr for UserStatus {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "away" => Ok(UserStatus::Away),
            "donotdisturb" => Ok(UserStatus::DoNotDisturb),
            "offline" => Ok(UserStatus::Offline),
            "online" => Ok(UserStatus::Online),
            _ => Err(()),
        }
    }
}

impl FromStr for UserRole {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "none" => Ok(UserRole::None),
            "moderator" => Ok(UserRole::Moderator),
            "administrator" => Ok(UserRole::Administrator),
            "owner" => Ok(UserRole::Owner),
            _ => Err(()),
        }
    }
}

impl FromStr for UserPrivacyLevel {
    type Err = ();

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "public" => Ok(UserPrivacyLevel::Public),
            "friends" => Ok(UserPrivacyLevel::Friends),
            "sharedserverandfriends" => Ok(UserPrivacyLevel::SharedServerAndFriends),
            "private" => Ok(UserPrivacyLevel::Private),
            _ => Err(()),
        }
    }
}

impl TryFrom<i8> for UserStatus {
    type Error = ();

    fn try_from(value: i8) -> Result<Self, Self::Error> {
        match value {
            1 => Ok(UserStatus::Online),
            2 => Ok(UserStatus::Away),
            3 => Ok(UserStatus::DoNotDisturb),
            4 => Ok(UserStatus::Offline),
            _ => Ok(UserStatus::Online),
        }
    }
}

impl TryFrom<i8> for UserRole {
    type Error = ();

    fn try_from(value: i8) -> Result<Self, Self::Error> {
        match value {
            1 => Ok(UserRole::None),
            2 => Ok(UserRole::Moderator),
            3 => Ok(UserRole::Administrator),
            4 => Ok(UserRole::Owner),
            _ => Ok(UserRole::None),
        }
    }
}

impl TryFrom<i8> for UserPrivacyLevel {
    type Error = ();

    fn try_from(value: i8) -> Result<Self, Self::Error> {
        match value {
            1 => Ok(UserPrivacyLevel::Public),
            2 => Ok(UserPrivacyLevel::Friends),
            3 => Ok(UserPrivacyLevel::SharedServerAndFriends),
            4 => Ok(UserPrivacyLevel::Private),
            _ => Ok(UserPrivacyLevel::Private),
        }
    }
}
