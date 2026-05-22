import type { Response } from "express"

type TResponse<T> = {
    statusCode: number
    success: boolean
    message: string
    data?: T
    error?: unknown
}

export const sendResponse = <T>(
    res: Response,
    responseData: TResponse<T>
) => {

    return res
        .status(responseData.statusCode)
        .json({
            success: responseData.success,
            message: responseData.message,
            data: responseData.data,
            error: responseData.error
        })

}