pragma solidity ^0.4.24;

contract EtherMantra {
    
    struct Mantra {
        string description;
        uint key;
        uint karmaPerBlock;
    }
    
    struct MantraOwnership {
        uint key;
        uint block; // the block in which the ownership has been assumed
    }
    
    Mantra[] public mantras;
    address public manager;
    mapping (uint => address) keyToOwner;
    mapping (address => MantraOwnership[]) ownerToMantras;
    mapping (uint => Mantra) keyToMantra;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    function getKarmaPoints(address x) public view returns (uint) {
        if (ownerToMantras[x].length == 0){
            return 0;
        }
        uint karmaPoints = 0;
        for(uint i = 0; i < ownerToMantras[x].length; i++){
            uint kph = keyToMantra[ownerToMantras[x][i].key].karmaPerBlock;
            uint ownBlock = ownerToMantras[x][i].block;
            karmaPoints = add(karmaPoints, mul(kph, sub(block.number, ownBlock)));
        }
        return karmaPoints;
    }
    
    constructor () public {
        manager = msg.sender;
        
        Mantra memory m1 = Mantra({
            description: "Om Mani Padme Hum",
            key: 1,
            karmaPerBlock: 22
        });   
        
        Mantra memory m2 = Mantra({
            description: "Om Muni Muni Mahamuni Shakyamuniye Svaha",
            key: 2,
            karmaPerBlock: 17
        }); 
        
        Mantra memory m3 = Mantra({
            description: "Om Tare Tuttare Ture Svaha",
            key: 3,
            karmaPerBlock: 14
        });
        
        mantras.push(m1);
        mantras.push(m2);
        mantras.push(m3);
        
        keyToMantra[1] = m1;
        keyToMantra[2] = m2;
        keyToMantra[3] = m3;
        
    }
    
    function getMantrasNumber() public view returns (uint) {
        return mantras.length;
    }
    
    function addMantra(string description, uint key, uint karmaPerBlock) public restricted {
        mantras.push(Mantra(description, key, karmaPerBlock));
    }
    
    // anyone can take a mantra
    function receiveMantra(uint key) public {
        keyToOwner[key] = msg.sender;
        ownerToMantras[msg.sender].push(MantraOwnership(key, block.number));
    }

    function mantraOwner(uint key) public view returns (address) {
        return keyToOwner[key];
    }
    
    function getBlockNum() public view returns (uint){
        return block.number;
    }
    
    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
        if (a == 0) {
            return 0;
        }
        c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // assert(b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return a / b;
    }

    /**
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }
   
    
}