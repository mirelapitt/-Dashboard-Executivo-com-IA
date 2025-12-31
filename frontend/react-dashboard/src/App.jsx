import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/financeiro")
      .then((response) => {
        setDados(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: 20 }}>Carregando dados do backend...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Dashboard Executivo 🚀
      </h1>
    </div>
  )
}
export default App;

