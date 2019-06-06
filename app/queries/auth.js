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
    `
};

module.exports = queries;
