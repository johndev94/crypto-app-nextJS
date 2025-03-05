"use client";

import { fetchAllCryptos } from "../data/allCryptos";
import { useQuery } from "@tanstack/react-query";

export function useAllCryptos() {
  return useQuery<unknown[], Error>({
    queryKey: ["allCryptos"],
    queryFn: async () => {
      const data = await fetchAllCryptos();
      return data;
    },
    staleTime: 1000000,
  })
}
