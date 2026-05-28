import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListVeiculo = () => {
    const [veiculos, setVeiculos] = useState([]);

    //Listar Veículos
    useEffect(() => {
        const fetchAllVeiculos = async () => {
            try {
                const res = await axios.get("http://localhost:8081/veiculo");
                setVeiculos(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllVeiculos();
    }, []);

    //Deletar Veículo
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/veiculo/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Listando Veículos</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <p><Link to="/addVeiculo" className="btn btn-success">Adicionar novo Veículo</Link></p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Placa</th>
                                <th>Ano</th>
                                <th>Mensalidade</th>
                                <th>ID Proprietário</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculos.map((veiculo) => {
                                return (
                                    <tr key={veiculo.id_veiculo}>
                                        <td>{veiculo.id_veiculo}</td>
                                        <td>{veiculo.placa}</td>
                                        <td>{veiculo.ano}</td>
                                        <td>R$ {veiculo.mensalidade}</td>
                                        <td>{veiculo.fk_proprietario}</td>
                                        <td>{new Date(veiculo.createdAt).toLocaleDateString()}</td>
                                        <td>{new Date(veiculo.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/readVeiculo/${veiculo.id_veiculo}`}
                                                className="btn btn-success mx2">Ler</Link>
                                            <Link
                                                to={`/updateVeiculo/${veiculo.id_veiculo}`}
                                                className="btn btn-info mx2">Editar</Link>
                                            <button
                                                onClick={() => handleDelete(veiculo.id_veiculo)}
                                                className="btn btn-danger">Deletar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListVeiculo;
