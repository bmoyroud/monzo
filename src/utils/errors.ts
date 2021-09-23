import {
  INVALID_ACCOUNT_TYPE,
  INVALID_FEED_ITEM_TYPE,
} from "../constants/errors";

const commaSeparateTypes = (types) => types.join(", ");

export const buildError = (message) => new Error(message);

export const buildInvalidAccountTypeError = (accountTypes) =>
  `${INVALID_ACCOUNT_TYPE} (${commaSeparateTypes(accountTypes)}).`;

export const buildInvalidFeedItemTypeError = (feedItemTypes) =>
  `${INVALID_FEED_ITEM_TYPE} (${commaSeparateTypes(feedItemTypes)}).`;
