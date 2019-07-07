const UserDb = require('../../db/user');


function getUsersCount() {
    return new Promise((async(resolve, reject) => {
        try {
            const user_count = await UserDb.countUsers();
            resolve(user_count);
        } catch (e) {
            reject(e);
        }
    }));
}

process.on('message', async() => {
    try {
        const data = await getUsersCount();
        process.send(data);
    } catch (e) {
        process.send(e);
    }
});
