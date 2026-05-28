import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddVeiculo = () => {
    const [veiculo, setVeiculo] = useState({
        placa: "",
        ano: "",
        mensalidade: "",
        fk_proprietario: ""
    });
    const [proprietarios, setProprietarios] = useState([]);
    const navigate = useNavigate();

    //Carregar proprietários
    useEffect(() => {
        const fetchProprietarios = async () => {
            try {
                const res = await axios.get("http://localhost:8081/proprietario");
                setProprietarios(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProprietarios();
    }, []);

    const handleChange = (e) => {
        setVeiculo((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8081/veiculo", veiculo);
            navigate("/veiculo");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3'>Adicionando Veículo</h2>
            <div className='row'>
                <div className='col-md-12'>
                    <form>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Placa:</label>
                            <input type="text" className="form-control" id="placa"
                                placeholder="Digite a placa do veículo" name="placa"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Ano:</label>
                            <input type="number" className="form-control" id="ano"
                                placeholder="Digite o ano do veículo" name="ano"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Mensalidade:</label>
                            <input type="number" step="0.01" className="form-control" id="mensalidade"
                                placeholder="Digite a mensalidade" name="mensalidade"
                                onChange={handleChange} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Proprietário:</label>
                            <select className="form-control" name="fk_proprietario" onChange={handleChange}>
                                <option value="">Selecione um proprietário</option>
                                {proprietarios.map((prop) => (
                                    <option key={prop.id_proprietario} value={prop.id_proprietario}>
                                        {prop.nome} - CPF: {prop.cpf}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary"
                            onClick={handleClick}>Cadastrar</button>
                        <br />
                        <Link to="/veiculo" className="btn btn-secondary" style={{marginTop: '10px'}}>Listar Veículos</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddVeiculo;
