import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";
import { sendResponse } from "../../utility/sendResponse.js";

const Create_Issue = async (req:Request,res:Response) => {
    try {
        const userId = req.user?.id;
        const result = await issueService.Create_Issue(req.body, userId)

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Issue created successfully",
            data: result
        })
        
    } catch (error) {
        sendResponse(res,{
            statusCode: 500,
            success: false,
            message: "Issue creation failed",
            errors: error instanceof Error ? error.message : error,
        })  
        
    }

}


const Get_All_Issues = (req:Request,res:Response) => {
    try {
        const result = issueService.Get_All_Issues()

        sendResponse(res,{
            statusCode: 200,
            success: true,
            message: "Issues retrieved successfully",
            data: result
        })
        
    } catch (error) {
        sendResponse(res,{
            statusCode: 500,
            success: false,
            message: "Failed to retrieve issues",
            errors: error instanceof Error ? error.message : error,
        })  
        
    }




} 


const Get_Single_Issue =  async(req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const result = await issueService.Get_Single_Issue(id as string)
        sendResponse(res,{        
            statusCode: 200,        
            success: true,        
            message: "Issue retrieved successfully",        
            data: result,        
        })
    } catch (error) {
        sendResponse(res,{
            statusCode: 500,
            success: false,
            message: "Failed to retrieve issue",
            errors: error instanceof Error ? error.message : error,
        })
    }
}





export const issueController = {
    Create_Issue,
    Get_All_Issues,
    Get_Single_Issue
}