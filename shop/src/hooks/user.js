import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get("/username.json").then((res) => res.data),
  });
}
