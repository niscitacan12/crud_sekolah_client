import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios'; 
import Swal from 'sweetalert2';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState(); 
    const [role, setRole] = useState("admin");
    const [errorMessage, setErrorMessage] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username.trim() === "" || password.trim() === "") {
          setErrorMessage("Username dan password harus diisi.");
          return;
        }
    
        if (
          password.length < 8 ||
          !/[A-Z]/.test(password) ||
          !/[a-z]/.test(password)
        ) {
          Swal.fire({
            icon: "error",
            title:
              "Password harus memiliki minimal 8 karakter, satu huruf besar, dan satu huruf kecil.",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
    
        try {
          const response = await axios.post(`http://localhost:7000/login`, {
            username,
            password,
            role,
          });
    
          if (response.data === "Username already taken") {
            Swal.fire({
              icon: "error",
              title: "Username sudah terdaftar. Pilih username lain.",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            setShow(false);
            Swal.fire({
              icon: "success",
              title: "Berhasil Login",
              showConfirmButton: false,
              timer: 1500,
            });
            // Redirecting user to login page
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1500);
          }
        } catch (error) {
          console.error("Error during registration:", error);
          setShow(false);
          Swal.fire({
            icon: "error",
            title: "Terjadi kesalahan saat mendaftar. Coba lagi nanti.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://static.vecteezy.com/system/resources/thumbnails/007/033/146/small/profile-icon-login-head-icon-vector.jpg" alt="Logo" />
          Login    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} method='POST'>
              <div className="relative">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <FaUser className="w-4 h-4 mr-2" />
                    Username
                  </div>
                  <input type="text" 
                    name="username" 
                    id="username" 
                    className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="" 
                    autoComplete="off" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </label>
              </div>
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <FaLock className="w-4 h-4 mr-2" />
                    Password
                  </div>
                  <input type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    id="password"
                    className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder=""  
                    autoComplete="off" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="show-password" 
                      type="checkbox" 
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                      onChange={togglePasswordVisibility}
                      required 
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="show-password" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;