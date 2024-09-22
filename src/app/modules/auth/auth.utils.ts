import jwt from "jsonwebtoken";

export const createToken = (
    payload: { email: string; role: string },
    secretKey: string,
    expiresIn: string
) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

    return token;
};