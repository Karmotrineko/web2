import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class PostController{
    constructor(){}

    async listPosts(req: Request, res: Response){
        try{
            const posts = await prisma.post.findMany();
            res.json(posts)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    // Criar um post para um usuário
    async createPost(req: Request, res: Response){
        const postData = req.body;
        try{
            const newPost = await prisma.post.create({
                data: postData
            })
            console.log(postData);
            console.log("Post criado com sucesso");
            res.json({
                status: 200,
                newPost: newPost
            })
        }catch(error){
            console.log(postData);
            res.json({
                status: 500,
                message: error
            })
        }
    }

    async updatePost(req: Request, res: Response){
        const postData = req.body;
        const postId = req.params.id;
        try{
            const newPost = await prisma.post.update({
                where: {
                id: parseInt(postId),
                },
                data: postData,
            });
            console.log(postData);
            console.log("Post atualizado com sucesso");
            res.json({
                status: 200,
                newPost: newPost
            })
        }catch(error){
            console.log(postData);
            res.json({
                status: 500,
                message: error,
            })
            console.log(error);
        }
    }

    async deletePost(req: Request, res: Response){
        const idPost = req.params.id;
        try{
        const postDeleted = await prisma.post.delete({
            where: {
                id: parseInt(idPost)
            }
        })
        res.json({
            status: 200,
            message: 'Deletado com sucesso'
        })
        }catch(error){
            res.json({                
                error: error,
            })
        }
    }
}

export default new PostController();