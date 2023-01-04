/*
Organizations:
	•	id (integer)
	•	name (string)
	•	created_at (timestamp)
Users:
	•	id (integer)
	•	organization_id (integer)
	•	email (string)
	•	password_hash (string)
	•	role (string)
	•	created_at (timestamp)
Passwords:
	•	id (integer)
	•	user_id (integer)
	•	name (string)
	•	login_url (string)
	•	username (string)
	•	password (string)
	•	created_at (timestamp)
Secure_Notes:
	•	id (integer)
	•	user_id (integer)
	•	title (string)
	•	note (text)
	•	created_at (timestamp)
Files:
	•	id (integer)
	•	user_id (integer)
	•	file_name (string)
	•	file_data (binary)
	•	created_at (timestamp)
  */

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations (id),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE passwords (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  name TEXT NOT NULL,
  login_url TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE secure_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  title TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  file_name TEXT NOT NULL,
  file_data BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
