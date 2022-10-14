import {
	createTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import SystemColors from './Components/Common/SystemColors'
import Posts from './Pages/Posts'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})
function App() {
	const mdTheme = responsiveFontSizes(
		createTheme({
			typography: {
				fontFamily: `'Roboto','sans-serif'`,
				htmlFontSize: 10,
				fontSize: 16,
			},
			palette: {
				primary: SystemColors.primary,
				secondary: SystemColors.secondary,
			},
			breakpoints: {
				values: {
					xs: 0,
					sm: 640,
					md: 768,
					lg: 1024,
					xl: 1280,
				},
			},
			spacing: (factor: number) => `${0.25 * factor}rem`,
			components: {
				MuiTypography: {
					styleOverrides: {
						root: {
							fontWeight: '500',
						},
					},
				},
				MuiButton: {
					styleOverrides: {
						containedPrimary: {
							boxShadow: ' rgb(59 174 207 / 24%) 0px 8px 16px 0px',
							color: '#fff',
						},
						root: {
							borderRadius: '6px',
							textTransform: 'capitalize',
						},
					},
				},
				MuiDialog: {
					styleOverrides: {
						root: {
							'& .MuiPaper-root': {
								borderRadius: '20px',
							},
						},
					},
				},
				MuiCard: {
					styleOverrides: {
						root: {
							boxShadow: '0px 0px 21px rgba(218, 218, 218, 0.3)',
							borderRadius: '12px',
						},
					},
				},
				MuiFormControl: {
					styleOverrides: {
						root: {
							'& .MuiOutlinedInput-input': {
								color: '#969696',
							},
							'& .MuiInputLabel-root': {
								color: '#969696',
							},

							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderColor: '#E2E8F0',
									color: '#969696',
								},
							},
							'& .MuiInputBase-root': {
								borderRadius: '8px',
								color: '#969696',
								backgroundColor: '#ececec',
							},
						},
					},
				},

				MuiCssBaseline: {
					styleOverrides: {
						'@global': {
							fontFamily: `'Roboto','sans-serif'`,
							a: {
								textDecoration: 'none',
							},
						},
					},
				},
			},
		}),
	)
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={mdTheme}>
				<Routes>
					<Route path="/" element={<Posts />} />
				</Routes>
			</ThemeProvider>
		</QueryClientProvider>
	)
}

export default App
