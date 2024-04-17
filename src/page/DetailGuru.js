import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

function DetailGuru() {
    const { id } = useParams(); 
    const [nama_guru, setNama_guru] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [email, setEmail] = useState("");
    const [jenis_kelamin, setJenis_kelamin] = useState("");
    const [mapel, setMapel] = useState("");

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
              `http://localhost:7000/api/data_guru/${id}`,
              config
            );
            const dataGuru = response.data;
    
            // Mengisi state dengan data yang didapatkan dari API
            setNama_guru(dataGuru.nama_guru);
            setJabatan(dataGuru.jabatan);
            setMapel(dataGuru.mapelModel.nama_mapel); 
            setEmail(dataGuru.email);
            setJenis_kelamin(dataGuru.jenis_kelamin);
          } catch (error) {
            alert("Terjadi kesalahan Sir! " + error);
          }
        };
    
        fetchData();
    }, [id]); 

    const batal = () => {
        window.location.href = "/tabelGuru";
    };

  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-300">
        <div className="w-1/5">
            <Sidebar />
        </div>
      <div className="mx-auto min-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen max-h-screen p-4 sm:ml-64">
        <div className="grid md:grid-cols-2 gap-3">
          <section className="bg-white p-8 shadow-md rounded-md">
            <h1 className="text-xl font-semibold text-gray-900 mb-8 text-center">
              Informasi Detail Guru
            </h1>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Nama Guru :
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {nama_guru}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Jabatan :
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {jabatan}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Mapel :
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {mapel}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Email :
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {email}
              </p>
            </div>
            <div className="grid grid-cols-5 mb-4 ml-4">
              <label className="block text-sm font-medium text-gray-700 pr-2 col-span-2 text-left">
                Jenis Kelamin :
              </label>
              <p className="col-span-3 text-md font-bold text-gray-900 ml-3">
                {jenis_kelamin}
              </p>
            </div>
            {/* Tombol kembali menggunakan Link */}
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={batal}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-black outline outline-red-500 text-sm sm:text-xs font-medium bg-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default DetailGuru