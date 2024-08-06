import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../../styles/theme";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const FinancialOverview = ({ orders, products }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// Calculate total revenue and group by date
	let totalRevenueValue = 0;
	// eslint-disable-next-line no-unused-vars
	let orderCount = 0;
	const revenueByDate = {};

	orders.forEach((order) => {
		const product = products.find((p) => p.id === order.product_id);
		if (product) {
			const orderRevenue = product.price * order.quantity;
			totalRevenueValue += orderRevenue;
			orderCount += 1;

			const orderDate = new Date(order.order_date).toDateString();
			if (revenueByDate[orderDate]) {
				revenueByDate[orderDate] += orderRevenue;
			} else {
				revenueByDate[orderDate] = orderRevenue;
			}
		}
	});

	// Prepare data for Line chart
	const revenueData = Object.keys(revenueByDate).map((date) => ({
		x: date,
		y: revenueByDate[date],
	}));

	const lineData = [
		{
			id: "Revenue",
			data: revenueData,
		},
	];

	return (
		<Box gridColumn="span 8" backgroundColor={colors.primary[400]}>
			<Box mt="25px" p="0 30px" display="flex " justifyContent="space-between" alignItems="center">
				<Box>
					<Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
						Revenue Generated
					</Typography>
					<Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]}>
						{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
							totalRevenueValue
						)}
					</Typography>
				</Box>
				<Box>
					<IconButton>
						<DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }} />
					</IconButton>
				</Box>
			</Box>
			<Box height="250px" m="-20px 0 0 0">
				<ResponsiveLine
					data={lineData}
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
					colors={{ scheme: "nivo" }}
					margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
					xScale={{ type: "point" }}
					yScale={{
						type: "linear",
						min: "auto",
						max: "auto",
						stacked: true,
						reverse: false,
					}}
					yFormat=" >-.2f"
					curve="catmullRom"
					axisTop={null}
					axisRight={null}
					axisBottom={{
						orient: "bottom",
						tickSize: 0,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Date",
						legendOffset: 36,
						legendPosition: "middle",
						format: (value) => {
							// Customize date format if necessary
							return new Date(value).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
							});
						},
						tickValues: (data) => {
							// Display fewer ticks if needed
							return data.filter((_, index) => index % 2 === 0).map((d) => d.x);
						},
					}}
					axisLeft={{
						orient: "left",
						tickValues: 5, // added
						tickSize: 3,
						tickPadding: 5,
						tickRotation: 0,
						legend: "Revenue", // updated legend
						legendOffset: -40,
						legendPosition: "middle",
					}}
					enableGridX={false}
					enableGridY={false}
					pointSize={8}
					pointColor={{ theme: "background" }}
					pointBorderWidth={2}
					pointBorderColor={{ from: "serieColor" }}
					pointLabelYOffset={-12}
					useMesh={true}
					legends={[
						{
							anchor: "bottom-right",
							direction: "column",
							justify: false,
							translateX: 100,
							translateY: 0,
							itemsSpacing: 0,
							itemDirection: "left-to-right",
							itemWidth: 80,
							itemHeight: 20,
							itemOpacity: 0.75,
							symbolSize: 12,
							symbolShape: "circle",
							symbolBorderColor: "rgba(0, 0, 0, .5)",
							effects: [
								{
									on: "hover",
									style: {
										itemBackground: "rgba(0, 0, 0, .03)",
										itemOpacity: 1,
									},
								},
							],
						},
					]}
				/>
			</Box>
		</Box>
	);
};

export default FinancialOverview;
