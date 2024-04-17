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
import DetailGuru from './page/DetailGuru';
import DetailSiswa from './page/DetailSiswa';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<Register />}></Route>

          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/tabelSiswa" element={<TabelSiswa />}></Route>

          <Route path="/tabelSiswa/tambahSiswa" element={<TambahSiswa />}></Route>

          <Route path="/tabelSiswa/ubahSiswa/:id" element={<UpdateSiswa />}></Route>
 
          <Route path="/tabelSiswa/detailSiswa/:id" element={<DetailSiswa />}></Route>

          <Route path="/tabelGuru" element={<TabelGuru />}></Route>

          <Route path="/tabelGuru/tambahGuru" element={<TambahGuru />}></Route>

          <Route path="/tabelGuru/ubahGuru/:id" element={<UpdateGuru />}></Route>

          <Route path="/tabelGuru/detailGuru/:id" element={<DetailGuru />}></Route>

          <Route path="/tabelKelas" element={<TabelKelas />}></Route>

          <Route path="/tabelKelas/tambahKelas" element={<TambahKelas />}></Route>

          <Route path="/tabelKelas/ubahKelas/:id" element={<UpdateKelas />}></Route>

          <Route path="/tabelMapel" element={<TabelMapel />}></Route>

          <Route path="/tabelMapel/tambahMapel" element={<TambahMapel />}></Route>

          <Route path="/tabelMapel/ubahMapel/:id" element={<UpdateMapel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
