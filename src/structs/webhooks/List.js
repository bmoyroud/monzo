const { assign } = require("superstruct");
const AccountId = require("../common/AccountId");
const { CursorBasedPagination } = require("../common/Pagination");

module.exports = assign(AccountId, CursorBasedPagination);
