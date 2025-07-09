const validator = require("validator");

const isValidated = (data) => {
    const { firstName, lastName, email } = data;

    if (!firstName || firstName.length < 4 || firstName.length > 20) {
        throw new Error("First name must be between 4 and 20 characters");
    }

    if (!lastName || lastName.length < 2 || lastName.length > 20) {
        throw new Error("Last name must be between 2 and 20 characters");
    }

    if (!validator.isEmail(email)) {
        throw new Error("Please enter a valid email");
    }
};

module.exports = isValidated;
