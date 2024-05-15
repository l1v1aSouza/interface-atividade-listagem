import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Table from 'react-bootstrap/Table';
import AmazonRequests from '../../fetch/AmazonRequests';

function formatDateToBrazilian(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function TabelaAmazon() {
    const [livros, setLivros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); 
    const [pageNumberInput, setPageNumberInput] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listaLivros = await AmazonRequests.listarLivros();
                setLivros(listaLivros);
            } catch (error) {
                console.error('Erro ao buscar animais: ', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setPageNumberInput(currentPage.toString());
    }, [currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLivros = livros.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageInputChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber > 0 && pageNumber <= Math.ceil(livros.length / itemsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            <NavBar />
            <h1>Tabela Amazon</h1>
            {livros.length > 0 ? (
                <>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Data da Venda</th>
                                <th>Nome</th>
                                <th>Edição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentLivros.map((livro) => (
                                <tr key={livro.id_livro} livro={livro}>
                                    <td>{livro.id_livro}</td>
                                    <td>{formatDateToBrazilian(livro.data_venda)}</td>
                                    <td>{livro.nome_produto}</td>
                                    <td>{livro.edicao}</td>
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
                                max={Math.ceil(livros.length / itemsPerPage)}
                                value={pageNumberInput}
                                onChange={(e) => {
                                    setPageNumberInput(e.target.value);
                                    handlePageInputChange(e); 
                                }}
                            />
                            <span> de {Math.ceil(livros.length / itemsPerPage)}</span>
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
                                disabled={currentPage === Math.ceil(livros.length / itemsPerPage)}
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

export default TabelaAmazon;