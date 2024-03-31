import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from "../component/Sidebar";

function TabelMapel() {
    const [mapel, setMapel] = useState([]);

    const getAllMapel = async () => {
        const token = localStorage.getItem("token");
    
        try {
            const response = await axios.get(`http://localhost:7000/api/data_mapel`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMapel(response.data); 
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    useEffect(() => {
        getAllMapel();
    }, []);

  return (
    <div className="flex h-screen">
        <div className="w-1/5">
            <Sidebar />
        </div>
        <div className="flex-1 max-h-screen overflow-y-auto container p-8">
            <div className="bg-white shadow-md rounded-lg p-4">
                <h1 className="judul text-3xl font-semibold">Data Mapel</h1>
                <div className="relative overflow-x-auto mt-4">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mx-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nama Mapel
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tahun Ajaran
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Tingkat Kelas
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Deskripsi
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {mapel.map((dataMapel, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td className="px-6 py-4">
                                        {dataMapel.nama_mapel}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataMapel.tahun_ajaran}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataMapel.tingkat_kelas}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dataMapel.deskripsi}
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
}

export default TabelMapel