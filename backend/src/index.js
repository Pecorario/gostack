const express = require('express');

const app = express();

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

app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  console.log(title);
  console.log(owner);

  return  response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  console.log(title);
  console.log(owner);

  return  response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;

  console.log(id);
  
  return  response.json([
    'Projeto 4',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  return  response.json([
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});