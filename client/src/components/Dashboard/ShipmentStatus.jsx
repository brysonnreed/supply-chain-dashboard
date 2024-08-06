import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../styles/theme";
import { useTheme } from "@mui/material";

const ShipmentStatusOverview = ({ shipments }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const statusCount = shipments.reduce((acc, shipment) => {
		acc[shipment.status] = (acc[shipment.status] || 0) + 1;
		return acc;
	}, {});

	const shipmentData = Object.keys(statusCount).map((status) => ({
		id: status,
		label: status,
		value: statusCount[status],
	}));

	return (
		<ResponsivePie
			data={shipmentData}
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
						color: colors.primary[500], // Ensure text color contrasts with background
					},
				},
			}}
			margin={{ top: 40, right: 100, bottom: 100, left: 100 }}
			innerRadius={0.5}
			padAngle={0.7}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			borderColor={{
				from: "color",
				modifiers: [["darker", 0.2]],
			}}
			arcLinkLabelsSkipAngle={10}
			arcLinkLabelsTextColor={colors.grey[100]}
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: "color" }}
			enableArcLabels={true}
			arcLabelsRadiusOffset={0.4}
			arcLabelsSkipAngle={7}
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["darker", 2]],
			}}
			defs={[
				{
					id: "dots",
					type: "patternDots",
					background: "inherit",
					color: "rgba(255, 255, 255, 0.3)",
					size: 4,
					padding: 1,
					stagger: true,
				},
				{
					id: "lines",
					type: "patternLines",
					background: "inherit",
					color: "rgba(255, 255, 255, 0.3)",
					rotation: -45,
					lineWidth: 6,
					spacing: 10,
				},
			]}
			legends={[
				{
					anchor: "bottom",
					direction: "row",
					justify: false,
					translateX: 15,
					translateY: 60,
					itemsSpacing: 0,
					itemWidth: 100,
					itemHeight: 18,
					itemTextColor: "#999",
					itemDirection: "left-to-right",
					itemOpacity: 1,
					symbolSize: 18,
					symbolShape: "circle",
					effects: [
						{
							on: "hover",
							style: {
								itemTextColor: "#000",
							},
						},
					],
				},
			]}
		/>
	);
};

export default ShipmentStatusOverview;
