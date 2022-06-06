import { useQuery } from "react-query";
import { Paging } from "app/models/paging";
import { fetchRoles, fetchUsers } from "../../services/user.service";

export const WELUPS_ADMIN_ROLES_LIST = "WELUPS_ADMIN_ROLES_LIST";

export const useRolesListing = () => {
  return useQuery([WELUPS_ADMIN_ROLES_LIST], () => fetchRoles(), {
    keepPreviousData: true,
  });
};
