import React, { useState } from 'react';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaBook, FaSignInAlt, FaBars, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  function logout(event) {
    event.preventDefault();

    Swal.fire({
      title: 'Logout',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    });
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden text-gray-500"
        onClick={toggleSidebar}
      >
        {showSidebar ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
      </button>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-900 dark:bg-gray-900 lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT2fcnr4u7eeCNPvjbCrTtQMU22ZSA-aHp9O-cAk-o_g&s" 
              alt="School Logo" 
              className="w-12 h-12 mr-2 rounded-full object-cover" 
              style={{ objectFit: 'cover' }} 
            />
            <span className="text-xl font-bold text-gray-800">Sekolah</span>
          </div>
          <hr className="mt-3" />
          <ul className="space-y-2 font-medium">
            <li>
              <a href="/dashboard" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/tabelGuru" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaChalkboardTeacher className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="flex-1 ms-3 whitespace-nowrap">Guru</span>
              </a>
            </li>
            <li>
              <a href="/tabelSiswa" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaUserGraduate className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="flex-1 ms-3 whitespace-nowrap">Siswa</span>
              </a>
            </li>
            <li>
              <a href="/tabelKelas" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaSchool className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="flex-1 ms-3 whitespace-nowrap">Kelas</span>
              </a>
            </li>
            <li>
              <a href="/tabelMapel" className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaBook className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="flex-1 ms-3 whitespace-nowrap">Mapel</span>
              </a>
            </li>
            <li>
              <a href="/login" onClick={logout} className="flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-700 dark:hover:bg-gray-700 group">
                <FaSignInAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Sign In
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;