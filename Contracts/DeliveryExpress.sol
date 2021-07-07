pragma solidity ^0.8.6;
 
 
contract DeliveryExpress {
    
    
   
    struct ShippingInfo {
        
        uint del_id;
        
        bool approval;
        uint cost;
        uint status;
        
        address requestFrom;
        
        uint truckLoadType;
        uint distance;
        
        string typeOfCommodity;
    }
    
    
    
    

    struct CourierInfo {
        
        uint del_id;
        
        bool approval;
        uint cost;
        uint status;
        
        address requestFrom;

        uint height;
        uint width;
        uint depth;
        uint weight;
        
        uint distance;
        
        string typeOfService;
    }
    
    
    

    address public admin;
    uint del_id = 1;
    
    
    
    address[] public users;



    mapping(address => CourierInfo[]) public courierUserInfo;
    mapping(address => ShippingInfo[]) public shippingUserInfo;
    
    
    
    ShippingInfo[] public shippings;
    CourierInfo[] public couriers;





     
    constructor() {
        admin = msg.sender;
    }
    
    
    
    function addUser(address sender) public{
        uint f = 1;
        for(uint i =0 ; i < users.length ; i ++)
            if(sender == users[i])
                f=0;
        if(f==1)users.push(sender);
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
    
    
    
    
    
    
    
    
    function addCourier( uint cost , uint height , uint width , uint depth , uint weight , uint distance , string memory typeOfService) public {
        
        addUser(msg.sender);
        
        CourierInfo memory cInfo = CourierInfo({
            cost : cost,
            
            height : height,
            width : width,
            depth : depth,
            weight : weight,
            
            distance : distance,
            
            typeOfService : typeOfService,
            
            del_id : del_id++,
            
            approval : false,
            status : 0,
            requestFrom : msg.sender
            
        });
        
        courierUserInfo[msg.sender].push(cInfo);
    }
    
    
    function addShipping(uint cost,uint truckLoadType,uint distance,string memory typeOfCommodity) public {
        
        addUser(msg.sender);
        
        ShippingInfo memory sInfo = ShippingInfo({
           cost : cost,
           del_id : del_id++,
           approval : false,
           status: 0,
           requestFrom : msg.sender,
           
           truckLoadType : truckLoadType,
           distance : distance,
           typeOfCommodity : typeOfCommodity
        });
        
        shippingUserInfo[msg.sender].push(sInfo);
        
    }
    
    
    
    
    
    
    
    function getAllShippings() public  returns(ShippingInfo[] memory){
        
        delete shippings;
        
        for(uint i = 0 ; i < users.length ; i ++){
                for(uint j = 0 ; j < shippingUserInfo[users[i]].length ; j++){
                    shippings.push(shippingUserInfo[users[i]][j]);
            }
        }
        
        
        return shippings;
    }
    
    function getAllCouriers() public  returns(CourierInfo[] memory){
        
        delete couriers;
        
        for(uint i = 0 ; i < users.length ; i ++){
                for(uint j = 0 ; j < courierUserInfo[users[i]].length ; j++){
                    couriers.push(courierUserInfo[users[i]][j]);
                }
        }
        
        return couriers;
    }
    
    
    
    
    
    
    
    
    
    function getShipping() public view returns(ShippingInfo[] memory){
        return shippingUserInfo[msg.sender];
    }
    
    function getCourier() public view returns(CourierInfo[] memory){
        return courierUserInfo[msg.sender];
    }
    
    
}
