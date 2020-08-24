const express = require('express');
const cors = require('cors');
const { v4, validate } = require('uuid'); // universal unique id

const app = express();

app.use(cors()); //permite q qlqr forntend tenha acesso a esse backend
app.use(express.json());

/*
  Métodos HTTP:
    GET: buscar informações do back-end
    POST: criar uma informação no back-end
    PUT/PATCH: alterar uma informação no back-end
    DELETE: deletar uma informação no back-end
*/


/*
  Tipos de parâmetros:
    Query Params: utilizado principalmente para filtros e paginação
    Route Params: utilizado para identificar recursos na hora de atualizar ou deletar
    Request Body: conteúdo na hora de criar ou editar um recurso (JSON)
*/

/*
  Middleware:
    Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
  Todas as rotas podem ser consideradas middlewares
*/

const projects = [];

function logRequests(request, response, next) {  //esse middleware vai ser disparado de forma automática em todas as requisições de forma a mostrar no console qual rota está sendo chamada pelo insomnia
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`; //` é para conseguir incluir variáveis; converte o method para caixa alta

  console.time(logLabel);

  next(); //Próximo middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!validate(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title //vê o que foi enviado no title
    ? projects.filter(project => project.title.includes(title)) //se foi preenchido pelo usuario, realiza uma busca dentro de cada objeto project e verifica se dentro do atributo title dele, existe a palavra que foi preenchida no campo de busca
    : projects; //se for enviado em branco, retorno todos os projetcts

  return  response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: v4(), title, owner };

  projects.push(project); // add o objeto project no final do array projects

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id); //procura em cada objeto do array projects um project cujo id coincida com o id passado e acha a posição dele dentro desse vetor

  if (projectIndex < 0) { //se o objeto nao for encontrado
    return response.status(400).json({ error: 'Project not found.' }); //seto o status 400 que é um codigo genérico para erro no back-end
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project; //dentro do array de projects, procuro a posição do projectIndex e substituo o objeto daquela posição pelo objeto q acabei de criar

  return  response.json(project); //retorno o objeto atualizado
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  projects.splice(projectIndex, 1); //splice: método para tirar uma informação de um array (indice que quero remover, quantas posições quero remover a partir desse indice; como quero remover apenas a informação contida nesse índice, passo 1)

  return  response.status(204).send(); //status 204 para dizer que a resposta nao tem conteudo
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});