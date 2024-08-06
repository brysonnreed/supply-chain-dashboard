import { getOrders, createOrder, updateOrder, deleteOrder } from "../../api/orders";
import { tokens } from "../../styles/theme";
import { Box, useTheme } from "@mui/material";
import { GridActionsCellItem, GRID_STRING_COL_DEF } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import DataGridContainer from "../../components/DataGridContainer";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import { formatDate } from "../../utils/formatters";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getProductById } from "../../api/products";
import { getCustomerById } from "../../api/customers";
import { getShipmentById } from "../../api/shipments";
import MoreInfoCell from "../../components/MoreInfoCell";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";
import dayjs from "dayjs";

const OrdersPage = () => {
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
	} = useDataGridLogic(getOrders, deleteOrder);

	const handleCellClick = (api, id) => async () => {
		await handleGetItemById(id, api)(); // Call handleGetItemById with appropriate API function
	};

	// Preprocess data to calculate the number of orders for each day in the last week
	const preprocessOrderData = (orders) => {
		const now = dayjs();
		const thirtyDaysAgo = now.subtract(7, "day");

		// Initialize an array for the last 30 days
		const days = Array.from({ length: 7 }, (_, i) =>
			now.subtract(i, "day").format("YYYY-MM-DD")
		).reverse();
		const orderCounts = days.reduce((acc, day) => ({ ...acc, [day]: 0 }), {});

		// Count orders for each day
		orders.forEach((order) => {
			const createdAt = dayjs(order.created_at).format("YYYY-MM-DD");
			if (dayjs(order.created_at).isAfter(thirtyDaysAgo)) {
				orderCounts[createdAt] = (orderCounts[createdAt] || 0) + 1;
			}
		});

		// Convert to array of values for the sparkline
		return days.map((day) => orderCounts[day] || 0);
	};

	// Convert rows data to sparkline data
	const sparklineData = preprocessOrderData(rows);

	function GridSparklineCell(props) {
		if (props.value == null) {
			return null;
		}

		return (
			<SparkLineChart
				data={props.value}
				width={props.colDef.computedWidth}
				plotType={props.plotType}
			/>
		);
	}

	const sparklineColumnType = {
		...GRID_STRING_COL_DEF,
		type: "custom",
		resizable: false,
		filterable: false,
		sortable: false,
		editable: false,
		groupable: false,
		renderCell: (params) => <GridSparklineCell {...params} />,
	};

	const statusStyles = {
		pending: {
			backgroundColor: "orange",
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
		{ name: "customer_id", label: "Customer ID" },
		{ name: "shipment_id", label: "Shipment ID" },
		{ name: "quantity", label: "Quantity" },
		{ name: "status", label: "Status" },
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
			field: "customer_id",
			headerName: "Customer ID",
			renderCell: (params) => {
				const { customer_id } = params.row;
				return <MoreInfoCell api={getCustomerById} id={customer_id} click={handleCellClick} />;
			},
		},
		{
			field: "shipment_id",
			headerName: "Shipment ID",
			renderCell: (params) => {
				const { shipment_id } = params.row;
				return <MoreInfoCell api={getShipmentById} id={shipment_id} click={handleCellClick} />;
			},
		},
		{
			field: "quantity",
			headerName: "Quantity",
		},
		{
			field: "order_date",
			headerName: "Order Date",
			flex: 0.2,
			renderCell: (params) => {
				const { order_date } = params.row;
				return formatDate(order_date);
			},
		},
		{
			field: "ordersOverLastWeek",
			headerName: "Orders Over Last Week",
			...sparklineColumnType,
			width: 200,
			valueGetter: () => sparklineData,
		},

		{
			field: "status",
			headerName: "Status",
			valueOptions: ["pending", "shipped", "in transit", "delivered"],

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
			<Header title="Orders" subtitle="List of all of our orders" />

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
					create={createOrder}
					update={updateOrder}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default OrdersPage;
