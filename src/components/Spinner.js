'use client'
import React from 'react'

function CustomSpinner() {
  return (
    <div className="flex items-center justify-center  w-full h-screen">
      <div className="spin w-16 h-16 p-20 rounded-full border-t-4 border-blue-500 border-solid animate-spin text-white">
        hello
      </div>
    </div>
  );
}
export default CustomSpinner