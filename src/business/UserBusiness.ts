import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { User, UserInputDTO } from "../model/User";
import { generateId } from "../services/idGenerator";
import { 
    NotBody, 
    NotName, 
    NotEmail, 
    NotPassword, 
    NameIsNotString, 
    EmailIsNotString, 
    PasswordIsNotString,
    InvalidEmail, 
    InvalidPassword, 
    PasswordNoSpaces
} from "../error/UserErrors";

export class UserBusiness {
    registerUser = async ( input: UserInputDTO ) => {
        try {
            const id: string = generateId()
            const { name, email, password } = input
            
            if ( !name && !email && !password ) {
               throw new NotBody() 
            }

            if (!name) {
                throw new NotName()
            }
    
            if (!email) {
                throw new NotEmail()
            }

            if (!password) {
                throw new NotPassword()
            }
    
            if (typeof name !== "string") {
                throw new NameIsNotString()
            }
    
            if (typeof email !== "string") {
                throw new EmailIsNotString()
            }
    
            if (typeof password !== "string") {
                throw new PasswordIsNotString()
            }

            if(!email.includes("@")) {
                throw new InvalidEmail()
            }

            if(password.length < 8) {
                throw new InvalidPassword()
            }

            if (password.includes(" ") === true) {
                throw new PasswordNoSpaces()
            }
    
            const user: User = {
                id,
                name,
                email,
                password
            }

            const userDatabase = new UserDatabase()
            await userDatabase.registerUser(user)
  
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
