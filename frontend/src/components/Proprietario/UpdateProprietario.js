import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateProprietario() {
    const { id } = useParams();
    const [proprietario, setProprietario] = useState({
        nome: "",
        cpf: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setProprietario((prev) => ({
            ...prev, [e.target.name]:
                e.target.value
        }));
    };
    useEffect(() => {
        axios.get("http://localhost:8081/proprietario/" + id)
            .then(res => {
                console.log(res);
                setProprietario(res.data);
            })
            .catch(err => console.log(err))
    }, [id]);
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/proprietario/${id}`,
                proprietario);
            navigate("/proprietario");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="container">
            <h1>Formulário para Editar o Proprietário</h1>
            <form>
                <div className="mb-3 mt-3">
                    <label className="form-label"> ID:</label>
                    <input type="text" className="form-control" id="id"
                        placeholder="ID"
                        name="id" value={proprietario.id_proprietario}
                        disabled onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label"> Nome</label>
                    <input type="text" className="form-control" id="nome"
                        placeholder="Nome do Proprietário"
                        name="nome" value={proprietario.nome}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label"> CPF</label>
                    <input type="text" className="form-control" id="cpf"
                        placeholder="CPF do Proprietário"
                        name="cpf" value={proprietario.cpf}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">createdAt:</label>
                    <input type="text" className="form-control"
                        id="createdAt" placeholder="Data da criação"
                        name="createdAt" value={new
                            Date(proprietario.createdAt).toLocaleDateString()}
                        onChange={handleChange} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">updatedAt:</label>
                    <input type="text" className="form-control"
                        id="updatedAt" placeholder="Data de Alteração"
                        name="updatedAt" value={new
                            Date(proprietario.updatedAt).toLocaleDateString()}
                        onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={handleClick}>Alterar</button>
            </form>
            <div className='container d-flex justify-content-center' style={{marginTop: '10px'}}>
                <Link to="/proprietario" className="btn btn-secondary">Veja todos os proprietários</Link>
            </div>
        </div>
    )
}
export default UpdateProprietario;