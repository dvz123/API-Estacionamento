import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateVeiculo() {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get("http://localhost:8081/veiculo/" + id)
            .then(res => {
                console.log(res);
                setVeiculo(res.data);
            })
            .catch(err => console.log(err))
    }, [id]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/veiculo/${id}`, veiculo);
            navigate("/veiculo");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1>Formulário para Editar o Veículo</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label">ID:</label>
                    <input type="text" className="form-control" id="id"
                        placeholder="ID"
                        name="id" value={veiculo.id_veiculo}
                        disabled onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Placa:</label>
                    <input type="text" className="form-control" id="placa"
                        placeholder="Placa do veículo"
                        name="placa" value={veiculo.placa}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Ano:</label>
                    <input type="number" className="form-control" id="ano"
                        placeholder="Ano do veículo"
                        name="ano" value={veiculo.ano}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Mensalidade:</label>
                    <input type="number" step="0.01" className="form-control" id="mensalidade"
                        placeholder="Mensalidade"
                        name="mensalidade" value={veiculo.mensalidade}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Proprietário:</label>
                    <select className="form-control" name="fk_proprietario" value={veiculo.fk_proprietario} onChange={handleChange}>
                        <option value="">Selecione um proprietário</option>
                        {proprietarios.map((prop) => (
                            <option key={prop.id_proprietario} value={prop.id_proprietario}>
                                {prop.nome} - CPF: {prop.cpf}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Data Cadastro:</label>
                    <input type="text" className="form-control" id="createdAt"
                        placeholder="Data da criação"
                        name="createdAt" value={new Date(veiculo.createdAt).toLocaleDateString()}
                        disabled onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Data Alteração:</label>
                    <input type="text" className="form-control" id="updatedAt"
                        placeholder="Data de Alteração"
                        name="updatedAt" value={new Date(veiculo.updatedAt).toLocaleDateString()}
                        disabled onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className='container d-flex justify-content-center' style={{marginTop: '10px'}}>
                <Link to="/veiculo" className="btn btn-secondary">Veja todos os veículos</Link>
            </div>
        </div>
    )
}

export default UpdateVeiculo;
