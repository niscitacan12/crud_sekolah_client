import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function TambahGuru() {
    const [namaGuru, setNamaGuru] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [email, setEmail] = useState("");
    const [selectedMapel, setSelectedMapel] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [mapel, setMapel] = useState([]);

    const addGuru = async (e) => {
        e.preventDefault();
    
        const newGuru = {
          namaGuru,
          jabatan,
          email,
          mapelModel: selectedMapel,
          jenisKelamin,
        };
    
        // Mendapatkan token dari local storage
        const token = localStorage.getItem("token");
    
        try {
          // Menambahkan header Authorization dengan token ke dalam permintaan
          const response = await axios.post(
            "http://localhost:7000/api/data_guru",
            newGuru,
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
            window.location.href = "/tabelGuru";
          }, 1500);
        } catch (error) {
          console.error("Error adding guru:", error);
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

    const getAllMapel = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("http://localhost:7000/api/data_mapel", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        setMapel(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };
    
    const batal = () => {
    window.location.href = "/tabelGuru";
    };

    useEffect(() => {
        getAllMapel();
    }, []);

  return (
    <div className="flex h-screen">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div class="content-page max-h-screen container p-8 min-h-screen">
                <div className="add-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
                    <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
                        Tambah Guru
                    </p>
                    <form onSubmit={addGuru}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Nama Guru
                                </label>
                                <input
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={namaGuru}
                                    onChange={(e) => setNamaGuru(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Jabatan
                                </label>
                                <input
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={jabatan}
                                    onChange={(e) => setJabatan(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Mapel
                                </label>
                                <select
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={selectedMapel ? selectedMapel.id : ""}
                                    onChange={(e) =>
                                        setSelectedMapel({
                                        id: e.target.value,
                                        namaMapel: e.target.options[e.target.selectedIndex].text,
                                        })
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Pilih Mapel
                                    </option>
                                    {mapel.map((mapelItem) => (
                                        <option key={mapelItem.id} value={mapelItem.id}>
                                        {mapelItem.namaMapel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center mt-2">
                            <label className="block mb-2 text-sm sm:text-xs font-medium text-gray-900  text-left col-span-2">
                                Jenis Kelamin
                            </label>
                            <div className="relative mt-[-20px]">
                                <input
                                autoComplete="off"
                                className="group peer hidden"
                                type="radio"
                                name="shippingOption"
                                value="Laki-Laki"
                                id="Laki"
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                />

                                <label
                                htmlFor="Laki"
                                className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-2 text-sm sm:text-xs font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                <span> Laki-Laki </span>
                                </label>

                                <svg
                                className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </div>
                            <div className="relative mt-[-20px]">
                                <input
                                autoComplete="off"
                                className="group peer hidden"
                                type="radio"
                                name="shippingOption"
                                value="Perempuan"
                                id="Perempuan"
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                />

                                <label
                                htmlFor="Perempuan"
                                className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-2 text-sm sm:text-xs font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                <span> Perempuan </span>
                                </label>

                                <svg
                                className="absolute top-3 right-4 h-5 w-5 text-blue-600 opacity-0 peer-checked:opacity-100"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                                </svg>
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

export default TambahGuru