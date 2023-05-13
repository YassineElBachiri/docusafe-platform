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

  const createOperation = async (receiver, pickupTime, distance, price, metadataURI) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
  
      const createItem = await contract.createOperation(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        metadataURI,
        {
          value: ethers.utils.parseUnits(price, 18),
        }
      );
  
      alert('ok');
      await createItem.wait();
      console.log(createItem);
      location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };
  

  const getAllOperation = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const operations = await contract.getAllTransactions();
      const allOperations = operations.map((operation) => ({
        sender: operation.sender,
        receiver: operation.receiver,
        metadataURI: operation.metadataURI,
        pickupTime: operation.pickupTime.toNumber(),
        deliveryTime: operation.deliveryTime.toNumber(),
        price: ethers.utils.formatEther(operation.price.toString()),
        distance: operation.distance.toNumber(),
        isConfirmed: operation.isConfirmed,
        status: operation.status,
        
        
      }));

      return allOperations;
    } catch (error) {
      console.log("error want, getting operation");
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
      console.log("error want, getting operation");
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
        pickupTime: operation[2].toNumber(),
        deliveryTime: operation[3].toNumber(),
        metadataURI:operation[4],
        distance: operation[5].toNumber(),
        price: ethers.utils.formatEther(operation[6].toString()),
        status: operation[7],
        isConfirmed: operation[8],
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
