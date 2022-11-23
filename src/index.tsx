import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App'
import './services/firebase'

const rootElement = document.getElementById('root')
ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    rootElement
)
