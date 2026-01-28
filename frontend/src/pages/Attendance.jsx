import React,{useState} from 'react'
import api from '../api/axios'

export default function Attendance(){
  const [data,setData]=useState({employee_id:'',date:'',status:'Present'})

  const submit=()=>{
    if(!data.employee_id || !data.date){
      alert("All fields required")
      return
    }
    api.post('/attendance',data).then(()=>{
      alert("Attendance marked")
      setData({employee_id:'',date:'',status:'Present'})
    })
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Attendance Management</h1>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Mark Attendance</h3>

        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Employee ID"
            value={data.employee_id}
            onChange={e=>setData({...data,employee_id:e.target.value})}
          />

          <input style={styles.input} type="date"
            value={data.date}
            onChange={e=>setData({...data,date:e.target.value})}
          />

          <select style={styles.input}
            value={data.status}
            onChange={e=>setData({...data,status:e.target.value})}>
            <option>Present</option>
            <option>Absent</option>
          </select>
        </div>

        <button style={styles.button} onClick={submit}>Submit Attendance</button>
      </div>
    </div>
  )
}

const styles = {
  page:{
    padding:'30px',
    background:'#f6f8fb',
    minHeight:'100vh',
    fontFamily:'Arial, sans-serif'
  },
  title:{
    marginBottom:'20px',
    fontSize:'26px',
    fontWeight:'600'
  },
  card:{
    background:'#fff',
    padding:'20px',
    borderRadius:'10px',
    boxShadow:'0 4px 12px rgba(0,0,0,0.05)',
    maxWidth:'600px'
  },
  cardTitle:{
    marginBottom:'15px',
    fontSize:'18px',
    fontWeight:'600'
  },
  formGrid:{
    display:'grid',
    gridTemplateColumns:'1fr',
    gap:'12px',
    marginBottom:'15px'
  },
  input:{
    padding:'10px',
    borderRadius:'6px',
    border:'1px solid #ddd',
    fontSize:'14px'
  },
  button:{
    padding:'10px 18px',
    border:'none',
    borderRadius:'6px',
    background:'#16a34a',
    color:'#fff',
    cursor:'pointer',
    fontSize:'14px'
  }
}
