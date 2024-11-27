import {getTodosPosts, criarPost, atualizarPost} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts (req, res) {
    // Obtém todos os posts usando a função getTodosPosts:
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON:
    res.status(200).json(posts);
  }

  export async function enviarNovoPost (req, res) {
    const novoPost = req.body;
    try {
      const criacaoPost = await criarPost(novoPost);
      res.status(200).json(criacaoPost);
    }catch (erro) {
      console.error(erro.message);
      res.status(500).json({"Erro": "Algo inesperado aconteceu e o post não pode ser enviado"})
    }
  }

  export async function enviarNovaImagem (req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try {
      const criacaoPost = await criarPost(novoPost);
      const imagemAtualizada = `uploads/${criacaoPost.insertedId}.png`
      fs.renameSync(req.file.path, imagemAtualizada)
      res.status(200).json(criacaoPost);
    }catch (erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"});
    }
  }

  export async function atualizarNovoPost (req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try {
      const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
      const descricao = await gerarDescricaoComGemini(imgBuffer);
      const post = {
        imgUrl: urlImagem,
        descricao: descricao,
        alt: req.body.alt
      };
      const criacaoPost = await atualizarPost(id, post);  
      res.status(200).json(criacaoPost);
    }catch (erro) {
      console.error(erro.message);
      res.status(500).json({"Erro":"Falha na requisição"})
    };
  }