import { handleError } from '@/Utils/Http'
import { setProgress } from '@Components/Common/ProgressUtils/ProgressSvc'
import { AxiosError } from 'axios'
import { UseFormStateReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

export const mutationOptions = (
	errors: UseFormStateReturn<any>['errors'],
	invalidate: () => void,
	reset: () => void,
	btn_name: string,
	handleClose: () => void,
	successMessage: string,
) => {
	return {
		onSuccess: () => {
			invalidate()
			reset()
			toast.success(successMessage)
			setProgress(btn_name, false)
			handleClose()
		},
		onError: (error: AxiosError) => {
			setProgress(btn_name, false)
			handleError(error, { setError: errors }, true)
		},
	}
}
