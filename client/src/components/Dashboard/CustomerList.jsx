import { Box, Typography, useTheme, IconButton } from "@mui/material";
import React from "react";
import { tokens } from "../../styles/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CustomerList = ({ customers, handleViewClick }) => {
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
					Customers
				</Typography>
			</Box>
			{customers.map((customer, i) => {
				return (
					<Box
						key={customer.id}
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[900]}`}
						p="15px"
					>
						<Box>
							<Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
								{customer.name}
							</Typography>
							<Typography color={colors.grey[100]}>{customer.email}</Typography>
						</Box>
						<IconButton onClick={handleViewClick(customer)}>
							<VisibilityIcon />
						</IconButton>
					</Box>
				);
			})}
		</>
	);
};

export default CustomerList;
