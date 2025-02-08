'use client';
import React from 'react';

function CustomSpinner() {
  return (
    <div className="flex items-center justify-center  w-full h-screen">
      <div className="spin w-10 h-10 p-10 rounded-full border-4 border-orange-500 border-solid animate-pulse text-white">
        hello
      </div>
    </div>
  );
}
export default CustomSpinner;
