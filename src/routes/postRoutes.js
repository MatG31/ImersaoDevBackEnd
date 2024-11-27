// Importa a dependência necessárias:
// json: Middleware para analisar JSON no corpo das requisições
import express from "express";
import multer from "multer";
import cors from "cors";
// Importa a função listarPosts do controlador de posts.
import { listarPosts, enviarNovoPost, enviarNovaImagem, atualizarNovoPost} from "../controller/postsController.js"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage})

const routes = (app) => {
    // Habilita o middleware para analisar JSON no corpo das requisições:
    app.use(express.json());
    app.use(cors(corsOptions));
    // Define uma rota GET para "/posts":
    app.get("/posts", listarPosts);  
    // Define uma rota POST para "/posts":
    app.post("/posts", enviarNovoPost)
    app.post("/upload", upload.single("imagem"), enviarNovaImagem)
    app.put("/upload/:id", atualizarNovoPost )
}

// Torna o objeto 'routes' disponível para outros módulos que importarem este arquivo.
// Ao fazer um import default, o módulo importador receberá diretamente o objeto 'routes'.
export default routes;