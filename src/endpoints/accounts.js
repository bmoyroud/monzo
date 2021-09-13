const { buildAccountsUrl } = require("../utils/urls");

module.exports = (client) => {
  return {
    list: (accountType) => {
      const endpointUrl = buildAccountsUrl();

      if (accountType) {
        const accountTypes = ["uk_prepaid", "uk_retail", "uk_retail_joint"];
        if (!accountTypes.includes(accountType)) {
          throw new Error(
            `Please provide a valid account type (${accountTypes.join(", ")}).`
          );
        }
        return client.get(endpointUrl, {
          params: {
            account_type: accountType,
          },
        });
      }

      return client.get(endpointUrl).then((data) => data.accounts);
    },
  };
};
