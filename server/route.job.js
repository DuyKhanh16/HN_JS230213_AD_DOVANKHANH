const express = require("express")
const router = express.Router()
const {getJob,postJob,deleteJob,updateJob,updateStatus,deleteAll} = require("./reponsistore/job.reponsistore")


router.get("/", async(req,res)=>{
 const jobs =   await  getJob()
        res.status(200).json({
            messenge:"Lấy Thành Công",
            data:jobs
        })
})


router.post("/",async(req,res,next)=>{
   const jobs= await  getJob()
   const check=jobs.findIndex(e=>e.nameJob.toLowerCase()==req.body.nameJob.toLowerCase())
   if (check!=-1) {
    res.status(400).json({
        messenge:"thêm thất bại:công việc đã tồn tại"
    })
   }else{
    next()
   }
},(req,res)=>{
    postJob(req.body)
    res.status(201).json(messenge= "them thanh cong")
})


router.delete("/:id",(req,res)=>{
    deleteJob(req.params.id)
    res.status(200).json(messenge="xóa thành công")
})



router.put("/:id",(req,res)=>{
   const id=req.params.id
   const job=req.body
   updateJob(id,job)
   res.status(201).json(messenge="sửa thành công")
})

router.patch("/:id",(req,res)=>{
    updateStatus(req.body)
    res.status(201).json(messenge="sửa thành công")
  })
  
  router.delete("/" ,(req,res)=>{
    deleteAll()
    res.status(200).json(messenge="xóa thành công")
  })
module.exports = router