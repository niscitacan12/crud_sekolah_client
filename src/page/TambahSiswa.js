import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function TambahSiswa() {
    const [nama_siswa, setNama_siswa] = useState("");
    const [nisn, setNisn] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tanggal_lahir, setTanggal_lahir] = useState("");
    const [selectedKelas, setSelectedKelas] = useState("");
    const [kelas, setKelas] = useState([]);

    const addSiswa = async (e) => {
        e.preventDefault();
    
        const newSiswa = {
          nama_siswa,
          kelasModel: selectedKelas,
          nisn,
          alamat,
          tanggal_lahir,
        };
    
        // Mendapatkan token dari local storage
        const token = localStorage.getItem("token");
    
        try {
          // Menambahkan header Authorization dengan token ke dalam permintaan
          const response = await axios.post(
            `http://localhost:7000/api/data_siswa/add`,
            newSiswa,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil menambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/tabelSiswa";
          }, 1500);
        } catch (error) {
          console.error("Error adding siswa:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Terjadi Kesalahan!",
            text: "Mohon coba lagi",
            showConfirmButton: false,
            timer: 1500,
          });
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
    
            setKelas(response.data);
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
                <div className="add-siswa mt-12 bg-white p-5 rounded-xl shadow-lg">
                    <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                        Tambah Siswa
                    </p>
                    <form onSubmit={addSiswa}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Nama Siswa
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={nama_siswa}
                                    onChange={(e) => setNama_siswa(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    NISN
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={nisn}
                                    onChange={(e) => setNisn(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Alamat
                                </label>
                                <input
                                    autoComplete="off"
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Tanggal Lahir
                                </label>
                                <input
                                    autoComplete="off"
                                    type="date"
                                    id="tanggalLahir"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={tanggal_lahir}
                                    onChange={(e) => setTanggal_lahir(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Kelas
                                </label>
                                <select
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="kelas"
                                    name="kelas"
                                    value={selectedKelas ? selectedKelas.id : ""}
                                    onChange={(e) =>
                                        setSelectedKelas({
                                        id: e.target.value,
                                        nama_kelas: e.target.options[e.target.selectedIndex].text,
                                        })
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Kelas
                                    </option>
                                    {kelas.map((kelasItem) => (
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

export default TambahSiswa;