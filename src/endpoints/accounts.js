module.exports = (client) => {
  return {
    list: (accountType) => {
      if (accountType) {
        const accountTypes = ["uk_prepaid", "uk_retail", "uk_retail_joint"];
        if (!accountTypes.includes(accountType)) {
          throw new Error(
            `Please provide a valid account type (${accountTypes.join(", ")}).`
          );
        }
        return client.get("/accounts", {
          params: {
            account_type: accountType,
          },
        });
      }
      return client.get("/accounts").then((data) => data.accounts);
    },
  };
};
