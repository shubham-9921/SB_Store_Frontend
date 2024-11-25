import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { MessageresponceType } from "../types/apiTypes";

type resDataType =
  | {
      data: MessageresponceType;
      error?: undefined;
    }
  | {
      data?: undefined;
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: resDataType,
  navigate: NavigateFunction,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data!.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponce = error.data as MessageresponceType;
    toast.error(messageResponce.message);
  }
};
