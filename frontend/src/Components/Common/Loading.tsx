import { Container as MainContainer } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
	return (
		<MainContainer
			maxWidth="xl"
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Box sx={{ display: 'flex', height: '100%' }}>
				<CircularProgress />
			</Box>{' '}
		</MainContainer>
	)
}
