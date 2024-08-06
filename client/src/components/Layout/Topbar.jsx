import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../styles/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
	const theme = useTheme();

	const colorMode = useContext(ColorModeContext);

	return (
		<Box display="flex" justifyContent="end" p={2}>
			{/* ICONS */}
			<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
				</IconButton>

				<IconButton>
					<PersonOutlinedIcon />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;