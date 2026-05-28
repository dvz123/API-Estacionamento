import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const ListProprietario = () => {
    const [proprietarios, setProprietarios] = useState([]);
    //Listar Proprietarios
    useEffect(() => {
        const fetchAllProprietarios = async () => {
            try {
                const res = await
                    axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllProprietarios();
    }, []);
    //Deletar Proprietarios
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8081/proprietario/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Listando
                Proprietarios</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <p><Link to="/addProprietario" className="btn btn-success">Adicionar novo Proprietario</Link></p>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proprietarios.map((proprietario) => {
                                return (
                                    <tr>
                                        <td>{proprietario.id_proprietario}</td>
                                        <td>{proprietario.nome} </td>
                                        <td>{proprietario.cpf} </td>
                                        <td>{new
                                            Date(proprietario.createdAt).toLocaleDateString()}</td>
                                        <td>{new
                                            Date(proprietario.updatedAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link
                                                to={`/readProprietario/${proprietario.id_proprietario}`}
                                                className="btn btn-success mx2">Ler</Link>
                                            <Link
                                                to={`/updateProprietario/${proprietario.id_proprietario}`}
                                                className="btn btn-info mx2">Editar</Link>
                                            <button
                                                onClick={() => handleDelete(proprietario.id_proprietario)}
                                                className="btn btn-danger">Deletar</button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ListProprietario;