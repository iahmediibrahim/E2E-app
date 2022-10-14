import { TextFieldProps } from '@mui/material'
import { Controller, UseControllerProps, UseFormReturn } from 'react-hook-form'
import Input from './Input'

export type InputControllerProps = Omit<TextFieldProps, 'name'> &
	UseControllerProps & {
		name: string
		control: UseFormReturn['control']
		errors?: UseFormReturn['formState']['errors']
	}

export default function InputController({
	name,
	control,
	rules,
	defaultValue = '',
	ref,
	...otherProps
}: InputControllerProps) {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field }) => <Input {...otherProps} {...field} />}
			defaultValue={defaultValue}
		/>
	)
}
