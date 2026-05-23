import type { NextFunction, Request, Response } from "express"
import type { ROLE } from "../types/index.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import config from "../config/index.js";
import { pool } from "../db/index.js";
import { sendResponse } from "../utility/sendResponse.js";

const auth = (...ROLES : ROLE[])=>{
    return async (req:Request, res:Response, next:NextFunction) => {
        try {
            const token = req.headers.authorization
            if (!token) {
                sendResponse(res,{
                    statusCode: 401,
                    success: false,
                    message: "Unauthorized Access",
                })    
            }

            // Verify the token
            const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload
            req.user = decoded

            //Role cheking
            if (!ROLES.includes(decoded.role)) {
                sendResponse(res,{
                    statusCode: 403,
                    success: false,
                    message: "Forbidden Access",
                })  
            }

            next()

            
        } catch (error) {
            sendResponse(res,{
                statusCode: 500,
                success: false,
                message: "Internal Server Error",
            })
        }
    }
}

export default auth