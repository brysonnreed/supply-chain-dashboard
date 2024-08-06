import "./styles/global.css";
import { ColorModeContext, useMode } from "./styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/Layout/Topbar";
import Sidebar from "./components/Layout/Sidebar";
import MobileSidebar from "./components/Layout/MobileSidebar";
import Dashboard from "./scenes/dashboard";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Customers from "./scenes/customers";
import Products from "./scenes/products";
import Orders from "./scenes/orders";
import Suppliers from "./scenes/suppliers";
import Shipments from "./scenes/shipments";
import Inventory from "./scenes/inventory";

function App() {
	const [theme, colorMode] = useMode();
	const [isSidebar, setIsSidebar] = useState(false);

	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1020);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1020);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app">
					{isMobile ? <MobileSidebar isSidebar={isSidebar} /> : <Sidebar isSidebar={isSidebar} />}
					<main className="content">
						<Topbar setIsSidebar={setIsSidebar} />
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/customers" element={<Customers />} />
							<Route path="/products" element={<Products />} />
							<Route path="/orders" element={<Orders />} />
							<Route path="/suppliers" element={<Suppliers />} />
							<Route path="/shipments" element={<Shipments />} />
							<Route path="/inventory" element={<Inventory />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
