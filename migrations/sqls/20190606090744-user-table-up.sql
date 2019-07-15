/* Replace with your SQL commands */

CREATE TABLE users(
    id VARCHAR(50) PRIMARY KEY,
    email  VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    salt VARCHAR(200),
    hash VARCHAR(200),
    is_verified BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);

CREATE INDEX idx_user_id ON users(id);
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
