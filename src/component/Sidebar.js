import React from 'react';
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaSchool, FaBook, FaSignInAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Sidebar = () => {

  function logout() {
    localStorage.removeItem("token");
  }

  // const logout = () => {
  //   Swal.fire({
  //       title: 'Apa anda yakin?',
  //       text: 'Anda akan logout!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yaa!'
  //   }).then((result) => {
  //       if (result.isConfirmed) {
  //           localStorage.clear();
  //           window.location.href = "/login";
  //       }
  //   });
  // };

  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-900 dark:bg-gray-800" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <a href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/tabelGuru" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaChalkboardTeacher className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="flex-1 ms-3 whitespace-nowrap">Guru</span>
            </a>
          </li>
          <li>
            <a href="/tabelSiswa" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaUserGraduate className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="flex-1 ms-3 whitespace-nowrap">Siswa</span>
            </a>
          </li>
          <li>
            <a href="/tabelKelas" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaSchool className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="flex-1 ms-3 whitespace-nowrap">Kelas</span>
            </a>
          </li>
          <li>
            <a href="/tabelMapel" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaBook className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="flex-1 ms-3 whitespace-nowrap">Mapel</span>
            </a>
          </li>
          <li>
            <a href="/login" onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaSignInAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Sign In
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;