import { PostDatabase } from "../data/PostDatabase";
import { CustomError } from "../error/CustomError";
import { Post, PostInputDTO } from "../model/Post";
import { generateId } from "../services/idGenerator";
import { 
    NotBody,
    NotPhoto,
    NotDescription,
    NotType,
    NotAuthorId,
    PhotoIsNotString,
    DescriptionIsNotString,
    AuthorIdIsNotString,
    InvalidType,
    NotId
} from "../error/PostErrors";

export class PostBusiness {
    registerPost = async ( input: PostInputDTO ) => {
        try {
            const id: string = generateId()
            const { photo, description, type, authorId } = input
            
            if ( !photo && !description && !type && !authorId ) {
               throw new NotBody() 
            }

            if (!photo) {
                throw new NotPhoto()
            }
    
            if (!description) {
                throw new NotDescription()
            }

            if (!type) {
                throw new NotType()
            }

            if (!authorId) {
                throw new NotAuthorId()
            }
    
            if (typeof photo !== "string") {
                throw new PhotoIsNotString()
            }
    
            if (typeof description !== "string") {
                throw new DescriptionIsNotString()
            }
    
            if (typeof authorId !== "string") {
                throw new AuthorIdIsNotString()
            }

            if (type != "normal" && type != "event" ) {
                throw new InvalidType()
            }
    
            const post: Post = {
                id,
                photo,
                description,
                type, 
                authorId
            }

            const postDatabase = new PostDatabase()
            await postDatabase.registerPost(post)
  
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    getPostById = async ( id:string ): Promise<Post> => {
        try {
            if (!id) {
                throw new NotId()
            }

            const postDatabase = new PostDatabase()
            return await postDatabase.getPostById(id)

        } catch (err:any) {
            throw new Error(err.message)
        }
    }
}
