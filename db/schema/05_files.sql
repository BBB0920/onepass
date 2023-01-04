DROP TABLE IF EXISTS files CASCADE;
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  file_name TEXT NOT NULL,
  file_data BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);