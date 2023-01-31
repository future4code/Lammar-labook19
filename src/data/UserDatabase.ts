import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";
import { registeredUser } from "../error/UserErrors";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
    registerUser = async ( user: User ): Promise<void> => {
        try {
            const result = await UserDatabase.connection.raw(`
                SELECT email FROM labook_users
                WHERE email LIKE "%${user.email.trim()}"
            `)

            const registeredEmail = result[0]
        
            if (registeredEmail.length > 0) {
                throw new registeredUser()
            }

            await UserDatabase.connection.raw(`
                INSERT INTO labook_users (id, name, email, password)
                VALUES(
                    "${user.id}", 
                    "${user.name}", 
                    "${user.email.trim()}", 
                    "${user.password}" 
                );
            `)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}
