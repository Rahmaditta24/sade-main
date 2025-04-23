import React, { useState } from "react";
import ImgAsrama from "../../components/ImgAsrama";
import logo from "../../assets/logo.png";
import { useForm,usePage  } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { props } = usePage();
  const [role, setRole] = useState(props.role || 'admin');
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const route = role === 'admin' ? '/login/admin' : '/login/penghuni';
    post(route);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ImgAsrama />
      <div className="mx-5 mt-5">
        {/* Logo */}
        <img src={logo} alt="logo" className="w-14 h-14" />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Tab navigasi */}
          <div className="flex mb-8">
            <button
              className={`w-1/2 py-2 ${role === 'admin' ? 'bg-indigo-700 text-white' : 'bg-white text-indigo-700'} font-medium rounded-md`}
              onClick={() => setRole('admin')}
            >
              Admin
            </button>
            <button
              className={`w-1/2 py-2 ${role === 'penghuni' ? 'bg-indigo-700 text-white' : 'bg-white text-indigo-700'} font-medium rounded-md`}
              onClick={() => setRole('penghuni')}
            >
              Penghuni
            </button>
          </div>

          {/* Judul dan deskripsi */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Login {role === 'admin' ? 'Admin' : 'Penghuni'} Ekasari
            </h1>
            <p className="text-gray-600">
              Silahkan Isi Data Dibawah Ini Untuk Login Sebagai Admin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                placeholder="abcd@gmail.com"
                className="w-full px-4 py-2 rounded-2xl border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              />
              {errors.email && <div className="text-red-500 text-sm mb-2">{errors.email}</div>}

              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={data.password}
                  onChange={(e) => setData("password", e.target.value)}
                  placeholder="password"
                  className="w-full px-4 py-2 rounded-2xl border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2/6 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <div className="text-red-500 text-sm mb-4">{errors.password}</div>}

              <button
                type="submit"
                disabled={processing}
                className="w-full py-2 bg-indigo-700 text-white font-medium rounded-xl disabled:opacity-50"
              >
                {processing ? "Memproses..." : "Login Akun"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
