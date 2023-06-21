import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import {
  Hero,
  Table,
  Form,
  Services,
  Profile,
  CompleteOperation,
  GetOperation,
  StartOperation,
  UploadDocument,
  DownloadDocument,

} from "../Components/index";
import { DocusafeContext } from "../Context/DocusafeContext";

const index = () => {
  const {
    currentUser,
    createOperation,
    getAllOperation,
    completeOperation,
    getOperation,
    startOperation,
    getOperationsCount,
  } = useContext(DocusafeContext);

  //STATE VARIABLE
  const [createOperationModel, setCreateOperationModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);
  //DATA STATE VARIABLE
  const [allOperationsdata, setAllOperationsdata] = useState();
  // const [singleOperationData, setSingleOperationData] = useState();
  // useEffect(() => {
  //   const getCampaignsData = getAllOperation();

  //   return async () => {
  //     const allData = await getCampaignsData;
  //     setAllOperationsdata(allData);
  //   };
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllOperation();
        setAllOperationsdata(allData);
      } catch (error) {
        console.log("Error occurred while fetching operations:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //        await getOperationsCount();
  //     } catch (error) {
  //       console.log("Error occurred while fetching operations:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
      <Hero
        setCreateOperationModel={setCreateOperationModel}
        currentUser={currentUser}
        getOperationsCount={getOperationsCount}
      />
      <UploadDocument
      />
      <Services
        setOpenProfile={setOpenProfile}
        setCompleteModal={setCompleteModal}
        setGetModel={setGetModel}
        setStartModal={setStartModal}
      />

      <Table
        setCreateOperationModel={setCreateOperationModel}
        allOperationsdata={allOperationsdata}
      />

      <DownloadDocument />
      <Form
        createOperationModel={createOperationModel}
        createOperation={createOperation}
        setCreateOperationModel={setCreateOperationModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getOperationsCount={getOperationsCount}
      />
      <CompleteOperation
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        completeOperation={completeOperation}
      />
      <GetOperation
        getModel={getModel}
        setGetModel={setGetModel}
        getOperation={getOperation}

      />
      <StartOperation
        startModal={startModal}
        setStartModal={setStartModal}
        startOperation={startOperation}
      />

    </>
  );
};

export default index;
