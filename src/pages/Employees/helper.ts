import { MagicKeyValue } from "../../type";
import { DataPost, DataView } from "./types";

export const mapDataToView = (data: MagicKeyValue[]) => {
  return data as DataView[];
};

export const mapDataToPost = (data: MagicKeyValue) => {
  return data as DataPost;
};
