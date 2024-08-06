import React, { useState, useEffect } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	useTheme,
} from "@mui/material";
import { tokens } from "../../styles/theme";

const ModalCreateUpdate = ({ open, onClose, mode, rowData, schema, onRefresh, create, update }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [formData, setFormData] = useState({});

	useEffect(() => {
		if (mode === "edit" && rowData) {
			setFormData(rowData);
		} else {
			setFormData(schema.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
		}
	}, [mode, rowData, schema]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		try {
			if (mode === "add") {
				await create(formData);
			} else if (mode === "edit") {
				await update(rowData.id, formData);
			}

			if (onRefresh) {
				onRefresh(); // Trigger the data refresh
			}

			onClose(); // Close the popup after submission
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle variant="h2">{mode === "add" ? "Add" : "Edit"}</DialogTitle>
			<DialogContent>
				{schema.map((field) => (
					<TextField
						key={field.name}
						autoFocus={field.autoFocus}
						margin="dense"
						label={field.label}
						name={field.name}
						fullWidth
						value={formData[field.name] || ""}
						onChange={handleChange}
						color="success"
					/>
				))}
			</DialogContent>
			<DialogActions sx={{ padding: "24px" }}>
				<Button
					onClick={onClose}
					variant="outlined"
					style={{ borderColor: colors.redAccent[500], color: colors.redAccent[100] }}
				>
					Cancel
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					style={{ background: colors.greenAccent[600] }}
				>
					{mode === "add" ? "Add" : "Save"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalCreateUpdate;
