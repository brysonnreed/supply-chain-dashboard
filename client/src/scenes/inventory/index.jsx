import {
	getInventory,
	createInventory,
	updateInventory,
	deleteInventory,
} from "../../api/inventory";
import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import DataGridContainer from "../../components/DataGridContainer";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProductById } from "../../api/products";
import { getSupplierById } from "../../api/suppliers";
import MoreInfoCell from "../../components/MoreInfoCell";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";

const InventoryPage = () => {
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
		handleGetItemById,
	} = useDataGridLogic(getInventory, deleteInventory);

	const handleCellClick = (api, id) => async () => {
		await handleGetItemById(id, api)(); // Call handleGetItemById with appropriate API function
	};

	const schema = [
		{ name: "product_id", label: "Product ID" },
		{ name: "supplier_id", label: "Supplier ID" },
		{ name: "quantity", label: "Quantity" },
		{ name: "location", label: "Location" },
	];

	const columns = [
		{ field: "id", headerName: "ID" },
		{
			field: "product_id",
			headerName: "Product ID",
			renderCell: (params) => {
				const { product_id } = params.row;
				return <MoreInfoCell api={getProductById} id={product_id} click={handleCellClick} />;
			},
		},

		{
			field: "supplier_id",
			headerName: "Supplier ID",
			renderCell: (params) => {
				const { supplier_id } = params.row;
				return <MoreInfoCell api={getSupplierById} id={supplier_id} click={handleCellClick} />;
			},
		},
		{
			field: "quantity",
			headerName: "Quantity",
		},
		{
			field: "location",
			headerName: "Location",
			flex: 0.2,
		},

		{
			field: "actions",
			headerName: "Actions",
			headerAlign: "center",
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
			<Header title="Inventory" subtitle="List of all of our Inventory" />

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
					create={createInventory}
					update={updateInventory}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default InventoryPage;
