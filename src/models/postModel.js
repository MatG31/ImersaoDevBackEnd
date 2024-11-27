import "dotenv/config";
// Importa a função para conectar ao banco de dados:
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";


// Estabelece a conexão com o banco de dados utilizando a string de conexão do ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção "posts":
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-byterest":
    const db = conexao.db("imersao-byterest");
    // Seleciona a coleção "posts":
    const colecao = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array:
    return colecao.find().toArray();
  }

export async function criarPost(novoPostArg) {
  const db = conexao.db("imersao-byterest");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPostArg);
}

export async function atualizarPost(idArg, postArg) {
  const db = conexao.db("imersao-byterest");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(idArg);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: postArg})
  }