import { useState } from "react";
import {create} from "ipfs-http-client";


export default ({
  setCreateOperationModel,
  createOperationModel,
  createOperation,
}) => {
  const auth =
  'Basic ' +
  Buffer.from(
    '2Pi8QNihFKDiDkJABLM4PUJoejK' + ':' + 'ae6ce97bc2094852097a5f9bf2001649',
  ).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

  const [reciever, setReciever] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [distance, setDistance] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)




  const createItem = async (e) => {
    if (!reciever  || !price) return

    alert('Uploading to ipfs')

    try {
      const created = await client.add(file)
      const metadataURI = `https://ipfs.io/ipfs/${created.path}`
      const bdt = { reciever, pickupTime, distance, price,metadataURI }

      alert('Intializing transaction...')
      setFile(metadataURI)
       await createOperation(bdt)

      window.location.reload()
    } catch (error) {
      console.log('Error uploading file: ', error)
      setAlert('Minting failed...', 'red')
    }
    
  }
  
  const changeImage = async (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      
      
      setFile(e.target.files[0])
    }
  }
  return createOperationModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateOperationModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
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
            <h4 className="text-lg font-medium text-gray-800">
              Track product, Create Operation
            </h4>
            <p className="text-[15px] text-gray-600">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receiver"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setReciever(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="pickupTime"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="file"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={changeImage}
                />

              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="distance"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <button
                onClick={() => createItem()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
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
