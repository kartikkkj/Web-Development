const express =require('express')
const account = require('./database')
let database = require('./database')
const route = express.Router()
route.get('/account',(req,res)=>{
    res.json({usersData:database})
})
 
route.post('/account',(req,res)=>{
    const incomingAccount = req.body
    account.push(incomingAccount)
    res.json(account)
})
route.get('/account/:id',(req,res)=>{
    const accountId= Number(req.params.id)
    const getAccount =database.find((account)=>account.id === accountId)

    if(!getAccount){
        res.status(500).send('account not found')
    }else{
        res.json({usersData:[getAccount]})
    }
})

route.put('/account/:id',(req,res)=>{
    const accountId = Number(req.params.id)
    const body = req.body
    const getAccount = database.find((account)=>{
        return account.id === accountId
    })
    
    if(!getAccount){
        res.status(500).send('account not found')
    }else{
        const index = database.indexOf(getAccount)
        const updatedData={...getAccount,...body}
        database[index]=updatedData
        res.send(updatedData)
        
    }
})

route.delete('/account/:id',(req,res)=>{
    const accountId = Number(req.params.id)
    const getAccounts = database.filter((account)=>{
        return account.id != accountId
    })
    if(!getAccounts){
        res.status(500).send('account not found')
    }else{
        database = getAccounts
        res.send(database)
    }
})
module.exports = route