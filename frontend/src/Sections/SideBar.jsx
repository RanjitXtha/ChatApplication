import React from 'react'
import Search from '../Components/Search'

const SideBar = () => {
  return (
    <div className='bg-gray-800 border-r border-gray-700 text-white'>
        <div className='border-b-1 pb-3 border-b-gray-600 p-[1rem]'>
            <header className='flex justify-between items-center mb-4 '>
                <h1 className='text-2xl font-extrabold'>BeeChat</h1>
                <div className='bg-black w-10 h-10 rounded-full'>

                </div>
            </header>
            <Search />
        </div>

        
        
         

    </div>
  )
}

export default SideBar