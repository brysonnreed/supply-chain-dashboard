import { useState, useEffect } from "react";

const useDataGridLogic = (fetchData, deleteItem) => {
	const [rows, setRows] = useState([]); // Initialize with empty array
	const [rowModesModel, setRowModesModel] = useState({});
	const [loading, setLoading] = useState(true);
	const [apiError, setApiError] = useState("");
	const [error, setError] = useState(null);

	// Modal state
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);

	// Add/Edit Popup
	const [popupOpen, setPopupOpen] = useState(false);
	const [popupMode, setPopupMode] = useState("add"); // 'add' or 'edit'
	const [selectedRow, setSelectedRow] = useState(null);

	useEffect(() => {
		const fetchRows = async () => {
			try {
				const data = await fetchData();
				setRows(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchRows();
	}, [fetchData]);

	const fetchDataUpdate = async () => {
		try {
			const data = await fetchData();
			setRows(data);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleRefresh = () => {
		fetchDataUpdate(); // Refresh data
	};

	const handleEditClick = (item) => {
		setSelectedRow(item);
		setPopupMode("edit");
		setPopupOpen(true);
	};

	const handleAddClick = () => {
		setSelectedRow(null);
		setPopupMode("add");
		setPopupOpen(true);
	};

	const handleDeleteClick = (id) => async () => {
		try {
			await deleteItem(id);
			setRows((prev) => prev.filter((row) => row.id !== id));
		} catch (error) {
			console.error("Failed to delete row:", error);
		}
	};

	const handleGetItemById = (id, api) => async () => {
		try {
			const data = await api(id);
			setModalData(data);
			setModalOpen(true);
		} catch (error) {
			console.error("Failed to get item by ID: ", error);
		}
	};

	const handleViewClick = (data) => () => {
		setModalData(data);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setModalData(null);
	};

	return {
		rows,
		rowModesModel,
		setRows,
		setRowModesModel,
		handleDeleteClick,
		apiError,
		setApiError,
		error,
		loading,
		modalOpen,
		handleViewClick,
		handleCloseModal,
		modalData,
		handleGetItemById,
		popupMode,
		popupOpen,
		setPopupOpen,
		selectedRow,
		handleAddClick,
		handleEditClick,
		handleRefresh,
	};
};

export default useDataGridLogic;
