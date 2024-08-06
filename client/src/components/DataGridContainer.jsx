import React, { useRef } from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { tokens } from "../styles/theme";
import LinearProgress from "@mui/material/LinearProgress";

const DataGridContainer = ({
	rows,
	setRows,
	columns,
	rowModesModel,
	setRowModesModel,
	loading,
	error,
	apiError,
	handleAddClick,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const gridContainerRef = useRef(null);

	const EditToolbar = () => {
		return (
			<GridToolbarContainer>
				<Button
					variant="contained"
					style={{ background: colors.blueAccent[500] }}
					onClick={handleAddClick}
				>
					Add
				</Button>
				<GridToolbarExport />
			</GridToolbarContainer>
		);
	};

	// Set the initial sort model to sort by 'id' in ascending order
	const sortModel = [
		{
			field: "id",
			sort: "asc",
		},
	];

	if (loading) {
		return (
			<Box sx={{ width: "100%" }}>
				<LinearProgress color="info" />
			</Box>
		);
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<>
			{apiError && <div className="error-message">{apiError}</div>}
			<Box
				m="40px 0 0 0"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none",
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none",
					},
					"& .name-column--cell": {
						color: colors.blueAccent[300],
					},
					"& .MuiDataGrid-virtualScroller": {
						backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
						borderTop: "none",
						backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
						color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
						color: `${colors.grey[100]} !important`,
					},
					"& .total-value-cell": {
						color: colors.greenAccent[500],
					},
					".headerAlignRight": {
						textAlign: "right !important",
					},
				}}
				ref={gridContainerRef}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
					slots={{
						toolbar: EditToolbar,
					}}
					slotsProps={{
						toolbar: { setRows, setRowModesModel, rows },
					}}
					sortModel={sortModel}
				/>
			</Box>
		</>
	);
};

export default DataGridContainer;
