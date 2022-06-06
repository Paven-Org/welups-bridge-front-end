import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { BridgeButton } from "@welups-bridge/ui";
import { Box, IconButton, Typography } from "@mui/material";
import {
  useAddWelAccount,
  useMutateWelAccountStatus,
  useSetPrikey,
  useUnsetPrikey,
  useWelAccountDelete,
  useWelAccountListing,
} from "./wel.query";
import { Table, Tooltip } from "antd";
import { User } from "../../models/user";
import WelAccModal from "./wel.modal";
import { styles } from "./wel.style";
import clsx from "clsx";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationModal from "@welups-bridge/ui/src/components/modals/ConfirmationModal";
import { WelAccount } from "../../models/wel_account";
import { Status } from "../../commons/commons";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import WelPrikeyModal from "./wel.prikey.modal";

const WelConfig: React.FC = () => {
  const [selectedWelAccount, setSelectedWelAccount] = useState<User>({});
  const [open, setOpen] = useState(false);
  const [openSetPrikeyModal, setOpenSetPrikeyModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const { isLoading, isFetching, error, isError, data, refetch } =
    useWelAccountListing({
      page: 1,
      page_size: 10,
    });

  console.log({ isLoading, isFetching, error, isError, data });

  const { mutateAsync: deleteAsync } = useWelAccountDelete();
  const { mutateAsync: mutateAccountStatus } = useMutateWelAccountStatus();
  const { mutateAsync: unsetPrikeyAsync } = useUnsetPrikey();

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = (u: User) => {
    setSelectedWelAccount(u);
    setOpenDeleteConfirmModal(!openDeleteConfirmModal);
  };

  const onDeleteWelAccount = async () => {
    await deleteAsync(selectedWelAccount, {
      onSuccess: (data, variables, context) => {
        setSelectedWelAccount({});
        setOpenDeleteConfirmModal(!openDeleteConfirmModal);
        refetch();
      },

      onError: (error, variables, context) => {
        debugger;
      },
    });
  };

  const onCancel = () => {
    setSelectedWelAccount({});
    setOpenDeleteConfirmModal(!openDeleteConfirmModal);
  };

  const flipStatus = (status?: string) => {
    return status === Status.LOCKED ? Status.OK : Status.LOCKED;
  };

  const changeStatus = async (wa: WelAccount) => {
    const nwa = { ...wa };
    nwa.status = flipStatus(wa.status);

    await mutateAccountStatus(nwa, {
      onSuccess: (data, variables, context) => {
        refetch();
      },

      onError: (error, variables, context) => {
        // I will fire second!
        debugger;
      },
    });
  };

  const unsetPriKey = async () => {
    await unsetPrikeyAsync(
      {},
      {
        onSuccess: (data, variables, context) => {
          debugger;
        },
        onError: (error, variables, context) => {
          // I will fire second!
          debugger;
        },
      }
    );
  };

  const columns = [
    {
      dataIndex: "address",
      title: "Address",
    },
    {
      dataIndex: "status",
      title: "Status",
    },
    {
      title: "Actions",
      width: 120,
      render: (_text: any, wa: WelAccount) => (
        <Box>
          <Tooltip title="Delete">
            <IconButton
              color="inherit"
              size="small"
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                debugger;
                handleDelete(wa);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={wa.status == Status.LOCKED ? "Unlock" : "Lock"}>
            <IconButton
              color="inherit"
              size="small"
              aria-label="lock"
              onClick={(e) => {
                e.stopPropagation();
                debugger;
                changeStatus(wa);
              }}
            >
              {wa.status === Status.LOCKED ? (
                <LockOpenRoundedIcon fontSize="small" />
              ) : (
                <LockRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const onOpenUserDetailsModal = (u: User) => {
    setSelectedWelAccount(u);
    setOpen(!open);
  };

  const handleCreateUser = () => {
    setSelectedWelAccount({});
    setOpen(!open);
  };

  const handleSetPrikey = () => {
    setOpenSetPrikeyModal(!openSetPrikeyModal);
  };

  const handleUnsetPrikey = async () => {
    await unsetPriKey();
  };

  const handleCloseUserDetailsModal = () => {
    setOpen(!open);
  };

  const handleSubmitUserDetailsModal = () => {
    setOpen(!open);
    refetch();
  };

  const handleCloseSetPrikeyModal = () => {
    setOpenSetPrikeyModal(!openSetPrikeyModal);
  };

  const handleSubmitSetPrikeyModal = () => {
    setOpenSetPrikeyModal(!openSetPrikeyModal);
  };

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex">
          <BridgeButton
            onClick={handleCreateUser}
            sx={{
              fontSize: "13px",
              width: "200px",
              height: "40px",
              borderRadius: "5px",
              lineHeight: "15px",
              marginBottom: "10px",
            }}
          >
            Create Wel Account
          </BridgeButton>
          <BridgeButton
            onClick={handleSetPrikey}
            sx={{
              fontSize: "13px",
              width: "200px",
              height: "40px",
              borderRadius: "5px",
              lineHeight: "15px",
              marginBottom: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            Set Prikey
          </BridgeButton>
          <BridgeButton
            onClick={handleUnsetPrikey}
            sx={{
              fontSize: "13px",
              width: "200px",
              height: "40px",
              borderRadius: "5px",
              lineHeight: "15px",
              marginBottom: "10px",
            }}
          >
            Unset Prikey
          </BridgeButton>
        </Box>

        <Table
          rowKey={"id"}
          columns={columns}
          dataSource={data?.data}
          loading={isLoading || isFetching}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                //onRowClicked(record, rowIndex, event);
              }, // click row
            };
          }}
          size="middle"
          rowClassName={clsx(styles.cursor)}
        />

        {open && (
          <WelAccModal
            user={selectedWelAccount}
            isOpen={open}
            title="User Details"
            onClose={handleCloseUserDetailsModal}
            onSubmit={handleSubmitUserDetailsModal}
          />
        )}

        {openSetPrikeyModal && (
          <WelPrikeyModal
            isOpen={openSetPrikeyModal}
            title="User Details"
            onClose={handleCloseSetPrikeyModal}
            onSubmit={handleSubmitSetPrikeyModal}
          />
        )}

        {
          <ConfirmationModal
            open={openDeleteConfirmModal}
            onSubmit={onDeleteWelAccount}
            onCancel={onCancel}
            title="Are you sure ?"
          >
            <Typography>
              {"Do you really want to delete this account ?"}
            </Typography>
          </ConfirmationModal>
        }
      </Grid>
    </Grid>
  );
};

export default WelConfig;
