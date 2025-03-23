const ejs = require("ejs");
const path = require("path");

/**
 *
 * @param {string} template
 * @param {object} data
 * @returns {Promise<html>|error}
 */
const readEjs = async (template, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, "..", `templates/${template}.ejs`),
      { ...data },
      (err, data) => {
        err ? reject(err) : resolve(data);
      }
    );
  });
};

/**
 *
 * @param {{companyName:string,adminEmail:string,password:string}} param0
 * @returns {template:html}
 */
const getWelcomeTemplate = async ({ companyName, adminEmail, password }) => {
  try {
    return await readEjs("welcome", { companyName, adminEmail, password });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 *
 * @param {string} template
 * @returns {templatter:function}
 */
function getTemplate(template) {
  switch (template) {
    case "welcome":
      return getWelcomeTemplate;
    default:
      null;
  }
}

module.exports = getTemplate;
