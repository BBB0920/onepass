DROP TABLE IF EXISTS passwords CASCADE;
CREATE TABLE passwords (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  name TEXT NOT NULL,
  login_url TEXT NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
