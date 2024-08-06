import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	Grid,
	Divider,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";

const ModalComponent = ({ open, handleClose, data }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth="sm"
			fullWidth
			sx={{
				maxHeight: "60vh",
				overflowY: "auto",
				margin: "auto",
			}}
		>
			<DialogTitle variant="h2">Details</DialogTitle>
			<DialogContent dividers>
				{data ? (
					<Grid container spacing={2}>
						{Object.entries(data).map(([key, value]) => (
							<Grid item xs={12} key={key}>
								<Typography variant="subtitle1" color="textPrimary">
									<strong>{key}:</strong>
								</Typography>
								<Typography variant="body1" color="textSecondary">
									{value}
								</Typography>
								<Divider sx={{ my: 1 }} /> {/* Adds a horizontal line for separation */}
							</Grid>
						))}
					</Grid>
				) : (
					<Typography variant="body1" color="textSecondary">
						No data available
					</Typography>
				)}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					variant="contained"
					style={{ background: colors.blueAccent[500] }}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalComponent;
