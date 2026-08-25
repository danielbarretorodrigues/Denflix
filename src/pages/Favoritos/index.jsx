import { useEffect, useState } from 'react';
import './favoritos.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect (()=>{

        const minhaLista = localStorage.getItem("@denflix");
        setFilmes(JSON.parse(minhaLista) || [])

    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((filme) =>{
            return (filme.id !== id)
        } )

        setFilmes(filtroFilmes);
        localStorage.setItem('@denflix', JSON.stringify(filtroFilmes))
        toast.success("Filme excluído com sucesso.");
    }

    return(
        <div className='minha-lista'>
            <h1>Minha lista</h1>

            {filmes.length === 0 && <h3>Você não possui filmes salvos :/</h3>}

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`} >Ver detalhes</Link>
                                <button className="botao-excluir" onClick={() => excluirFilme(filme.id)}>
                                    x
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default Favoritos;