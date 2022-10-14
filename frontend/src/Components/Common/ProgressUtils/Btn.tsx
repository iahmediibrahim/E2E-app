import React from 'react'
import BtnBase, { BtnProps } from './BtnBase'
import ProgressContainer, {
	ProgressOuterContainerProps,
} from './ProgressContainer'

export type BtnProgressProps<C extends React.ElementType> =
	ProgressOuterContainerProps & BtnProps<C>

export default function Btn<C extends React.ElementType>({
	initial,
	name,
	...btnProps
}: BtnProgressProps<C>) {
	return (
		<ProgressContainer initial={initial} name={name}>
			{(progress) => <BtnBase isLoading={progress} {...btnProps} />}
		</ProgressContainer>
	)
}
