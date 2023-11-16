import React, {useState} from 'react';

import { BsSearch } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

import Rightbar from './Rightbar';


export default function Bottombar() {
  const [toggleRightSidebar, setToggleRightSidebar] = useState(false);

  
  return (
    <div className='bg-white flex justify-evenly w-full shadow-black shadow-2xl gap-4 px-2 py-3'>
      <div className='cursor-pointer'><BsSearch fontSize={35} className='font-bold' /></div>

      <div className='cursor-pointer'><FiUser fontSize={35} className='font-bold' onClick={()=>setToggleRightSidebar(true)} /></div>


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

      {toggleRightSidebar && (
        <div className='fixed top-0 right-0 w-5/6 animate-slide-fwd bg-tertiaryColor h-screen'>
          <Rightbar
            handleRightSidebar={() => setToggleRightSidebar(false)}
          />
        </div>
      )}
    </div>
  )
}
