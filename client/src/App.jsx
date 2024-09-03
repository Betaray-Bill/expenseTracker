import { useEffect, useState } from 'react'
import './App.css'
import { useQuery } from '@tanstack/react-query';


function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://expensetracker-9qqp.onrender.com/')
      .then(response =>{
        console.log(response)
        setData( response.json())
      })
    }

    fetchData()
  }, [])

  return (
    <div className="container">
      HIii
      {
        // userData.data
      }
    </div>
  )
}

export default App
