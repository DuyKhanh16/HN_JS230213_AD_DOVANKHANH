var db = require("../config/mysql")

const getJob= async ()=>  {
 const [listJobs]= await db.execute("select * from job ORDER BY job.id DESC")
 return listJobs
}


 const postJob= async (job)=>{
   await db.execute(` INSERT INTO job (nameJob,status) VALUES ('${job?.nameJob}', '${job?.status}')`)
 }

const deleteJob= async(id)=>{
    await db.execute(`DELETE FROM job WHERE id = '${id}'`)
}

const updateJob= async(id,job)=>{
   await db.execute(`UPDATE job SET nameJob = '${job.nameJob}' WHERE id=${id}`)
}
const updateStatus= async(job)=>{
    await db.execute(`UPDATE job SET status = '${job.status}' WHERE id=${job.id}`)
 }

 const deleteAll =async ()=>{
    await db.execute(`DELETE FROM job `)
 }
module.exports={
    getJob,postJob,deleteJob, updateJob,updateStatus,deleteAll
}