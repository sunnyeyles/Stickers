import { Express, Response, NextFunction } from 'express';
import jwt_decode from "jwt-decode";
import { ITokenData } from '../types';

export interface TokenRequest extends Request {
    tokenData: ITokenData;
}

// we need to secure all the other protectes endpoints
export const verifyJWT = async (req: TokenRequest, res: Response, next: NextFunction) => {
    // we defining the authHeader
    const authHeader = req.headers["authorization"] || req.headers['Authorization']

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Forbidden' })
    }

    const accessToken = authHeader.split(' ')[1]

    try {
        // than we need to verify the accessToken
        const decoded: ITokenData = jwt_decode(accessToken)
        req.tokenData = decoded
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}
