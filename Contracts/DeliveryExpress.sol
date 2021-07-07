pragma solidity >=0.7.0 <0.9.0;
 
 
contract DeliveryExpress {
   
    struct ShippingInfo {
        
        bool approval;
        uint cost;
        uint status;
        
        
        address requestFrom;
        
        bytes32 name;
        bytes32 contactNo;
        
        uint truckLoadType; 
        uint distance;
        
        bytes32 typeOfCommodity;
    }

    struct CourierInfo {
        
        bool approval;
        uint cost;
        uint status;
        
        address requestFrom;
        
        bytes32 name;
        bytes32 contactNo;

        uint height;
        uint width;
        uint depth;
        uint weight;
        
        uint distance; 
        
        bytes32 typeOfService;
    }

    address public admin;

    mapping(address => CourierInfo[]) public courierUserInfo;
    mapping(address => ShippingInfo[]) public shippingUserInfo;

    CourierInfo[] public couriers;
    ShippingInfo[] public shippings;


     
    constructor() {
        admin = msg.sender;
    }
    
    function setApproval(bool approval, address userAddress, uint serviceType,uint ind) public{
        require(msg.sender == admin);
        if(serviceType == 0){
            courierUserInfo[userAddress][ind].approval = approval;
        }
        else{
            shippingUserInfo[userAddress][ind].approval = approval;
        }
    }
    
    function addCourier(CourierInfo memory cInfo) public {
        couriers.push(cInfo);
        courierUserInfo[msg.sender].push(cInfo);
    }
    
    function addShipping(ShippingInfo memory sInfo) public {
        shippings.push(sInfo);
        shippingUserInfo[msg.sender].push(sInfo);
    }
    
    function getAllShippings() public view returns(ShippingInfo[] memory){
        return shippings;
    }
    
    function getAllCouriers() public view returns(CourierInfo[] memory){
        return couriers;
    }
    
    function getShipping() public view returns(ShippingInfo[] memory){
        return shippingUserInfo[msg.sender];
    }
    
    function getCourier() public view returns(CourierInfo[] memory){
        return courierUserInfo[msg.sender];
    }
    
    
}
