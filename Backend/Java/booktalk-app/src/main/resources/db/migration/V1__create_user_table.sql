-- Filename: V1__create_user_table.sql

CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    frequency INTEGER NOT NULL
);
