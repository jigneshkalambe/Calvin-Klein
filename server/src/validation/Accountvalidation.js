const joi = require("joi");
const accoutValidation = (req, res, next) => {
    const idealObject = joi.object({
        firstName: joi.string().trim().required(),
        lastName: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
    });
    const { error } = idealObject.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation error",
            errors: error.details.map((detail) => detail.message),
        });
    }

    next();
};

module.exports = accoutValidation;
