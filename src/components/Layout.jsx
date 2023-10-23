import {React, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'

import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

export default function Layout(){
  const navigate = useNavigate();
  const [count, setCount] = useState(0)

  useEffect(() => {
    navigate(`/materials`)
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
    )
}