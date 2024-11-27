// Importa a dependências necessária:
// express: Framework web para criar aplicações web
import express from "express";
// Importa as definições das rotas de posts a partir do arquivo postRoutes.js
// Essas rotas serão usadas para configurar o roteamento da aplicação.
import routes from "./src/routes/postRoutes.js"

// Cria uma instância do servidor Express:
const app = express();
app.use(express.static("uploads"))
// Chama a função 'routes' para definir os endpoints e seus respectivos tratamentos.
// O objeto 'app' é passado como argumento para configurar as rotas no servidor.
routes(app);

// Inicia o servidor na porta 3000 e imprime uma mensagem no console:
app.listen(3000, () => {
  console.log("Servidor funcionando...");
});




