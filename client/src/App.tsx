
import React from 'react'
import './App.css'

type MyAppProps = {
  children?: React.ReactNode
}

const App: React.FC<MyAppProps> = (props) => {
  return <>
    {props.children}
  </>
}

export default App
