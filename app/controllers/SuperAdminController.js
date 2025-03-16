const bcrypt = require("bcrypt");
const { addCompany } = require("../queries/SuperAdminQueries");
const utils = require("../../utils");

exports.createCompany = async (details) => {
  try {

    const { company_name, admin_name, admin_email, password, plan_type, subscribers, videos_per_subscriber } = details;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const companyData = [company_name, admin_name, admin_email, hashedPassword, plan_type, subscribers, videos_per_subscriber];

    // Insert into Database
   const result = await addCompany(companyData);
   console.log("in controller",result);
        return result;

  } catch (error) {
    throw error;
  }
};
