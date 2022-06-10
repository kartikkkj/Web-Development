class UserDto{
    id;
    phoneNo;
    activated;
    createAt;
    name;
    avatar;
    constructor(user){
        this.id = user._id;
        this.phoneNo = user.phoneNo;
        this.activated = user.activated;
        this.createAt = user.createAt;
        this.name = user.name;
        this.avatar = user.avatar ? `${process.env.BASE_URL}${user.avatar}`: null;
    }
}

module.exports = UserDto;