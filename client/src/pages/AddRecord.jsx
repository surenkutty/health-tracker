import { useState } from 'react'

function AddRecord() {
  const [form, setForm] = useState({
    date: '',
    weight: '',
    bloodPressure: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(form)
    alert('Record Added!')
    setForm({ date: '', weight: '', bloodPressure: '' })
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Health Record</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input 
          type="date" 
          name="date" 
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded" 
          required
        />
        <input 
          type="number" 
          name="weight" 
          value={form.weight}
          placeholder="Weight (kg)" 
          onChange={handleChange}
          className="w-full border p-2 rounded" 
          required
        />
        <input 
          type="text" 
          name="bloodPressure" 
          value={form.bloodPressure}
          placeholder="Blood Pressure (e.g. 120/80)" 
          onChange={handleChange}
          className="w-full border p-2 rounded" 
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Record
        </button>
      </form>
    </div>
  )
}

export default AddRecord
