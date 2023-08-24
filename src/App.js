import React, { useState } from "react";
import "./App.css";
import Counter from './components/counters/index.jsx';

function App() {
  // const [title, setTitle] = useState("");
  // const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(false); // Estado de carga

  // const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${title}&country=us&show_type=all&output_language=en`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "e62397dea2msh462a64157ba5258p1ad146jsn76daf54e422c",
  //     "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
  //   },
  // };

  // const handleSearch = async () => {
  //   try {
  //     setLoading(true); // Comenzar la carga
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     console.log(data)
  //     await setResults(data.result);
  //     setLoading(false); // Finalizar la carga
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false); // Finalizar la carga en caso de error
  //   }
  // };

  return (
    <div className="App">
      <Counter></Counter>
      {/* <h1>Streaming Availability Checker</h1>
      <input
        type="text"
        placeholder="Ingrese el título..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      <div>
        {loading ? ( // Renderizar el spinner si está cargando
          <div className="spinner">Cargando...</div>
        ) : (
          results?.filter((result) => result?.streamingInfo?.us?.length > 0).map((result, index) => (
            <div key={index}>
              <h2>{result.title}</h2>
              <div className="data-movie">
              {[...new Set(result?.streamingInfo?.us?.map(item => item.service))].map((service, index) => (
                  <span key={index} className="item-span">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div> */}
    </div>
  );
}

export default App;
