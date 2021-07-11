pragma solidity ^0.4.26;
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
        uint height;
        uint width;
        uint depth;
        uint weight;
        uint approval;
        uint cost;
        uint status;
        uint distance;
        
        address requestFrom;

        
        
        
        string typeOfService;
    }
    
    
    

    address public admin;
    uint del_id = 1;
    
    
    
    address[] public users;



    mapping(address => CourierInfo[]) public courierUserInfo;
    mapping(address => ShippingInfo[]) public shippingUserInfo;
    
    
    ShippingInfo[] public shippings;
    CourierInfo[] public couriers;





     
    constructor() public{
        admin = msg.sender;
    }
    
    
    
    function payment(uint id,uint serviceType) public payable {
        
        if(serviceType == 0){
            for(uint i = 0 ; i < courierUserInfo[msg.sender].length ; i++)
            {
                if(courierUserInfo[msg.sender][i].del_id == id){
                    
                    require(msg.value > courierUserInfo[msg.sender][i].cost);
                    
                    uint rem_bal = msg.value - courierUserInfo[msg.sender][i].cost;
                    (msg.sender).transfer(rem_bal);
                    
                    courierUserInfo[msg.sender][i].approval = 3;
                }
                
            }
        }
        else{
            for(uint j = 0 ; j < shippingUserInfo[msg.sender].length ; j++)
            {
                if(shippingUserInfo[msg.sender][j].del_id == id){
                    
                    require(msg.value > shippingUserInfo[msg.sender][j].cost);
                    
                    uint rem_bal2 = msg.value - shippingUserInfo[msg.sender][j].cost;
                    (msg.sender).transfer(rem_bal2);
                    
                    shippingUserInfo[msg.sender][j].approval = 3;
                }
                
            }
        }
    }
    
    
    
    
    
    
    modifier addUser{
        uint f = 1;
        for(uint i =0 ; i < users.length ; i ++)
            if(msg.sender == users[i])
                f=0;
        if(f==1)users.push(msg.sender);
        
        _;
    }
    
    
    function setStatus(address userAd,uint index,uint status,uint serviceType) public{
        require(msg.sender == admin);
        serviceType == 0 ? courierUserInfo[userAd][index].status = status : shippingUserInfo[userAd][index].status = status; 
    }
    
    
    
    function getStatus(uint id,uint serviceType) view public returns (uint){
        
        uint rt;
        if(serviceType == 0){
            for(uint i = 0 ; i < courierUserInfo[msg.sender].length ; i++){
                if(courierUserInfo[msg.sender][i].del_id == id)
                    rt =  courierUserInfo[msg.sender][i].status;
            }
        }
        else{
            for(uint j = 0 ; j < shippingUserInfo[msg.sender].length ; j++){
                if(shippingUserInfo[msg.sender][j].del_id == id)
                    rt =  shippingUserInfo[msg.sender][j].status;
            }
        }
        
        return rt;
    }
    
    
    
    
    
    
    
    
    
    
    function setApproval(uint approval, address userAddress, uint serviceType,uint ind) public{
        require(msg.sender == admin);
        serviceType == 0 ? courierUserInfo[userAddress][ind].approval = approval : shippingUserInfo[userAddress][ind].approval = approval; 
    }
    
    
    
    
    
    
    
    
    function addCourier( uint cost , uint height , uint width , uint depth , uint weight , uint distance , string memory typeOfService) public addUser{
        

        
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
    
    
    function addShipping(uint cost,uint truckLoadType,uint distance,string memory typeOfCommodity) public addUser {
        
        
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
