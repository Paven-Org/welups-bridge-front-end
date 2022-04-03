import { styles } from './home.styles';
import React from 'react';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import {
  BridgeButton,
  BridgeTextField,
  FieldContainer,
} from '@welups-bridge/ui';
import { useUserTxnListing } from './home.query';
import { SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import { Transaction } from 'app/models/transaction';
import { Paging } from 'app/models/paging';

const { RangePicker } = DatePicker;

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

const columns = [
  {
    dataIndex: 'date',
    title: 'Date',
    key: 'date',
    width: 170,
  },
  {
    dataIndex: 'type',
    title: 'Type',
    key: 'type',
    width: 100,
  },
  {
    dataIndex: 'from',
    title: 'Transfer from',
    key: 'from',
    width: 400,
  },
  {
    dataIndex: 'to',
    title: 'Transfer To',
    key: 'to',
    width: 400,
  },
  {
    dataIndex: 'status',
    title: 'Status',
    key: 'status',
  },
  {
    dataIndex: 'fee',
    title: 'Fee',
    key: 'fee',
  },
];

const data = [
  {
    id: 1,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 2,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 3,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 4,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 5,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 6,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 7,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 8,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 9,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
  {
    id: 10,
    date: '15/12/2021 12:23:45',
    type: 'Deposit',
    from: '0x03e62Eb56c5341B15467...5685a39',
    to: '0x03e6234434b567545353...4g34634',
    status: 'Success',
    fee: '0.0000215151 ETH',
  },
];

const Home: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const [pagination, setPagination] = React.useState<Paging>({
    page: 1,
    page_size: 10,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onDateRangeChange = (value: any, dateString: any) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  function onOk(value: any) {
    console.log('onOk: ', value);
  }

  const { data, isLoading, isFetching, isError } =
    useUserTxnListing(pagination);

  // @ts-ignore
  const onChange = (
    changedPagination: TablePaginationConfig,
    _filters: any,
    _sorter: SorterResult<Transaction> | SorterResult<Transaction>[],
    _extra: any
  ) => {
    if (
      changedPagination.current &&
      changedPagination.pageSize &&
      (changedPagination.current !== pagination.page ||
        changedPagination.pageSize !== pagination.page_size)
    ) {
      setPagination({
        page: changedPagination.current,
        page_size: changedPagination.pageSize,
      });
    }
  };
  return (
    <Box sx={styles.homeContainer}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        display='flex'
        justifyContent='center'
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='Transaction' />
          <Tab label='Charge Configuration' />
          <Tab label='Wallet Management' />
        </Tabs>
      </Box>
      <Box sx={styles.bridgeContainer}>
        <TabPanel value={value} index={0}>
          <Box display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Box component='div' sx={[styles.title]}>
                Transactions
              </Box>
            </Box>
            <Box display='flex' p={1} flexDirection='row'>
              <RangePicker
                showTime={{ format: 'HH:mm' }}
                format='YYYY-MM-DD HH:mm'
                onChange={onDateRangeChange}
                onOk={onOk}
              />
            </Box>
          </Box>
          <Box marginTop='24px' component='div'>
            <Table
              rowKey={'id'}
              columns={columns}
              scroll={{ x: 1520, y: 700 }}
              dataSource={data?.data?.data}
              loading={isLoading || isFetching}
              pagination={{
                current: data?.data?.metadata?.page,
                total: data?.data?.metadata?.total,
                pageSize: data?.data?.metadata?.page_size,
              }}
              // footer={() => (
              //     <Typography align={'right'}>
              //         {getFooterOfPagination({
              //             page: paging.page,
              //             total: paging.total as number,
              //             page_size: paging.page_size,
              //         })}
              //     </Typography>
              // )}
              onChange={onChange}
              size='middle'
              // onRow={(record, rowIndex) => {
              //     return {
              //         onClick: (event) => {
              //             onRowClicked(record, rowIndex, event);
              //         }, // click row
              //     };
              // }}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Box component='div' sx={styles.title}>
                Charge Configuration
              </Box>
            </Box>
          </Box>
          <Box sx={styles.mt24}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <Grid item xs={12}>
                <FieldContainer>
                  <BridgeTextField
                    id='service-fee'
                    label='Service Fee'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {
                        height: '64px',
                        color: '#ffffff',
                      },
                    }}
                  />
                </FieldContainer>
                <FieldContainer>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      borderRadius: 1,
                    }}
                  >
                    <BridgeButton> SAVE </BridgeButton>
                  </Box>
                </FieldContainer>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box display='flex' flexDirection='row'>
            <Box flexGrow={1}>
              <Box component='div' sx={styles.title}>
                Wallet Management
              </Box>
            </Box>
          </Box>
          <Box sx={styles.mt24}>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
              <Grid item xs={12}>
                <FieldContainer>
                  <BridgeTextField
                    id='address'
                    label='Address'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {
                        height: '64px',
                        color: '#ffffff',
                      },
                    }}
                  />
                </FieldContainer>
                <FieldContainer>
                  <BridgeTextField
                    id='private-key'
                    label='Private Key'
                    variant='outlined'
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {
                        height: '64px',
                        color: '#ffffff',
                      },
                    }}
                  />
                </FieldContainer>
                <FieldContainer>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      borderRadius: 1,
                    }}
                  >
                    <BridgeButton> save </BridgeButton>
                  </Box>
                </FieldContainer>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default Home;
