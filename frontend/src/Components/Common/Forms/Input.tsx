import { TextField, TextFieldProps } from '@mui/material'
import { get } from 'lodash'
import { forwardRef } from 'react'
import {
	FieldError,
	FieldErrorsImpl,
	Merge,
	UseFormReturn,
} from 'react-hook-form'

type ExtraProps = {
	errors?: UseFormReturn['formState']['errors']
}

const Input = forwardRef<HTMLInputElement, TextFieldProps & ExtraProps>(
	(
		{ errors, name, variant = 'outlined', margin = 'normal', ...otherProps },
		ref,
	) => {
		let errorMsg: any = null
		if (errors && name && get(errors, name)?.type) {
			const error:
				| FieldError
				| Merge<FieldError, FieldErrorsImpl<any>>
				| undefined = get(errors, name)
			errorMsg =
				error?.type === 'required'
					? 'This field is required'
					: errorMsg || 'Invalid input'
		}

		return (
			<TextField
				size="medium"
				margin={margin}
				name={name}
				error={!!errorMsg}
				helperText={errorMsg}
				inputRef={ref}
				fullWidth
				{...otherProps}
				variant={variant}
			/>
		)
	},
)

export default Input
