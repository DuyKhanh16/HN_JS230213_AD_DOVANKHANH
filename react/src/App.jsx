import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default function () {
  const [listJob, setListJob] = useState([]);
  const [flag, setFlag] = useState(5);
  const [bntCheck, setBntCheck] = useState(false);
  const [job, setjob] = useState({
    nameJob: "",
    status: "unfinished",
  });


  const callApi = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/listJobs");
    setListJob(res.data.data);
  };
  useEffect(() => {
    callApi();
  }, [flag]);
  

  const handlechange = (e) => {
    setjob({ ...job, nameJob: e.target.value });
  };
  const addJob = async () => {
    if (job.nameJob === "") {
      alert("khong duoc de trong");
  
    }else{
    try {
      const res = await axios.post("http://localhost:3000/api/v1/listJobs", job);
      setFlag(flag + 1);
      setjob({
         nameJob: "",
         status: "unfinished",
      })
    } catch (error) {
      console.log(error);
      alert(error.response.data.messenge);
    }
   
}

  };


  const deleteJob = async (item) => {
    let check = confirm("ban co muon xoa khong");
    if (check) {
        console.log(item);
      try {
        const res = await axios.delete(`http://localhost:3000/api/v1/listJobs/${item.id}`);
        setFlag(flag + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const editJob = async (item) => {
    const check = confirm("Bạn muốn sửa công việc này?");
    if (check) {
      setBntCheck(true);
      setjob(item);
    }
  };
  const edit = async () => {
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/listJobs/${job.id}`, job);
      setjob({
        nameJob: "",
        status: "unfinished",
      });
      setBntCheck(false);
      setFlag(flag + 1);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const cleanAll = async () => {
    let check = confirm("ban co muon xoa het khong");
    if (check) {
      try {
        const res = await axios.delete("http://localhost:3000/api/v1/listJobs");
        setFlag(flag + 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  
  const changeCheckbox = async (e) => {
    const check = confirm("Bạn đã hoàn thành công việc này?");
    if (check) {
      let a = listJob.findIndex((item) => item.id == e.target.value);
      if (e.target.checked == true) {
        listJob[a].status = "complete";
        const res = await axios.patch(`http://localhost:3000/api/v1/listJobs/${listJob[a].id}`, listJob[a]);
        setFlag(flag + 1);
      }
    }else{
      e.target.checked=false
    }
    console.log(e.target.checked)
  };
  return (
    <div
      style={{ backgroundColor: "rgb(91,186,216", padding: 30, height: 2000 }}
    >
      <div
        style={{
          width: 600,
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: 20 }}>List Todo</h1>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
            marginTop: 20,
            width: 550,
            marginLeft: 25,
          }}
        >
          <Form.Control
            type="text"
            placeholder="Normal text"
            onKeyDown={(e) => (e.key === "Enter" ? `${bntCheck?edit():addJob()}` : null)}
            onChange={handlechange}
            name="nameJob"
            value={job.nameJob}
          />
          {bntCheck ? (
            <Button
              onClick={edit}
              variant="danger"
              style={{ fontSize: 20, fontWeight: 700 }}
            >
              Edit
            </Button>
          ) : (
            <Button
              variant="success"
              style={{ fontSize: 20, fontWeight: 700 }}
              onClick={addJob}
            >
              Add
            </Button>
          )}
        </div>
        {listJob?.map((item, key) => {
          return (
            <div
              key={key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 550,
                margin: "0 auto",
                marginBottom: 20,
              }}
            >
              <p
                style={{ width:300,
                    marginTop:10, fontWeight:600,color:"tomato",
                  textDecoration: `${
                    item.status == "complete" ? "line-through" : "none"
                  }`,
                }}
              >
                {item.nameJob}
              </p>
              <p style={{marginTop:10}}>{item.status}</p>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    visibility: `${
                      item.status == "complete" ? "hidden" : "visbility"
                    }`,
                  }}
                  onChange={changeCheckbox}
                  value={item.id}
                />
                <Button
                  onClick={() => editJob(item)}
                  style={{
                    visibility: `${
                      item.status == "complete" ? "hidden" : "visbility"
                    }`,
                  }}
                  variant="warning"
                >
                  {" "}
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1558/PNG/512/353430-checkbox-edit-pen-pencil_107516.png"
                    alt=""
                  />
                </Button>
                <Button onClick={() => deleteJob(item)} variant="dark">
                  <img
                    width={30}
                    src="https://cdn.icon-icons.com/icons2/1880/PNG/96/iconfinder-trash-4341321_120557.png"
                    alt=""
                  />
                </Button>
              </div>
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 550,
            margin: "0 auto",
            paddingBottom: 20,
          }}
        >
          <p>You Have {listJob?.length} pending task</p>
          <Button onClick={cleanAll} variant="dark">
            CLEAN ALL
          </Button>
        </div>
      </div>
    </div>
  );
}
