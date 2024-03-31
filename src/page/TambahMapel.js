import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa";

function TambahMapel() {
    const [namaMapel, setNamaMapel] = useState("");
    const [tahunAjaran, setTahunAjaran] = useState("");
    const [tingkatKelas, setTingkatKelas] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

    const addMapel = async (e) => {
        e.preventDefault();
    
        const newMapel = {
            namaMapel,
            tahunAjaran,
            tingkatKelas,
            deskripsi,
        };
    
        // Mendapatkan token dari local storage
        const token = localStorage.getItem("token");
    
        try {
          // Menambahkan header Authorization dengan token ke dalam permintaan
          const response = await axios.post(
            "http://localhost:7000/api/data_mapel",
            newMapel,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil ditambahkan",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/tabelMapel";
          }, 1500);
        } catch (error) {
          console.error("Error adding mapel:", error);
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

    const batal = () => {
    window.location.href = "/tabelMapel";
    };
    
    //   useEffect(() => {
    //     getAllMapel();
    //   }, []);

  return (
    <div className="flex h-screen">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div class="content-page max-h-screen container p-8 min-h-screen">
                <div className="add-mapel mt-12 bg-white p-5 rounded-xl shadow-lg">
                    <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                        Tambah Mapel
                    </p>
                    <form onSubmit={addMapel}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Nama Mapel
                                </label>
                                <input
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={namaMapel}
                                    onChange={(e) => setNamaMapel(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Tahun Ajaran
                                </label>
                                <input
                                    type="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={tahunAjaran}
                                    onChange={(e) => setTahunAjaran(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Tingkat Kelas
                                </label>
                                <input
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={tingkatKelas}
                                    onChange={(e) => setTingkatKelas(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Deskripsi
                                </label>
                                <input
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    required
                                />
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
  )
}

export default TambahMapel