const AdminBro = require("admin-bro");

const AdminBroExpress = require("@admin-bro/express");
const AdminBroSequelize = require("@admin-bro/sequelize");
const db = require("./db.js");
AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
  databases: [db],
  rootPath: "/admin",
});

const adminRouter = AdminBroExpress.buildRouter(adminBro);

module.exports = { adminBro, adminRouter };
