
import React from 'react'
import './App.css'
import { Button } from './utils/reusableComponents/Button/Button'
import { useNavigate } from 'react-router-dom'

type MyAppProps = {
  children?: React.ReactNode
}

export const Home: React.FC<MyAppProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
        <h1>U2017 Class Album</h1>
        <Button onClick={() => navigate('/users')}>View Class Members</Button>
        {children}
      </div>
    </>
  )
}
