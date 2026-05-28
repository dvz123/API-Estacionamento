import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const ReadVeiculo = () => {
    const { id } = useParams();
    const [veiculo, setVeiculo] = useState({});
    const [proprietario, setProprietario] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8081/veiculo/" + id)
            .then(res => {
                console.log(res);
                setVeiculo(res.data);
                //Buscar proprietário também
                return axios.get("http://localhost:8081/proprietario/" + res.data.fk_proprietario);
            })
            .then(res => {
                setProprietario(res.data);
            })
            .catch(err => console.log(err))
    }, [id]);

    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Detalhes do Veículo</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Placa</th>
                                <th>Ano</th>
                                <th>Mensalidade</th>
                                <th>Proprietário</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{veiculo.id_veiculo}</td>
                                <td>{veiculo.placa}</td>
                                <td>{veiculo.ano}</td>
                                <td>R$ {veiculo.mensalidade}</td>
                                <td>{proprietario.nome}</td>
                                <td>{new Date(veiculo.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(veiculo.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to="/veiculo" className="btn btn-secondary">Voltar</Link>
                </div>
            </div>
        </div>
    )
}

export default ReadVeiculo;
