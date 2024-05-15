import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Table from 'react-bootstrap/Table';
import NetflixRequests from '../../fetch/NetflixRequests';

function TabelaNetflix() {
    const [filmes, setFilmes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); 
    const [pageNumberInput, setPageNumberInput] = useState(""); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaFilmes = await NetflixRequests.listarFilmes();
                setFilmes(listaFilmes);
            } catch (error) {
                console.error('Erro ao buscar filmes e séries: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setPageNumberInput(currentPage.toString());
    }, [currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filmes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageInputChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber > 0 && pageNumber <= Math.ceil(filmes.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <NavBar />
            <h1>Tabela Netflix</h1>
            {filmes.length > 0 ? (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Tipo</th>
                                <th>Título</th>
                                <th>País</th>
                                <th>Ano de Lançamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((filme) => (
                                <tr key={filme.show_id} filme={filme}>
                                    <td>{filme.show_id}</td>
                                    <td>{filme.tipo}</td>
                                    <td>{filme.titulo}</td>
                                    <td>{filme.pais}</td>
                                    <td>{filme.ano_lancamento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* Componente de paginação */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <input
                                type="number"
                                min="1"
                                max={Math.ceil(filmes.length / itemsPerPage)}
                                value={pageNumberInput}
                                onChange={(e) => {
                                    setPageNumberInput(e.target.value);
                                    handlePageInputChange(e); 
                                }}
                            />
                            <span> de {Math.ceil(filmes.length / itemsPerPage)}</span>
                        </div>
                        <div>
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Anterior
                            </button>
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filmes.length / itemsPerPage)}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Carregando ...</p>
            )}
        </>
    );
}

export default TabelaNetflix;