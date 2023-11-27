import Link from 'next/link';

interface AdminSidebarProps {
  // You can add more props if needed
}

const AdminSidebar: React.FC<AdminSidebarProps> = () => {
  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col pt-20" style={{width: 250}}>
      <h2 className="text-lg font-semibold mb-4 px-4">MENU</h2>
      <nav>
        <ul>
          <li className='hover:bg-gray-700 px-4 py-2'>
            <Link href="/pesan-lapangan">
                Pesan Lapangan
            </Link>
          </li>
          <li className='hover:bg-gray-700 px-4 py-2'>
            <Link href="/riwayat-pesanan">
                Riwayat Pesanan
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
