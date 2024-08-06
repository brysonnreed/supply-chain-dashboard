import { Box } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { getCustomers, deleteCustomer, createCustomer, updateCustomer } from "../../api/customers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalCreateUpdate from "../../components/Modal/ModalCreateUpdate";
import useMediaQuery from "@mui/material/useMediaQuery";
import useDataGridLogic from "../../hooks/useDataGridLogic";
import DataGridContainer from "../../components/DataGridContainer";
import ModalComponent from "../../components/Modal/ModalViewComponent";

const Customers = () => {
	const theme = useTheme();

	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
	} = useDataGridLogic(getCustomers, deleteCustomer);

	const schema = [
		{ name: "name", label: "Name" },
		{ name: "email", label: "Email" },
		{ name: "address", label: "Address" },
		{ name: "phone_number", label: "Phone Number" },
	];

	const columns = [
		{ field: "id", headerName: "ID", flex: isMobile ? 1 : 0.5 },
		{
			field: "name",
			headerName: "Name",
			flex: isMobile ? 2 : 1,
			cellClassName: "name-column--cell",
		},
		...(isMobile
			? []
			: [
					{ field: "email", headerName: "Email", flex: 1 },
					{ field: "address", headerName: "Address", flex: 1 },
					{ field: "phone_number", headerName: "Phone Number", flex: 1 },
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
			<Header title="Customers" subtitle="List of all of our active customers" />

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
					create={createCustomer}
					update={updateCustomer}
					schema={schema}
					onRefresh={handleRefresh}
				/>
			)}
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default Customers;
