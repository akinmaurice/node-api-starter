const transformUser = (user) => {
    if (!user) {
        return null;
    }
    const modify_user = user;
    delete modify_user.hash;
    delete modify_user.salt;
    delete modify_user.is_verified;
    delete modify_user.date_of_birth;
    delete modify_user.created_at;
    delete modify_user.updated_at;
    return modify_user;
};

module.exports = {
    transformUser
};
