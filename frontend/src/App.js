import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProprietario from
  './components/Proprietario/ListProprietario';
import AddProprietario from './components/Proprietario/AddProprietario';
import ReadProprietario from
  './components/Proprietario/ReadProprietario';
import UpdateProprietario from
  './components/Proprietario/UpdateProprietario';
import ListVeiculo from './components/Veiculo/ListVeiculo';
import AddVeiculo from './components/Veiculo/AddVeiculo';
import ReadVeiculo from './components/Veiculo/ReadVeiculo';
import UpdateVeiculo from './components/Veiculo/UpdateVeiculo';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/proprietario" element={<ListProprietario />} />
            <Route path="/addProprietario" element={<AddProprietario />} />
            <Route path="/readProprietario/:id"
              element={<ReadProprietario />} />
            <Route path="/updateProprietario/:id"
              element={<UpdateProprietario />} />
            <Route path="/veiculo" element={<ListVeiculo />} />
            <Route path="/addVeiculo" element={<AddVeiculo />} />
            <Route path="/readVeiculo/:id"
              element={<ReadVeiculo />} />
            <Route path="/updateVeiculo/:id"
              element={<UpdateVeiculo />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;