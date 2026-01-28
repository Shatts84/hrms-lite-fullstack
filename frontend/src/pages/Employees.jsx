import React, { useEffect, useState } from 'react'
import api from '../api/axios'

export default function Employees() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  })
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const load = () => {
    api.get('/employees').then(r => setList(r.data))
  }

  useEffect(() => { load() }, [])

  const submit = () => {
    if (form.employee_id.trim().length < 3) {
      alert("Employee ID must be at least 3 characters")
      return
    }

    if (!form.full_name.trim()) {
      alert("Full name is required")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      alert("Enter a valid email address")
      return
    }

    if (!form.department.trim()) {
      alert("Department is required")
      return
    }

    setLoading(true)

    const req = editing
      ? api.put(`/employees/${form.employee_id}`, form)
      : api.post('/employees', form)

    req.then(() => {
      resetForm()
      load()
    })
      .catch(err => {
        if (err.response?.status === 409) {
          alert("Employee ID already exists")
        } else {
          alert("Failed to save employee")
        }
      })
      .finally(() => setLoading(false))
  }

  const resetForm = () => {
    setForm({ employee_id: '', full_name: '', email: '', department: '' })
    setEditing(false)
  }

  const editEmployee = emp => {
    setForm(emp)
    setEditing(true)
  }

  const deleteEmployee = id => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      api.delete(`/employees/${id}`).then(load)
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Employee Management</h1>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>
          {editing ? "Update Employee" : "Add New Employee"}
        </h3>

        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Employee ID"
            value={form.employee_id}
            disabled={editing}
            onChange={e => setForm({ ...form, employee_id: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Full Name"
            value={form.full_name}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Email Address"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            style={styles.input}
            placeholder="Department"
            value={form.department}
            onChange={e => setForm({ ...form, department: e.target.value })}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={styles.button} onClick={submit} disabled={loading}>
            {loading ? "Saving..." : editing ? "Update" : "Add"}
          </button>

          {editing && (
            <button style={styles.cancelBtn} onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Employee List</h3>

        {list.length === 0 ? (
          <p style={styles.empty}>No employees added yet</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map(e => (
                <tr key={e.employee_id}>
                  <td>{e.employee_id}</td>
                  <td>{e.full_name}</td>
                  <td>{e.email}</td>
                  <td>{e.department}</td>
                  <td>
                    <button style={styles.editBtn} onClick={() => editEmployee(e)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => deleteEmployee(e.employee_id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    padding: '30px',
    background: '#f6f8fb',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    marginBottom: '20px',
    fontSize: '26px',
    fontWeight: '600'
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    marginBottom: '25px'
  },
  cardTitle: {
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '600'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '15px'
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none'
  },
  button: {
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer'
  },
  cancelBtn: {
    padding: '10px 18px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  empty: {
    color: '#777',
    fontStyle: 'italic'
  },
  editBtn: {
    marginRight: '8px',
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    background: '#f59e0b',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px'
  },
  deleteBtn: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    background: '#dc2626',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px'
  }
}
