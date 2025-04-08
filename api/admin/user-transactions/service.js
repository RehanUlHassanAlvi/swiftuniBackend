const queries = require("./queries");
const { query } = require("../../../utils/db");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const {
  bankAlfalah: {
    key_1,
    key_2,
    handshake_url,
    hs_channel_id,
    hs_return_url,
    hs_merchant_id,
    hs_store_id,
    hs_merchant_hash,
    hs_merchant_password,
    hs_merchant_username,
    hs_currency,
    hs_transaction_type_id,
  },
} = require("../../../conf/config");
function generate24DigitRandomNumber() {
  let randomNumber = "";
  while (randomNumber.length < 24) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

// Function to encrypt data using AES
function encryptData(data, key, iv) {
  return CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(data),
    CryptoJS.enc.Utf8.parse(key),
    {
      keySize: 128 / 8,
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
}

module.exports.subscribePackageUsingCreaditCard = async (values) => {
  try {
    const x = generate24DigitRandomNumber();
    const handshakeData = {
      HS_RequestHash: "",
      HS_IsRedirectionRequest: `1`,
      HS_ChannelId: hs_channel_id,
      HS_ReturnURL: hs_return_url,
      HS_MerchantId: hs_merchant_id,
      HS_StoreId: hs_store_id,
      HS_MerchantHash: hs_merchant_hash,
      HS_MerchantUsername: hs_merchant_username,
      HS_MerchantPassword: hs_merchant_password,
      HS_TransactionReferenceNumber: x,
    };

    const mapString = Object.keys(handshakeData)
      .map((key) => `${key}=${handshakeData[key]}`)
      .join("&");
    handshakeData.HS_RequestHash = encryptData(mapString, key_1, key_2);

    const response = await axios.post(
      "https://sandbox.bankalfalah.com/HS/api/HSAPI/HSAPI",
      handshakeData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Handshake Response:", response.data);
    if (response.data.success === "true") {
      req.session.orderID = x;
      req.session.AuthToken = response.data.AuthToken;
      const values = [];
      const storeindb = await query(
        queries.subscribePackageUsingCreaditCard(),
        values
      );
      console.log("Success: Handshake Successful");
    } else {
      console.log("Error: Handshake Unsuccessful");
    }

    return;
    const result = await axios.post(handshake_url);

    const { rows } = await query(
      queries.subscribePackageUsingCreaditCard(),
      values
    );
    if (rows[0].add_user_transaction) {
      const result_object = {
        responseCode: 200,
        message: "Vocab added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Vocab",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "User already exists",
        response: "",
      };
      return error_object;
    }
    if (error.code == 23503) {
      const error_object = {
        responseCode: 500,
        message: "Question should exist if you want to add its Vocabs",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error,
      response: "",
    };
    return error_object;
  }
};

module.exports.subscribePackageUsingBank = async (values) => {
  try {
    const { rows } = await query(queries.subscribePackageUsingBank(), values);
    if (rows[0].add_user_transaction) {
      const result_object = {
        responseCode: 200,
        message: "Receipt added successfully",
        AdminId: rows[0].add_admin,
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Receipt",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.approveUserTransaction = async (values) => {
  try {
    const { rows } = await query(queries.approveUserTransaction(), values);
    if (rows[0].approve_transaction) {
      const result_object = {
        responseCode: 200,
        message: "Transaction updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Transaction",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Option already exists",
        response: "",
      };
      return error_object;
    }
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.userTransactions = async (values) => {
  try {
    const { rows } = await query(queries.userTransactions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "transactions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no transactions available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.superadminBuySubscription = async (req, values) => {
  try {
    const { rows } = await query(queries.superadminBuySubscription(), values);
    if (rows[0].superadmin_buy_subscription_for_user) {
      const result_object = {
        responseCode: 200,
        message: "Transaction updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Transaction",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.error("Error in superadminBuy:", error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};

module.exports.allTransactions = async (values) => {
  try {
    const { rows } = await query(queries.allTransactions(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "transactions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no transactions available",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    console.log(error);
    const error_object = {
      responseCode: 500,
      message: error.message,
      response: "",
    };
    return error_object;
  }
};
