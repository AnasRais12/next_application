import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ProductFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleFilter = () => setIsOpen(!isOpen);

  return (
    <div className="container border-r border-t px-3 ml-3 h-fit mt-10  w-fit p-3">
      {/* Mobile Filter Button */}
      <button
        className="md:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={toggleFilter}
      >
        <FaFilter /> 
      </button>
      
      {/* Sidebar Filter (Desktop) */}
      <div className="hidden md:block  p-2 ">
        <FilterOptions />
      </div>

      {/* Mobile Filter Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-3/4 bg-white p-4 shadow-lg h-full">
            <button
              className="mb-4 flex items-center gap-2 text-red-600"
              onClick={toggleFilter}
            >
              <IoClose size={24} /> Close
            </button>
            <FilterOptions />
          </div>
        </div>
      )}
    </div>
  );
};

const FilterOptions = () => (
  <div>
    <h2 className="text-lg font-bold mb-3">Filters</h2>
    {/* Price Range */}
    <div className="mb-4">
      <label className="font-semibold">Price Range</label>
      <select className="w-full border p-2 rounded mt-1">
        <option>Under ₹500</option>
        <option>₹500 - ₹1000</option>
        <option>₹1000 - ₹5000</option>
        <option>Above ₹5000</option>
      </select>
    </div>

    {/* Brand Filter */}
    <div className="mb-4">
      <label className="font-semibold">Brand</label>
      <div className="flex flex-col mt-1">
        <label><input type="checkbox" className="mr-2" /> Nike</label>
        <label><input type="checkbox" className="mr-2" /> Adidas</label>
        <label><input type="checkbox" className="mr-2" /> Apple</label>
      </div>
    </div>

    {/* Rating Filter */}
    <div className="mb-4">
      <label className="font-semibold">Rating</label>
      <div className="flex flex-col mt-1">
        <label><input type="radio" name="rating" className="mr-2" /> 4 Stars & Up</label>
        <label><input type="radio" name="rating" className="mr-2" /> 3 Stars & Up</label>
        <label><input type="radio" name="rating" className="mr-2" /> 2 Stars & Up</label>
        <label><input type="radio" name="rating" className="mr-2" /> 1 Star & Up</label>
      </div>
    </div>
  </div>
);

export default ProductFilter;
