import { tokens } from "../styles/theme";
import { Box, Typography, useTheme } from "@mui/material";

const MoreInfoCell = ({ id, api, click }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			sx={{
				height: 50,
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "start",
			}}
		>
			<Typography
				style={{
					textDecoration: "underline",
					cursor: "pointer",
					color: colors.blueAccent[400],
				}}
				key={id}
				onClick={click(api, id)}
			>
				{id}
			</Typography>
		</Box>
	);
};

export default MoreInfoCell;
