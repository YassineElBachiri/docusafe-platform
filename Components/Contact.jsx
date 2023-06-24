import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
// import styled from "styled-components";
const imgHero = 'https://wallpaperaccess.com/full/2579667.jpg';
// npm i @emailjs/browser

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "replace with service id",
        "replace with template id",
        form.current,
        "replace with user id"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

//   return (
//     <div className="max-w-lg mx-auto py-3 space-y-3  mt-14">
//       <h4 className="text-lg font-medium text-gray-200">
//         Contact Us
//       </h4>
//       <p className="text-[15px] text-gray-400">
//         Ut enim ad minim veniam, quis nostrud exercitation.
//       </p>
//       <form ref={form} onSubmit={sendEmail}>
//         <div className="relative mt-3">
//           <label className="text-lg font-medium text-gray-300">Name</label>
//           <input type="text" name="user_name" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
//           <label className="text-lg font-medium text-gray-300">Email</label>
//           <input type="email" name="user_email" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
//           <label className="text-lg font-medium text-gray-300">Message</label>
//           <textarea name="message" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
//           <input type="submit" value="Send" className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2" />
//         </div>
//       </form>
//     </div>
//   );
// };


return (
  <div className='flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10
'>
      <div className='md:w-3/6 w-full '>
      <div className="max-w-lg mx-auto py-3 space-y-3  mt-14">
      <h4 className="text-4xl text-center font-bold text-gray-200 mb-8">
        Contact Us 
      </h4>
      <p className="text-[15px] text-gray-400">
        Ut enim ad minim veniam, quis nostrud exercitation.
      </p>
      <form ref={form} onSubmit={sendEmail}>
        <div className="relative mt-3">
          <label className="text-lg font-medium text-gray-300">Name</label>
          <input type="text" name="user_name" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          <label className="text-lg font-medium text-gray-300">Email</label>
          <input type="email" name="user_email" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          <label className="text-lg font-medium text-gray-300">Message</label>
          <textarea name="message" className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          <input type="submit" value="Send" className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full" />
        </div>
      </form>
    </div>

      </div>

      <div
          className="shadow-xl shadow-black md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800"
      >
          <img className="h-60 w-full object-cover" src={imgHero} alt="Hero" />
          <div className='flex justify-start items-center p-1'>
              {/* <Identicon className="h-10 w-10 object-contain rounded-full mr-3 p-1" string={'0x21...456a'} size={50}/> */}
              {/* <div>
                  <p className='text-white font-semibold'>{currentUser}</p>
                  <small className='text-blue-500 font-bold'>Number Of Current Operations : {count}</small>
              </div>
               */}
          </div>


      </div>
  </div>
)
      };
      export default Contact;