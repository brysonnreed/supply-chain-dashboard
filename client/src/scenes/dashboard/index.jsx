import { Box, useTheme } from "@mui/material";
import { tokens } from "../../styles/theme";
import Header from "../../components/Header";
import FinancialOverview from "../../components/Dashboard/FinancialOverview";
import { useEffect, useState } from "react";
import { getOrders } from "../../api/orders";
import { getProducts } from "../../api/products";
import { getCustomers } from "../../api/customers";
import { getInventory } from "../../api/inventory";
import { getShipments } from "../../api/shipments";
import ShipmentStatusOverview from "../../components/Dashboard/ShipmentStatus";
import InventoryBarChart from "../../components/Dashboard/InventoryValue";
import ModalComponent from "../../components/Modal/ModalViewComponent";
import CustomerList from "../../components/Dashboard/CustomerList";
import OrdersList from "../../components/Dashboard/OrdersList";

const Dashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// Modal state
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState(null);

	const handleViewClick = (data) => () => {
		setModalData(data);
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setModalData(null);
	};

	const [orders, setOrders] = useState([]);
	const [products, setProducts] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [inventory, setInventory] = useState([]);
	const [shipments, setShipments] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const ordersResponse = await getOrders();
				const productsResponse = await getProducts();
				const customersResponse = await getCustomers();
				const inventoryResponse = await getInventory();
				const shipmentsResponse = await getShipments();

				setOrders(ordersResponse);
				setProducts(productsResponse);
				setCustomers(customersResponse);
				setInventory(inventoryResponse);
				setShipments(shipmentsResponse);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	return (
		<Box m="20px" sx={{ height: "75vh" }}>
			{/* HEADER */}
			<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

			{/* GRID & CHARTS */}
			<Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="37.5vh" gap="20px">
				{/* ROW 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<ShipmentStatusOverview shipments={shipments} />
				</Box>
				<Box gridColumn="span 3" backgroundColor={colors.primary[400]} overflow="auto">
					<CustomerList customers={customers} handleViewClick={handleViewClick} />
				</Box>

				<Box gridColumn="span 6" backgroundColor={colors.primary[400]}>
					<InventoryBarChart inventory={inventory} products={products} />
				</Box>

				{/* ROW 2 */}
				<FinancialOverview products={products} orders={orders} />

				<Box gridColumn="span 4" backgroundColor={colors.primary[400]} overflow="auto">
					<OrdersList customers={customers} orders={orders} products={products} />
				</Box>
			</Box>
			<ModalComponent open={modalOpen} handleClose={handleCloseModal} data={modalData} />
		</Box>
	);
};

export default Dashboard;
