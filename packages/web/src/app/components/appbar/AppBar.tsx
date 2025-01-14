import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { styles } from "./AppBar.styles";
import WelupsLogo from "../welups.logo";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";

const ResponsiveAppBar = () => {
  const [address, setAddress] = React.useState<string>("");
  const { settings } = useSettings();

  useEffect(() => {
    if (settings && settings.wallet) {
      setAddress(settings.wallet);
    }
  }, [settings]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false} sx={styles.header}>
        <Toolbar disableGutters>
          <Link to="/">
            <WelupsLogo />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0, color: "#ffffff", cursor: "pointer" }}>
            {address ?? <Typography sx={{}}>{address}</Typography>}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
