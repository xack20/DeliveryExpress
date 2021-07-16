pragma solidity ^0.4.26;
pragma experimental ABIEncoderV2;

contract DeliveryExpress {
    
    // Structure for shipping quote
    struct ShippingInfo {
        uint256 del_id;
        uint256 approval;
        uint256 cost;
        uint256 status;
        uint256 truckLoadType;
        uint256 distance;
        uint256 typeOfCommodity;
        address requestFrom;
        string date;
        bool flatbed;
        bool refrigerated;
        bool hazardous;
        bool residentialPickup;
        bool residentialDelivery;
    }
    
    // Structure for courier quote
    struct CourierInfo {
        uint256 del_id;
        uint256 height;
        uint256 width;
        uint256 depth;
        uint256 weight;
        uint256 approval;
        uint256 cost;
        uint256 status;
        uint256 distance;
        uint256 typeOfService;
        address requestFrom;
        string date;
        bool insurance;
    }


    address public admin;
    address[] public users;

    uint256 courier_id = 1;
    uint256 shipping_id = 2;

    mapping(address => bool) Users;
    mapping(address => CourierInfo[]) courierUserInfo;
    mapping(address => ShippingInfo[]) shippingUserInfo;

    constructor() public {
        admin = msg.sender;
    }

    
    // function for handling payment 
    function makePayment(uint256 id, uint256 index) public payable {
        uint256 rem_bal;

        if (id & 1 == 1) {
            require(msg.value > courierUserInfo[msg.sender][index].cost);
            require(id == courierUserInfo[msg.sender][index].del_id);

            rem_bal = msg.value - courierUserInfo[msg.sender][index].cost;
            (msg.sender).transfer(rem_bal);

            courierUserInfo[msg.sender][index].approval = 3;
        } else {
            require(msg.value > shippingUserInfo[msg.sender][index].cost);
            require(id == shippingUserInfo[msg.sender][index].del_id);

            rem_bal = msg.value - shippingUserInfo[msg.sender][index].cost;
            (msg.sender).transfer(rem_bal);

            shippingUserInfo[msg.sender][index].approval = 3;
        }
    }

    // this modifier will be used for adding users when they are trying to make any quote request
    modifier addUser {
        if (!Users[msg.sender]) {
            users.push(msg.sender);
            Users[msg.sender] = true;
        }
        _;
    }

    // only admin can get users list using this function
    function getAllUsers() public view returns (address[]) {
        require(msg.sender == admin);
        return users;
    }

    // only admin can set tracking status of products using this function
    function setStatus(
        address userAd,
        uint256 index,
        uint256 status,
        uint256 serviceType
    ) public {
        require(msg.sender == admin);
        serviceType == 0
            ? courierUserInfo[userAd][index].status = status
            : shippingUserInfo[userAd][index].status = status;
    }

    // only user can get tracking status of products using this function
    function getStatus(uint256 id, uint256 index)
        public
        view
        returns (uint256)
    {
        return
            (id & 1 == 1)
                ? courierUserInfo[msg.sender][index].status
                : shippingUserInfo[msg.sender][index].status;
    }

    // only admin can perform quotes approval using this function
    function setApproval(
        uint256 approval,
        address userAddress,
        uint256 id,
        uint256 index
    ) public {
        require(msg.sender == admin);
        (id & 1 == 1)
            ? courierUserInfo[userAddress][index].approval = approval
            : shippingUserInfo[userAddress][index].approval = approval;
    }

    // only admin can set cost for any service using this function
    function setCost(
        uint256 cost,
        address userAddress,
        uint256 id,
        uint256 index
    ) public {
        require(msg.sender == admin);
        (id & 1 == 1)
            ? courierUserInfo[userAddress][index].cost = cost
            : shippingUserInfo[userAddress][index].cost = cost;
    }


    // user can add courier quote request using this function
    function addCourier(
        uint256 cost,
        uint256 height,
        uint256 width,
        uint256 depth,
        uint256 weight,
        uint256 distance,
        uint256 typeOfService,
        bool insurance,
        string date
    ) public addUser {
        CourierInfo memory cInfo = CourierInfo({
            cost: cost,
            height: height,
            width: width,
            depth: depth,
            weight: weight,
            distance: distance,
            typeOfService: typeOfService,
            insurance: insurance,
            date: date,
            del_id: courier_id += 2,
            approval: 0,
            status: 0,
            requestFrom: msg.sender
        });

        courierUserInfo[msg.sender].push(cInfo);
    }

    // user can add shipping quote request using this function
    function addShipping(
        uint256 cost,
        uint256 truckLoadType,
        uint256 distance,
        uint256 typeOfCommodity,
        bool flatbed,
        bool refrigerated,
        bool hazardous,
        bool residentialPickup,
        bool residentialDelivery,
        string date
    ) public addUser {
        ShippingInfo memory sInfo = ShippingInfo({
            cost: cost,
            del_id: shipping_id += 2,
            approval: 0,
            status: 0,
            requestFrom: msg.sender,
            truckLoadType: truckLoadType,
            distance: distance,
            typeOfCommodity: typeOfCommodity,
            date: date,
            flatbed: flatbed,
            refrigerated: refrigerated,
            hazardous: hazardous,
            residentialPickup: residentialPickup,
            residentialDelivery: residentialDelivery
        });

        shippingUserInfo[msg.sender].push(sInfo);
    }

    // user and adin can get all courier quotes using this function
    function getShipping(address userAddress) public view returns (ShippingInfo[] memory) {
        return shippingUserInfo[userAddress];
    }

    // user and adin can get all shipping quotes using this function
    function getCourier(address userAddress) public view returns (CourierInfo[] memory) {
        return courierUserInfo[userAddress];
    }
}
