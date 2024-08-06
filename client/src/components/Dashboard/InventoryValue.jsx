import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../styles/theme";
import { useEffect, useState } from "react";

const InventoryBarChart = ({ inventory, products }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [totalValue, setTotalValue] = useState(0);
	const [barData, setBarData] = useState([]);

	useEffect(() => {
		const calculateInventoryValue = () => {
			try {
				let totalInventoryValue = 0;
				const data = inventory
					.map((item) => {
						const product = products.find((p) => p.id === item.product_id);
						if (product) {
							const value = product.price * item.quantity;
							totalInventoryValue += value;
							return {
								product: product.name, // Assuming product has a `name` property
								value,
							};
						}
						return null;
					})
					.filter(Boolean); // Filter out null entries

				setTotalValue(totalInventoryValue);
				setBarData(data);
			} catch (err) {
				console.error("Error calculating inventory value:", err);
			}
		};

		if (inventory && products) {
			calculateInventoryValue();
		}
	}, [inventory, products]);

	return (
		<>
			<Box m="20px">
				<Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
					Total Inventory Value
				</Typography>
				<Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
					{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
						totalValue
					)}
				</Typography>
			</Box>
			<Box height="250px" m="-40px 0 0 0">
				{barData.length > 0 ? (
					<ResponsiveBar
						data={barData}
						theme={{
							axis: {
								domain: {
									line: {
										stroke: colors.grey[100],
									},
								},
								legend: {
									text: {
										fill: colors.grey[100],
									},
								},
								ticks: {
									line: {
										stroke: colors.grey[100],
										strokeWidth: 1,
									},
									text: {
										fill: colors.grey[100],
									},
								},
							},
							legends: {
								text: {
									fill: colors.grey[100],
								},
							},
							tooltip: {
								container: {
									color: colors.primary[500],
								},
							},
						}}
						keys={["value"]} // The key that contains the data value
						indexBy="product" // The key for the index
						margin={{ top: 50, right: 100, bottom: 10, left: 80 }}
						padding={0.3}
						valueScale={{ type: "linear" }}
						indexScale={{ type: "band", round: true }}
						colors={{ scheme: "nivo" }}
						defs={[
							{
								id: "dots",
								type: "patternDots",
								background: "inherit",
								color: "#38bcb2",
								size: 4,
								padding: 1,
								stagger: true,
							},
							{
								id: "lines",
								type: "patternLines",
								background: "inherit",
								color: "#eed312",
								rotation: -45,
								lineWidth: 6,
								spacing: 10,
							},
						]}
						borderColor={{
							from: "color",
							modifiers: [["darker", 1.6]],
						}}
						axisTop={null}
						axisRight={null}
						axisBottom={null}
						axisLeft={{
							tickSize: 5,
							tickPadding: 5,
							tickRotation: 0,
							legend: "Inventory Value",
							legendPosition: "middle",
							legendOffset: -60,
						}}
						enableLabel={false}
						labelSkipWidth={12}
						labelSkipHeight={12}
						labelTextColor={{
							from: "color",
							modifiers: [["darker", 1.6]],
						}}
						legends={[
							{
								dataFrom: "keys",
								anchor: "bottom-right",
								direction: "column",
								justify: false,
								translateX: 120,
								translateY: 0,
								itemsSpacing: 2,
								itemWidth: 100,
								itemHeight: 20,
								itemDirection: "left-to-right",
								itemOpacity: 0.85,
								symbolSize: 20,
								effects: [
									{
										on: "hover",
										style: {
											itemOpacity: 1,
										},
									},
								],
							},
						]}
						role="application"
						barAriaLabel={(e) => `${e.id}: ${e.formattedValue} for product: ${e.indexValue}`}
					/>
				) : (
					<Typography variant="h6" color={colors.grey[100]}>
						No data available
					</Typography>
				)}
			</Box>
		</>
	);
};

export default InventoryBarChart;
