const axios = require('axios')

exports.homeRoutes=(req,res)=>{
    axios.get('http://localhost:3000/api/users').then((result) => {
        res.render('index',{users:result.data})
    }).catch((err) => {
        res.send(err)
    });
}

exports.add_user=(req,res)=>{
    res.render('add-user')
}

exports.update_user=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params : {id:req.query.id}}).then((result) => {
        console.log(result.data)
        res.render('update-user',{user:result.data})
        console.log(user)
    }).catch((err) => {
        res.send(err)
    });
    
} 