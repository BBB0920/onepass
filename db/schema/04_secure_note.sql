DROP TABLE IF EXISTS secure_notes CASCADE;
CREATE TABLE secure_notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  title TEXT NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
