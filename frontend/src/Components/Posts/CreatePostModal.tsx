import { POSTS_KEY } from '@/Pages/Posts'
import { createPost, editPost } from '@/Utils/Http'
import InputController from '@Components/Common/Forms/InputController'
import { Item } from '@Components/Common/grid'
import BtnBase from '@Components/Common/ProgressUtils/BtnBase'
import { setProgress } from '@Components/Common/ProgressUtils/ProgressSvc'
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { mutationOptions } from './mutations'
export type CreatePostModalProps = {
	handleClose: () => void
	createModal: {
		isOpen: boolean
		post?: any | null
	}
}
export type CreatePostForm = {
	title?: string
	body?: string
}

const defaultValues: CreatePostForm = {
	title: '',
	body: '',
}
const CREATE_BTN = 'CREATE_BTN'
const CreatePostModal = ({
	handleClose,
	createModal,
}: CreatePostModalProps) => {
	const queryClient = useQueryClient()
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm({
		defaultValues,
	})
	const invalidate = () => queryClient.invalidateQueries([POSTS_KEY])

	const createMutation = useMutation(
		createPost,
		mutationOptions(
			{},
			invalidate,
			() => reset(),
			CREATE_BTN,
			handleClose,
			'Post Created successfully',
		),
	)
	const editMutation = useMutation(
		editPost,
		mutationOptions(
			{},
			invalidate,
			() => reset(),
			CREATE_BTN,
			handleClose,
			'Post Modified successfully',
		),
	)
	const handleCancel = () => {
		reset(defaultValues)
		handleClose()
	}
	const handleSave = async (data: CreatePostForm) => {
		setProgress(CREATE_BTN, true)
		if (createModal.post) {
			editMutation.mutate({ id: createModal?.post?._id, payload: data })
		} else {
			createMutation.mutate(data)
		}
	}
	useEffect(() => {
		if (createModal?.post) {
			reset({ ...createModal.post })
		} else {
			reset(defaultValues)
		}
	}, [createModal?.post])
	return (
		<Dialog
			onClose={handleClose}
			open={createModal.isOpen}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle
				sx={{
					mt: 5,
				}}
			>
				{createModal?.post ? 'Edit Post' : 'Create Post'}
			</DialogTitle>
			<DialogContent>
				<Box component="form" onSubmit={handleSubmit(handleSave)}>
					<InputController
						label={'Title'}
						name="title"
						margin="normal"
						errors={errors}
						control={control}
						rules={{ required: true }}
					/>
					<InputController
						label={'Description'}
						name="body"
						errors={errors}
						control={control}
						rows={4}
						multiline
						rules={{ required: true }}
					/>
					<Item
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 15,
							mt: 12,
						}}
					>
						<BtnBase
							sx={{
								marginBottom: '20px',
							}}
							variant="outlined"
							color="secondary"
							onClick={handleCancel}
						>
							Cancel
						</BtnBase>
						<BtnBase
							sx={{
								marginBottom: '20px',
							}}
							color="primary"
							variant="outlined"
							type="submit"
						>
							{createModal?.post ? 'Edit' : 'Create'}
						</BtnBase>
					</Item>
				</Box>
			</DialogContent>
		</Dialog>
	)
}
export default CreatePostModal
