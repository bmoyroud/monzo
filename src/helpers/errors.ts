import {
  INVALID_ACCOUNT_TYPE,
  INVALID_FEED_ITEM_TYPE,
} from "../constants/errors";

const commaSeparateTypes = (types: string[]) => types.join(", ");

export const buildError = (message: string) => new Error(message);

export const buildInvalidAccountTypeError = (accountTypes: string[]) =>
  `${INVALID_ACCOUNT_TYPE} (${commaSeparateTypes(accountTypes)}).`;

export const buildInvalidFeedItemTypeError = (feedItemTypes: string[]) =>
  `${INVALID_FEED_ITEM_TYPE} (${commaSeparateTypes(feedItemTypes)}).`;
