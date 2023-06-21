// import React, { useState } from 'react';
// import { create } from 'ipfs-http-client';

// const DownloadDocument = () => {
//   const [ipfsHash, setIpfsHash] = useState('');
//   const [fileData, setFileData] = useState(null);

//   const handleInputChange = (event) => {
//     setIpfsHash(event.target.value);
//   };

//   const handleDownload = async () => {
//     try {
//       const auth = 'Basic ' + Buffer.from('2Pi8QNihFKDiDkJABLM4PUJoejK' + ':' + 'ae6ce97bc2094852097a5f9bf2001649').toString('base64');
//       const client = create({
//         host: 'ipfs.infura.io',
//         port: 5001,
//         protocol: 'https',
//         headers: {
//           authorization: auth,
//         },
//       });
//       const fileData = await client.cat(ipfsHash);
//       setFileData(fileData);
//     } catch (error) {
//       console.log('Error downloading file from IPFS:', error);
//     }
//   };

//   const handleClear = () => {
//     setIpfsHash('');
//     setFileData(null);
//   };

//   return (
//     <div className="max-w-lg mx-auto py-3 space-y-3 text-center">
//       <h1 className="text-lg font-medium text-white">Download Document from IPFS</h1>
//       <input
//         className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//         type="text"
//         placeholder="Enter IPFS Hash"
//         value={ipfsHash}
//         onChange={handleInputChange}
//       />
//       <button
//         className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
//         onClick={handleDownload}
//         disabled={!ipfsHash}
//       >
//         Download
//       </button>
//       {fileData && (
//         <div>
//           <h2 className="text-lg font-medium text-white">File Downloaded</h2>
//           <p className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">
//             {fileData}
//           </p>
//           <button
//             className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 mt-7 rounded-full"
//             onClick={handleClear}
//           >
//             Clear
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DownloadDocument;



import React from 'react';

class DownloadDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
    };
  }

  handleChange = (event) => {
    this.setState({ hash: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { hash } = this.state;
    window.location.href = `https://ipfs.io/ipfs/${hash}`;
    // You can customize the URL to use a different IPFS gateway if desired.
    // For example: `https://gateway.ipfs.io/ipfs/${hash}`
  };

  render() {
    const { hash } = this.state;
    return (
      <div className="max-w-lg mx-auto py-8 pt-11 space-y-3 text-center">
        <h1 className="text-lg font-medium text-white" >Download Document from IPFS</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="text-lg font-medium text-white">
            IPFS Hash:
            <input type="text" value={hash} onChange={this.handleChange} className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
          </label>
          <button type="submit" className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 mt-7 rounded-full">Download</button>
        </form>
      </div>
    );
  }
}

export default DownloadDocument;
