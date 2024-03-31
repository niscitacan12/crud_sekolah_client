import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaArrowLeft, FaSave } from "react-icons/fa"; 

function UpdateGuru() {
    const { id } = useParams(); 
    const [namaGuru, setNamaGuru] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [email, setEmail] = useState("");
    const [jenisKelamin, setJenisKelamin] = useState("");
    const [selectedMapel, setSelectedMapel] = useState(""); 
    const [mapelList, setMapelList] = useState([]); 

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
            setNamaGuru(dataGuru.namaGuru);
            setJabatan(dataGuru.jabatan);
            setEmail(dataGuru.email);
            setJenisKelamin(dataGuru.jenisKelamin);
            setSelectedMapel(dataGuru.mapelModel); 
          } catch (error) {
            alert("Terjadi kesalahan Sir! " + error);
          }
        };
    
        fetchData();
      }, [id]); // Memastikan useEffect dipanggil kembali ketika nilai id berubah

    const namaGuruChangeHandler = (event) => {
    setNamaGuru(event.target.value);
    };
    const jabatanChangeHandler = (event) => {
    setJabatan(event.target.value);
    };
    const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    };
    const jenisKelaminChangeHandler = (event) => {
    setJenisKelamin(event.target.value);
    };

    const mapelChangeHandler = (event) => {
    setSelectedMapel(event.target.value); // Mengubah selectedMapel saat mapel dipilih
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
              namaGuru,
              jabatan,
              email,
              mapelModel: selectedMapel,
              jenisKelamin,
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
          window.location.href = "/tabelGuru";
        } catch (error) {
          // Jika terjadi kesalahan, tampilkan pesan kesalahan
          alert("Terjadi kesalahan: " + error);
        }
      };
    
      const getAllMapel = async () => {
        const token = localStorage.getItem("token");
    
        try {
          const response = await axios.get("http://localhost:7000/api/mapel", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setMapelList(response.data); // Menyimpan daftar mapel
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const batal = () => {
        window.location.href = "/tabelGuru/:id";
      };
    
      useEffect(() => {
        getAllMapel();
      }, []);

  return (
    <div className="flex h-screen">
       <div className="w-1/5">
            <Sidebar />
        </div>
      <div className="content-page max-h-screen container p-8 min-h-screen">
        <div className="update-guru mt-12 bg-white p-5 rounded-xl shadow-lg">
          <p className="text-lg sm:text-xl font-medium mb-4 sm:mb-7">
            Update Guru
          </p>
          <form onSubmit={submitActionHandler}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
                <div className="relative mt-3">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                    Nama Guru
                </label>
                <input
                    type="text"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                    placeholder=""
                    value={namaGuru}
                    onChange={namaGuruChangeHandler}
                    required
                />
                </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Jabatan
                </label>
                <input
                  type="text"
                  id="jabatan"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Jabatan"
                  value={jabatan}
                  onChange={jabatanChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-2">
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  placeholder="Email"
                  value={email}
                  onChange={emailChangeHandler}
                  required
                />
              </div>
              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-900">
                  Mapel
                </label>
                <select
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
                  id="mapel"
                  name="mapel"
                  autoComplete="mapel-name"
                  value={selectedMapel ? selectedMapel.id : ""}
                  onChange={mapelChangeHandler}
                >
                  <option value="" disabled>
                    Pilih Mapel
                  </option>
                  {mapelList.map((mapelItem) => (
                    <option key={mapelItem.id} value={mapelItem.id}>
                      {mapelItem.namaMapel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center mt-2">
              <label className="block mb-1 text-sm font-medium text-gray-900  text-left col-span-2">
                Jenis Kelamin
              </label>
              <div className="relative mt-[-20px]">
                <input
                  autoComplete="off"
                  className="group peer hidden "
                  type="radio"
                  name="shippingOption"
                  value="Laki-Laki"
                  id="Laki"
                  onChange={jenisKelaminChangeHandler}
                />

                <label
                  htmlFor="Laki"
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 cursor-pointer rounded-lg border p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
                  onChange={jenisKelaminChangeHandler}
                />

                <label
                  htmlFor="Perempuan"
                  className=" relative block bg-white overflow-hidden rounded-md border border-gray-200 cursor-pointer rounded-lg p-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
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
  );
}

export default UpdateGuru