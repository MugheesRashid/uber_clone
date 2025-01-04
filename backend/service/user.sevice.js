const userModel = require('../models/user');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    const user = await userModel.create({
        firstName: firstname,
        lastName: lastname,
        email,
        password
    });

    return user;
}



