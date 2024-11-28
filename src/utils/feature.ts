import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { MessageresponceType } from "../types/apiTypes";
import moment from "moment";

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

export const getLastMonths = () => {
  const currentDate = moment();

  currentDate.date(1);

  const lastSixMonth: string[] = [];
  const lastTwelveMonth: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    lastSixMonth.unshift(monthName);
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    lastTwelveMonth.unshift(monthName);
  }

  return {
    lastSixMonth,
    lastTwelveMonth,
  };
};
