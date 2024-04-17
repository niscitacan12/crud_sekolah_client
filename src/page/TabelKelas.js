import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import { FaPenSquare, FaTrashAlt, FaPlus, FaSearch, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function TabelKelas() {
  const [kelas, setKelas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getAllDatakelas = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:7000/api/data_kelas/all`
      );
      const data = response.data;

      setKelas(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteKelas = async (id) => {
    const token = localStorage.getItem("token");

    await Swal.fire({
      title: "Anda yakin?",
      text: "Yakin ingin menghapus data Kelas ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`
          http://localhost:7000/api/data_kelas/hapus/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Berhasil Menghapus!!",
              showConfirmButton: false,
              timer: 1500,
            });
            getAllDatakelas(); 
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  useEffect(() => {
    getAllDatakelas();
  }, []);

  // Search 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };
  
  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kelas.filter((dataKelas) =>
    dataKelas.nama_kelas.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(kelas.length / itemsPerPage)) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-300">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto container p-8">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
              <h1 className="judul text-3xl font-semibold">Data Kelas</h1>
              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  <FaSearch className="mr-2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Cari kelas..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex items-center -space-x-4 hover:space-x-1">
                <Link to={`/tabelKelas/tambahKelas`}>
                  <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                  >
                    <FaPlus className="z-20" title="Plus" />
                  </button>
                  </Link>
              </div>
          </div>
          <div className="relative overflow-x-auto mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Jurusan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tingkat Kelas
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Keterangan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems
                  .filter((dataKelas) =>
                    dataKelas.nama_kelas
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((dataKelas, index) => ( 
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                     {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4">{dataKelas.nama_kelas}</td>
                    <td className="px-6 py-4">{dataKelas.nama_jurusan}</td>
                    <td className="px-6 py-4">{dataKelas.tingkat_kelas}</td>
                    <td className="px-6 py-4">{dataKelas.keterangan}</td>
                    <td className="whitespace-nowrap text-center py-2">
                      <div className="flex items-center -space-x-4 hover:space-x-1">
                        <Link to={`/tabelKelas/ubahKelas/${dataKelas.id}`}>
                          <button className="z-20 block rounded-full border-2 border-white bg-blue-100 p-4 text-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-blue-50"
                          >
                              <FaPenSquare className="z-20" title="Edit" />
                          </button>
                        </Link>
                        <button className="z-30 block rounded-full border-2 border-white bg-red-100 p-4 text-red-700 transition-all hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                        onClick={() => deleteKelas(dataKelas.id)}
                        >
                            <FaTrashAlt className="z-30" title="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 mr-2 rounded-md bg-blue-500 text-white ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaAngleLeft className="inline-block" />
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(kelas.length / itemsPerPage)}
                className={`px-3 py-1 rounded-md bg-blue-500 text-white ${
                  currentPage === Math.ceil(kelas.length / itemsPerPage) ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaAngleRight className="inline-block" />
              </button>
            </div>
            <div>
              <p className="text-gray-600 text-sm">
                Page {currentPage} of {Math.ceil(kelas.length / itemsPerPage)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabelKelas;
