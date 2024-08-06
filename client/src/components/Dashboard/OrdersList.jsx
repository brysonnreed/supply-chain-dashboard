import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../styles/theme";

const OrdersList = ({ customers, products, orders }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				borderBottom={`4px solid ${colors.primary[900]}`}
				colors={colors.grey[100]}
				p="15px"
			>
				<Typography color={colors.grey[100]} variant="h5" fontWeight="600">
					Recent Transactions
				</Typography>
			</Box>
			{orders.slice(0, 10).map((order, i) => {
				const product = products.find((p) => p.id === order.product_id);
				const customer = customers.find((c) => c.id === order.customer_id);

				return (
					<Box
						key={order.id}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[900]}`}
						p="15px"
					>
						<Box>
							<Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
								{product ? product.name : "Product not found"}
							</Typography>
							<Typography color={colors.grey[100]}>{customer.name}</Typography>
						</Box>

						<Box
							backgroundColor={colors.greenAccent[600]}
							p="5px 10px"
							color={"#fff"}
							borderRadius="4px"
						>
							{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
								order.quantity * (product ? product.price : 0)
							)}
						</Box>
					</Box>
				);
			})}
		</>
	);
};

export default OrdersList;
