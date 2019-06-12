const transformUser = (user) => {
    if (!user) {
        return null;
    }
    const modify_user = user;
    delete modify_user.hash;
    delete modify_user.salt;
    delete modify_user.is_verified;
    return modify_user;
};

module.exports = {
    transformUser
};
