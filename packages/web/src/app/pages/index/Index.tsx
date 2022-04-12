import { WelupsLogoDark } from '@welups-bridge/ui';
import { Box, Typography, Grid } from '@mui/material';
import { styles } from './index.styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSettings from '../../hooks/useSettings';
import axios from 'axios';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  const onConnectWallet = async () => {
    // @ts-ignore
    if (window.welWeb && window.welWeb.defaultAddress.base58) {
      // @ts-ignore
      const wallet = window.welWeb.defaultAddress.base58;
      console.log('Yes, catch it:', wallet);
      if (typeof window !== 'undefined') {
        localStorage.setItem('WEL_ADDR', wallet);
      }

      // // @ts-ignore
      // const welWeb = window.welWeb;
      //
      // const instance = await welWeb.contract().at('WUbnXM9M4QYEkksG3ADmSan2kY5xiHTr1E');
      // debugger;
      // const rest = await instance.withdraw().call();
      //
      // console.log('rest : ', rest)
      if (updateSettings) {
        updateSettings({
          ...settings,
          ...{
            wallet,
          },
        });
      }
      navigate('/bridge');
    }
  };

  return (
    <>
      <Typography sx={styles.title}>
        Bridge between Ethereum and WEL.
      </Typography>
      <Typography sx={styles.description}>
        Connect your Welups wallet to get started.
      </Typography>
      <Box sx={styles.btn} onClick={onConnectWallet}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent='center' spacing={3}>
              <Grid item xs={3}>
                <Box sx={styles.logoDark}>
                  <WelupsLogoDark sx={{ width: 72, height: 72 }} />
                </Box>
              </Grid>
              <Grid item xs={7}>
                <Box sx={styles.btnContent}>
                  <Box sx={styles.connectWallet}>Connect Wallet</Box>
                  <Box sx={styles.connectWelLink}>Connect using WEL-Link</Box>
                </Box>
              </Grid>
              <Grid item xs={2} sx={styles.btnProceedBox}>
                <ArrowForwardIcon sx={styles.proceed} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
