import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/User";

export class UserController {
    registerUser = async ( req: Request, res: Response ) => {
        try {
            const { name, email, password } = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password
            }

            const userBusiness = new UserBusiness()
            await userBusiness.registerUser(input)

            res.status(201).send("Novo usuário cadastrado com sucesso!")
            
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}
