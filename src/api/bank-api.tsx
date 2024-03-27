import Instance from "./axios-instance";
import { BankDataResponse } from "./type";

class BankApi {
  static async getBankData() {
    try {
      const response = await Instance.get(
        `/haetsal-service/api/v2/bank/account`,
      );
      console.log("Response", response);
      if (response && response.data) {
        const res = response.data as BankDataResponse;
        return res.data;
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Error fetching bank data:", error);
      throw error; // Throw the error to handle it in the calling code
    }
  }
}

export default BankApi;
