import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  BridgeButton,
  BridgeTextField,
  FieldContainer,
} from "@welups-bridge/ui";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useUserDelete, useUserListing } from "./users.query";
import { Table } from "antd";
import { User } from "../../models/user";
import UserDetailsModal from "./users.modal";
import { styles } from "./users.style";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "@welups-bridge/ui/src/components/modals/ConfirmationModal";

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
const Users: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>({});
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const { isLoading, isFetching, error, isError, data } = useUserListing({
    page: 1,
    page_size: 10,
  });

  console.log({ isLoading, isFetching, error, isError, data });

  const { mutateAsync: deleteAsync } = useUserDelete();

  const handleDelete = (u: User) => {
    setSelectedUser(u);
    setOpenDeleteConfirmModal(!openDeleteConfirmModal);
  };

  const onDeleteUser = async () => {
    await deleteAsync(selectedUser, {
      onSuccess: (data, variables, context) => {
        setSelectedUser({});
        setOpenDeleteConfirmModal(!openDeleteConfirmModal);
      },

      onError: (error, variables, context) => {
        // I will fire second!
        debugger;
      },
    });
  };

  const onCancel = () => {
    setSelectedUser({});
    setOpenDeleteConfirmModal(!openDeleteConfirmModal);
  };

  const columns = [
    {
      dataIndex: "username",
      title: "Username",
    },
    {
      dataIndex: "email",
      title: "Email",
    },
    {
      dataIndex: "status",
      title: "Status",
    },
    {
      title: "Actions",
      width: 120,
      render: (_text: any, user: User) => (
        <Box>
          <IconButton
            color="inherit"
            size="small"
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const onOpenUserDetailsModal = (u: User) => {
    setSelectedUser(u);
    setOpen(!open);
  };

  const onRowClicked = (u: User, _rowIndex: any, _event: any) => {
    onOpenUserDetailsModal(u);
  };

  const handleCreateUser = () => {
    setSelectedUser({});
    setOpen(!open);
  };

  const handleCloseUserDetailsModal = () => {
    setOpen(!open);
  };

  const handleSubmitUserDetailsModal = () => {
    setOpen(!open);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <BridgeButton
          onClick={handleCreateUser}
          sx={{
            fontSize: "13px",
            width: "150px",
            height: "40px",
            borderRadius: "5px",
            lineHeight: "15px",
            marginBottom: "10px",
          }}
        >
          Create User
        </BridgeButton>
        <Table
          rowKey={"id"}
          columns={columns}
          // scroll={{ x: 1520, y: 700 }}
          dataSource={data?.data.users}
          //dataSource={mockedUsers}
          loading={isLoading || isFetching}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                debugger;
                onRowClicked(record, rowIndex, event);
              }, // click row
            };
          }}
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
          rowClassName={clsx(styles.cursor)}
        />

        {open && (
          <UserDetailsModal
            user={selectedUser}
            isOpen={open}
            title="User Details"
            onClose={handleCloseUserDetailsModal}
            onSubmit={handleSubmitUserDetailsModal}
          />
        )}

        {
          <ConfirmationModal
            open={openDeleteConfirmModal}
            onSubmit={onDeleteUser}
            onCancel={onCancel}
            title="Are you sure ?"
          >
            <Typography>
              {"Do you really want to delete this user ?"}
            </Typography>
          </ConfirmationModal>
        }
      </Grid>
    </Grid>
  );
};

export default Users;
