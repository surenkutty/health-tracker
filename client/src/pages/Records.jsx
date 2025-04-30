import { useState } from 'react'

function Records() {
  const [records, setRecords] = useState([
    { date: '2025-04-27', weight: 68, bloodPressure: '120/80' },
    { date: '2025-04-28', weight: 67.5, bloodPressure: '118/78' },
  ])

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Health Records</h2>
      <div className="space-y-4">
        {records.map((record, index) => (
          <div key={index} className="p-4 border rounded shadow-md">
            <p><span className="font-semibold">Date:</span> {record.date}</p>
            <p><span className="font-semibold">Weight:</span> {record.weight} kg</p>
            <p><span className="font-semibold">Blood Pressure:</span> {record.bloodPressure}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Records
