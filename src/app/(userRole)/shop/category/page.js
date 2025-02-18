import React from 'react'
import ProductFilter from '@/components/LibaryComponent/FlowbiteComponent/Filter'
import E_commerceCard from '@/components/LibaryComponent/FlowbiteComponent/E-commerceCard'
function Category() {
  return (
    <div className=' mt-20'>
           <div className='md:px-8 px-4 mt-16  flex-col flex gap-6 font-semibold'>
            <h1 className=' font-poppins text-3xl sm:text-4xl'>Products Overview</h1>
            {/* <div className="flex space-x-3 sm:space-x-6 sm:w-full  flex-wrap  text-gray-500 text-lg font-medium">
      {navItems.map((item, index) => (
        <div key={index} className="relative   cursor-pointer group">
          <div  className="hover:text-black text-sm sm:text-[16px] font-normal" >
            {item.name}
          </div>
          <div
            className="absolute left-0 w-full h-[2px] translate-y-1 duration-300 bg-black scale-0 group-hover:scale-100 origin-left"
           ></div>
           
          
        </div>
      ))}
    </div> */}
            </div>
        <div className='w-full flex md:flex-row flex-col '>
        <ProductFilter />
        
        <E_commerceCard/>
        </div>
        </div>

    
  )
}

export default Category