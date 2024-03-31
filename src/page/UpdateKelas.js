import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function UpdateKelas() {
    const { id } = useParams(); 
    const [namaKelas, setNamaKelas] = useState("");
    const [namaJurusan, setNamaJurusan] = useState("");
    const [email, setEmail] = useState("");
    const [tingkatKelas, setTingkatKelas] = useState("");
    const [keterangan, setKeterangan] = useState("");

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
              `http://localhost:7000/api/data_kelas/${id}`,
              config
            );
            const dataKelas = response.data;
    
            // Mengisi state dengan data yang didapatkan dari API
            setNamaKelas(dataKelas.namaKelas);
            setNamaJurusan(dataKelas.namaJurusan);
            setEmail(dataKelas.email);
            setKeterangan(dataKelas.keterangan);
            setTingkatKelas(dataKelas.tingkatKelas);
          } catch (error) {
            alert("Terjadi kesalahan Sir! " + error);
          }
        };
    
        fetchData();
      }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

    const namaKelasChangeHandler = (event) => {
        setNamaKelas(event.target.value);
    };
    const namaJurusanChangeHandler = (event) => {
        setNamaJurusan(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };
    const keteranganChangeHandler = (event) => {
        setKeterangan(event.target.value);
    };
    const tingkatKelasChangeHandler = (event) => {
        setTingkatKelas(event.target.value);
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
          // Melakukan permintaan PUT ke URL tertentu dengan data guru yang telah diformat
          await axios.put(
            `http://localhost:7000/api/data_kelas/${id}`,
            {
              namaKelas,
              namaJurusan,
              tingkatKelas,
              keterangan,
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
          window.location.href = "/tabelKelas";
        } catch (error) {
          // Jika terjadi kesalahan, tampilkan pesan kesalahan
          alert("Terjadi kesalahan: " + error);
        }
      };
    
      const batal = () => {
        window.location.href = "/tabelKelas/:id";
      };
    
    //   useEffect(() => {
    //     getAllMapel();
    //   }, []);

  return (
    <div className="flex h-screen">
       <div className="w-1/5">
            <Sidebar />
        </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <div className="update-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Update Kelas
          </p>
          <form onSubmit={submitActionHandler}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                <div className="relative mt-3">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                    Nama Kelas
                </label>
                <input
                    type="text"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={namaKelas}
                    onChange={namaKelasChangeHandler}
                    required
                />
                </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Nama Jurusan
                </label>
                <input
                  type="text"
                  id="jurusan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder=""
                  value={namaJurusan}
                  onChange={namaJurusanChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Tingkat Kelas
                </label>
                <input
                  type="tingkatKelas"
                  id="tingkatKelas"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder=""
                  value={tingkatKelas}
                  onChange={tingkatKelasChangeHandler}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Keterangan
                </label>
                <input
                  type="keterangan"
                  id="keterangan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder=""
                  value={keterangan}
                  onChange={keteranganChangeHandler}
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
  );
}

export default UpdateKelas;