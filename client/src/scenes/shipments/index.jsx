import { getShipments, createShipment, updateShipment, deleteShipment } from "../../api/shipments";
import { tokens } from "../../styles/theme";
import { Box, useTheme } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import DataGridContainer from "../../components/DataGridContainer";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import { formatDate } from "../../utils/formatters";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProductById } from "../../api/products";
import { getOrderById } from "../../api/orders";
import MoreInfoCell from "../../components/MoreInfoCell";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";

const ShipmentsPage = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

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
	} = useDataGridLogic(getShipments, deleteShipment);

	const handleCellClick = (api, id) => async () => {
		await handleGetItemById(id, api)(); // Call handleGetItemById with appropriate API function
	};

	const statusStyles = {
		pending: {
			backgroundColor: "red",
		},
		"in transit": {
			backgroundColor: "orange",
		},
		delivered: {
			backgroundColor: colors.greenAccent[600],
		},
		shipped: {
			backgroundColor: colors.blueAccent[500],
		},
	};

	const schema = [
		{ name: "product_id", label: "Product ID" },
		{ name: "order_id", label: "Order ID" },
		{ name: "quantity", label: "Quantity" },
		{ name: "shipment_date", label: "Shipment Date" },
		{ name: "estimated_arrival", label: "Estimated Arrival" },
		{ name: "status", label: "Staus" },
		{ name: "destination", label: "Destination" },
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
			field: "order_id",
			headerName: "Order ID",
			renderCell: (params) => {
				const { order_id } = params.row;
				return <MoreInfoCell api={getOrderById} id={order_id} click={handleCellClick} />;
			},
		},
		{
			field: "quantity",
			headerName: "Quantity",
		},
		{
			field: "shipment_date",
			headerName: "Shipment Date",
			flex: 0.2,
			renderCell: (params) => {
				const { shipment_date } = params.row;
				return formatDate(shipment_date);
			},
		},
		{
			field: "estimated_arrival",
			headerName: "Estimated Arrival",
			flex: 0.2,
			renderCell: (params) => {
				const { estimated_arrival } = params.row;
				return formatDate(estimated_arrival);
			},
		},
		{
			field: "status",
			headerName: "Staus",
			renderCell: (params) => {
				const status = params.value;
				const style = statusStyles[status] || {};
				return (
					<Box
						sx={{
							backgroundColor: style.backgroundColor,
							color: style.color,

							textAlign: "center",
						}}
					>
						{status}
					</Box>
				);
			},
		},
		{
			field: "destination",
			headerName: "Destination",
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
			<Header title="Shipments" subtitle="List of all of our shipments" />

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
					create={createShipment}
					update={updateShipment}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default ShipmentsPage;
