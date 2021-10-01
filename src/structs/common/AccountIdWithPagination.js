const { assign } = require("superstruct");
const AccountId = require("./AccountId");
const Pagination = require("./Pagination");

const AccountIdWithPagination = assign(AccountId, Pagination);

module.exports = AccountIdWithPagination;
