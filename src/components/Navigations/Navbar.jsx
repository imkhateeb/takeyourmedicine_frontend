import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsSearch } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';

import logo from '../../assets/images/logo.png';


export default function Navbar() {

  return (
    <div
      className='flex flex-col justify-between w-full'
    >
      <div className='bg-secondaryColor flex flex-col w-full'>
        <div className='flex justify-between w-[80%] mx-auto py-3 items-center max-md:w-11/12'>
          <HiMenuAlt1 fontSize={40} className='md:hidden font-bold cursor-pointer' />

          
          <Link to="/" className='text-3xl max-md:text-2xl text-green-900 font-bold tracking-widest flex items-center gap-2'>
          <img 
            src={logo}
            alt='logo'
            className='w-10 h-10'
          />
          <h1>TyM</h1>
          </Link>
          
          <div className='flex gap-4 max-md:hidden'>

            <div className='cursor-pointer'><BsSearch fontSize={35} className='font-bold' /></div>

            <div className='cursor-pointer'><FiUser fontSize={35} className='font-bold' /></div>


            <div className='relative cursor-pointer'>
              <AiOutlineHeart fontSize={35} className='font-bold' />
              <div className='bg-red-500 rounded-full text-white text-xs flex items-center justify-center absolute top-0 right-0 shadow-xl'>
                <span className='py-[2px] px-[5px]'>1</span>
              </div>
            </div>


            <div className='relative cursor-pointer'>
              <FiShoppingCart fontSize={35} className='font-bold' />
              <div className='bg-red-500 rounded-full text-white text-xs flex items-center justify-center absolute top-0 right-0 shadow-xl'>
                <span className='py-[2px] px-[5px]'>1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
