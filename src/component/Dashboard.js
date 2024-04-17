import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";

const Dashboard = () => {
  const [siswa, setSiswa] = useState([]);
  const [guru, setGuru] = useState([]);

  const getAllDataSiswa = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:7000/api/data_siswa/all`
      );

      setSiswa(response.data.slice(0, 5)); // Hanya mengambil 5 data pertama
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllDataGuru = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:7000/api/data_guru/all`
      );

      setGuru(response.data.slice(0,5));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllDataSiswa();
    getAllDataGuru();
  }, []);

  return (
    <div className="flex h-screen bg-gray-300 dark:bg-gray-300">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="flex-1 max-h-screen overflow-y-auto container p-8">
        <div className="bg-white shadow-md rounded-lg p-4  bg-gray-200 dark:bg-gray-200 mb-8">
          <h1 className="judul text-3xl font-semibold">Data Siswa</h1>
          <div className="relative overflow-x-auto mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Siswa
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NISN
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Kelas
                  </th>
                </tr>
              </thead>
              <tbody>
                {siswa.map((dataSiswa, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {dataSiswa.nama_siswa}
                    </td>
                    <td className="px-6 py-4">{dataSiswa.nisn}</td>
                    <td className="px-6 py-4">
                      {dataSiswa.kelasModel
                        ? dataSiswa.kelasModel.nama_kelas
                        : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4  bg-gray-200 dark:bg-gray-200">
          <h1 className="judul text-3xl font-semibold">Data Guru</h1>
          <div className="relative overflow-y-auto mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nama Guru
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jabatan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mapel
                  </th>
                </tr>
              </thead>
              <tbody>
                {guru.map((dataGuru, index) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={index}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {dataGuru.nama_guru}
                    </td>
                    <td className="px-6 py-4">
                      {dataGuru.jabatan}
                    </td>
                    <td className="px-6 py-4">
                      {dataGuru.mapelModel.nama_mapel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;