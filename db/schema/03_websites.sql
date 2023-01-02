-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS websites CASCADE;
CREATE TABLE websites (
  id SERIAL PRIMARY KEY NOT NULL,
  website_name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_id BIGINT REFERENCES users(id),
  organization_id BIGINT REFERENCES organizations(id) ON DELETE CASCADE
);
