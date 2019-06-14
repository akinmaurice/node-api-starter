const queries = {
    getUserByUserName: `
        SELECT
            *
        FROM
            users
        WHERE
            username = $1
    `,
    getUserByEmail: `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1
    `,
    getUserByID: `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    `,
    createUser: `
        INSERT INTO
            users(
                username,
                email,
                hash,
                salt,
                date_of_birth,
                is_verified,
                created_at,
                updated_at
            ) VALUES(
                $1, $2, $3, $4, $5, $6, $7, $8
            )
    `,
    getUserByEmailOrUserName: `
        SELECT
            *
        FROM
            users
        WHERE
            username = $1
        OR
            email = $1
    `
};

module.exports = queries;
