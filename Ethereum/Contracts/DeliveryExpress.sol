pragma solidity ^0.4.26;
pragma experimental ABIEncoderV2;

contract DeliveryExpress {
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

    struct UserInfo {
        string name;
        string email;
        bool active;
    }

    address public admin;
    address[] public users;

    uint256 courier_id = 1;
    uint256 shipping_id = 2;

    mapping(address => UserInfo) Users;
    mapping(address => CourierInfo[]) courierUserInfo;
    mapping(address => ShippingInfo[]) shippingUserInfo;

    constructor() public {
        admin = msg.sender;
    }

    function getUserInfo() public view returns (UserInfo) {
        return Users[msg.sender];
    }

    function setUserInfo(string name, string email) public {
        UserInfo memory uInfo = UserInfo({
            name: name,
            email: email,
            active: true
        });
        Users[msg.sender] = uInfo;
    }

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

    modifier addUser {
        if (!Users[msg.sender].active) {
            users.push(msg.sender);
            Users[msg.sender].active = true;
        }
        _;
    }

    function getAllUsers() public view returns (address[]) {
        require(msg.sender == admin);
        return users;
    }

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

    function getShipping() public view returns (ShippingInfo[] memory) {
        return shippingUserInfo[msg.sender];
    }

    function getCourier() public view returns (CourierInfo[] memory) {
        return courierUserInfo[msg.sender];
    }
}
