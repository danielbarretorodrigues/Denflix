import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './home.css';
//movie/popular?api_key=afaa5b4a7d9f97a3fdeabc4700fbb8e7

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            try {
                const response = await api.get("movie/popular", {
                    params: {
                        api_key: "afaa5b4a7d9f97a3fdeabc4700fbb8e7",
                        language: "pt-BR",
                        page: 1,
                    }
                });

                // Atualiza o estado com os 10 primeiros filmes
                setFilmes(response.data.results.slice(0, 10));
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            } finally {
                // Encerra o estado de carregamento
                setLoading(false);
            }
        }

        loadFilmes();
    }, [setFilmes, setLoading]);

    // Exibe uma mensagem enquanto a requisição à API está em andamento
    if (loading) {
        return (
        <div className="loading">
            <h2>Carregando filmes...</h2>
        </div>
        );
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`} >Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;