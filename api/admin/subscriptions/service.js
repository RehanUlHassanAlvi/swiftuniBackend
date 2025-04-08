const queries = require("./queries");
const { query } = require("../../../utils/db");

module.exports.getSubscription = async () => {
  try {
    const { rows } = await query(queries.getSubscription());
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Subscriptions:",
        response: rows,
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Subscriptions available",
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

module.exports.getSubscriptionPlans = async (values) => {
  try {
    const { rows } = await query(queries.getSubscriptionPlans(), values);
    if (rows[0].get_plans_with_subplans) {
      const result_object = {
        responseCode: 200,
        message: "Subscriptions:",
        response: rows[0].get_plans_with_subplans.sort((a, b) => {
          if (a.plan_name === "plan1" && b.plan_name !== "plan1") {
            return -1; // a comes first
          } else if (a.plan_name !== "plan1" && b.plan_name === "plan1") {
            return 1; // b comes first
          }
          return 0; // keep original order if both are the same
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Subscriptions available",
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

module.exports.getSubscriptionPlansMock = async (values) => {
  try {
    const { rows } = await query(queries.getSubscriptionPlansMock(), values);
    if (rows[0].get_plans_with_subplans_mockonly) {
      const result_object = {
        responseCode: 200,
        message: "Mock Subscriptions:",
        response: rows[0].get_plans_with_subplans_mockonly.sort((a, b) => {
          if (a.plan_name === "plan1" && b.plan_name !== "plan1") {
            return -1; // a comes first
          } else if (a.plan_name !== "plan1" && b.plan_name === "plan1") {
            return 1; // b comes first
          }
          return 0; // keep original order if both are the same
        }),
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "There are currently no Subscriptions available",
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

module.exports.addSubscription = async (values) => {
  try {
    const { rows } = await query(queries.addSubscription(), values);
    if (Object.keys(rows).length > 0) {
      const result_object = {
        responseCode: 200,
        message: "Subscription added successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while adding Subscription",
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
        message: "Question should exist if you want to add its Subscriptions",
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

module.exports.updateSubscription = async (values) => {
  try {
    const { rows } = await query(queries.updateSubscription(), values);
    if (rows[0].update_subscription) {
      const result_object = {
        responseCode: 200,
        message: "Subscription updated successfully",
        response: "",
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while updating Subscription",
        response: "",
      };
      return error_object;
    }
  } catch (error) {
    if (error.code == 23505) {
      const error_object = {
        responseCode: 500,
        message: "Subscription already exists",
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

module.exports.deleteSubscription = async (values) => {
  try {
    const { rows } = await query(queries.deleteSubscription(), values);
    if (rows[0].block_subscription_by_admin) {
      const result_object = {
        responseCode: 200,
        message: "Subscription Blocked Successfully",
        response: rows[0],
      };
      return result_object;
    } else {
      const error_object = {
        responseCode: 300,
        message: "Something went wrong while blocking Subscription",
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

