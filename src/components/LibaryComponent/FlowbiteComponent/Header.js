import React from 'react'

function Header() {
  return (
    <section className="   bg-gray-100 antialiased dark:bg-gray-900 ">
    <div className=" flex flex-col-reverse sm:justify-start justify-center pb-2 sm:pb-8  sm:flex-row">
      <div className=" justify-center flex flex-col sm:gap-10 gap-4 pl-5 md:pl-12 xl:pl-20  w-full md:col-span-7 md:text-start">
      <div>
    </div>
        <h1 className="mb-0 text-[8vw] sm:text-[5vw] font-extrabold tracking-tight dark:text-white ">Limited Time Offer!<br />Up to 50% OFF!</h1>
      </div>
      <div className="  sm:w-full w-[80%] flex justify-start sm:justify-center py-4 md:mt-0 md:flex">
        <img className="dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="shopping illustration" />
        <img className="hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list-dark.svg" alt="shopping illustration" />
      </div>
    </div>
    
    </section>
  )
}

export default Header