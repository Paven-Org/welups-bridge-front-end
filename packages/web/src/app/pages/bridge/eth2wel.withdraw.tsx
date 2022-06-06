import React, { Fragment, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  BridgeButton,
  BridgeTextField,
  EtherumIcon,
  FieldContainer,
  WelupsLogoDark,
} from "@welups-bridge/ui";
import { styles } from "./bridge.styles";
import InputAdornment from "@mui/material/InputAdornment";
import clsx from "clsx";
import { Typography } from "@mui/material";
import {
  base_api_url,
  eth_address,
  eth_network_id_wel,
  eth_request_cashin_to_wel_url,
  eth_scanner_base_url,
  eth_treasury_address,
} from "../../../variables";
import { apiClient } from "../../commons/axios";
import Web3 from "web3";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import useSettings from "../../hooks/useSettings";

const Eth2WelWithdraw: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [ethAccount, setEthAccount] = React.useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const { settings } = useSettings();
  const [web3] = React.useState<Web3>(new Web3(Web3.givenProvider));

  const submitForm = async () => {
    setLoading(true);

    const amount = web3.utils.toWei(`${values.amount}`, "ether");
    const result = await apiClient.post(
      `${base_api_url}${eth_request_cashin_to_wel_url}`,
      {
        from_eth: values.eth_address,
        to_wel: settings.wallet,
        eth_treasury: eth_treasury_address,
        netid: eth_network_id_wel,
        token: eth_address,
        amount: amount,
      }
    );

    if (result.data) {
      web3.eth
        .sendTransaction({
          from: values.eth_address,
          to: eth_treasury_address,
          value: amount,
        })
        // .on("transactionHash", function (hash) {
        //   console.log("transactionHash : ", hash);
        // })
        .on("receipt", function (receipt) {
          const msg = `You have successfully sent ETH to us. WETH will be in your wallet soon !`;
          const action = (key: any) => (
            <React.Fragment>
              <a
                target="_blank"
                href={`${eth_scanner_base_url}/${receipt.transactionHash}`}
                style={{ textDecoration: "none" }}
              >
                View on block explorer
              </a>
            </React.Fragment>
          );

          enqueueSnackbar(msg, {
            variant: "success",
            autoHideDuration: 3000,
            action,
          });

          setLoading(false);
        })
        .on("error", console.error); // If a out of gas error, the second parameter is the receipt.
    }
  };

  const formik = useFormik({
    initialValues: {
      eth_address: "",
      amount: 0.001,
    },
    // validationSchema: withdrawValidationSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    const getEthAccount = async () => {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.requestAccounts();

      if (accounts && accounts.length > 0) {
        setEthAccount(accounts[0]);
        setFieldValue("eth_address", accounts[0]);
      }
    };
    getEthAccount().catch(console.error);
  }, [ethAccount]);

  const { values, errors, touched, handleSubmit, setFieldValue } = formik;
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id="eth_address"
                name="eth_address"
                label="Transfer From"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EtherumIcon sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                value={values.eth_address}
                onChange={formik.handleChange}
                error={touched.eth_address && Boolean(errors.eth_address)}
                helperText={touched.eth_address && errors.eth_address}
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeTextField
                sx={styles.formInput}
                id="transfer-to"
                label="Transfer To"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WelupsLogoDark sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                value={settings.wallet}
              />
            </FieldContainer>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id="amount"
                label="Amount"
                name="amount"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography style={{ color: "#ffffff" }}>ETH</Typography>
                    </InputAdornment>
                  ),
                }}
                value={values.amount}
                onChange={formik.handleChange}
                error={touched.amount && Boolean(errors.amount)}
                helperText={touched.amount && errors.amount}
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeButton
                type="submit"
                sx={styles.btnDeposit}
                fullWidth
                loading={loading}
              >
                Withdraw
              </BridgeButton>
            </FieldContainer>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default Eth2WelWithdraw;
