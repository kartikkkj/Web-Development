const UserDto = require("../dto/user-dto");
const hashService = require("../service/hash-service");
const otpService = require("../service/otp-service");
const tokenService = require("../service/token-service");
const userService = require('../service/user-service')
class AuthController {
  async sendOtp(req, res) {
    const { phoneNo } = req.body;
    if (!phoneNo) {
      res.status(400).json({ message: "phone number is required!" });
    }
    const otp = await otpService.generateOtp();
    const timetoExpire = 1000*60*5
    const expire = timetoExpire+ Date.now();
    const data = `${phoneNo}.${otp}.${expire}`
    const hash = hashService.hashOtp(data);
    try{
    // await otpService.sendBySms(phoneNo, otp)
    return res.json({
        hash,
        phoneNo,
        expire,
        otp
    })
    }
    catch(err){
        res.status(500).json({message: "OTP sending Failed"})
    }
    res.json({ hash });
  }

  async verifyOtp(req,res){
    const {otp, phoneNo, hash, expire} = req.body;
    if(!otp || !phoneNo || !hash || !expire){
        res.status(400).json({message : "All fields are required!"});
    } 
    if(Date.now() > +expire){
        res.status(400).json({message:' OTP expired!'})
    }
    const data = `${phoneNo}.${otp}.${expire}`
    const isValid = otpService.verifyOtp(hash, data);
    if(!isValid){
        res.status(400).json({message:"Invalid OTP"})
    }
    let user;
    try{
        user = await userService.findUser({phoneNo})
        if(!user){
            user = await userService.createUser({phoneNo})
        }
        console.log(3);
    }catch(err){
        res.status(500).json({message: "DB error"})
    }
    
    console.log(user);
    const {accessToken, refreshToken} = tokenService.generateTokens({_id:user._id,activated:false})
 
    res.cookie("refreshToken", refreshToken,{
      maxAge: 1000*60*60*24*30,
      httpOnly:true,
    })

    res.cookie("accessToken", accessToken,{
      maxAge: 1000*60*60*24*30,
      httpOnly:true,
    })

    await tokenService.storeRefreshToken(refreshToken,user._id)
    const userDto = new UserDto(user);
    res.json({user : userDto, auth:true})
  }
}
module.exports = new AuthController();
