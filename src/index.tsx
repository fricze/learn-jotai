import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './services/firebase'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
)
