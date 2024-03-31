import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from "../component/Sidebar";

function TabelKelas() {
    const [kelas, setKelas] = useState([]);

    const getAllKelas = async () => {
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.get(`http://localhost:7000/api/data_kelas`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setKelas(response.data); 
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getAllKelas();
    }, []);

  return (
    <div className="flex h-screen">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h1 className="judul text-3xl font-semibold">Data Kelas</h1>
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
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {kelas.map((dataKelas, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {dataKelas.nama_kelas}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataKelas.nama_jurusan}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataKelas.tingkat_kelas}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TabelKelas