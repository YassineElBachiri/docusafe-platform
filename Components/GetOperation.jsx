import { useState } from "react";

export default ({ getModel, setGetModel, getOperation }) => {
  const [index, setIndex] = useState(0);
  const [singleOperationData, setSingleOperationData] = useState();

  const getoperationData = async () => {
    const getData = await getOperation(index);
    setSingleOperationData(getData);
    console.log(getData);
  };
  console.log(singleOperationData);

  // const converTime = (time) => {
  //   const newTime = new Date(time);
  //   const dataTime = new Intl.DateTimeFormat("en-US", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   }).format(newTime);

  //   return dataTime;
  // };


  const converTime = (time) => {
    if (!time) return ""; // Handle empty or undefined time value

    const newTime = new Date(time);

    if (isNaN(newTime.getTime())) {
      // Handle invalid date or time value
      return "";
    }

    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };


  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setGetModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-800 rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setGetModel(false)}
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
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center ">
            <h4 className="text-lg font-medium text-gray-200">
              Product Details
            </h4>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="number"
                  placeholder="Id"
                  className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) => setIndex(e.target.value)}
                />
              </div>

              <button
                onClick={() => getoperationData()}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-[#1D98DF] hover:bg-[#33cce0] p-3 rounded-full"
              >
                Get details
              </button>
            </form>

            {singleOperationData == undefined ? (
              " "
            ) : (
              <div className="text-left text-white">
                <p>{singleOperationData ? (
                  <div className="text-left text-white">
                    <p>Sender: {singleOperationData.sender?.slice(0, 25)}...</p>
                    <p>Receiver: {singleOperationData.receiver?.slice(0, 25)}...</p>
                    <p>Sender's Name:{singleOperationData.senderName}</p>
                    <p>Receiver's Name:{singleOperationData.receiverName}</p>
                    <p>PickupTime: {converTime(singleOperationData.pickupTime)}</p>
                <p>
                  DeliveryTime: {converTime(singleOperationData.deliveryTime)}
                </p>
                <p>Ref: {singleOperationData.distance}</p>
                <p>Price: {singleOperationData.price}</p>
                <p>Status: {singleOperationData.status == 2 ? "Delivered" : "Not Delivered"}</p>
                <p>
                  Confirmed:{" "}
                  {singleOperationData.isConfirmed ? "Confirmed" : "Not Confirmed"}
                </p>
                <p>IPFS Hash: {singleOperationData.ipfsHash}</p>
                  </div>
                ) : (
                  <div>Loading data...</div>
                )}</p>
                {/* <p>Recevier: {singleOperationData.receiver.slice(0, 25)}...</p> */}
                

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
