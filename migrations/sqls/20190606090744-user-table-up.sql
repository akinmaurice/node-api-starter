/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id VARCHAR PRIMARY KEY DEFAULT 'user-' || LOWER(
            REPLACE(
                CAST(uuid_generate_v1mc() As varchar(50))
                , '-','')
            ),
    email  VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    salt VARCHAR(200),
    hash VARCHAR(200),
    is_verified BOOLEAN,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ
);



