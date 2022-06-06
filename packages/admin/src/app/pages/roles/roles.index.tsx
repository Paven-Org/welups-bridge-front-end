import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  BridgeButton,
  BridgeTextField,
  FieldContainer,
} from "@welups-bridge/ui";
import { Box } from "@mui/material";
import { useRolesListing } from "./roles.query";
import { Table } from "antd";
import { Role } from "../../models/user";

const mockedUsers = [
  {
    Id: 1,
    Username: "root",
    Email: "welbridgeroot@gmail.com",
    Status: "ok",
    Created_at: "2022-04-13T20:22:24.752868Z",
    Updated_at: "2022-04-13T20:22:24.752868Z",
  },
  {
    Id: 2,
    Username: "weleth_bridge",
    Email: "welbridgeroot@gmail.com",
    Status: "ok",
    Created_at: "2022-04-13T20:22:24.752868Z",
    Updated_at: "2022-04-13T20:22:24.752868Z",
  },
];
const Roles: React.FC = () => {
  const { isLoading, isFetching, error, isError, data } = useRolesListing();

  console.log({ isLoading, isFetching, error, isError, data });

  const columns = [
    {
      dataIndex: "name",
      title: "Name",
    },
  ];

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Table
          rowKey={"id"}
          columns={columns}
          // scroll={{ x: 1520, y: 700 }}
          dataSource={data?.data.map((d: string) => {
            const role: Role = {
              name: d,
            };

            return role;
          })}
          //dataSource={mockedUsers}
          loading={isLoading || isFetching}
          // pagination={{
          //   current: data?.data?.metadata?.page,
          //   total: data?.data?.metadata?.total,
          //   pageSize: data?.data?.metadata?.page_size,
          // }}
          // footer={() => (
          //     <Typography align={'right'}>
          //         {getFooterOfPagination({
          //             page: paging.page,
          //             total: paging.total as number,
          //             page_size: paging.page_size,
          //         })}
          //     </Typography>
          // )}
          size="middle"
          // onRow={(record, rowIndex) => {
          //     return {
          //         onClick: (event) => {
          //             onRowClicked(record, rowIndex, event);
          //         }, // click row
          //     };
          // }}
        />
      </Grid>
    </Grid>
  );
};

export default Roles;
