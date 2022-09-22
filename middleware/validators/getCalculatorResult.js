const Joi = require("joi");
const logger = require("../../config/logger")

module.exports = (req, res, next) => {
    const bodySchema = Joi.object().keys({})
    const querySchema = Joi.object().keys({
        query: Joi.string().base64().required()
    })

    const bodyValidation = bodySchema.validate(req.body);
    if (bodyValidation.error) {
        const err = {
            error: true,
            message:
                "body error : " +
                bodyValidation.error.details
                    .map((detail) => detail.message)
                    .join(" , "),

        };
        logger.error(
            bodyValidation.error.details[0].message,
            req.baseUrl + req.route.path,
            req.method,
            req.ip
        );

        return res.status(400).json(err);
    }

    const queryValidation = querySchema.validate(req.query);
    if (queryValidation.error) {
        const err = {
            error: true,
            message: "Invalid input"

        };
        logger.error(
            queryValidation.error.details[0].message,
            req.baseUrl + req.route.path,
            req.method,
            req.ip
        );

        return res.status(400).json(err);
    }
    next();
}