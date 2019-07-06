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
            ) RETURNING id
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
    `,
    countUsers: `
        SELECT
            COUNT(*)
        FROM
            users
    `,
    getAllUsers: `
        SELECT
            *
        FROM
            users
        ORDER BY
            created_at DESC
        OFFSET
            $1
        LIMIT
            $2
    `,
    activateUser: `
        UPDATE
            users
        SET
            is_verified = $1,
            updated_at = $2
        WHERE
            id = $3
    `,
    updatePassword: `
        UPDATE
            users
        SET
            hash = $1,
            salt = $2,
            updated_at = $3
        WHERE
            id = $4
    `
};

module.exports = queries;
