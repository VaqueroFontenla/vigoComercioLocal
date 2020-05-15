import axios from "axios";
import * as mapper from "./mapper";

// const url = "https://sheet.best/api/sheets/627094ca-126d-4d3c-a1a8-7d0b2a42f6b4";
const url = "https://spreadsheets.google.com/feeds/list/1MsE7NbJOPnQMlKrlXzYU_-qqFUYH3Qefe1UXmyeaUbM/1/public/full?alt=json";


export const getAllRecords = async () => {
  try {
    const response = await axios(url);
    if (response.status === 200) {
      return mapper.mapApiToGeoJson(response.data.feed.entry);
    }
  } catch (error) {
    console.log(error);
  }
};