import { styles } from "./bridge.styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import Wel2ethWithdraw from "./wel2eth.withdraw";
import Wel2ethDeposit from "./wel2eth.deposit";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Eth2WelWithdraw from "./eth2wel.withdraw";
import Eth2WelDeposit from "./eth2wel.deposit";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: "24px" }} component="div">
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Bridge: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [networkFrom, setNetworkFrom] = React.useState("0");
  const [networkTo, setNetworkTo] = React.useState("0");

  useEffect(() => {
    localStorage.setItem("network_from", "0");
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNetworkFromChange = (event: SelectChangeEvent) => {
    const from = parseInt(event.target.value);
    localStorage.setItem("network_from", event.target.value);
    setNetworkFrom(`${from}`);
    setNetworkTo(`${from}`);
  };

  return (
    <Box sx={styles.bridgeContainer} component="div">
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        component="div"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="network-from">From</InputLabel>
          <Select
            labelId="network-from"
            id="network-from"
            value={networkFrom}
            label="From"
            onChange={handleNetworkFromChange}
          >
            <MenuItem value={0}>WELUPS</MenuItem>
            <MenuItem value={1}>ETH</MenuItem>
          </Select>
        </FormControl>

        <ArrowForwardIcon sx={{ color: "#ffffff" }} />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="network-to">To</InputLabel>
          <Select
            labelId="network-to"
            id="network-to"
            value={networkTo}
            label="From"
            inputProps={{ readOnly: true }}
          >
            <MenuItem value={0}>ETH</MenuItem>
            <MenuItem value={1}>WELUPS</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }} component="div">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Withdraw" />
          <Tab label="Deposit" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {networkFrom == "0" ? <Wel2ethWithdraw /> : <Eth2WelWithdraw />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {networkFrom == "0" ? <Wel2ethDeposit /> : <Eth2WelDeposit />}
      </TabPanel>
    </Box>
  );
};

export default Bridge;
