// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Tea{
    struct Memo{
        string name;
        string message;
        uint timestamp;
        address from;
    }

    Memo [] memos;
    address payable owner;

    constructor(){
        owner = payable(msg.sender); // The deployer of the contract becomes the owner
    }

    function buyTea(string memory name, string memory message) public payable{
        require(msg.value>0, "The Payable Amount must be greater than 0 ETH !");
        owner.transfer(msg.value);
        memos.push(Memo(name,message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns(Memo[] memory){
        return memos;
    } 
}