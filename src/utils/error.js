import { toast } from "react-toastify";
import { toastOptions } from "./toastOptions";

export class DatabaseError extends Error {
  constructor(message, errorCode, original) {
    super(message);
    this.code = errorCode;
    this.original = original;

    toast.error(`Error ${errorCode}: ${message}`, {
      ...toastOptions,
      toastId: "error",
    });

    console.log(`Error ${errorCode}: ${message}`);
    console.log(original);
  }
}
