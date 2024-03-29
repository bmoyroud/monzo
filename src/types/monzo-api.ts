import { Infer } from "superstruct";
import { AccountType } from "../structs/accounts";
import { FileType } from "../structs/attachments";
import { Currency } from "../structs/common";
import { ReceiptReq } from "../structs/receipt";
import { Tax } from "../structs/receipt/tax";

// AUTHENTICATION
type WhoAmI = {
  authenticated: boolean;
  client_id: string;
  user_id: string;
};

// ACCOUNTS
type CountryCode = "GB";

type Owner = {
  user_id: string;
  preferred_name: string;
  preferred_first_name: string;
};

type PaymentDetail = {
  account_number: string;
  sort_code: string;
};

type Account = {
  id: string;
  closed: boolean;
  created: string;
  description: string;
  type: AccountType;
  currency: Currency;
  country_code: CountryCode;
  owners: Owner[];

  // if closed: false
  account_number: string;
  sort_code: string;
  payments_details: {
    locale_uk: PaymentDetail;
  };
};

type Accounts = Account[];

// BALANCE
type Balance = {
  balance: number;
  total_balance: number;
  balance_including_flexible_savings: number;
  currency: Currency;
  spend_today: number;
  local_currency: string;
  local_exchange_rate: number;
  local_spend: [];
};

// POTS
type PotType = "default" | "flexible_savings" | string;

type Pot = {
  id: string;
  name: string;
  style: string;
  balance: number;
  currency: Currency;
  goal_amount?: number;
  type: PotType;
  product_id: string;
  current_account_id: string;
  cover_image_url: string;
  isa_wrapper: string;
  round_up: boolean;
  round_up_multiplier: null;
  is_tax_pot: boolean;
  created: string;
  updated: string;
  deleted: boolean;
  locked: boolean;
  charity_id: string;
  available_for_bills: boolean;
  has_virtual_cards: boolean;
};

type Pots = Pot[];

// TRANSACTIONS
type TransactionCategory =
  // top-ups have category 'mondo'
  | "mondo"
  | "general"
  | "eating_out"
  | "expenses"
  | "transport"
  | "cash"
  | "bills"
  | "entertainment"
  | "shopping"
  | "holidays"
  | "groceries"
  // above are the ones from docs
  | "income"
  | "savings"
  | "transfers"
  // note: with Monzo Plus, users can create their own categories
  | string;

type Scheme =
  | "mastercard"
  | "payport_faster_payments"
  | "uk_retail_pot"
  | "bacs";

type DeclineReason =
  | "INSUFFICIENT_FUNDS"
  | "CARD_INACTIVE"
  | "CARD_BLOCKED"
  | "INVALID_CVC"
  | "OTHER";

type Metadata =
  | MastercardMetadata
  | FasterPaymentsMetadata
  | PotMetadata
  | BacsMetadata;

type MastercardMetadata = {
  ledger_insertion_id: string;
  mastercard_approval_type: string;
  mastercard_auth_message_id: string;
  mastercard_card_id: string;
  mastercard_lifecycle_id: string;
  mcc: string;
  notes?: string;
  subscription_id?: string;

  // 3 fields below are Android Pay
  token_transaction_identifier?: string;
  token_unique_reference?: string;
  tokenization_method?: string;
};

type FasterPaymentsMetadata = {
  faster_payment: boolean;
  fps_fpid: string;
  fps_payment_id: string;
  insertion: string;
  notes: string;
  trn: string;
};

type PotMetadata = {
  external_id: string;
  ledger_insertion_id: string;
  pot_deposit_id: string;
  pot_id: string;
  trigger: string;
  triggered_by: string;
  user_id: string;
};

type BacsMetadata = {
  bacs_direct_debit_instruction_id: string;
  bacs_payment_id: string;
  bacs_record_id: string;
  ledger_insertion_id: string;
  notes: string;
  subscription_id: string;
};

type CounterParty = {
  account_number: string;
  name: string;
  service_user_number?: string;
  sort_code: string;
  user_id: string;
};

type Merchant = {
  id: string;
  group_id: string;
  created: string;
  name: string;
  logo: string;
  emoji: string;
  category: string;
  online: boolean;
  atm: boolean;
  address: {
    short_formatted: string;
    formatted: string;
    address: string;
    city: string;
    region: string;
    country: string;
    postcode: string;
    latitude: number;
    longitude: number;
    zoom_level: number;
    approximate: boolean;
  };
  updated: string;
  metadata: {
    created_for_merchant: string;
    created_for_transaction: string;
    enriched_from_settlement: string;
    google_places_icon: string;
    google_places_id: string;
    google_places_name: string;
    suggested_tags: string;
    twitter_id: string;
    website: string;
  };
  disable_feedback: boolean;
};

export type Transaction = {
  account_id: string;
  amount: number;
  amount_is_pending: false;
  atm_fees_detailed: null;
  attachments: Attachment[] | null;
  can_add_to_tab: boolean;
  can_be_excluded_from_breakdown: boolean;
  can_be_made_subscription: boolean;
  can_match_transactions_in_categorization: boolean;
  can_split_the_bill: boolean;
  categories: { [key: TransactionCategory]: number };
  category: TransactionCategory;
  counterparty: CounterParty;
  created: string;
  currency: Currency;
  decline_reason?: DeclineReason;
  dedupe_id: string;
  description: string;
  fees: {};
  id: string;
  include_in_spending: boolean;
  international: null;
  is_load: boolean;
  labels: null;
  local_amount: number;
  local_currency: Currency;
  merchant: string | Merchant;
  metadata: Metadata;
  notes: string;
  originator: boolean;
  scheme: Scheme;
  settled: string;
  updated: string;
  user_id: string;
};

type Transactions = Transaction[];

// ATTACHMENT
type UploadURLs = {
  file_url: string;
  upload_url: string;
};

type Attachment = {
  id: string;
  user_id: string;
  external_id: string;
  file_url: string;
  file_type: FileType;
  created: string;
};

// RECEIPT

// tax_number is always returned in response
// use intersection type to ensure tax_number is not optional
type Tax = Infer<typeof Tax> & {
  tax_number: string;
};

type Receipt = ReceiptReq & {
  // override taxes array
  taxes?: Tax[];

  // additional fields on API response
  id?: string;
  proof_of_purchase_id?: string;
  barcode?: null;
};

// WEBHOOKS
type Webhook = {
  id: string;
  account_id: string;
  url: string;
};

type Webhooks = Webhook[];

export type WhoAmIRes = WhoAmI;

export type AccountsRes = { accounts: Accounts };

export type BalanceRes = Balance;

export type PotRes = Pot;
export type PotsRes = { pots: Pots };

export type TransactionRes = { transaction: Transaction };
export type TransactionsRes = { transactions: Transactions };

export type UploadRes = UploadURLs;
export type AttachmentRes = { attachment: Attachment };

export type ReceiptRes = { receipt: Receipt };

export type WebhookRes = { webhook: Webhook };
export type WebhooksRes = { webhooks: Webhooks };

export type EmptyRes = {};
