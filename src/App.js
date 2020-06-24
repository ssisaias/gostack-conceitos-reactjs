import React, {useState, useEffect} from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories,setRepositories] = useState([]); // Repo list

  useEffect(()=>{
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('/repositories',
    {
      title: "New Repo "+Date.now(),
      url:"https://github.com/ssisaias",
      techs:["node","react"]
    })
    
    const repo = response.data;

    setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('/repositories/'+id);
    
    const foundRepoIndex = repositories.findIndex(repo => repo.id === id);
    repositories.splice(foundRepoIndex,1);      
    setRepositories([...repositories]);
    /*
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
    */
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <div key={repo.id}>
          <li key={repo.id}>{repo.title}</li>
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </div>
        ))}
  
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
