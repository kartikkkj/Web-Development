const { hashOtp } = require("../service/hash-service");
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
    const hash = hashOtp(data);
    try{
    await otpService.sendBySms(phoneNo, otp)
    return res.json({
        hash,
        phoneNo,
        expire
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
    let user
    let accessToken
    let refreshToken

    try{
        user = await userService.findUser({phoneNo})
        if(!user){
            user = await userService.createUser({phoneNo})
        }
    }catch(err){
        res.status(500).json({message: "DB error"})
    }
    
  }
}
module.exports = new AuthController();
