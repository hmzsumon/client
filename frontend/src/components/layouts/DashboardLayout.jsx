import { useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../header/Sidebar';

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='px-4 bg-gray-200 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
