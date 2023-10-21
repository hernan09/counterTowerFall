import React, { useState, useEffect } from "react";
import { Fade } from "react-reveal"; // Importa la animación Fade
import Footer from './components/footer/footer.jsx';
import LoadingSpinner from './utils/spiner.jsx';
import { InView } from 'react-intersection-observer';
import "./App.css";
//import Counter from './components/counters/index.jsx';

function App() {
  const [title, setTitle] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [letterFlag, setLetterFlag] = useState(true); // Estado de carga
  const [classCard, setClassCard] = useState('hidden');

  const url = `https://streaming-availability.p.rapidapi.com/search/title?title=${title}&country=us&show_type=all&output_language=en`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e62397dea2msh462a64157ba5258p1ad146jsn76daf54e422c",
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  useEffect(() => {
    handleAnimation();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true); // Comenzar la carga
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);

      if (data.result.length > 0) {
        setResults(data.result.slice(0, 6)); // Mostrar los primeros 3 resultados
      } else if (data.result.length === 0) {
        setResults([]);
        setLetterFlag(true);
      } else {
        setResults([]); // No se encontraron resultados
        setLetterFlag(true);
      }

      setLoading(false); // Finalizar la carga
      setLetterFlag(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setLetterFlag(true); // Finalizar la carga en caso de error
    }
  };

  const handleAnimation = () => {
    if (document.documentElement.scrollTop > 10) {
      console.log('el scroll', document.documentElement.scrollTop);
      setClassCard('visible');
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
      paramount: "paramount.png",
      showtime: "showtime.png"
      // Agrega más servicios aquí
    };

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
            Puedes ver tus series y películulas favoritas en estos servicios</div>}
          {loading && letterFlag ? ( // Renderizar el spinner si está cargando
            <div className="spinner">
              {<LoadingSpinner />}
            </div>
          ) : (
            results
              ?.filter((result) => result?.streamingInfo?.us?.length > 0)
              .map((result, index) => (
                <Fade key={index} duration={1000} delay={index * 200}>
                  <div className={`content-card ${classCard}`}>
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
                    <div className="footer-card"></div>
                  </div>
                </Fade>
              ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
