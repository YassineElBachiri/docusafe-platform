// import Identicon from 'react-identicons'
// import { setGlobalState } from '../store';

import React, { useState, useEffect } from "react";
const imgHero = 'https://blog.1password.com/posts/2021/how-to-hand-over-cryptocurrency/header.png';
export default ({ setCreateOperationModel, currentUser,getOperationsCount}) => {
    const [count, setCount] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getOperationsData = await getOperationsCount();
        setCount(getOperationsData);
      } catch (error) {
        console.log("Error occurred while fetching operations:", error);
      }
    };
  
    fetchData();
  }, []);
    return (
        <div className='flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10
    '>
            <div className='md:w-3/6 w-full '>
                <div>
                    <h1 className='text-white text-5xl font-bold'>Send And Recieve <br /> Digital Documents, <br />
                        <span className='text-gradient'>BDTs</span></h1>
                    {/* <p className='text-gray-500 font-semibold text-sm mt-3'>Mint and collect the hottest BDTs around.</p> */}
                </div>

               
                <div className='flex mt-5'>
                    <button 
                    onClick={() => setCreateOperationModel(true)}
                    href="javascript:void(0)"
                    className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
                    >
                        Create The BDT
                    </button>
                </div>

            </div>

            <div
                className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800"
            >
                <img className="h-60 w-full object-cover" src={imgHero} alt="Hero" />
                <div className='flex justify-start items-center p-1'>
                    {/* <Identicon className="h-10 w-10 object-contain rounded-full mr-3 p-1" string={'0x21...456a'} size={50}/> */}
                    <div>
                        <p className='text-white font-semibold'>{currentUser}</p>
                        <small className='text-blue-500 font-bold'>Number Of Current Operations : {count}</small>
                    </div>
                    
                </div>


            </div>
        </div>
    )
            };