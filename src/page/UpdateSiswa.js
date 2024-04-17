import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function UpdateSiswa() {
    const { id } = useParams(); 
    const [nama_siswa, setNama_siswa] = useState("");
    const [nisn, setNisn] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal_lahir, setTanggal_lahir] = useState("");
    const [selectedKelas, setSelectedKelas] = useState(""); 
    const [namaKelasList, setNamaKelasList] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem("token");
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
    
            const response = await axios.get(
              `http://localhost:7000/api/data_siswa/${id}`,
              config
            );
            const dataSiswa = response.data;
    
            // Mengisi state dengan data yang didapatkan dari API
            setNama_siswa(dataSiswa.nama_siswa);
            setNisn(dataSiswa.nisn);
            setTanggal_lahir(dataSiswa.tanggal_lahir);
            setAlamat(dataSiswa.alamat);
            setSelectedKelas(dataSiswa.kelasModel.id);  
          } catch (error) {
            alert("Terjadi kesalahan Sir! " + error);
          }
        };
    
        fetchData();
      }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

    const nama_siswaChangeHandler = (event) => {
        setNama_siswa(event.target.value);
    };
    const nisnChangeHandler = (event) => {
    setNisn(event.target.value);
    };
    const tanggal_lahirChangeHandler = (event) => {
    setTanggal_lahir(event.target.value);
    };
    const alamatChangeHandler = (event) => {
    setAlamat(event.target.value);
    };

    const kelasChangeHandler = (event) => {
    setSelectedKelas(event.target.value); // Mengubah 
    };

    const submitActionHandler = async (event) => {
        event.preventDefault();
    
        const token = localStorage.getItem("token");
    
        // Membuat objek konfigurasi untuk menyertakan token dalam header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Menyertakan token dalam header "Authorization"
          },
        };
    
        try {
          // Melakukan permintaan PUT ke URL tertentu dengan data siswa yang telah diformat
          await axios.put(
            `http://localhost:7000/api/data_siswa/ubah/${id}`,
            {
              nama_siswa,
              nisn,
              kelasModel: { id : selectedKelas },
              alamat,
              tanggal_lahir,
            },
            config // Menyertakan objek konfigurasi yang berisi token autentikasi
          );
    
          // Jika permintaan berhasil, tampilkan pesan sukses dan arahkan kembali ke halaman "/guru"
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Edit Success!!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.href = "/tabelSiswa";
        } catch (error) {
          // Jika terjadi kesalahan, tampilkan pesan kesalahan
          alert("Terjadi kesalahan: " + error);
        }
      };
    
      const getAllKelas = async () => {
        const token = localStorage.getItem("token");
    
        try {
          const response = await axios.get(`http://localhost:7000/api/data_kelas/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setNamaKelasList(response.data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      const batal = () => {
        window.location.href = "/tabelSiswa";
      };
    
      useEffect(() => {
        getAllKelas();
      }, []);

  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-300">
      <div className="w-1/5">
            <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto container p-8">
        <div className="content-page max-h-screen container p-8 min-h-screen">
          <div className="update-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
            <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
              Update Siswa
            </p>
            <form onSubmit={submitActionHandler}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                  <div className="relative mt-3">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                      Nama Siswa
                  </label>
                  <input
                      autoComplete="off"
                      type="text"
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                      placeholder=""
                      value={nama_siswa}
                      onChange={nama_siswaChangeHandler}
                      required
                  />
                  </div>
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    NISN
                  </label>
                  <input
                    autoComplete="off"
                    type="nisn"
                    id="nisn"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={nisn}
                    onChange={nisnChangeHandler}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Alamat
                  </label>
                  <input
                    autoComplete="off"
                    type="alamat"
                    id="alamat"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={alamat}
                    onChange={alamatChangeHandler}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Tanggal Lahir
                  </label>
                  <input
                    autoComplete="off"
                    type="date"
                    id="tanggalLahir"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={tanggal_lahir}
                    onChange={tanggal_lahirChangeHandler}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Kelas
                  </label>
                  <select
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    id="kelas"
                    name="kelas"
                    autoComplete="kelas-name"
                    value={selectedKelas}
                    onChange={kelasChangeHandler}
                  >
                    <option value="" disabled>
                      Pilih Kelas
                    </option>
                    {namaKelasList.map((kelasItem) => (
                      <option key={kelasItem.id} value={kelasItem.id}>
                        {kelasItem.nama_kelas}
                      </option>
                    ))}
                  </select>
                </div>
              </div>            
              <div className="flex justify-between mt-6">
                  <button
                      type="button"
                      onClick={batal}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-red-500 text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                      <FaArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                      type="submit"
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-[#0b409c] text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                      <FaSave className="w-4 h-4" />
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSiswa;