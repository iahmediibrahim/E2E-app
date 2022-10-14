import Loading from '@Components/Common/Loading'
import { CssBaseline } from '@mui/material'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import ScrollToTop from './Components/Common/ScrollToTop'
import './index.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Suspense fallback={<Loading />}>
			<CssBaseline />
			<BrowserRouter>
				<ScrollToTop />
				<App />
				<ToastContainer hideProgressBar autoClose={3000} />
			</BrowserRouter>
		</Suspense>
	</React.StrictMode>,
)
