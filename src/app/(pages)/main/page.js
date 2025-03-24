'use client';
import React from 'react';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen mt-20">
      {/* Sidebar */}
      <div
        className={`bg-[red] w-64 p-4 shadow-lg fixed left-0 top-4 transform ${
          sidebarOpen ? 'translate-x-0' : ''
        } transition-transform md:fixed `}
      >
        <h2 className="text-lg font-semibold">Albert Flores</h2>
        <p className="text-gray-500">Senior Product Designer</p>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">Profile Visitors: 140</p>
          <p className="text-gray-600">Resume Viewers: 20</p>
          <p className="text-gray-600">My Jobs: 88</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <IoClose size={24} /> : <FaBars size={24} />}
          </button>
          <h1 className="text-xl font-bold">Find Jobs</h1>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
            Resume Builder
          </button>
        </nav>

        {/* Job Listings */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white shadow-lg p-4 rounded-lg">
              <h3 className="font-bold text-lg">UI/UX Designer</h3>
              <p className="text-gray-500">Texas, USA (Remote)</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
