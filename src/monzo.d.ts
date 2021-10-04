export interface WhoAmI {
  authenticated: boolean;
  client_id: string;
  user_id: string;
}

type AccountType = "uk_prepaid" | "uk_retail" | "uk_retail_joint";

// TODO: could be any currency code?
type Currency = "GBP" | "USD";

type CountryCode = "GB";

interface Owner {
  user_id: string;
  preferred_name: string;
  preferred_first_name: string;
}

interface PaymentDetail {
  account_number: string;
  sort_code: string;
}

export interface Account {
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
}

export interface Balance {
  balance: number;
  total_balance: number;
  balance_including_flexible_savings: number;
  currency: Currency;
  spend_today: number;
  local_currency: string;
  local_exchange_rate: number;
  local_spend: [];
}

type PotType = "default" | "flexible_savings" | string;

export interface Pot {
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
}

// TODO: add all basic Monzo categories?
type TransactionCategory =
  | "entertainment"
  | "income"
  | "savings"
  | "bills"
  | "shopping"
  | "holidays"
  | "general"
  | "eating_out"
  | "transport"
  | "groceries"
  | "transfers"
  // TODO: with Monzo Plus user can create their own categories
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

export interface Transaction {
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
}

// TODO: remove string and replace with union of file types
type FileType = "image/png" | string;

// TODO: difference between file_type and type, between file_url and url
export interface Attachment {
  id: string;
  user_id: string;
  external_id: string;
  file_url: string;
  file_type: FileType;
  created: string;
  // two properties below exist in transaction.attachments
  type?: FileType;
  url?: string;
}

type Metadata =
  | MastercardMetadata
  | FasterPaymentsMetadata
  | PotMetadata
  | BacsMetadata;

interface MastercardMetadata {
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
}

interface FasterPaymentsMetadata {
  faster_payment: boolean;
  fps_fpid: string;
  fps_payment_id: string;
  insertion: string;
  notes: string;
  trn: string;
}

interface PotMetadata {
  external_id: string;
  ledger_insertion_id: string;
  pot_deposit_id: string;
  pot_id: string;
  trigger: string;
  triggered_by: string;
  user_id: string;
}

interface BacsMetadata {
  bacs_direct_debit_instruction_id: string;
  bacs_payment_id: string;
  bacs_record_id: string;
  ledger_insertion_id: string;
  notes: string;
  subscription_id: string;
}

interface CounterParty {
  account_number: string;
  name: string;
  service_user_number?: string;
  sort_code: string;
  user_id: string;
}

export interface Upload {
  file_url: string;
  upload_url: string;
}

interface Item {
  description: string;
  amount: number;
  currency: Currency;
  // TODO: make 2 fields below optional? will they always appear on response
  quantity?: number;
  unit?: string;
  // despite what docs says - this field is required!
  tax: number;
}

interface MainItem extends Item {
  sub_items: Item[];
}

// TODO: check receipt optional fields? are they optional if we use type as API response?
interface Tax {
  description: string;
  amount: number;
  currency: Currency;
  tax_number?: string;
}

type PaymentType = "cash" | "card" | "gift_card";

interface Payment {
  type: PaymentType;
  amount: number;
  currency: Currency;
  // TODO: conditional type if type is card
  last_four?: string;
  // TODO: conditional type if type is gift_card
  gift_card_type?: string;
}

interface Merchant {
  name?: string;
  online?: boolean;
  phone?: string;
  email?: string;
  store_name?: string;
  store_address?: string;
  store_postcode?: string;
}

export interface Receipt {
  id?: string;
  external_id: string;
  transaction_id: string;
  proof_of_purchase_id?: string;
  total: number;
  currency: Currency;
  merchant?: Merchant;
  payments?: Payment[];
  taxes?: Tax[];
  items: MainItem[];
  barcode?: null;
}

export interface Webhook {
  id: string;
  account_id: string;
  url: string;
}
