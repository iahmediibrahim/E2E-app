import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'

export type ExtraBtnProps = {
	isLoading?: boolean
	startIcon?: React.ReactNode
}

export type BtnProps<C extends React.ElementType> = ButtonProps<
	C,
	{ component?: C }
> &
	ExtraBtnProps

export default function BtnBase<C extends React.ElementType = 'button'>({
	children,
	isLoading,
	startIcon,
	size = 'large',
	...otherProps
}: BtnProps<C>) {
	return (
		<Button
			size={size}
			fullWidth
			color="primary"
			variant="contained"
			disableElevation
			disabled={isLoading}
			startIcon={startIcon}
			{...otherProps}
		>
			{isLoading ? <CircularProgress size={26} /> : children}
		</Button>
	)
}
