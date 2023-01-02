-- Drop and recreate Organizations table

DROP TABLE IF EXISTS organizations CASCADE;
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  org_name VARCHAR(255) NOT NULL
);
