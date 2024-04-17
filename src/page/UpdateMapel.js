import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function UpdateMapel() {
    const { id } = useParams(); 
    const [nama_mapel, setNama_mapel] = useState("");
    const [tahun_ajaran, setTahun_ajaran] = useState("");
    const [tingkat_kelas, setTingkat_kelas] = useState("");
    const [deskripsi, setDeskripsi] = useState("");

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
              `http://localhost:7000/api/data_mapel/mapel/${id}`,
              config
            );
            const dataMapel = response.data;
    
            // Mengisi state dengan data yang didapatkan dari API
            setNama_mapel(dataMapel.nama_mapel);
            setTahun_ajaran(dataMapel.tahun_ajaran);
            setTingkat_kelas(dataMapel.tingkat_kelas);
            setDeskripsi(dataMapel.deskripsi);
          } catch (error) {
            alert("Terjadi kesalahan Sir! " + error);
          }
        };
    
        fetchData();
    }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

    const nama_mapelChangeHandler = (event) => {
        setNama_mapel(event.target.value);
    };
    const tahun_ajaranChangeHandler = (event) => {
        setTahun_ajaran(event.target.value);
    };
    const tingkat_kelasChangeHandler = (event) => {
        setTingkat_kelas(event.target.value);
    };
    const deskripsiChangeHandler = (event) => {
        setDeskripsi(event.target.value);
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
            `http://localhost:7000/api/data_mapel/${id}`,
            {
              nama_mapel,
              tahun_ajaran,
              tingkat_kelas,
              deskripsi,
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
          window.location.href = "/tabelMapel";
        } catch (error) {
          // Jika terjadi kesalahan, tampilkan pesan kesalahan
          alert("Terjadi kesalahan: " + error);
        }
      };
    
      const batal = () => {
        window.location.href = "/tabelMapel";
      };

  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-300">
      <div className="w-1/5">
          <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto container p-8">
        <div className="content-page max-h-screen container p-8 min-h-screen">
          <div className="update-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
            <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
              Update Mapel
            </p>
            <form onSubmit={submitActionHandler}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                  <div className="relative mt-3">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                      Nama Mapel
                  </label>
                  <input
                      type="text"
                      id="name"
                      autoComplete="off"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                      placeholder=""
                      value={nama_mapel}
                      onChange={nama_mapelChangeHandler}
                      required
                  />
                  </div>
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Tahun Ajaran
                  </label>
                  <input
                    type="text"
                    id="jurusan"
                    autoComplete="off"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={tahun_ajaran}
                    onChange={tahun_ajaranChangeHandler}
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
                    type="text"
                    id="tingkat_kelas"
                    autoComplete="off"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={tingkat_kelas}
                    onChange={tingkat_kelasChangeHandler}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-900">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    id="deskripsi"
                    autoComplete="off"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={deskripsi}
                    onChange={deskripsiChangeHandler}
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
  );
}

export default UpdateMapel;