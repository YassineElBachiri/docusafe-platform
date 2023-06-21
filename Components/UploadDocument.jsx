import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const UploadDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      
      const auth = 'Basic ' + Buffer.from('2Pi8QNihFKDiDkJABLM4PUJoejK' + ':' + 'ae6ce97bc2094852097a5f9bf2001649').toString('base64');
      const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
          authorization: auth,
        },
     
      });
      const result = await client.add(selectedFile);
      const hash = result.cid.toString();
      setIpfsHash(hash);
    } catch (error) {
      console.log('Error uploading document to IPFS:', error);
    }
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(ipfsHash);
  };



  // const handleDownload = async () => {
  //   try {
  //     const auth = 'Basic ' + Buffer.from('2Pi8QNihFKDiDkJABLM4PUJoejK' + ':' + 'ae6ce97bc2094852097a5f9bf2001649').toString('base64');
  //     const client = create({
  //       host: 'ipfs.infura.io',
  //       port: 5001,
  //       protocol: 'https',
  //       headers: {
  //         authorization: auth,
  //       },
  //     });
  //     const fileData = await client.cat(ipfsHash);
  //     const blob = new Blob([fileData], { type: selectedFile.type });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', selectedFile.name);
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.log('Error downloading document from IPFS:', error);
  //   }
  // };


  return (
    <div className="max-w-lg mx-auto py-3 space-y-3 text-center">
      <h1 className="text-lg font-medium text-white" >...</h1>
      {/* <input                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
 type="file" onChange={handleFileChange} />
      <button
      className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
       onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      {ipfsHash && (
        <div>
          <h2 className="text-lg font-medium text-white">IPFS Hash:</h2>
          <p  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg">{ipfsHash}</p>
          <button className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 mt-7 rounded-full" onClick={handleCopyHash}>Copy Hash</button>
        
        </div>



      )} */}
    </div>
  );
};

export default UploadDocument;
