const userSchema = (username, email, token) => {
    return {
        username: username,
        email: email,
        token: token
    }
};

module.exports = userSchema;