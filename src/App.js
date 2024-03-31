import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './component/Dashboard';
import TabelSiswa from './page/TabelSiswa';
import TabelGuru from './page/TabelGuru';
import TabelKelas from './page/TabelKelas';
import TabelMapel from './page/TabelMapel';
import TambahGuru from './page/TambahGuru';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/tabelSiswa" element={<TabelSiswa />}></Route>
          <Route path="/tabelGuru" element={<TabelGuru />}></Route>
          <Route path="/tabelKelas" element={<TabelKelas />}></Route>
          <Route path="/tabelMapel" element={<TabelMapel />}></Route>
          <Route path="/tambahGuru" element={<TambahGuru />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
