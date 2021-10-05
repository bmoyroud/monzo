import { Infer } from "superstruct";
import { AccountType } from "../structs/accounts";
import { Currency } from "../structs/common";
import { Merchant } from "../structs/receipt/merchant";
import { Payment } from "../structs/receipt/payment";
import { Tax } from "../structs/receipt/tax";

// AUTHENTICATION
export interface WhoAmI {
  authenticated: boolean;
  client_id: string;
  user_id: string;
}

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

export type Account = {
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

// BALANCE
export type Balance = {
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

export type Pot = {
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
  merchant: string;
  metadata: Metadata;
  notes: string;
  originator: boolean;
  scheme: Scheme;
  settled: string;
  updated: string;
  user_id: string;
};

// ATTACHMENT
export type UploadResponse = {
  file_url: string;
  upload_url: string;
};

// TODO: remove string and replace with union of file types
type FileType = "image/png" | string;

// TODO: difference between file_type and type, between file_url and url
export type Attachment = {
  id: string;
  user_id: string;
  external_id: string;
  file_url: string;
  file_type: FileType;
  created: string;
  // two properties below exist in transaction.attachments
  type?: FileType;
  url?: string;
};

// RECEIPT

// TODO: check receipt optional fields? are they optional if we use type as API response?

type Item = {
  description: string;
  amount: number;
  currency: Currency;
  // TODO: make 2 fields below optional? will they always appear on response
  quantity?: number;
  unit?: string;
  // despite what docs says - this field is required!
  tax: number;
};

// TODO: is this the same as interface extends?
type MainItem = Item & {
  sub_items: Item[];
};

// tax_number is always returned in response
// use intersection type to ensure tax_number is not optional
type Tax = Infer<typeof Tax> & {
  tax_number: string;
};

export type Receipt = {
  id?: string;
  proof_of_purchase_id?: string;

  // fields
  transaction_id: string;
  external_id: string;
  total: number;
  currency: Currency;
  items: MainItem[];
  taxes?: Tax[];
  payments?: Payment[];
  merchant?: Merchant;

  //
  barcode?: null;
};

// WEBHOOKS
export type Webhook = {
  id: string;
  account_id: string;
  url: string;
};
