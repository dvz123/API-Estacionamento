import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const ReadProprietario = () => {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8081/proprietario/" + id)
            .then(res => {
                console.log(res);
                setProprietario(res.data);
            }).catch(err => console.log(err))
    }, []);
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Detalhes do Proprietário</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Data Cadastro</th>
                                <th>Data Alteração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{proprietario.id_proprietario}</td>
                                <td>{proprietario.nome} </td>
                                <td>{proprietario.cpf} </td>
                                <td>{new
                                    Date(proprietario.createdAt).toLocaleDateString()}</td>
                                <td>{new
                                    Date(proprietario.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ReadProprietario;