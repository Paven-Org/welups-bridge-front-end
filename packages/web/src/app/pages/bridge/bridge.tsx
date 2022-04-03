import { styles } from './bridge.styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  WelupsLogoDark,
  BridgeTextField,
  BridgeButton,
  EtherumIcon,
  FieldContainer,
} from '@welups-bridge/ui';
import InputAdornment from '@mui/material/InputAdornment';
import clsx from 'clsx';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: '24px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Bridge: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles.bridgeContainer}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Deposit' />
          <Tab label='Withdraw' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <FieldContainer>
              <BridgeTextField
                sx={styles.formInput}
                id='transfer-from'
                label='Transfer from'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EtherumIcon sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                value='Etherum'
              />
            </FieldContainer>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id='transfer-to'
                label='Transfer to'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <WelupsLogoDark sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                }}
                value='0x03e62Eb56c5341B15467...5685a39'
              />
            </FieldContainer>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id='amount'
                label='Amount'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography style={{ color: '#ffffff' }}>ETH</Typography>
                    </InputAdornment>
                  ),
                }}
                value='2.00'
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeButton sx={styles.btnDeposit} fullWidth>
                DEPOSIT
              </BridgeButton>
            </FieldContainer>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12}>
            <FieldContainer>
              <BridgeTextField
                sx={styles.formInput}
                id='transfer-from'
                label='Transfer from'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EtherumIcon sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                value='Etherum'
              />
            </FieldContainer>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id='transfer-to'
                label='Transfer to'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <WelupsLogoDark sx={{ width: 32, height: 32 }} />
                    </InputAdornment>
                  ),
                }}
                value='0x03e62Eb56c5341B15467...5685a39'
              />
            </FieldContainer>
            <FieldContainer className={clsx(styles.mt16)}>
              <BridgeTextField
                sx={styles.formInput}
                id='amount'
                label='Amount'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Typography style={{ color: '#ffffff' }}>ETH</Typography>
                    </InputAdornment>
                  ),
                }}
                value='2.00'
              />
            </FieldContainer>
            <FieldContainer>
              <BridgeButton sx={styles.btnDeposit} fullWidth>
                Withdraw
              </BridgeButton>
            </FieldContainer>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Bridge;
