import { useContext ,useState,useEffect} from "react";
import { DocusafeContext } from "../Context/DocusafeContext"; // Update with the correct path to your context file

export default ({ setCreateOperationModel }) => {
  const { currentUser, getAllOperation } = useContext(DocusafeContext);
  const [allOperationsdata, setAllOperationsdata] = useState([]);

  useEffect(() => {
    const fetchAllOperations = async () => {
      const operations = await getAllOperation();
      setAllOperationsdata(operations || []);
    };

    fetchAllOperations();
  }, [getAllOperation]);

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  console.log(allOperationsdata);

  // Filter operations based on current user's address
  const filteredOperations = Array.isArray(allOperationsdata)
    ? allOperationsdata.filter(
        (operation) =>
          operation.sender.toLowerCase() === currentUser.toLowerCase() ||
          operation.receiver.toLowerCase() === currentUser.toLowerCase()
      )
    : [];



  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-300 text-xl font-bold sm:text-2xl">
            Create Operation
          </h3>
          <p className="text-gray-400 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setCreateOperationModel(true)}
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 md:text-sm rounded-lg md:inline-flex"
          >
            Add Document
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto bg-gray-300">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Recevier</th>
              <th className="py-3 px-6">Sender's Name</th>
              <th className="py-3 px-6">Reciver's Name</th>
              <th className="py-3 px-6">PickupTime</th>
              <th className="py-3 px-6">Ref</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Confirmed</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">IPFS Hash</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {filteredOperations?.map((operation, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.sender.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.receiver.slice(0, 15)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.senderName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.receiverName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {converTime(operation.pickupTime)}
                </td>          
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.ref}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.deliveryTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.isConfirmed ? " Completed" : "Not Complete"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.status == 0
                    ? "Pending"
                    : operation.status == 1
                    ? "IN_TRANSIT"
                    : "Delivered"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {operation.ipfsHash}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
