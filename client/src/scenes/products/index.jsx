import { getProducts, createProduct, updateProduct, deleteProduct } from "../../api/products";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import DataGridContainer from "../../components/DataGridContainer";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import { usdPrice, currencyFormatter } from "../../utils/formatters";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";

const ProductsPage = () => {
	const theme = useTheme();

	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
	} = useDataGridLogic(getProducts, deleteProduct);

	const schema = [
		{ name: "name", label: "Name" },
		{ name: "price", label: "Price" },
		{ name: "stock_quantity", label: "Stock Quantity" },
		{ name: "description", label: "Description" },
	];

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.2 },
		{
			field: "name",
			headerName: "Name",
			flex: 1,
			cellClassName: "name-column--cell",
		},
		{
			field: "price",
			headerName: "Price",
			...usdPrice,
		},
		{
			field: "stock_quantity",
			headerName: "Stock",
			type: "number",
		},

		...(isMobile
			? []
			: [
					{
						field: "total_value",
						headerName: "Total Value",
						flex: 1,
						renderCell: (params) => {
							const { price, stock_quantity } = params.row;
							const totalValue = (price * stock_quantity).toFixed(2);
							return currencyFormatter.format(totalValue);
						},
						cellClassName: "total-value-cell",
					},
					{ field: "description", headerName: "Description", flex: 2, editable: true },
			  ]),
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
			<Header title="Products" subtitle="List of all of our Products" />

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
					create={createProduct}
					update={updateProduct}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default ProductsPage;
