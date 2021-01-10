import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import theme from './theme'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme.dark}>
            <CssBaseline />
            <App />
        </ThemeProvider>
        <ToastContainer />
    </React.StrictMode>,
    document.getElementById('root')
)
