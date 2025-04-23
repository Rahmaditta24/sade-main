import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, CreditCard, Calendar, Users, LogOut as LogOutIcon } from 'react-feather';

interface User {
  name: string;
  role: 'admin' | 'penghuni';
}

interface PageProps {
  url: string;
  user: User;
  [key: string]: unknown; 
}

const Navbar: React.FC = () => {
  const { props } = usePage<PageProps>();
  const { url, user } = props;

  // Fungsi untuk memeriksa apakah URL aktif
  const isActive = (href: string) => {
    return url === href ? 'bg-indigo-800 font-semibold' : 'hover:bg-indigo-600';
  };

  const navItem = (href: string, icon: React.ReactNode, label: string) => (
    <Link href={href}>
      <div
        className={`px-4 py-3 flex items-center ${isActive(href)}`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
  

  return (
    <div className="w-64 bg-indigo-700 text-white h-screen flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="p-4 flex items-center border-b border-indigo-600">
          <div className="bg-white rounded-full p-1 mr-2">
            <Users className="h-4 w-4 text-indigo-700" />
          </div>
          <span className="font-semibold">{user.name}</span>
        </div>

        {/* Nav */}
        <nav className="mt-4 space-y-1">
          {navItem('/', <Home className="h-5 w-5 mr-3" />, 'Beranda')}
          {user && user.role === 'admin' && (
          <>
            {navItem('/keuangan', <CreditCard className="h-5 w-5 mr-3" />, 'Keuangan')}
            {navItem('/kegiatan', <Calendar className="h-5 w-5 mr-3" />, 'Kegiatan')}
            {navItem('/penghuni', <Users className="h-5 w-5 mr-3" />, 'Penghuni')}
          </>
        )}

        {user && user.role === 'penghuni' && (
          <>
            {navItem('/kegiatan', <Calendar className="h-5 w-5 mr-3" />, 'Kegiatan')}
          </>
        )}
        </nav>
      </div>

      {/* Footer: Logout */}
      <div className="border-t border-indigo-600">
        <Link
          href="/logout"
          method="post"
          as="button"
          type="button"
          className="w-full text-left px-4 py-3 flex items-center text-white hover:bg-indigo-600"
        >
          <LogOutIcon className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
