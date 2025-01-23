import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 class = "Main_Title">Productive Places</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div class = "nav_buttons">
        <button class = "Home">Home</button>
        <button class = "search">Search by Filter</button>
        <button class = "places">Places</button>
        <button class = "contact">Contact</button>
        <button class = "signUp">Sign-Up</button>
        <button class = "signIn">Sign-in</button>
      </div>
      <h2 class = "subtitle">Let's Find your favorite study spot</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} class = "countBttn">
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
