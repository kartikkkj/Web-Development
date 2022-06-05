const crypto = require("crypto");
const hashService = require("./hash-service");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true
})

class OtpService{
    async generateOtp(){
        const otp = crypto.randomInt(100000, 999999)
        return otp
    }
    
    async sendBySms(phoneNo, otp){
        return await twilio.messages.create({
            to:phoneNo,
            from: process.env.SMS_FROM_NUMBER,
            body: `your Shagain Idea OTP is ${otp} valid for next 5 minutes. Please don't share is OTP to any other person.`
        })
    }
    sendByEmail(){

    }
    verifyOtp(hash, data){
        const newHash= hashService.hashOtp(data)
        return hash == newHash
    }
}
module.exports = new OtpService();