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

module.exports.subscribePackageUsingBankWhitelabel = async (values) => {
  try {
    const { rows } = await query(
      queries.subscribePackageUsingBankWhitelabel(),
      values
    );
    if (rows[0].add_whitelabel_transaction) {
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

module.exports.paymentSuccessWhitelabel = async (req,values) => {
  try {
    const result = await axios.get(
      `https://payments.bankalfalah.com/HS/api/IPN/OrderStatus/${hs_merchant_id}/${hs_store_id}/${values[2]}`
      // `https://sandbox.bankalfalah.com/HS/api/IPN/OrderStatus/${hs_merchant_id}/${hs_store_id}/${values[2]}`
    );
    console.log("RES", JSON.parse(result.data));
    const {
      TransactionStatus,
      TransactionReferenceNumber,
      TransactionId,
      TransactionAmount,
      MobileNumber,
      Description,
    } = JSON.parse(result.data);

    const values_appended = [
      values[0],
      values[1],
      TransactionStatus == "Paid" ? "completed" : "failed",
      null,
      result.data,
      null,
      TransactionReferenceNumber.split("-")[1]
        ? TransactionReferenceNumber.split("-")[1] != ""
          ? TransactionReferenceNumber.split("-")[1]
          : null
        : null,
      null,
      null,
      MobileNumber,
      null,
      values[2],
      TransactionReferenceNumber,
      TransactionId,
      TransactionAmount,
      Description,
      TransactionStatus,
      null,
      TransactionReferenceNumber.split("-")[2]
        ? TransactionReferenceNumber.split("-")[2]
        : null,
      "0",
      req.session.portalID,
      TransactionReferenceNumber.split("-")[3]
        ? TransactionReferenceNumber.split("-")[3]
        : null,
      TransactionReferenceNumber.split("-")[4]
        ? TransactionReferenceNumber.split("-")[4]
        : null,
    ];

    const { rows } = await query(
      queries.paymentSuccessWhitelabel(),
      values_appended
    );
    if (rows[0].add_whitelabel_transaction_alfalah) {
      const result_object = {
        responseCode: 200,
        message: "Payment added successfully",
        response: "",
      };
      const result_object_2 = {
        responseCode: 300,
        message: "You payment is rejected",
        response: "",
      };
      return TransactionStatus == "Paid" ? result_object : result_object_2;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Payment",
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

module.exports.superadminBuy = async (req, values) => {
  try {
    const { rows } = await query(queries.superadminBuy(), values);
    if (rows[0].superadmin_buy) {
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

module.exports.approveUserTransaction = async (values) => {
  try {
    console.log("Here");
    const { rows } = await query(queries.approveUserTransaction(), values);
    console.log("Here", rows[0]);
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

module.exports.deleteVocabBank = async (values) => {
  try {
    const { rows } = await query(queries.deleteVocabBank(), values);
    if (rows[0].delete_vocab) {
      const result_object = {
        responseCode: 200,
        message: "Vocab Deleted Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while deleting Vocab",
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
