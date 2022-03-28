const SetupResourcesVI = {
  old_data_subject: 'Old Register Data',
  new_data_subject: 'New Register Data',

  // Bank
  bank: 'Bank',
  bank_list: 'Bank List',
  bank_id: 'Bank ID',
  bank_name: 'Bank Name',
  bank_short_name: 'Bank Short Name',
  bank_branch_id: 'Branch ID',
  bank_base_currency: 'Base Currency',
  bank_host_bank: 'Host Bank',
  bank_password_delivery_method_email_without_challenge: 'Email Without Challenge',
  bank_password_delivery_method_email_with_challenge: 'Email With Challenge',
  password_delivery_method_pin_mailer: 'Pinmailer',
  password_delivery_method: 'Password Delivery Method',

  // Payee + Payer
  placeholder_address1: 'Address 1',
  placeholder_address2: 'Address 2',
  placeholder_address3: 'Address 3',
  payment_amount_max: 'Maximum Payment Amount Per Transaction',
  mobile_phone_number: 'Mobile Phone No',

  // Payee
  payee: 'Payee',
  payee_id: 'Payee ID',
  payee_name: 'Payee Name',
  payee_short_name: 'Payee Short Name',
  payee_set_as_payer: 'Set as Payer',
  entity_type: 'Entity Type',
  business_type: 'Business Type',
  payees_list: 'Payee Summary',
  payees_lookup_subject: 'Lookup Payees',
  business_type_b2b: 'B2B',
  business_type_b2c: 'B2C',
  business_type_both: 'BOTH',

  // Payer
  payer: 'Payer',
  payer_name: 'Payer Name',
  payer_short_name: 'Payer Short Name',
  payer_payment_confirm: 'Payment Confirmation',
  payer_pymt_acc_ctl: 'Payment Account Control (DSO)',
  payer_set_as_payee: 'Set as Payee',
  payers_list: 'Payer Summary',
  payers_lookup_subject: 'Lookup Payers',
  placeholder_no_payment_confirm: 'No Payment Confirmation',
  placeholder_payment_confirm_for_all: 'Payment Confirmation for all',
  placeholder_payment_confirm_with_amount: 'Payment Confirmation with Minimum Authorisation Amount',

  // External Systems
  external_system: 'External System',
  externalsys_name: 'External System Name',
  externalsys_short_name: 'External System Short Name',
  externalsys_subject: 'External System Setup',
  externalsys_url_entry: 'Url For Status Update',
  externalsys_logout_url_entry: 'Url For Logout Action at Payment Page',
  externalsys_sign_on_approach_entry: 'Sign On Approach',
  externalsys_double_sign_on: 'Double Sign On (DSO)',
  externalsys_single_sign_on: 'Single Sign On (SSO)',
  externalsys_acc_validation_entry: 'Account Validation',
  externalsys_external_reference_number: 'External Reference Number',
  externalsys_disallow_conditional_duplication: 'Disallow Conditional Duplication',
  externalsys_allow_conditional_duplication: 'Allow Conditional Duplication',
  externalsys_payment_effective_date_control: 'Payment Effective Date Control',

  // Entity Relationship
  entity_relationship_list: 'Entity Relationship Summary',

  entity_relationship_payee_company_sys: 'Payee Company',
  entity_relationship_payee_list: 'To add to payee list',
  externalsys_relationship_subject: 'External System-Entity Relationship',

  enable_for_night_mode: 'Enable for night mode',
  // Receiving Account
  receiving_account_list: 'Receiving Account List',
  receiving_account_default_account: 'Set as Default Account',
  receiving_account_night_mode: 'Night Mode Enablement',
  receiving_account_night_mode_disable: 'Disable Night Mode',
  receiving_account_night_mode_block_credit: 'Enable Night Mode And Block Credit',
  receiving_account_night_mode_unblock_credit: 'Enable Night Mode And Unblock Credit',
  receiving_account_name: 'Receiving Account',

  // Transaction Fee Setup
  //// transaction-fee-setup-form
  fee_charges: 'Fee Charges',
  transaction_fee_setup_form_transaction_fee_setup: 'Transaction Fee Setup',
  transaction_fee_setup_form_location: 'Location',
  transaction_fee_setup_form_both: 'Both',
  transaction_fee_setup_form_different_zone: 'Different Zone',
  transaction_fee_setup_form_same_zone: 'Same Zone',
  transaction_fee_setup_form_consumer: 'Consumer',
  transaction_fee_setup_form_charge_type: 'Charge Type',
  transaction_fee_setup_form_waived: 'Waived',
  transaction_fee_setup_form_charge_to_payee: 'Charge to Payee',
  transaction_fee_setup_form_charge_to_payer: 'Charge to Payer',
  //// Charge to payee
  transaction_fee_setup_charging_detail: 'Charging Detail ',
  transaction_fee_setup_posting_type: 'Posting Type',
  transaction_fee_setup_immediately: 'Immediately',
  transaction_fee_setup_charge_to_payee_charging_payee_daily: 'Daily',
  transaction_fee_setup_charge_to_payee_charging_payee_monthly: 'Monthly',
  transaction_fee_setup_debit_account: 'Debit Account',
  transaction_fee_setup_charge_to_payee_charging_payee_other: 'Other',
  transaction_fee_setup_credit_account: 'Credit Account',
  //// Daily type
  transaction_fee_setup_fix_per_transaction: 'Fix Per Transaction',
  transaction_fee_setup_minimum_amount_per_day: 'Minimum Amount Per Day',
  transaction_fee_setup_maximum_amount_per_day: 'Maximum Amount Per Day',
  transaction_fee_setup_fixed_amount: 'Fixed Amount',
  transaction_fee_setup_amount: 'Amount (Baht)',
  //// Immediately type
  transaction_fee_setup_minimum_amount_per_transaction: 'Minimum Amount Per Transaction',
  transaction_fee_setup_maximum_amount_per_transaction: 'Maximum Amount Per Transaction',
  //// monthly type
  transaction_fee_setup_charge_to_payee_monthly_type_end_of_month: 'End of Month',
  transaction_fee_setup_charge_to_payee_monthly_type_other: 'Other  ',
  //// charging-rule-slab-basic
  transaction_fee_setup_charging_rule_lower_limit: 'Payment Lower Amount',
  transaction_fee_setup_charging_rule_upper_limit: 'Payment Upper Amount',
  transaction_fee_setup_charging_rule_min_amount: 'Min Amount (THB)',
  transaction_fee_setup_charging_rule_max_amount: 'Max Amount (THB)',
  //// charging-rules
  transaction_fee_setup_charge_to_payer_charging_rules_charging_rules: 'Charging Rules',
  transaction_fee_setup_charge_to_payer_charging_rules_charge_type: 'Charge Type',
  transaction_fee_setup_charge_uom: 'UOM',
  //// transaction_fee_setup_list
  transaction_fee_setup_list: 'Transaction Fee Setup',
  transaction_fee_setup_list_name: 'Transaction Fee Setup Name',
  transaction_fee_setup_list_short_name: 'Transaction Fee Setup Short Name',
  transaction_fee_setup_list_es_id: 'Es ID',
  //// Transaction_fee_setup_detail
  transaction_fee_setup_form_transaction_fee_setup_approve_reject: 'Approve/Reject Transaction Fee Setup',
  transaction_fee_setup_charge_to_payee_monthly_posting_of_every_month: 'Posting day of every month',
};

export default SetupResourcesVI;
