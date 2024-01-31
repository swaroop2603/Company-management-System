const express=require('express')
const router=express.Router()
router.get('/callbacks',async(req,res)=>{
    return res.status(200).json("alive")
})
module.exports = router;