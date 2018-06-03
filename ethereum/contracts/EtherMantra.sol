pragma solidity ^0.4.24;


contract EtherMantra {
    
    struct Mantra {
        string description;
        uint key;
        uint karmaPerHour;
    }
    
    Mantra[] public mantras;
    address public manager;
    mapping (uint => address) keyToOwner;
       
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor () public {
        manager = msg.sender;

        // initialize first three mantras
        mantras.push(Mantra({ 
            description: "Om Mani Padme Hum",
            key: 1,
            karmaPerHour: 22
        }));
        
        mantras.push(Mantra({
            description: "Om Muni Muni Mahamuni Shakyamuniye Svaha",
            key: 2,
            karmaPerHour: 17
        }));
        
        mantras.push(Mantra({
            description: "Om Tare Tuttare Ture Svaha",
            key: 3,
            karmaPerHour: 14
        }));
        
    }
    
    function getMantrasNumber() public view returns (uint) {
        return mantras.length;
    }
    
    function addMantra(string description, uint key, uint karmaPerHour) public restricted {
        mantras.push(Mantra(description, key, karmaPerHour));
    }
    
    // anyone can take a mantra
    function receiveMantra(uint key) public {
        keyToOwner[key] = msg.sender;
    }

    function mantraOwner(uint key) public view returns (address) {
        return keyToOwner[key];
    }
   
    
}