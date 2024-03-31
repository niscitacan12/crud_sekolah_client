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
import TambahSiswa from './page/TambahSiswa';
import TambahKelas from './page/TambahKelas';
import TambahMapel from './page/TambahMapel';
import UpdateGuru from './page/UpdateGuru';
import UpdateSiswa from './page/UpdateSiswa';
import UpdateKelas from './page/UpdateKelas';
import UpdateMapel from './page/UpdateMapel';

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
          <Route path="/tambahSiswa" element={<TambahSiswa />}></Route>
          <Route path="/tambahKelas" element={<TambahKelas />}></Route>
          <Route path="/tambahMapel" element={<TambahMapel />}></Route>
          <Route path="/ubahGuru" element={<UpdateGuru />}></Route>
          <Route path="/ubahSiswa" element={<UpdateSiswa />}></Route>
          <Route path="/ubahKelas" element={<UpdateKelas />}></Route>
          <Route path="/ubahMapel" element={<UpdateMapel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
