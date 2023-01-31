import { BaseDatabase } from "./BaseDatabase";
import { CustomError } from "../error/CustomError";
import { Post } from "../model/Post";
import { PostNotFound } from "../error/PostErrors";

export class PostDatabase extends BaseDatabase {

    registerPost = async ( post: Post ): Promise<void> => {
        try {
            await PostDatabase.connection.raw(`
                INSERT INTO labook_posts (id, photo, description, type, author_id)
                VALUES(
                    "${post.id}", 
                    "${post.photo}", 
                    "${post.description}", 
                    "${post.type}",
                    "${post.authorId}" 
                );
            `)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getPostById = async ( id:string ): Promise<Post> => {
        try {
            const result = await PostDatabase.connection.raw(`
                SELECT * FROM labook_posts
                WHERE id LIKE "%${id}";
            `)

            const post = result[0][0]
        
            if (typeof post === "undefined") {
                throw new PostNotFound()
            }

            return post

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}
