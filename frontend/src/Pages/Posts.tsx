import { loadPosts } from '@/Utils/Http'
import { Container, Item } from '@Components/Common/grid'
import Loading from '@Components/Common/Loading'
import CreatePostModal from '@Components/Posts/CreatePostModal'
import DeletePostModal from '@Components/Posts/DeletePostModal'
import { Add, BorderColor, Delete } from '@mui/icons-material/'
import {
	Button,
	Card,
	Container as MainContainer,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
export const POSTS_KEY = 'POSTS'
const Posts = () => {
	const { data, error, isLoading } = useQuery(
		[POSTS_KEY],
		async () => await loadPosts(),
	)
	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		post_id: null,
	})
	const [createModal, setCreateModal] = useState({
		isOpen: false,
		post: null,
	})
	if (isLoading) return <Loading />
	if (error)
		return (
			<MainContainer
				sx={{
					my: 30,
				}}
			>
				<Typography variant="h4" sx={{ textAlign: 'center' }}>
					Error loading posts
				</Typography>
			</MainContainer>
		)
	return (
		<MainContainer
			sx={{
				my: 30,
			}}
		>
			<Container
				sx={{
					pt: 30,
					mb: 12,
				}}
				justifyContent="space-between"
				alignItems="center"
			>
				<Item>
					<Typography variant="h4">Posts</Typography>
				</Item>
				<Item>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setCreateModal({ isOpen: true, post: null })}
					>
						<Add />
						New Post
					</Button>
				</Item>
			</Container>

			<TableContainer component={Card}>
				<Table sx={{ minWidth: 250 }}>
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Body</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							?.sort(
								(a, b) =>
									(new Date(b.updatedAt) as any) -
									(new Date(a.updatedAt) as any),
							)
							.map((post) => (
								<TableRow key={post._id}>
									<TableCell component="th" scope="row">
										{post.title}
									</TableCell>
									<TableCell>{post.body}</TableCell>

									<TableCell>
										<Button
											variant="outlined"
											color="primary"
											onClick={() => setCreateModal({ isOpen: true, post })}
										>
											<BorderColor />
										</Button>
										<Button
											variant="outlined"
											color="error"
											sx={{
												ml: 4,
											}}
											onClick={() =>
												setDeleteModal({ isOpen: true, post_id: post._id })
											}
										>
											<Delete />
										</Button>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<CreatePostModal
				handleClose={() =>
					setCreateModal({
						isOpen: false,
						post: null,
					})
				}
				createModal={createModal}
			/>
			<DeletePostModal
				handleClose={() =>
					setDeleteModal({
						isOpen: false,
						post_id: null,
					})
				}
				deleteModal={deleteModal}
			/>
		</MainContainer>
	)
}
export default Posts
