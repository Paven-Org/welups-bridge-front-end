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
import { Eth2WelSteps } from "../../commons/wel_eth_steps";
import { RequestClaimResp, Transaction, WEL2ETH } from "../../models/WEL2ETH";
import {
  base_api_url,
  eth_cashout_to_wel_url,
  eth_import_contract_address,
  eth_network_id_wel,
  eth_wwel_address,
  network_id_wel,
  wel_address0,
  wel_export_contract_address,
  wel_import_contract_address,
  wel_network_id_eth,
} from "../../../variables";
import { apiClient } from "../../commons/axios";
import Web3 from "web3";
import { useFormik } from "formik";
import {
  depositValidationSchema,
  withdrawValidationSchema,
} from "./bridge.schema";
import { useSnackbar } from "notistack";
import useSettings from "../../hooks/useSettings";

const abi = require("../../contracts/eth/import.json");
const vaultAbi = require("../../contracts/eth/vault.json");

const Eth2WelDeposit: React.FC = () => {
  const [step, setStep] = React.useState<Eth2WelSteps>(Eth2WelSteps.INIT);
  const [transaction, setTransaction] = React.useState<Transaction>({});
  const [claimsReq, setClaimsReq] = React.useState<RequestClaimResp>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = React.useState<boolean>(false);
  const [ethAccount, setEthAccount] = React.useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const [web3] = React.useState<Web3>(new Web3(Web3.givenProvider));
  const { settings } = useSettings();

  const submitForm = async () => {
    setLoading(true);
    const wel2Eth: WEL2ETH = {
      eth_address: values.eth_address,
      amount: values.amount,
    };

    // @ts-ignore
    const welWeb = window.welWeb;
    const instance = await welWeb.contract().at(wel_import_contract_address);

    const txn = await instance
      .withdraw(
        "WLNYdo8jy9xxuyGhQtqU2DAgcptBgJu4jd",
        welWeb.address.fromHex(wel2Eth.eth_address),
        // @ts-ignore
        `${web3.utils.toWei(new web3.utils.BN(wel2Eth.amount), "mwei")}`,
        wel_network_id_eth
      )
      .send({ feeLimit: 10 * Math.pow(10, 8) });

    console.log("txn : ", txn);
  };

  const formik = useFormik({
    initialValues: {
      eth_address: ethAccount,
      wel_address: settings.wallet,
      amount: 0.01,
    },
    validationSchema: depositValidationSchema,
    onSubmit: submitForm,
  });

  useEffect(() => {
    const getEthAccount = async () => {
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
                id="wel_address"
                name="wel_address"
                label="Transfer From"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <WelupsLogoDark sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                }}
                value={values.wel_address}
                onChange={formik.handleChange}
                error={touched.wel_address && Boolean(errors.wel_address)}
                helperText={touched.wel_address && errors.wel_address}
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
                      <EtherumIcon sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                value={values.eth_address}
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
                      <Typography style={{ color: "#ffffff" }}>WETH</Typography>
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
              {step === Eth2WelSteps.INIT && (
                <BridgeButton
                  type="submit"
                  sx={styles.btnDeposit}
                  fullWidth
                  loading={loading}
                  disabled={!ethAccount || ethAccount.length < 1}
                >
                  Deposit
                </BridgeButton>
              )}
              {step === Eth2WelSteps.REQUEST_CLAIM && (
                <BridgeButton
                  type="submit"
                  sx={styles.btnDeposit}
                  fullWidth
                  loading={loading}
                >
                  Request Claims
                </BridgeButton>
              )}
              {step === Eth2WelSteps.DEPOSIT && (
                <BridgeButton
                  type="submit"
                  sx={styles.btnDeposit}
                  fullWidth
                  loading={loading}
                  disabled={disabledBtn}
                >
                  Claims
                </BridgeButton>
              )}
            </FieldContainer>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

export default Eth2WelDeposit;
