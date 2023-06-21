import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import Docusafe from "../Context/Docusafe.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = Docusafe.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const DocusafeContext = React.createContext();

export const DocusafeProvider = ({ children }) => {
  //STATE VARIABLE
  const DappName = "docusafe Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createOperation = async (items) => {
    console.log(items);
    const { receiver, pickupTime, senderName,receiverName, ref, price , ipfsHash} = items;

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const createItem = await contract.createOperation(
        receiver,
        senderName,
        receiverName,
        new Date(pickupTime).getTime(),
        ref,
        ethers.utils.parseUnits(price, 18),
        ipfsHash,
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
      await createItem.wait();
      console.log(createItem);
      location.reload();
    } catch (error) {
      console.log("Some want wrong", error);
    }
  };

  const getAllOperation = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const operations = await contract.getAllTransactions();
      console.log("here1")
      const allOperationsdata = operations.map((operation) => ({
        sender: operation.sender,
        receiver: operation.receiver,
        senderName:operation.senderName,
        receiverName:operation.receiverName,
        pickupTime: operation.pickupTime.toNumber(),
        deliveryTime: operation.deliveryTime.toNumber(),
        price: ethers.utils.formatEther(operation.price.toString()),
        ref: operation.ref.toNumber(),
        isConfirmed: operation.isConfirmed,
        status: operation.status,
        ipfsHash: operation.ipfsHash,
      }));
      console.log("here2")
      return allOperationsdata;
    } catch (error) {
      console.log("error want, getting all operation",error);
    }
  };

  const getOperationsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const operationsCount = await contract.getOperationsCount(accounts[0]);
      return operationsCount.toNumber();
    } catch (error) {
      console.log("error want, getting operation count",error);
    }
  };

  const completeOperation = async (completeShip) => {
    console.log(completeShip);

    const { recevier, index } = completeShip;
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeOperation(
        accounts[0],
        recevier,
        index,
        {
          gasLimit: 300000,
        }
      );

      transaction.wait();
      console.log(transaction);
      location.reload();
    } catch (error) {
      console.log("wrong completeOperation", error);
    }
  };

  const getOperation = async (index) => {
    console.log(index * 1);
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const operation = await contract.getOperation(accounts[0], index * 1);

      const SingleOperation = {
        sender: operation[0],
        receiver: operation[1],
        senderName:operation[2],
        receiverName:operation[3],
        pickupTime: operation[4].toNumber(),
        deliveryTime: operation[5].toNumber(),
        ref: operation[6].toNumber(),
        price: ethers.utils.formatEther(operation[7].toString()),
        status: operation[8],
        isConfirmed: operation[9],
        ipfsHash: operation[10],
      };

      return SingleOperation;
    } catch (error) {
      console.log("Sorry no operation");
    }
  };

  const startOperation = async (getProduct) => {
    const { reveiver, index } = getProduct;

    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      const operation = await contract.startOperation(
        accounts[0],
        reveiver,
        index * 1,
        {
          gasLimit: 300000,
        }
      );

      operation.wait();
      console.log(operation);
      location.reload();
    } catch (error) {
      console.log("Sorry no operation", error);
    }
  };
  //---CHECK WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        return "No account";
      }
    } catch (error) {
      return "not connected";
    }
  };

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "Something want wrong";
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <DocusafeContext.Provider
      value={{
        connectWallet,
        createOperation,
        getAllOperation,
        completeOperation,
        getOperation,
        startOperation,
        getOperationsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </DocusafeContext.Provider>
  );
};
