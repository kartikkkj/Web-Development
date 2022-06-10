const jimp = require('jimp')
const path = require("path");
const UserDto = require('../dto/user-dto');
const userService = require('../service/user-service');
const { findUser } = require('../service/user-service');
class ActivateController{
    async activate(req, res){
        const {name, avatar} = req.body;
        if(!name, !avatar){
            res.status(400).json({message: "All fields are required!"})
        }
        const buffer = Buffer.from(avatar.replace(/^data:image\/png:base64,/, ""), 'base64');
        const imagePath = `${Date.now()}-${Math.round(Math.random()*1e9)}.png`
        try{
            const jimpResp = await jimp(buffer)
            jimpResp.resize(150, jinp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`))
        }catch(err){
            res.status(500).json({message: "Servet internal error"})
        }
        const userId = req.user._id;
        try {
            
            const user = await userService.findUser({_id: userId})
    
            if(!user){
                res.status(404).json({message: "User not found"})
            }
            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`
            user.save();
            res.json({user: new UserDto(user), auth: true})
        } catch (error) {
            res.status(500).json({message: "DB error"})
        }

    }

}
module .exports = new ActivateController();