pragma solidity ^0.8.6;
pragma experimental ABIEncoderV2;
 
 
contract DeliveryExpress {
    
    
   
    struct ShippingInfo {
        
        uint del_id;
        
        uint approval;
        uint cost;
        uint status;
        
        address requestFrom;
        
        uint truckLoadType;
        uint distance;
        
        string typeOfCommodity;
    }
    
    
    
    

    struct CourierInfo {
        
        uint del_id;
        
        uint approval;
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
    
    
    
    function payment(uint id,uint serviceType, address payable userAd) public payable {
        
        if(serviceType == 0){
            for(uint i = 0 ; i < courierUserInfo[msg.sender].length ; i++)
            {
                if(courierUserInfo[msg.sender][i].del_id == id){
                    
                    require(msg.value > courierUserInfo[msg.sender][i].cost);
                    
                    uint rem_bal = msg.value - courierUserInfo[msg.sender][i].cost;
                    (userAd).transfer(rem_bal);
                    
                    courierUserInfo[msg.sender][i].approval = 3;
                }
                
            }
        }
        else{
            for(uint i = 0 ; i < shippingUserInfo[msg.sender].length ; i++)
            {
                if(shippingUserInfo[msg.sender][i].del_id == id){
                    
                    require(msg.value > shippingUserInfo[msg.sender][i].cost);
                    
                    uint rem_bal = msg.value - shippingUserInfo[msg.sender][i].cost;
                    (userAd).transfer(rem_bal);
                    
                    shippingUserInfo[msg.sender][i].approval = 3;
                }
                
            }
        }
    }
    
    
    
    
    
    
    function addUser(address sender) public{
        uint f = 1;
        for(uint i =0 ; i < users.length ; i ++)
            if(sender == users[i])
                f=0;
        if(f==1)users.push(sender);
    }
    
    
    function setStatus(address userAd,uint index,uint status,uint serviceType) public{
        require(msg.sender == admin);
        serviceType == 0 ? courierUserInfo[userAd][index].status = status : shippingUserInfo[userAd][index].status = status; 
    }
    
    
    
    function getStatus(address userAd,uint id,uint serviceType) view public returns (uint){
        require(msg.sender == admin);
        uint rt;
        if(serviceType == 0){
            for(uint i = 0 ; i < courierUserInfo[userAd].length ; i++){
                if(courierUserInfo[userAd][i].del_id == id)
                    rt =  courierUserInfo[userAd][i].del_id;
            }
        }
        else{
            for(uint i = 0 ; i < shippingUserInfo[userAd].length ; i++){
                if(shippingUserInfo[userAd][i].del_id == id)
                    rt =  shippingUserInfo[userAd][i].del_id;
            }
        }
        
        return rt;
    }
    
    
    
    
    
    
    
    
    
    
    function setApproval(uint approval, address userAddress, uint serviceType,uint ind) public{
        require(msg.sender == admin);
        serviceType == 0 ? courierUserInfo[userAddress][ind].approval = approval : shippingUserInfo[userAddress][ind].approval = approval; 
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
            
            approval : 0,
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
           approval : 0,
           status: 0,
           requestFrom : msg.sender,
           
           truckLoadType : truckLoadType,
           distance : distance,
           typeOfCommodity : typeOfCommodity
        });
        
        shippingUserInfo[msg.sender].push(sInfo);
        
    }
    
    
    
    
    
    
    
    function getAllShippings() public  returns(ShippingInfo[] memory){
        
        require(msg.sender == admin);
        
        delete shippings;
        
        for(uint i = 0 ; i < users.length ; i ++){
                for(uint j = 0 ; j < shippingUserInfo[users[i]].length ; j++){
                    shippings.push(shippingUserInfo[users[i]][j]);
            }
        }
        
        
        return shippings;
    }
    
    function getAllCouriers() public  returns(CourierInfo[] memory){
        
        require(msg.sender == admin);
        
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
