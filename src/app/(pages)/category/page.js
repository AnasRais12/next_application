'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { FaStar, FaSearch, FaTimes } from 'react-icons/fa';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { FaHeart } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import useSession from '@/utils/UserExist/GetSession';
import { useDispatch } from 'react-redux';
import { LiaSlidersHSolid } from 'react-icons/lia';
import { supabase } from '@/lib/supabase';
import { addtoWishList } from '@/app/store/features/wishList/WishList';
import { toast } from 'react-toastify';
import { getWishList } from '@/utils/reduxGlobalStates/ReduxStates';
import Swal from 'sweetalert2';

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    brand: 'SoundMaster',
    rating: 4.5,
    inStock: true,
    image: '/images/clo-1.jpeg',
  },
  {
    id: 2,
    name: 'Ultra HD Smart TV',
    category: 'Electronics',
    price: 799.99,
    brand: 'TechVision',
    rating: 4.8,
    inStock: true,
    image: '/images/gun-2.jpeg',
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    category: 'Fashion',
    price: 129.99,
    brand: 'LuxStyle',
    rating: 4.2,
    inStock: false,
    image: "/images/gun-2.jpeg'",
  },
];

const categories = ['Electronics', 'Fashion', 'Home', 'Sports'];
const brands = ['SoundMaster', 'TechVision', 'LuxStyle', 'SportsPro'];

const ProductFilter = () => {
  const session = useSession();
  const router = useRouter();
  const wishlistItems = getWishList();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    selectedBrand: '',
    minRating: 0,
    showInStock: false,
    searchQuery: '',
  });
  const [loadingItems, setLoadingItems] = useState({}); // Individual loading state
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);
      const matchesPrice =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const matchesBrand =
        !filters.selectedBrand || product.brand === filters.selectedBrand;
      const matchesRating = product.rating >= filters.minRating;
      const matchesStock = !filters.showInStock || product.inStock;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesPrice &&
        matchesBrand &&
        matchesRating &&
        matchesStock &&
        matchesSearch
      );
    });
  }, [filters]);

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceChange = (value, index) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: prev.priceRange.map((v, i) => (i === index ? value : v)),
    }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      selectedBrand: '',
      minRating: 0,
      showInStock: false,
      searchQuery: '',
    });
  };

  const handleShopNow = (id) => {
    try {
      router.push(`/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async (wishListProduct) => {
    console.log(wishListProduct, '-____-');
    if (!session?.user?.id) {
      Swal.fire({
        text: 'Please login to add items to wishlist',
        icon: 'info',
        confirmButtonText: 'Ok',
      });
      return;
    }
    try {
      const userId = session?.user?.id;
      setLoadingItems((prev) => ({
        ...prev,
        [wishListProduct.product_id]: true,
      })); // S
      const { data, error } = await supabase.from('wishlist').insert([
        {
          user_id: userId, // Ensure user is logged in
          product_id: wishListProduct?.id,
          product_name: wishListProduct?.name,
          product_price: wishListProduct?.price,
          product_image: wishListProduct?.image,
          // Optionally, include description or quantity if needed
        },
      ]);

      if (error) {
        console.error('Error saving wishlist item to database:', error);
        toast.error('Failed to save wishlist item');
      } else {
        const productWishlist = {
          product_id: wishListProduct?.product_id,
          image: wishListProduct?.image,
          product_name: wishListProduct?.product_name,
          desc: wishListProduct?.desc,
          product_price: wishListProduct?.product_price,
        };
        dispatch(addtoWishList(productWishlist));
        toast.success('Added to Wishlist');
      }
    } catch (error) {
      toast.warning(error.toString());
    } finally {
      setLoadingItems((prev) => ({
        ...prev,
        [wishListProduct.product_id]: false,
      }));
    }
  };

  return (
    <>
      <div
        className={`mx-auto  ${isFilterVisible ? 'mt-20' : 'mt-6'}    lg:mt-20  sm:px-4 px-2 py-4`}
      >
        {isFilterVisible && (
          <div
            className="fixed lg:hidden inset-0 bg-black opacity-50 z-40"
            onClick={() => setIsFilterVisible(false)}
          ></div>
        )}
        <div className="flex lg:flex-row  flex-col relative  gap-6">
          {/* Filter Sectio */}

          <div
            className={`lg:w-[25%] p-4 rounded-lg shadow-lg transition-all duration-700 ease-in-out 
         ${isFilterVisible ? 'opacity-100 h-[85vh] overflow-y-auto translate-x-0 fixed top-[15%] sm:top-[15%] z-[9999] left-0 w-full md:w-[50%]  bg-white bg-opacity-100 ' : 'opacity-0 max-h-0 -translate-x-full'}
         lg:opacity-100 lg:max-h-fit lg:translate-x-0`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 lg:block hidden hover:text-blue-800"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="text-[25px] text-blue-600 lg:hidden block hover:text-blue-800"
              >
                <RxCross2 />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-lg pl-10"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchQuery: e.target.value,
                    }))
                  }
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Categories</h3>
              {categories.map((category) => (
                <div key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={category}
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Brands</h3>
              <select
                value={filters.selectedBrand}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    selectedBrand: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Minimum Rating</h3>
              <div className="flex flex-wrap ">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, minRating: rating }))
                    }
                    className={`p-2 ${filters.minRating === rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Availability</h3>
              <button
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    showInStock: !prev.showInStock,
                  }))
                }
                className="flex items-center gap-2"
              >
                {filters.showInStock ? (
                  <BsToggleOn size={24} className="text-blue-600" />
                ) : (
                  <BsToggleOff size={24} />
                )}
                <span>Show only in stock</span>
              </button>
            </div>

            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 lg:hidden block hover:text-blue-800"
            >
              Clear All
            </button>
          </div>
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="text-[35px]  lg:hidden block"
          >
            <LiaSlidersHSolid />
          </button>
          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white hover:border-b-2 hover:duration-300 hover:shadow-lg shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      onClick={() => handleShopNow(product?.id)}
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1560393464-5c69a73c5770';
                      }}
                    />
                    <div className=" cursor-pointer flex flex-col   p-4">
                      <div className="flex justify-between border-b-2 mb-2  items-center">
                        <h3 className="font-semibold text-lg mb-2">
                          {product.name.length > 20
                            ? product.name.slice(0, 20) + '...'
                            : product.name}
                        </h3>
                        <button
                          onClick={() => handleAddToWishlist(product)}
                          // disabled={isInWishlist}
                          className="text-[25px] text-gray-300 hover:text-orange-500"
                        >
                          <FaHeart />
                          {/* {loadingItems[items.product_id] ? <CSpinner /> : } */}
                        </button>
                      </div>
                      <div
                        onClick={() => handleShopNow(product?.id)}
                        className="flex justify-between items-center mb-2"
                      >
                        <span className="text-blue-600 font-bold">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-500 mr-1" />
                          <span>{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          {product.brand}
                        </span>
                        <span
                          className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-gray-500 text-lg">
                    No products found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
