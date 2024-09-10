import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import UserRouter from "./routes/UserRoutes";

import PostRouter from "./routes/PostRoutes";
import CommentRouter from "./routes/CommentRoutes";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter)
// Posts feitos por um usuário
app.get("/user/:id/posts", async function (req:Request, res:Response) {
  const idUser = req.params.id
  try{
    const userPosts = await prisma.post.findMany({
      where: {
        id: parseInt(idUser)}
    })
    res.json(userPosts)
  }catch(error){
      res.json({
          status: 500,
          message: error,
      })
      console.log(error);
  }
});
app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
