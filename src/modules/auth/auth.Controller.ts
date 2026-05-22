import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utility/sendResponse.js";

const User_Registration = async(req : Request, res : Response)=>{
    const result = await authService.User_RegistrationService(req.body)
 try {
       sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User registration successful",
        data: result,
        
})
    
 } catch (error) {
    sendResponse(res, {
        statusCode: 500,
        success: false,
        message: "User registration failed",
        error: error instanceof Error ? error.message : error
    })
    
 }


}



export const authController ={
    User_Registration
}