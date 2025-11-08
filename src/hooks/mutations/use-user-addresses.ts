import { useQuery } from "@tanstack/react-query";

import { getUserAddresses } from "@/src/actions/get-user-addresses";

export const getUserAddressesQueryKey = () => ["user-addresses"] as const;

export const useUserAddresses = () => {
  return useQuery({
    queryKey: getUserAddressesQueryKey(),
    queryFn: getUserAddresses,
  });
};