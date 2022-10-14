import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { mapValidationErrors } from './MapValidationErrors'

// new API GATEWAY
let baseUrl = import.meta.env.VITE_BASE_URL
console.log('API GATEWAY', import.meta.env)
const GETJSON = async (uri: string, params?: any) => {
	const result = await axios.get(baseUrl + uri, {
		params,
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (result.status === 200) return result.data
}

const POSTJSON = async (uri: string, body?: any) => {
	const result = await axios.post(baseUrl + uri, JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (result.status === 200) return result.data
}

const PUTJSON = async (uri: string, body?: any) => {
	const result = await axios.put(baseUrl + uri, JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (result.status === 200) return result.data
}

const DELETEJSON = async (uri: string) => {
	const result = await axios.delete(baseUrl + uri, {
		headers: {
			'Content-Type': 'application/json',
		},
	})
	if (result.status !== 200) {
		const err = await result.data
		if (err.startsWith('{') && err.endsWith('}')) {
			const errAsJson = JSON.parse(err)
			throw Error(errAsJson.message)
		} else {
			throw Error(err)
		}
	}
}
//  ============================ POSTS  ==================================  //

export const loadPosts: () => Promise<Array<any>> = async () => {
	const resp = await GETJSON('posts')
	return resp
}
export const loadPost: (id: any) => Promise<any> = async (id: any) => {
	const resp = await GETJSON('posts/' + id)
	return resp
}
export const createPost: (payload: any) => Promise<Array<any>> = async (
	payload,
) => {
	const resp = await POSTJSON('posts', payload)
	return resp
}
export const editPost: ({
	id,
	payload,
}: {
	id: any
	payload: any
}) => Promise<Array<any>> = async ({ id, payload }) => {
	const resp = await PUTJSON(`posts/${id}`, payload)
	return resp
}
export const deletePost: (id: any) => Promise<any> = async (id: any) => {
	const resp = await DELETEJSON('posts/' + id)
	return resp
}

//  ============================ HANDLE ERRORS  ==================================  //

export const handleError = (
	error: AxiosError,
	options: Options = {},
	popupError: boolean = false,
) => {
	const serverResponse = error.response

	if (serverResponse) {
		handleErrorResponse(serverResponse, options, popupError)
	} else if (error.request) {
		handleErrorRequest(error.request)
	} else {
		handleErrorRequest(error.request)
	}
}

export const handleErrorRequest = (request: any) => {
	toast.error('We are facing some issues, please try again after sometime.')
}

export const handleErrorResponse = (
	response: AxiosResponse,
	options: Options,
	popupError: boolean,
) => {
	const status = response.status
	switch (status) {
		case 400:
			if (response.data.errors !== undefined) {
				handleUnprocessableEntity(
					response.data.errors,
					status,
					options,
					popupError,
				)
			} else {
				handleUnprocessableEntity(response.data, status, options, popupError)
			}
			break
		case 401:
			if (response.statusText === 'Unauthorized') {
				localStorage.setItem('loggedIn', JSON.stringify(false))
				handleServerError(status, options)
				window.location.replace('/') // redirect to home page
			}
			break
		case 422:
			if (response.data.errors !== undefined) {
				handleUnprocessableEntity(
					response.data.errors,
					status,
					options,
					popupError,
				)
			} else {
				handleUnprocessableEntity(response.data, status, options, popupError)
			}
			break
		case 500:
		case 501:
		case 502:
		case 503:
		case 504:
			handleServerError(status, options)
			break
		default:
			if (response.data.errors !== undefined) {
				handleUnprocessableEntity(
					response.data.errors,
					status,
					options,
					popupError,
				)
			} else {
				handleUnprocessableEntity(response.data, status, options, popupError)
			}
			// handleServerError(status, options)
			break
	}
}

export const handleUnprocessableEntity = (
	errors: any,
	status: number,
	options: Options,
	popupError: boolean,
) => {
	let Error = [] as Array<string>
	if (options.setError) {
		const setError = options.setError
		mapValidationErrors(errors).forEach(({ name, message, type }) => {
			if (!popupError) {
				setError(name, { type, message })
			}

			Error.push(message)
		})
	}
	if (popupError && Error.length > 0) {
		toast.error(Error.join())
	} else {
		toast.error('Something went wrong, please try again.')
	}
}

const handleServerError = (status: number, options: Options) => {
	if (shouldToast(status, options.toast)) {
		toast.error('Service Unavailable, please try again later!')
	}
}

const shouldToast = (status: number, toastOptions: Options['toast']) => {
	if (toastOptions === undefined || toastOptions === true) {
		return true
	}

	if (toastOptions === false) {
		return false
	}

	if (toastOptions[status] === undefined || toastOptions[status] === true) {
		return true
	}

	return false
}

export type Options = {
	toast?:
		| boolean
		| {
				[status: number]: boolean
		  }
	// setError?: UseFormReturn['setError']
	setError?: any
}
