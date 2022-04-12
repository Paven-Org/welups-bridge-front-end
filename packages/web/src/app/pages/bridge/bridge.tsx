import { styles } from "./bridge.styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import React from "react";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  BridgeButton,
  BridgeTextField,
  EtherumIcon,
  FieldContainer,
  WelupsLogoDark,
} from "@welups-bridge/ui";
import InputAdornment from "@mui/material/InputAdornment";
import clsx from "clsx";
import { useFormik } from "formik";
import { RequestClaimResp, Transaction, WEL2ETH } from "../../models/WEL2ETH";
import Wel2EthSteps from "../../commons/wel_eth_steps";
import { validationSchema } from "./bridge.schema";
import {
  base_api_url,
  network_id_wel,
  wel_address0,
  wel_treasury_address,
} from "../../../variables";
import { apiClient } from "../../commons/axios";
import Web3 from "web3";
// import abi from "../../contracts/eth/import.json";

const abi = require("../../contracts/eth/import.json");
// const abi = [
//   {
//     inputs: [{ internalType: "address", name: "_gov", type: "address" }],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "uint256",
//         name: "requestId",
//         type: "uint256",
//       },
//       {
//         indexed: true,
//         internalType: "address",
//         name: "token",
//         type: "address",
//       },
//       { indexed: true, internalType: "address", name: "user", type: "address" },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "Imported",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "token",
//         type: "address",
//       },
//       { indexed: true, internalType: "address", name: "from", type: "address" },
//       { indexed: true, internalType: "address", name: "to", type: "address" },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "networkId",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "Withdraw",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "AUTHENTICATOR",
//     outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "BLACK_HOLE",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "MANAGER_ROLE",
//     outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "VERSION",
//     outputs: [{ internalType: "string", name: "", type: "string" }],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "archive",
//     outputs: [
//       { internalType: "contract IImArchive", name: "", type: "address" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "_token", type: "address" },
//       { internalType: "uint256", name: "_requestId", type: "uint256" },
//       { internalType: "uint256", name: "_amount", type: "uint256" },
//       { internalType: "bytes", name: "_sig", type: "bytes" },
//     ],
//     name: "claim",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "gov",
//     outputs: [
//       { internalType: "contract IGovernance", name: "", type: "address" },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_archive", type: "address" }],
//     name: "setArchive",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_gov", type: "address" }],
//     name: "setGov",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "address", name: "_token", type: "address" },
//       { internalType: "address", name: "_to", type: "address" },
//       { internalType: "uint256", name: "_networkId", type: "uint256" },
//       { internalType: "uint256", name: "_value", type: "uint256" },
//     ],
//     name: "withdraw",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

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
        <Box sx={{ paddingTop: "24px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Bridge: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [step, setStep] = React.useState<Wel2EthSteps>(Wel2EthSteps.INIT);
  const [transaction, setTransaction] = React.useState<Transaction>({});
  const [claimsReq, setClaimsReq] = React.useState<RequestClaimResp>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const submitForm = async () => {
    switch (step) {
      case Wel2EthSteps.INIT:
        const wel2Eth: WEL2ETH = {
          eth_address: values.eth_address,
          amount: values.amount,
        };

        // @ts-ignore
        const welWeb = window.welWeb;
        const instance = await welWeb
          .contract()
          .at("WUbnXM9M4QYEkksG3ADmSan2kY5xiHTr1E");

        const txn = await instance
          .withdraw(
            wel_address0,
            wel_treasury_address,
            network_id_wel,
            `${wel2Eth.amount}`
          )
          .send({ feeLimit: 10 * Math.pow(10, 8) });

        console.log("txn : ", txn);
        setTransaction(txn);
        setStep(Wel2EthSteps.WITHDRAW);
        break;
      case Wel2EthSteps.WITHDRAW:
        const result = await apiClient.post(
          `${base_api_url}/v1/b/weleth/claim/wel/cashin-to/eth`,
          {
            txhash: transaction && transaction.tran_id,
            to_account_address: values.eth_address,
          }
        );
        setClaimsReq(result.data);
        setStep(Wel2EthSteps.REQUEST_CLAIM);
        break;
      case Wel2EthSteps.REQUEST_CLAIM:
        // // @ts-ignore
        // const { ethereum } = window;
        //
        // console.log("window : ", window);
        // if (!ethereum) {
        //   console.log("Pls install metamask");
        // } else {
        //   console.log("Metamask existed");
        // }
        //
        // const ethAccounts = await ethereum.request({
        //   method: "eth_requestAccounts",
        // });
        // if (ethAccounts.length < 1) {
        //   console.log("No account found");
        //   return;
        // }
        //
        // const ethAcc = ethAccounts[0];
        // console.log("Found acc : ", ethAcc);
        // // @ts-ignore
        // let web3;
        // // @ts-ignore
        // if (
        //   typeof window !== "undefined" &&
        //   typeof window.web3 !== "undefined"
        // ) {
        //   // we check if metamask is running
        //   // @ts-ignore
        //   web3 = new Web3(window.web3.currentProvider);
        // }

        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.requestAccounts();

        console.log("accounts : ", accounts);

        // @ts-ignore
        const contract = new web3.eth.Contract(
          abi,
          "0xE5a7d2F508579C22238688AD0d90db20f708e2A5"
        );

        console.log("claimsReq", claimsReq);

        const request_id = web3.utils.toBN(claimsReq.request_id_hex || "");
        console.log("request_id : ", request_id);

        const amount = web3.utils.toBN(claimsReq.amount || "");
        console.log("amount : ", amount);

        const signature = web3.utils.hexToBytes(claimsReq.signature_hex || "");
        console.log("signature : ", signature);

        // contract.methods
        //   .claim(claimsReq.token_address, request_id, amount, signature)
        //   .send({
        //     from: "0x794aF8e64199Af85b41210Ab516af4817F8B30A5",
        //   });

        contract.methods
          .claim(
            claimsReq["token_address"],
            web3.utils.toBN(claimsReq["amount"] || ""),
            web3.utils.toBN(claimsReq["request_id"] || ""),
            claimsReq.signature_hex
          )
          .estimateGas({ from: accounts[0] })
          .then(function (gasAmount: any) {
            console.log("gasAmount : ", gasAmount);
            contract.methods
              .claim(
                claimsReq["token_address"],
                web3.utils.toBN(claimsReq["amount"] || ""),
                web3.utils.toBN(claimsReq["request_id"] || ""),
                // web3.utils.soliditySha3({
                //   t: "bytes",
                //   v: claimsReq["signature_hex"] || "",
                // })
                claimsReq.signature_hex
              )
              .send({
                from: accounts[0],
                // @ts-ignore
                gas: new web3.utils.BN(gasAmount).mul(1.5),
              });
          })
          .catch(function (error: any) {
            console.log(error);
          });

        break;
    }
  };

  const formik = useFormik({
    initialValues: {
      eth_address: "0x794aF8e64199Af85b41210Ab516af4817F8B30A5",
      amount: 100,
    },
    validationSchema: validationSchema,
    onSubmit: submitForm,
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  return (
    <Box sx={styles.bridgeContainer}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Withdraw" />
          {/*<Tab label='Deposit' />*/}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
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
                  value="Etherum"
                />
              </FieldContainer>
              <FieldContainer className={clsx(styles.mt16)}>
                <BridgeTextField
                  sx={styles.formInput}
                  id="eth_address"
                  name="eth_address"
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
                  }}
                  value={values.eth_address}
                  onChange={formik.handleChange}
                  error={touched.eth_address && Boolean(errors.eth_address)}
                  helperText={touched.eth_address && errors.eth_address}
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
                        <Typography style={{ color: "#ffffff" }}>
                          ETH
                        </Typography>
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
                  <BridgeButton type="submit" sx={styles.btnDeposit} fullWidth>
                    Withdraw
                  </BridgeButton>
                )}
                {step === Wel2EthSteps.WITHDRAW && (
                  <BridgeButton type="submit" sx={styles.btnDeposit} fullWidth>
                    Request Claims
                  </BridgeButton>
                )}
                {step === Wel2EthSteps.REQUEST_CLAIM && (
                  <BridgeButton type="submit" sx={styles.btnDeposit} fullWidth>
                    Claims
                  </BridgeButton>
                )}
              </FieldContainer>
            </Grid>
          </Grid>
        </form>
      </TabPanel>
      {/*<TabPanel value={value} index={1}>*/}
      {/*  <Grid sx={{ flexGrow: 1 }} container spacing={2}>*/}
      {/*    <Grid item xs={12}>*/}
      {/*      <FieldContainer>*/}
      {/*        <BridgeTextField*/}
      {/*          sx={styles.formInput}*/}
      {/*          id='transfer-from'*/}
      {/*          label='Transfer from'*/}
      {/*          variant='outlined'*/}
      {/*          fullWidth*/}
      {/*          InputLabelProps={{*/}
      {/*            shrink: true,*/}
      {/*          }}*/}
      {/*          InputProps={{*/}
      {/*            startAdornment: (*/}
      {/*              <InputAdornment position='start'>*/}
      {/*                <EtherumIcon sx={{ width: 32, height: 32 }} />*/}
      {/*              </InputAdornment>*/}
      {/*            ),*/}
      {/*            readOnly: true,*/}
      {/*          }}*/}
      {/*          value='Etherum'*/}
      {/*        />*/}
      {/*      </FieldContainer>*/}
      {/*      <FieldContainer className={clsx(styles.mt16)}>*/}
      {/*        <BridgeTextField*/}
      {/*          sx={styles.formInput}*/}
      {/*          id='transfer-to'*/}
      {/*          label='Transfer to'*/}
      {/*          variant='outlined'*/}
      {/*          fullWidth*/}
      {/*          InputLabelProps={{*/}
      {/*            shrink: true,*/}
      {/*          }}*/}
      {/*          InputProps={{*/}
      {/*            startAdornment: (*/}
      {/*              <InputAdornment position='start'>*/}
      {/*                <WelupsLogoDark sx={{ width: 32, height: 32 }} />*/}
      {/*              </InputAdornment>*/}
      {/*            ),*/}
      {/*          }}*/}
      {/*          value='0x03e62Eb56c5341B15467...5685a39'*/}
      {/*        />*/}
      {/*      </FieldContainer>*/}
      {/*      <FieldContainer className={clsx(styles.mt16)}>*/}
      {/*        <BridgeTextField*/}
      {/*          sx={styles.formInput}*/}
      {/*          id='amount'*/}
      {/*          label='Amount'*/}
      {/*          variant='outlined'*/}
      {/*          fullWidth*/}
      {/*          InputLabelProps={{*/}
      {/*            shrink: true,*/}
      {/*          }}*/}
      {/*          InputProps={{*/}
      {/*            endAdornment: (*/}
      {/*              <InputAdornment position='end'>*/}
      {/*                <Typography style={{ color: '#ffffff' }}>ETH</Typography>*/}
      {/*              </InputAdornment>*/}
      {/*            ),*/}
      {/*          }}*/}
      {/*          value='2.00'*/}
      {/*        />*/}
      {/*      </FieldContainer>*/}
      {/*      <FieldContainer>*/}
      {/*        <BridgeButton sx={styles.btnDeposit} fullWidth>*/}
      {/*          Withdraw*/}
      {/*        </BridgeButton>*/}
      {/*      </FieldContainer>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</TabPanel>*/}
    </Box>
  );
};

export default Bridge;
