import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/src/actions/get-cart";

export const getUseCartQueryKey = () => ["cart"] as const;

export const useCart = () => {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCart(),
  });
};