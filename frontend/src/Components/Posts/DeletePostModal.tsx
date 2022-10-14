import { POSTS_KEY } from '@/Pages/Posts'
import { deletePost } from '@/Utils/Http'
import { Item } from '@Components/Common/grid'
import BtnBase from '@Components/Common/ProgressUtils/BtnBase'
import { setProgress } from '@Components/Common/ProgressUtils/ProgressSvc'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { mutationOptions } from './mutations'
export type DeletePostModalProps = {
	handleClose: () => void
	deleteModal: {
		isOpen: boolean
		post_id: any | null
	}
}
const DELETE_BTN = 'DELETE_BTN'
const DeletePostModal = ({
	handleClose,
	deleteModal,
}: DeletePostModalProps) => {
	const queryClient = useQueryClient()

	const invalidate = () => queryClient.invalidateQueries([POSTS_KEY])

	const deleteMutation = useMutation(
		deletePost,
		mutationOptions(
			{},
			invalidate,
			() => {},
			DELETE_BTN,
			handleClose,
			'Post deleted successfully',
		),
	)

	const handleDelete = async () => {
		setProgress(DELETE_BTN, true)
		console.log(deleteModal.post_id)
		deleteMutation.mutate(deleteModal.post_id)
	}
	return (
		<Dialog
			onClose={handleClose}
			open={deleteModal.isOpen}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle
				sx={{
					mt: 5,
				}}
			>
				Delete Post
			</DialogTitle>
			<Typography
				variant="subtitle1"
				sx={{
					fontWeight: 400,
					textAlign: 'center',
					my: 12,
				}}
			>
				Are you sure you want to delete?
			</Typography>
			<DialogContent>
				<Item
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 15,
					}}
				>
					<BtnBase
						sx={{
							marginBottom: '20px',
						}}
						color="secondary"
						variant="outlined"
						onClick={handleClose}
					>
						Cancel
					</BtnBase>
					<BtnBase
						sx={{
							marginBottom: '20px',
						}}
						color="error"
						variant="outlined"
						onClick={handleDelete}
					>
						Delete
					</BtnBase>
				</Item>
			</DialogContent>
		</Dialog>
	)
}
export default DeletePostModal
