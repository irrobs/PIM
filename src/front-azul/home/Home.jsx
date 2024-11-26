import { useState } from "react";
import "./style.css";
import fakeData from "../../fake-data.json";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [tipoReciclagem, setTipoReciclagem] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://descartebolados2.vercel.app/api/locaisDescarte")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Data received:", data); // Log the data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle any errors
      });

    if (tipoReciclagem === "") {
      return alert("Escolha uma das opções");
    }

    const locais = fakeData.filter(
      (data) => data.tipo_de_reciclagem === tipoReciclagem
    );

    // Fetch the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const userPosition = { latitude, longitude };

          // Navigate only after fetching the location
          console.log(accuracy);
          navigate("/info", { state: { locais, position: userPosition } });
        },
        (err) => alert(err.message)
      );
    } else {
      alert("Geolocalização não é suportada no seu browser.");
    }
  }

  return (
    <div className="container" onSubmit={handleSubmit}>
      <form className="hemisphere north">
        <h1>BUSCADOR DE DESCARTE</h1>
        <select
          className="search-bar"
          value={tipoReciclagem}
          onChange={(e) => {
            setTipoReciclagem(e.target.value);
          }}
        >
          <option value="">O que você quer reciclar?</option>
          <option value="metal">Metal</option>
          <option value="plastico">Plástico</option>
        </select>

        <button className="button-search">Encontrar locais</button>
      </form>
      <div className="hemisphere south">
        <div className="google-maps-info">
          <img
            src="https://i.pinimg.com/736x/66/1e/98/661e98a8e38f681575da93d0a1c3f4fc.jpg"
            alt="Google Maps"
          />
          <div className="text-and-button">
            <span>Cadastre um novo local de descarte.</span>
            <div className="button-container">
              <button>Novo Local</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
