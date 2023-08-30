import React, { useState } from "react";
import Footer from './components/footer/footer.jsx';
import LoadingSpinner from './utils/spiner.jsx';
import "./App.css";
//import Counter from './components/counters/index.jsx';

function App() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga

  const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${title}&country=us&show_type=all&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e62397dea2msh462a64157ba5258p1ad146jsn76daf54e422c",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  const handleSearch = async () => {
    try {
      setLoading(true); // Comenzar la carga
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      
      if (data.result.length > 0) {
        setResults(data.result.slice(0, 3)); // Mostrar los primeros 3 resultados
      } else {
        setResults([]); // No se encontraron resultados
      }
  
      setLoading(false); // Finalizar la carga
    } catch (error) {
      console.error(error);
      setLoading(false); // Finalizar la carga en caso de error
    }
  };

  const getServiceIconPath = (serviceName) => {
    // Asigna nombres de servicios a las rutas de las imágenes
    const serviceIcons = {
      netflix: "netflix.png",
      prime: "prime.png",
      apple: "apple.png",
      hulu: "hulu.png",
      hbo: "hbo.png",
      peacock: "peacock.png",
      disney: "disney.png",
      paramount:"paramount.png",
      showtime:"showtime.png"
      // Agrega más servicios aquí
    };
    //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGfyc7_VRUZRD4dPGHn2EWmSc7oxmAUIV5VsGPgrg-RJd0unQTdzTgYE_apnUIlZCaLGo&usqp=CAU

    const defaultIcon = ""; // Icono por defecto si no se encuentra el servicio

    // Verifica si el servicio tiene una imagen asociada, si no, usa el icono por defecto
    return serviceIcons[serviceName] ? serviceIcons[serviceName] : defaultIcon;
  };

  return (
    <div className="App">
      <div className="header"></div>
      <div className="content-main">
        {/* <Counter></Counter> */}
        <div className="content-form">
        <h1 className="principal-title">Buscador de Streaming</h1>
        <input
          type="text"
          className="principal-input"
          placeholder="Ingrese el título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="ov-btn-grow-skew" onClick={handleSearch}>
          Buscar
        </button>
        </div>
        <div className="separador"></div>
        <div className="content-subform">
          {<div className="content-polices">
            Puedes ver tus series y peliculas favoritas en estos servicios</div>}
          {loading ? ( // Renderizar el spinner si está cargando
            <div className="spinner">
              {<LoadingSpinner/>}
            </div>
          ) : (
            results
              ?.filter((result) => result?.streamingInfo?.us?.length > 0)
              .map((result, index) => (
                <div key={index} className="content-card">
                  <h2 className="tittle">{result.title}</h2>
                  <span className="span-text">Puedes verla en estos servicios</span>
                  <div className="data-movie">
                    {[
                      ...new Set(
                        result?.streamingInfo?.us?.map((item) => item.service)
                      ),
                    ].map((service, index) => (
                      <span key={index} className="item-span">
                        <img
                          src={require(`./assets/icons/${getServiceIconPath(
                            service
                          )}`)}
                          alt={`${service} Icon`}
                          className="service-icon"
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
