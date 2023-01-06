--Users
INSERT INTO users (organization_id, email, password_hash, role)
VALUES (1, 'jane.doe@acme.com', '$2y$12$WYg8BBQ1E6JzGKLJhEjG0.v9X4xF4s0s4W0YKgvIzSpmPpZT4052W', 'admin'),
       (1, 'john.doe@acme.com', '$2y$12$N/JnWm8pv3ZBmzFJ/Gt98Ow8kgv22y1J/tD56.CezRJhRQZu9aV5C', 'admin'),
       (1, 'jim.smith@acme.com', '$2y$12$Jf6jP5b0M7VYzJb.P7rUze0FJLKy0Z9Oz8ksBPOjR1j2QvJybwW8W', 'user'),
       (2, 'sarah.johnson@contoso.com', '$2y$12$1s8sM0toE4JDSMZjr/J6e.n50Fc7dUzN6jKw6OEJ/6n39Z6Uf1gMy', 'admin'),
       (2, 'mike.williams@contoso.com', '$2y$12$7kOq3mwYOwKjzSLgF7Vu1OJ/v7mWJ9K6zRiJ1KZ04kIkg6P.D5P5y', 'user');
