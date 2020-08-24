import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

/*
  Conceitos mais importantes ReactJS:
    Componente
    Propriedade
    Estado & Imutabilidade

*/

function App() {
  const [projects, setProjects] = useState([]);

  // useState retorna um array com 2 posições:
  // 2. Variável com o seu valor inicial
  // 3. Função para atualizarmos esse valor

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []); // recebe 2 parametros: 1. qual função quero disparar; 2. quando quero disparar essa função?
  
  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]); // gera um novo array; ...projects vai percorrer todo meu array de projects e copiar cada projeto para dentro do meu array

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
	    owner: "Taynara Pecorario"
    });
    
    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <> 
      <Header title="Projects" />
       
      <ul> 
        {projects.map(project => <li key={project.id}>{project.title}</li>)}

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </ul>
    </>
  );
}

export default App;