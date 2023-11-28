import { NextFunction, Request, Response } from 'express'
export class ErrorHandler {
    static async errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
       console.log(error)
       res.status(500).json({ error: 'Infelizmente por alguma razão que não sei explicar tivemos um erro interno no servidor, peço desculpas por isso. 🤦‍♂️' })
   }
}