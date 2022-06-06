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
import { Eth2WelSteps, Wel2EthSteps } from "../../commons/wel_eth_steps";
import { RequestClaimResp, Transaction } from "../../models/WEL2ETH";
import {
  base_api_url,
  eth_cashout_to_wel_url,
  eth_import_contract_address,
  eth_network_id_wel,
  eth_wwel_address,
  wel_address0,
  wel_export_contract_address,
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

const Wel2ethDeposit: React.FC = () => {
  const [step, setStep] = React.useState<Wel2EthSteps>(Wel2EthSteps.INIT);
  const [transaction, setTransaction] = React.useState<Transaction>({});
  const [claimsReq, setClaimsReq] = React.useState<RequestClaimResp>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = React.useState<boolean>(false);
  const [ethAccount, setEthAccount] = React.useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const { settings } = useSettings();

  const [web3] = React.useState<Web3>(new Web3(Web3.givenProvider));
  // @ts-ignore
  const welWeb = window.welWeb;

  const submitForm = async () => {
    setLoading(true);
    switch (step) {
      case Wel2EthSteps.INIT:
        const vaultContract = new web3.eth.Contract(vaultAbi, eth_wwel_address);

        // @ts-ignore
        const contract = new web3.eth.Contract(
          abi,
          eth_import_contract_address
        );

        const hex = welWeb.address.toHex(values.wel_address);
        const amount = web3.utils.toWei(
          // @ts-ignore
          new web3.utils.BN(values.amount),
          "mwei"
        );

        vaultContract.methods
          .approve(eth_import_contract_address, amount)
          .send({
            from: ethAccount,
          })
          .on("receipt", function (receipt: any) {
            console.log("approve receipt : ", receipt);
            contract.methods
              .withdraw(
                eth_wwel_address,
                `0x${hex.slice(2, hex.length)}`,
                eth_network_id_wel,
                `${amount}`
              )
              .send({
                from: ethAccount,
                // @ts-ignore
                //gas: new web3.utils.BN(gasAmount).mul(new web3.utils.BN(1.5)),
                gas: new web3.utils.BN(300000),
              })
              .on("receipt", function (receipt: any) {
                console.log("receipt :", receipt);

                setTransaction(receipt);
                setLoading(false);
                setStep(Wel2EthSteps.REQUEST_CLAIM);
              })
              .on("error", function (error: any, receipt: any) {
                console.log("error : ", error, receipt);
                //   const msg = `Claim failed.`;
                //
                //   enqueueSnackbar(msg, {
                //     variant: "error",
                //     autoHideDuration: 3000,
                //   });
              });
          })
          .on("error", function (error: any, receipt: any) {
            console.log("error : ", error, receipt);
          });

        break;
      case Wel2EthSteps.REQUEST_CLAIM:
        const result = await apiClient.post(
          `${base_api_url}${eth_cashout_to_wel_url}`,
          {
            txhash: transaction && transaction.transactionHash,
            to_account_address: values.wel_address,
          }
        );
        setClaimsReq(result.data);
        setStep(Wel2EthSteps.DEPOSIT);
        setLoading(false);
        break;
      case Wel2EthSteps.DEPOSIT:
        const instance = await welWeb
          .contract()
          .at(wel_export_contract_address);

        const txn = await instance
          .claim(
            wel_address0,
            claimsReq.request_id,
            claimsReq.amount,
            claimsReq.signature
          )
          .send({ feeLimit: 10 * Math.pow(10, 8) }, (r: any) => {
            debugger;
            console.log(r);
          });

        console.log(txn);
        setLoading(false);
        setDisabledBtn(true);
        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      eth_address: ethAccount,
      wel_address: settings.wallet,
      amount: 5,
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
            <FieldContainer>
              <BridgeTextField
                sx={styles.formInput}
                id="transfer-from"
                label="Transfer from"
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
                id="wel_address"
                name="wel_address"
                label="Transfer to"
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
                value={values.wel_address}
                onChange={formik.handleChange}
                error={touched.wel_address && Boolean(errors.wel_address)}
                helperText={touched.wel_address && errors.wel_address}
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
                      <Typography style={{ color: "#ffffff" }}>WWEL</Typography>
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
              {step === Wel2EthSteps.INIT && (
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
              {step === Wel2EthSteps.REQUEST_CLAIM && (
                <BridgeButton
                  type="submit"
                  sx={styles.btnDeposit}
                  fullWidth
                  loading={loading}
                >
                  Request Claims
                </BridgeButton>
              )}
              {step === Wel2EthSteps.DEPOSIT && (
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

export default Wel2ethDeposit;
