-- Add migration script here
ALTER TABLE users ALTER COLUMN status SET DEFAULT 'Online';
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'None';
ALTER TABLE users ALTER COLUMN privacy_level SET DEFAULT 'Private';