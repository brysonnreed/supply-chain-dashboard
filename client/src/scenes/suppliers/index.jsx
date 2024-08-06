import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../../utils/formatters";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../../api/suppliers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DataGridContainer from "../../components/DataGridContainer";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";

const SuppliersPage = () => {
	const {
		rows,
		rowModesModel,
		setRows,
		setRowModesModel,
		handleDeleteClick,
		apiError,
		loading,
		error,
		modalOpen,
		handleViewClick,
		handleCloseModal,
		modalData,
		popupMode,
		popupOpen,
		setPopupOpen,
		selectedRow,
		handleAddClick,
		handleEditClick,
		handleRefresh,
	} = useDataGridLogic(getSuppliers, deleteSupplier);

	const schema = [
		{ name: "name", label: "Name" },
		{ name: "contact_info", label: "Contact Info" },
	];

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.2 },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{ field: "contact_info", headerName: "Contact Info", flex: 1 },
		{
			field: "created_at",
			headerName: "Created At",
			flex: 1,
			renderCell: (params) => {
				const { created_at } = params.row;
				return formatDate(created_at);
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			headerAlign: "center",
			flex: 1,
			renderCell: (params) => (
				<Box
					display={"flex"}
					gap={"4px"}
					justifyContent={"center"}
					alignItems={"center"}
					height={"100%"}
				>
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						onClick={() => handleEditClick(params.row)}
					/>
					<GridActionsCellItem
						icon={<VisibilityIcon />}
						label="View"
						onClick={handleViewClick(params.row)}
					/>
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(params.row.id)}
					/>
				</Box>
			),
		},
	];

	return (
		<Box m="20px">
			<Header title="Suppliers" subtitle="List of all of our active Suppliers" />

			<DataGridContainer
				rows={rows}
				columns={columns}
				setRows={setRows}
				rowModesModel={rowModesModel}
				setRowModesModel={setRowModesModel}
				loading={loading}
				error={error}
				apiError={apiError}
				handleAddClick={handleAddClick}
			/>
			{popupOpen === true && (
				<ModalCreateUpdate
					open={popupOpen}
					mode={popupMode}
					rowData={selectedRow}
					onClose={() => setPopupOpen(false)}
					create={createSupplier}
					update={updateSupplier}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default SuppliersPage;
