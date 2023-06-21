import React, { useState , useEffect} from 'react';
import { create } from 'ipfs-http-client';



export default ({
  setCreateOperationModel,
  createOperationModel,
  createOperation,
}) => {


  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState('');


  const [operation, setOperation] = useState({
    receiver: "",
    pickupTime: "",
    senderName: "",
    receiverName:"",
    ref: "",
    price: "",
    ipfsHash: "",
  });


  const createItem = async () => {
    try {
      // Set the IPFS hash in the operation object
      const updatedOperation = { ...operation, ipfsHash: ipfsHash };
      await createOperation(updatedOperation);
      localStorage.setItem('operation', JSON.stringify(updatedOperation));
      window.location.reload();
    } catch (error) {
      console.log("Error creating item");
    }
  };
  

  useEffect(() => {
    const storedOperation = localStorage.getItem('operation');
    if (storedOperation) {
      setOperation(JSON.parse(storedOperation));
    }
  }, []);
  




  // const createItem = async () => {
  //   try {
  //     await createOperation(operation);
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Wrong creating item");
  //   }
  // };

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


  return createOperationModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateOperationModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateOperationModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-200">
              Create Operation
            </h4>
            <p className="text-[15px] text-gray-500">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Sender's Name"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    
                    setOperation({
                      ...operation,
                      senderName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Reciever's Name"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    
                    setOperation({
                      ...operation,
                      receiverName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="pickupTime"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>

              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="Ref"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      ref: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setOperation({
                      ...operation,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="max-w-lg mx-auto py-3 space-y-3 text-center">
                <h1 className="text-lg font-medium text-white">Upload Document to IPFS</h1>
                <input
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  type="file"
                  onChange={handleFileChange}
                />
                <button
                  className="shadow-xl shadow-black text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Upload
                </button>
               

                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="IPFS hash"
                    className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    onChange={(e) =>
                      
                      setOperation({
                        ...operation,
                        ipfsHash: e.target.value,
                      })
                    }
                    value={ipfsHash} // Set the value of the input to the ipfsHash in your state
                  />
                </div>
              </div>


              <button
                onClick={() => createItem()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
              >
                Create Operation
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
