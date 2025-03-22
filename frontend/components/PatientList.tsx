import React, { useEffect, useState } from 'react';

type Patient = {
  patient_id: number;
  doctor_id: number;
  name: string;
  diagnosis: string;
};

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/patients')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Confirm you're receiving data
        setPatients(data);
      })
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  return (
    <div>
      <h2>Patient List</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.patient_id}>
            {patient.name} - {patient.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
