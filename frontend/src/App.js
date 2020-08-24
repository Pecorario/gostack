import React, { useState } from 'react';

import Header from './components/Header';

/*
  Conceitos mais importantes ReactJS:
    Componente
    Propriedade
    Estado & Imutabilidade

*/

function App() {
  const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

  // useState retorna um array com 2 posições:
  // 2. Variável com o seu valor inicial
  // 3. Função para atualizarmos esse valor

  function handleAddProject() {
    setProjects([...projects, `Novo projeto ${Date.now()}`]); //gera um novo array; ...projects vai percorrer todo meu array de projects e copiar cada projeto para dentro do meu array

    console.log(projects);
  }

  return (
    <> 
      <Header title="Projects" />
       
      <ul> 
        {projects.map(project => <li key={project}>{project}</li>)}

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </ul>
    </>
  );
}

export default App;