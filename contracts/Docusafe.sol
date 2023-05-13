// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Docusafe {
    enum OperationStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Operation {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        OperationStatus status;
        bool isConfirmed;
        string metadataURI;
    }

    mapping(address => Operation[]) public operations;
    uint256 public operationCount;

     struct TypeOperation {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        OperationStatus status;
        bool isConfirmed;
        string metadataURI;
        
    }

    TypeOperation[]  typeOperations;
    

    event OperationCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price,string metadataURI);
    event OperationInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event OperationDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event OperationConfirmed(address indexed sender, address indexed receiver, uint256 amount);

    constructor() {
        operationCount = 0;
    }

     function createOperation(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price,string memory _metadataURI) public payable {
        require(msg.value == _price, "Payment amount must match the price.");
        
        Operation memory operation = Operation(msg.sender, _receiver, _pickupTime, 0, _distance, _price, OperationStatus.PENDING, false,  _metadataURI);

        operations[msg.sender].push(operation);
        operationCount++;

         typeOperations.push(
            TypeOperation(
                msg.sender, 
                _receiver, 
                _pickupTime, 
                0, 
                _distance, 
                _price, 
                OperationStatus.PENDING, 
                false,
                _metadataURI
            )
        );
        
        emit OperationCreated(msg.sender, _receiver, _pickupTime, _distance, _price, _metadataURI);
    }

    function startOperation(address _sender, address _receiver, uint256 _index) public {
        Operation storage operation = operations[_sender][_index];
        TypeOperation storage typeOperation = typeOperations[_index];
        
        require(operation.receiver == _receiver, "Invalid receiver.");
        require(operation.status == OperationStatus.PENDING, "Operation already in transit.");

        operation.status = OperationStatus.IN_TRANSIT;
        typeOperation.status = OperationStatus.IN_TRANSIT;

        emit OperationInTransit(_sender, _receiver, operation.pickupTime);
    }

    function completeOperation(address _sender, address _receiver, uint256 _index) public {
        Operation storage operation = operations[_sender][_index];
        TypeOperation storage typeOperation = typeOperations[_index];

        require(operation.receiver == _receiver, "Invalid receiver.");
        require(operation.status == OperationStatus.IN_TRANSIT, "Operation not in transit.");
        require(!operation.isConfirmed, "Operation already paid.");

         operation.status = OperationStatus.DELIVERED;
         typeOperation.status = OperationStatus.DELIVERED;
         typeOperation.deliveryTime = block.timestamp;
         operation.deliveryTime = block.timestamp;

        uint256 amount = operation.price;

        payable(operation.sender).transfer(amount);

        operation.isConfirmed = true;
        typeOperation.isConfirmed = true;

        emit OperationDelivered(_sender, _receiver, operation.deliveryTime);
        emit OperationConfirmed(_sender, _receiver, amount);
    }

    function getOperation(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, OperationStatus, bool, string memory) {
        Operation memory operation = operations[_sender][_index];
        return (operation.sender, operation.receiver, operation.pickupTime, operation.deliveryTime, operation.distance, operation.price, operation.status, operation.isConfirmed, operation.metadataURI);
    }

    function getOperationsCount(address _sender) public view returns (uint256) {
        return operations[_sender].length;
    }

   

     function getAllTransactions()
        public
        view
        returns (TypeOperation[] memory)
    {
        return typeOperations; 
    }

   
}
