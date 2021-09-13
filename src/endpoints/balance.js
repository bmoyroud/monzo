module.exports = (client) => {
  return {
    retrieve: (accountId) => {
      if (!accountId) {
        throw new Error("Please provide the account id.");
      }
      return client.get("/balance", {
        params: {
          account_id: accountId,
        },
      });
    },
  };
};
