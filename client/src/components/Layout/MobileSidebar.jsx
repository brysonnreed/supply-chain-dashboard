// MobileSidebar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, IconButton, Box, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import SellIcon from "@mui/icons-material/Sell";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../styles/theme";
import InventoryIcon from "@mui/icons-material/Inventory";

const MobileSidebar = ({ isSidebar }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const [selected, setSelected] = useState("Dashboard");
	const colors = tokens(theme.palette.mode);

	useEffect(() => {
		const path = location.pathname.split("/")[1];
		if (path) {
			setSelected(path.charAt(0).toUpperCase() + path.slice(1));
		} else {
			setSelected("Dashboard");
		}
	}, [location]);

	const menuItems = [
		{ title: "Dashboard", to: "/", icon: <HomeOutlinedIcon /> },
		{ title: "Customers", to: "/customers", icon: <PeopleOutlinedIcon /> },
		{ title: "Products", to: "/products", icon: <SellIcon /> },
		{ title: "Orders", to: "/orders", icon: <ReceiptOutlinedIcon /> },
		{ title: "Suppliers", to: "/suppliers", icon: <PersonOutlinedIcon /> },
		{ title: "Shipments", to: "/shipments", icon: <CalendarTodayOutlinedIcon /> },
		{ title: "Inventory", to: "/inventory", icon: <InventoryIcon /> },
	];

	return (
		<Box>
			<IconButton
				color="inherit"
				aria-label="open drawer"
				onClick={() => setOpen(true)}
				sx={{ position: "fixed", top: 16, left: 16 }}
			>
				<MenuOutlinedIcon />
			</IconButton>

			<Drawer
				anchor="left"
				open={open}
				onClose={() => setOpen(false)}
				sx={{ display: { xs: "block", md: "none" } }}
			>
				<Box
					sx={{
						width: 250,
						background: `${colors.primary[400]} !important`,
						height: "100%",
						padding: "20px",
					}}
					role="presentation"
					onClick={() => setOpen(false)}
					onKeyDown={() => setOpen(false)}
				>
					<Box display={"flex"} justifyContent={"end"}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={() => setOpen(true)}
							sx={{ marginBottom: "20px" }}
						>
							<CloseIcon />
						</IconButton>
					</Box>
					<Box>
						{/* Menu Items */}
						{menuItems.map(({ title, to, icon }) => (
							<Box
								key={title}
								sx={{
									display: "flex",
									alignItems: "center",
									padding: "10px 15px",
									cursor: "pointer",
									mb: 1,
									backgroundColor:
										selected === title ? `${colors.blueAccent[500]} !important` : "transparent",
									borderRadius: "4px",
									transition: "background-color 0.3s ease, color 0.3s ease", // Add transition for smooth animation
									"&:hover": {
										backgroundColor: colors.primary[500], // Background color on hover
										color: colors.blueAccent[500], // Text color on hover
									},
								}}
								onClick={() => setSelected(title)}
							>
								{icon}
								<Typography
									sx={{
										color: theme.palette.grey[100],
										marginLeft: "10px",
										transition: "color 0.3s ease", // Add transition for text color change
									}}
								>
									<Link
										to={to}
										style={{
											color: "inherit",
											textDecoration: "none",
										}}
									>
										{title}
									</Link>
								</Typography>
							</Box>
						))}
					</Box>
				</Box>
			</Drawer>
		</Box>
	);
};

export default MobileSidebar;
