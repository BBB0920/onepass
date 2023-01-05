--Organizations
INSERT INTO organizations (name)
VALUES ('Acme Inc'), ('Contoso Corp'), ('AdventureWorks'), ('Northwind Traders'), ('Progressive Insurance');

--Users
INSERT INTO users (organization_id, email, password_hash, role)
VALUES (1, 'jane.doe@acme.com', '$2y$12$WYg8BBQ1E6JzGKLJhEjG0.v9X4xF4s0s4W0YKgvIzSpmPpZT4052W', 'admin'),
       (1, 'john.doe@acme.com', '$2y$12$N/JnWm8pv3ZBmzFJ/Gt98Ow8kgv22y1J/tD56.CezRJhRQZu9aV5C', 'manager'),
       (1, 'jim.smith@acme.com', '$2y$12$Jf6jP5b0M7VYzJb.P7rUze0FJLKy0Z9Oz8ksBPOjR1j2QvJybwW8W', 'user'),
       (2, 'sarah.johnson@contoso.com', '$2y$12$1s8sM0toE4JDSMZjr/J6e.n50Fc7dUzN6jKw6OEJ/6n39Z6Uf1gMy', 'admin'),
       (2, 'mike.williams@contoso.com', '$2y$12$7kOq3mwYOwKjzSLgF7Vu1OJ/v7mWJ9K6zRiJ1KZ04kIkg6P.D5P5y', 'user');

--Passwords
INSERT INTO passwords (user_id, name, login_url, username, password)
VALUES (1, 'Acme Inc Employee Portal', 'https://employee.acme.com/login', 'jane.doe', 'P@ssw0rd'),
       (1, 'Acme Inc Customer Support', 'https://support.acme.com/login', 'jane.doe', 'P@ssw0rd123'),
       (2, 'Acme Inc HR Portal', 'https://hr.acme.com/login', 'john.doe', 'P@ssw0rd456'),
       (3, 'Acme Inc Sales Portal', 'https://sales.acme.com/login', 'jim.smith', 'P@ssw0rd789'),
       (4, 'Contoso Corp Employee Portal', 'https://employee.contoso.com/login', 'sarah.johnson', 'C0nt0s0!');


--Secure_Note
INSERT INTO secure_notes (user_id, title, note)
VALUES (1, 'Insurance Policy', 'Policy number: 123456\nExpiration date: 12/31/2022\nCoverage: $500,







Questions: 

Questions
=====

- making code dry: currently routs have all functionality, where do query functions go (db> queries?) where does server side javascript go? (in the routs?)

- is defining functions by role the best method? Is there an easier way?

SQL
====

Should we have a username in user table?

Creating a new role table?

Organization User relation - does this relation allow for our usecase?
