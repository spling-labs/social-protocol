/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _int8: any;
  _text: any;
  bigint: any;
  bytea: any;
  json: any;
  timestamp: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "_int8". All fields are combined with logical 'AND'. */
export type _Int8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_int8']>;
  _gt?: InputMaybe<Scalars['_int8']>;
  _gte?: InputMaybe<Scalars['_int8']>;
  _in?: InputMaybe<Array<Scalars['_int8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_int8']>;
  _lte?: InputMaybe<Scalars['_int8']>;
  _neq?: InputMaybe<Scalars['_int8']>;
  _nin?: InputMaybe<Array<Scalars['_int8']>>;
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type Bytea_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bytea']>;
  _gt?: InputMaybe<Scalars['bytea']>;
  _gte?: InputMaybe<Scalars['bytea']>;
  _in?: InputMaybe<Array<Scalars['bytea']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bytea']>;
  _lte?: InputMaybe<Scalars['bytea']>;
  _neq?: InputMaybe<Scalars['bytea']>;
  _nin?: InputMaybe<Array<Scalars['bytea']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "splinglabs_0_1_0_decoded.all" */
  splinglabs_0_1_0_decoded_all: Array<Splinglabs_0_1_0_Decoded_All>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.all" using primary key columns */
  splinglabs_0_1_0_decoded_all_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_All>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.b" */
  splinglabs_0_1_0_decoded_b: Array<Splinglabs_0_1_0_Decoded_B>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.b" using primary key columns */
  splinglabs_0_1_0_decoded_b_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_B>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.bank" */
  splinglabs_0_1_0_decoded_bank: Array<Splinglabs_0_1_0_Decoded_Bank>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.bank" using primary key columns */
  splinglabs_0_1_0_decoded_bank_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Bank>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.groupprofile" */
  splinglabs_0_1_0_decoded_groupprofile: Array<Splinglabs_0_1_0_Decoded_Groupprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.groupprofile" using primary key columns */
  splinglabs_0_1_0_decoded_groupprofile_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Groupprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.likes" */
  splinglabs_0_1_0_decoded_likes: Array<Splinglabs_0_1_0_Decoded_Likes>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.likes" using primary key columns */
  splinglabs_0_1_0_decoded_likes_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Likes>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.post" */
  splinglabs_0_1_0_decoded_post: Array<Splinglabs_0_1_0_Decoded_Post>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.post" using primary key columns */
  splinglabs_0_1_0_decoded_post_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Post>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.reply" */
  splinglabs_0_1_0_decoded_reply: Array<Splinglabs_0_1_0_Decoded_Reply>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.reply" using primary key columns */
  splinglabs_0_1_0_decoded_reply_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Reply>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.spling" */
  splinglabs_0_1_0_decoded_spling: Array<Splinglabs_0_1_0_Decoded_Spling>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.spling" using primary key columns */
  splinglabs_0_1_0_decoded_spling_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Spling>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tags" */
  splinglabs_0_1_0_decoded_tags: Array<Splinglabs_0_1_0_Decoded_Tags>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tags" using primary key columns */
  splinglabs_0_1_0_decoded_tags_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Tags>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tip" */
  splinglabs_0_1_0_decoded_tip: Array<Splinglabs_0_1_0_Decoded_Tip>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tip" using primary key columns */
  splinglabs_0_1_0_decoded_tip_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Tip>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.userprofile" */
  splinglabs_0_1_0_decoded_userprofile: Array<Splinglabs_0_1_0_Decoded_Userprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.userprofile" using primary key columns */
  splinglabs_0_1_0_decoded_userprofile_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Userprofile>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_AllArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_All_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_All_By_PkArgs = {
  pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_BArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_B_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_B_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_BankArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Bank_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_GroupprofileArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Groupprofile_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_LikesArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Likes_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_PostArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Post_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_ReplyArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Reply_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_SplingArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Spling_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_TagsArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Tags_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_TipArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Tip_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Query_RootSplinglabs_0_1_0_Decoded_UserprofileArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>;
};


export type Query_RootSplinglabs_0_1_0_Decoded_Userprofile_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};

/** columns and relationships of "splinglabs_0_1_0_decoded.all" */
export type Splinglabs_0_1_0_Decoded_All = {
  __typename?: 'splinglabs_0_1_0_decoded_all';
  account_decoded_data?: Maybe<Scalars['json']>;
  account_raw_data?: Maybe<Scalars['bytea']>;
  account_type?: Maybe<Scalars['String']>;
  executable?: Maybe<Scalars['Boolean']>;
  is_bf?: Maybe<Scalars['Boolean']>;
  lamports?: Maybe<Scalars['bigint']>;
  owner?: Maybe<Scalars['String']>;
  pubkey: Scalars['String'];
  rent_epoch?: Maybe<Scalars['bigint']>;
  slot?: Maybe<Scalars['bigint']>;
  updated_on?: Maybe<Scalars['timestamp']>;
  write_version?: Maybe<Scalars['bigint']>;
};


/** columns and relationships of "splinglabs_0_1_0_decoded.all" */
export type Splinglabs_0_1_0_Decoded_AllAccount_Decoded_DataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.all". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_All_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_All_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Bool_Exp>>;
  account_decoded_data?: InputMaybe<Json_Comparison_Exp>;
  account_raw_data?: InputMaybe<Bytea_Comparison_Exp>;
  account_type?: InputMaybe<String_Comparison_Exp>;
  executable?: InputMaybe<Boolean_Comparison_Exp>;
  is_bf?: InputMaybe<Boolean_Comparison_Exp>;
  lamports?: InputMaybe<Bigint_Comparison_Exp>;
  owner?: InputMaybe<String_Comparison_Exp>;
  pubkey?: InputMaybe<String_Comparison_Exp>;
  rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  slot?: InputMaybe<Bigint_Comparison_Exp>;
  updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  write_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.all". */
export type Splinglabs_0_1_0_Decoded_All_Order_By = {
  account_decoded_data?: InputMaybe<Order_By>;
  account_raw_data?: InputMaybe<Order_By>;
  account_type?: InputMaybe<Order_By>;
  executable?: InputMaybe<Order_By>;
  is_bf?: InputMaybe<Order_By>;
  lamports?: InputMaybe<Order_By>;
  owner?: InputMaybe<Order_By>;
  pubkey?: InputMaybe<Order_By>;
  rent_epoch?: InputMaybe<Order_By>;
  slot?: InputMaybe<Order_By>;
  updated_on?: InputMaybe<Order_By>;
  write_version?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.all" */
export enum Splinglabs_0_1_0_Decoded_All_Select_Column {
  /** column name */
  AccountDecodedData = 'account_decoded_data',
  /** column name */
  AccountRawData = 'account_raw_data',
  /** column name */
  AccountType = 'account_type',
  /** column name */
  Executable = 'executable',
  /** column name */
  IsBf = 'is_bf',
  /** column name */
  Lamports = 'lamports',
  /** column name */
  Owner = 'owner',
  /** column name */
  Pubkey = 'pubkey',
  /** column name */
  RentEpoch = 'rent_epoch',
  /** column name */
  Slot = 'slot',
  /** column name */
  UpdatedOn = 'updated_on',
  /** column name */
  WriteVersion = 'write_version'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_all" */
export type Splinglabs_0_1_0_Decoded_All_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_All_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_All_Stream_Cursor_Value_Input = {
  account_decoded_data?: InputMaybe<Scalars['json']>;
  account_raw_data?: InputMaybe<Scalars['bytea']>;
  account_type?: InputMaybe<Scalars['String']>;
  executable?: InputMaybe<Scalars['Boolean']>;
  is_bf?: InputMaybe<Scalars['Boolean']>;
  lamports?: InputMaybe<Scalars['bigint']>;
  owner?: InputMaybe<Scalars['String']>;
  pubkey?: InputMaybe<Scalars['String']>;
  rent_epoch?: InputMaybe<Scalars['bigint']>;
  slot?: InputMaybe<Scalars['bigint']>;
  updated_on?: InputMaybe<Scalars['timestamp']>;
  write_version?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.b" */
export type Splinglabs_0_1_0_Decoded_B = {
  __typename?: 'splinglabs_0_1_0_decoded_b';
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.b". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_B_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_B_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Bool_Exp>>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.b". */
export type Splinglabs_0_1_0_Decoded_B_Order_By = {
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.b" */
export enum Splinglabs_0_1_0_Decoded_B_Select_Column {
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_b" */
export type Splinglabs_0_1_0_Decoded_B_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_B_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_B_Stream_Cursor_Value_Input = {
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.bank" */
export type Splinglabs_0_1_0_Decoded_Bank = {
  __typename?: 'splinglabs_0_1_0_decoded_bank';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  size?: Maybe<Scalars['Int']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.bank". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Bank_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.bank". */
export type Splinglabs_0_1_0_Decoded_Bank_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.bank" */
export enum Splinglabs_0_1_0_Decoded_Bank_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Size = 'size'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_bank" */
export type Splinglabs_0_1_0_Decoded_Bank_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Bank_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Bank_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  size?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.groupprofile" */
export type Splinglabs_0_1_0_Decoded_Groupprofile = {
  __typename?: 'splinglabs_0_1_0_decoded_groupprofile';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  gid?: Maybe<Scalars['bigint']>;
  groupname?: Maybe<Scalars['String']>;
  shdw?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['Int']>;
  ts?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.groupprofile". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  gid?: InputMaybe<Bigint_Comparison_Exp>;
  groupname?: InputMaybe<String_Comparison_Exp>;
  shdw?: InputMaybe<String_Comparison_Exp>;
  st?: InputMaybe<Int_Comparison_Exp>;
  ts?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.groupprofile". */
export type Splinglabs_0_1_0_Decoded_Groupprofile_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  gid?: InputMaybe<Order_By>;
  groupname?: InputMaybe<Order_By>;
  shdw?: InputMaybe<Order_By>;
  st?: InputMaybe<Order_By>;
  ts?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.groupprofile" */
export enum Splinglabs_0_1_0_Decoded_Groupprofile_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Gid = 'gid',
  /** column name */
  Groupname = 'groupname',
  /** column name */
  Shdw = 'shdw',
  /** column name */
  St = 'st',
  /** column name */
  Ts = 'ts'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_groupprofile" */
export type Splinglabs_0_1_0_Decoded_Groupprofile_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Groupprofile_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Groupprofile_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  gid?: InputMaybe<Scalars['bigint']>;
  groupname?: InputMaybe<Scalars['String']>;
  shdw?: InputMaybe<Scalars['String']>;
  st?: InputMaybe<Scalars['Int']>;
  ts?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.likes" */
export type Splinglabs_0_1_0_Decoded_Likes = {
  __typename?: 'splinglabs_0_1_0_decoded_likes';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  counter?: Maybe<Scalars['Int']>;
  users?: Maybe<Scalars['_int8']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.likes". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  counter?: InputMaybe<Int_Comparison_Exp>;
  users?: InputMaybe<_Int8_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.likes". */
export type Splinglabs_0_1_0_Decoded_Likes_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  counter?: InputMaybe<Order_By>;
  users?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.likes" */
export enum Splinglabs_0_1_0_Decoded_Likes_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Counter = 'counter',
  /** column name */
  Users = 'users'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_likes" */
export type Splinglabs_0_1_0_Decoded_Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Likes_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  counter?: InputMaybe<Scalars['Int']>;
  users?: InputMaybe<Scalars['_int8']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.post" */
export type Splinglabs_0_1_0_Decoded_Post = {
  __typename?: 'splinglabs_0_1_0_decoded_post';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  gid?: Maybe<Scalars['bigint']>;
  pid?: Maybe<Scalars['bigint']>;
  st?: Maybe<Scalars['Int']>;
  tid?: Maybe<Scalars['Int']>;
  ts?: Maybe<Scalars['bigint']>;
  uid?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.post". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Post_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  gid?: InputMaybe<Bigint_Comparison_Exp>;
  pid?: InputMaybe<Bigint_Comparison_Exp>;
  st?: InputMaybe<Int_Comparison_Exp>;
  tid?: InputMaybe<Int_Comparison_Exp>;
  ts?: InputMaybe<Bigint_Comparison_Exp>;
  uid?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.post". */
export type Splinglabs_0_1_0_Decoded_Post_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  gid?: InputMaybe<Order_By>;
  pid?: InputMaybe<Order_By>;
  st?: InputMaybe<Order_By>;
  tid?: InputMaybe<Order_By>;
  ts?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.post" */
export enum Splinglabs_0_1_0_Decoded_Post_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Gid = 'gid',
  /** column name */
  Pid = 'pid',
  /** column name */
  St = 'st',
  /** column name */
  Tid = 'tid',
  /** column name */
  Ts = 'ts',
  /** column name */
  Uid = 'uid'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_post" */
export type Splinglabs_0_1_0_Decoded_Post_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Post_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Post_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  gid?: InputMaybe<Scalars['bigint']>;
  pid?: InputMaybe<Scalars['bigint']>;
  st?: InputMaybe<Scalars['Int']>;
  tid?: InputMaybe<Scalars['Int']>;
  ts?: InputMaybe<Scalars['bigint']>;
  uid?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.reply" */
export type Splinglabs_0_1_0_Decoded_Reply = {
  __typename?: 'splinglabs_0_1_0_decoded_reply';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  pid?: Maybe<Scalars['bigint']>;
  st?: Maybe<Scalars['Int']>;
  ts?: Maybe<Scalars['bigint']>;
  uid?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.reply". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Reply_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  pid?: InputMaybe<Bigint_Comparison_Exp>;
  st?: InputMaybe<Int_Comparison_Exp>;
  ts?: InputMaybe<Bigint_Comparison_Exp>;
  uid?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.reply". */
export type Splinglabs_0_1_0_Decoded_Reply_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  pid?: InputMaybe<Order_By>;
  st?: InputMaybe<Order_By>;
  ts?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.reply" */
export enum Splinglabs_0_1_0_Decoded_Reply_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Pid = 'pid',
  /** column name */
  St = 'st',
  /** column name */
  Ts = 'ts',
  /** column name */
  Uid = 'uid'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_reply" */
export type Splinglabs_0_1_0_Decoded_Reply_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Reply_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Reply_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  pid?: InputMaybe<Scalars['bigint']>;
  st?: InputMaybe<Scalars['Int']>;
  ts?: InputMaybe<Scalars['bigint']>;
  uid?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.spling" */
export type Splinglabs_0_1_0_Decoded_Spling = {
  __typename?: 'splinglabs_0_1_0_decoded_spling';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  groups?: Maybe<Scalars['bigint']>;
  posts?: Maybe<Scalars['bigint']>;
  tags?: Maybe<Scalars['Int']>;
  users?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.spling". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Spling_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  groups?: InputMaybe<Bigint_Comparison_Exp>;
  posts?: InputMaybe<Bigint_Comparison_Exp>;
  tags?: InputMaybe<Int_Comparison_Exp>;
  users?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.spling". */
export type Splinglabs_0_1_0_Decoded_Spling_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  groups?: InputMaybe<Order_By>;
  posts?: InputMaybe<Order_By>;
  tags?: InputMaybe<Order_By>;
  users?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.spling" */
export enum Splinglabs_0_1_0_Decoded_Spling_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Groups = 'groups',
  /** column name */
  Posts = 'posts',
  /** column name */
  Tags = 'tags',
  /** column name */
  Users = 'users'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_spling" */
export type Splinglabs_0_1_0_Decoded_Spling_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Spling_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Spling_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  groups?: InputMaybe<Scalars['bigint']>;
  posts?: InputMaybe<Scalars['bigint']>;
  tags?: InputMaybe<Scalars['Int']>;
  users?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.tags" */
export type Splinglabs_0_1_0_Decoded_Tags = {
  __typename?: 'splinglabs_0_1_0_decoded_tags';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  taglist?: Maybe<Scalars['_text']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.tags". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  taglist?: InputMaybe<_Text_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.tags". */
export type Splinglabs_0_1_0_Decoded_Tags_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  taglist?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.tags" */
export enum Splinglabs_0_1_0_Decoded_Tags_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Taglist = 'taglist'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_tags" */
export type Splinglabs_0_1_0_Decoded_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Tags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Tags_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  taglist?: InputMaybe<Scalars['_text']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.tip" */
export type Splinglabs_0_1_0_Decoded_Tip = {
  __typename?: 'splinglabs_0_1_0_decoded_tip';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  uid?: Maybe<Scalars['bigint']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.tip". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Tip_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  uid?: InputMaybe<Bigint_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.tip". */
export type Splinglabs_0_1_0_Decoded_Tip_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.tip" */
export enum Splinglabs_0_1_0_Decoded_Tip_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Uid = 'uid'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_tip" */
export type Splinglabs_0_1_0_Decoded_Tip_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Tip_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Tip_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  uid?: InputMaybe<Scalars['bigint']>;
};

/** columns and relationships of "splinglabs_0_1_0_decoded.userprofile" */
export type Splinglabs_0_1_0_Decoded_Userprofile = {
  __typename?: 'splinglabs_0_1_0_decoded_userprofile';
  bump?: Maybe<Scalars['Int']>;
  cl_bf?: Maybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: Maybe<Scalars['bigint']>;
  cl_executable?: Maybe<Scalars['Boolean']>;
  cl_lamports?: Maybe<Scalars['bigint']>;
  cl_owner?: Maybe<Scalars['String']>;
  cl_pubkey: Scalars['String'];
  cl_rent_epoch?: Maybe<Scalars['bigint']>;
  cl_slot?: Maybe<Scalars['bigint']>;
  cl_txn_signature?: Maybe<Scalars['bytea']>;
  cl_updated_on?: Maybe<Scalars['timestamp']>;
  cl_write_version?: Maybe<Scalars['bigint']>;
  following?: Maybe<Scalars['_int8']>;
  groups?: Maybe<Scalars['_int8']>;
  shdw?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['Int']>;
  ts?: Maybe<Scalars['bigint']>;
  uid?: Maybe<Scalars['bigint']>;
  username?: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "splinglabs_0_1_0_decoded.userprofile". All fields are combined with a logical 'AND'. */
export type Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp = {
  _and?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>>;
  _not?: InputMaybe<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>;
  _or?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>>;
  bump?: InputMaybe<Int_Comparison_Exp>;
  cl_bf?: InputMaybe<Boolean_Comparison_Exp>;
  cl_decoded_updated_on?: InputMaybe<Bigint_Comparison_Exp>;
  cl_executable?: InputMaybe<Boolean_Comparison_Exp>;
  cl_lamports?: InputMaybe<Bigint_Comparison_Exp>;
  cl_owner?: InputMaybe<String_Comparison_Exp>;
  cl_pubkey?: InputMaybe<String_Comparison_Exp>;
  cl_rent_epoch?: InputMaybe<Bigint_Comparison_Exp>;
  cl_slot?: InputMaybe<Bigint_Comparison_Exp>;
  cl_txn_signature?: InputMaybe<Bytea_Comparison_Exp>;
  cl_updated_on?: InputMaybe<Timestamp_Comparison_Exp>;
  cl_write_version?: InputMaybe<Bigint_Comparison_Exp>;
  following?: InputMaybe<_Int8_Comparison_Exp>;
  groups?: InputMaybe<_Int8_Comparison_Exp>;
  shdw?: InputMaybe<String_Comparison_Exp>;
  st?: InputMaybe<Int_Comparison_Exp>;
  ts?: InputMaybe<Bigint_Comparison_Exp>;
  uid?: InputMaybe<Bigint_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "splinglabs_0_1_0_decoded.userprofile". */
export type Splinglabs_0_1_0_Decoded_Userprofile_Order_By = {
  bump?: InputMaybe<Order_By>;
  cl_bf?: InputMaybe<Order_By>;
  cl_decoded_updated_on?: InputMaybe<Order_By>;
  cl_executable?: InputMaybe<Order_By>;
  cl_lamports?: InputMaybe<Order_By>;
  cl_owner?: InputMaybe<Order_By>;
  cl_pubkey?: InputMaybe<Order_By>;
  cl_rent_epoch?: InputMaybe<Order_By>;
  cl_slot?: InputMaybe<Order_By>;
  cl_txn_signature?: InputMaybe<Order_By>;
  cl_updated_on?: InputMaybe<Order_By>;
  cl_write_version?: InputMaybe<Order_By>;
  following?: InputMaybe<Order_By>;
  groups?: InputMaybe<Order_By>;
  shdw?: InputMaybe<Order_By>;
  st?: InputMaybe<Order_By>;
  ts?: InputMaybe<Order_By>;
  uid?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "splinglabs_0_1_0_decoded.userprofile" */
export enum Splinglabs_0_1_0_Decoded_Userprofile_Select_Column {
  /** column name */
  Bump = 'bump',
  /** column name */
  ClBf = 'cl_bf',
  /** column name */
  ClDecodedUpdatedOn = 'cl_decoded_updated_on',
  /** column name */
  ClExecutable = 'cl_executable',
  /** column name */
  ClLamports = 'cl_lamports',
  /** column name */
  ClOwner = 'cl_owner',
  /** column name */
  ClPubkey = 'cl_pubkey',
  /** column name */
  ClRentEpoch = 'cl_rent_epoch',
  /** column name */
  ClSlot = 'cl_slot',
  /** column name */
  ClTxnSignature = 'cl_txn_signature',
  /** column name */
  ClUpdatedOn = 'cl_updated_on',
  /** column name */
  ClWriteVersion = 'cl_write_version',
  /** column name */
  Following = 'following',
  /** column name */
  Groups = 'groups',
  /** column name */
  Shdw = 'shdw',
  /** column name */
  St = 'st',
  /** column name */
  Ts = 'ts',
  /** column name */
  Uid = 'uid',
  /** column name */
  Username = 'username'
}

/** Streaming cursor of the table "splinglabs_0_1_0_decoded_userprofile" */
export type Splinglabs_0_1_0_Decoded_Userprofile_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Splinglabs_0_1_0_Decoded_Userprofile_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Splinglabs_0_1_0_Decoded_Userprofile_Stream_Cursor_Value_Input = {
  bump?: InputMaybe<Scalars['Int']>;
  cl_bf?: InputMaybe<Scalars['Boolean']>;
  cl_decoded_updated_on?: InputMaybe<Scalars['bigint']>;
  cl_executable?: InputMaybe<Scalars['Boolean']>;
  cl_lamports?: InputMaybe<Scalars['bigint']>;
  cl_owner?: InputMaybe<Scalars['String']>;
  cl_pubkey?: InputMaybe<Scalars['String']>;
  cl_rent_epoch?: InputMaybe<Scalars['bigint']>;
  cl_slot?: InputMaybe<Scalars['bigint']>;
  cl_txn_signature?: InputMaybe<Scalars['bytea']>;
  cl_updated_on?: InputMaybe<Scalars['timestamp']>;
  cl_write_version?: InputMaybe<Scalars['bigint']>;
  following?: InputMaybe<Scalars['_int8']>;
  groups?: InputMaybe<Scalars['_int8']>;
  shdw?: InputMaybe<Scalars['String']>;
  st?: InputMaybe<Scalars['Int']>;
  ts?: InputMaybe<Scalars['bigint']>;
  uid?: InputMaybe<Scalars['bigint']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "splinglabs_0_1_0_decoded.all" */
  splinglabs_0_1_0_decoded_all: Array<Splinglabs_0_1_0_Decoded_All>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.all" using primary key columns */
  splinglabs_0_1_0_decoded_all_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_All>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.all" */
  splinglabs_0_1_0_decoded_all_stream: Array<Splinglabs_0_1_0_Decoded_All>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.b" */
  splinglabs_0_1_0_decoded_b: Array<Splinglabs_0_1_0_Decoded_B>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.b" using primary key columns */
  splinglabs_0_1_0_decoded_b_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_B>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.b" */
  splinglabs_0_1_0_decoded_b_stream: Array<Splinglabs_0_1_0_Decoded_B>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.bank" */
  splinglabs_0_1_0_decoded_bank: Array<Splinglabs_0_1_0_Decoded_Bank>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.bank" using primary key columns */
  splinglabs_0_1_0_decoded_bank_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Bank>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.bank" */
  splinglabs_0_1_0_decoded_bank_stream: Array<Splinglabs_0_1_0_Decoded_Bank>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.groupprofile" */
  splinglabs_0_1_0_decoded_groupprofile: Array<Splinglabs_0_1_0_Decoded_Groupprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.groupprofile" using primary key columns */
  splinglabs_0_1_0_decoded_groupprofile_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Groupprofile>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.groupprofile" */
  splinglabs_0_1_0_decoded_groupprofile_stream: Array<Splinglabs_0_1_0_Decoded_Groupprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.likes" */
  splinglabs_0_1_0_decoded_likes: Array<Splinglabs_0_1_0_Decoded_Likes>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.likes" using primary key columns */
  splinglabs_0_1_0_decoded_likes_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Likes>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.likes" */
  splinglabs_0_1_0_decoded_likes_stream: Array<Splinglabs_0_1_0_Decoded_Likes>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.post" */
  splinglabs_0_1_0_decoded_post: Array<Splinglabs_0_1_0_Decoded_Post>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.post" using primary key columns */
  splinglabs_0_1_0_decoded_post_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Post>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.post" */
  splinglabs_0_1_0_decoded_post_stream: Array<Splinglabs_0_1_0_Decoded_Post>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.reply" */
  splinglabs_0_1_0_decoded_reply: Array<Splinglabs_0_1_0_Decoded_Reply>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.reply" using primary key columns */
  splinglabs_0_1_0_decoded_reply_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Reply>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.reply" */
  splinglabs_0_1_0_decoded_reply_stream: Array<Splinglabs_0_1_0_Decoded_Reply>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.spling" */
  splinglabs_0_1_0_decoded_spling: Array<Splinglabs_0_1_0_Decoded_Spling>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.spling" using primary key columns */
  splinglabs_0_1_0_decoded_spling_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Spling>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.spling" */
  splinglabs_0_1_0_decoded_spling_stream: Array<Splinglabs_0_1_0_Decoded_Spling>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tags" */
  splinglabs_0_1_0_decoded_tags: Array<Splinglabs_0_1_0_Decoded_Tags>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tags" using primary key columns */
  splinglabs_0_1_0_decoded_tags_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Tags>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.tags" */
  splinglabs_0_1_0_decoded_tags_stream: Array<Splinglabs_0_1_0_Decoded_Tags>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tip" */
  splinglabs_0_1_0_decoded_tip: Array<Splinglabs_0_1_0_Decoded_Tip>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.tip" using primary key columns */
  splinglabs_0_1_0_decoded_tip_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Tip>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.tip" */
  splinglabs_0_1_0_decoded_tip_stream: Array<Splinglabs_0_1_0_Decoded_Tip>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.userprofile" */
  splinglabs_0_1_0_decoded_userprofile: Array<Splinglabs_0_1_0_Decoded_Userprofile>;
  /** fetch data from the table: "splinglabs_0_1_0_decoded.userprofile" using primary key columns */
  splinglabs_0_1_0_decoded_userprofile_by_pk?: Maybe<Splinglabs_0_1_0_Decoded_Userprofile>;
  /** fetch data from the table in a streaming manner: "splinglabs_0_1_0_decoded.userprofile" */
  splinglabs_0_1_0_decoded_userprofile_stream: Array<Splinglabs_0_1_0_Decoded_Userprofile>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_AllArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_All_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_All_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_All_By_PkArgs = {
  pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_All_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_All_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_All_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_BArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_B_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_B_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_B_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_B_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_B_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_B_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_BankArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Bank_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Bank_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Bank_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Bank_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Bank_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_GroupprofileArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Groupprofile_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Groupprofile_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Groupprofile_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Groupprofile_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Groupprofile_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_LikesArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Likes_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Likes_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Likes_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Likes_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_PostArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Post_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Post_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Post_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Post_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Post_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_ReplyArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Reply_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Reply_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Reply_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Reply_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Reply_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_SplingArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Spling_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Spling_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Spling_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Spling_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Spling_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_TagsArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tags_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Tags_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Tags_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Tags_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tags_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_TipArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Tip_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Tip_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Tip_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Tip_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Tip_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_UserprofileArgs = {
  distinct_on?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Splinglabs_0_1_0_Decoded_Userprofile_Order_By>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>;
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Userprofile_By_PkArgs = {
  cl_pubkey: Scalars['String'];
};


export type Subscription_RootSplinglabs_0_1_0_Decoded_Userprofile_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Splinglabs_0_1_0_Decoded_Userprofile_Stream_Cursor_Input>>;
  where?: InputMaybe<Splinglabs_0_1_0_Decoded_Userprofile_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

export type GetAllLikesByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type GetAllLikesByPublicKeyQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_likes_by_pk?: { __typename?: 'splinglabs_0_1_0_decoded_likes', counter?: number | null, users?: any | null } | null };

export type GetAllPostByGroupIdQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  groupId: Scalars['bigint'];
  orderBy?: InputMaybe<Order_By>;
}>;


export type GetAllPostByGroupIdQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_post: Array<{ __typename?: 'splinglabs_0_1_0_decoded_post', cl_pubkey: string, gid?: any | null, pid?: any | null, st?: number | null, tid?: number | null, ts?: any | null, uid?: any | null }> };

export type GetPostByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type GetPostByPublicKeyQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_post_by_pk?: { __typename?: 'splinglabs_0_1_0_decoded_post', cl_pubkey: string, gid?: any | null, pid?: any | null, st?: number | null, tid?: number | null, ts?: any | null, uid?: any | null } | null };

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['bigint'];
}>;


export type GetPostByIdQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_post: Array<{ __typename?: 'splinglabs_0_1_0_decoded_post', cl_pubkey: string, gid?: any | null, pid?: any | null, st?: number | null, tid?: number | null, ts?: any | null, uid?: any | null }> };

export type GetAllTagsByPublicKeyQueryVariables = Exact<{
  publicKey: Scalars['String'];
}>;


export type GetAllTagsByPublicKeyQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_tags_by_pk?: { __typename?: 'splinglabs_0_1_0_decoded_tags', taglist?: any | null } | null };

export type GetUserByUserIdQueryVariables = Exact<{
  userId: Scalars['bigint'];
}>;


export type GetUserByUserIdQuery = { __typename?: 'query_root', splinglabs_0_1_0_decoded_userprofile: Array<{ __typename?: 'splinglabs_0_1_0_decoded_userprofile', cl_pubkey: string, following?: any | null, groups?: any | null, shdw?: string | null, st?: number | null, ts?: any | null, uid?: any | null, username?: string | null }> };


export const GetAllLikesByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllLikesByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_likes_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cl_pubkey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"counter"}},{"kind":"Field","name":{"kind":"Name","value":"users"}}]}}]}}]} as unknown as DocumentNode<GetAllLikesByPublicKeyQuery, GetAllLikesByPublicKeyQueryVariables>;
export const GetAllPostByGroupIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPostByGroupId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"order_by"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ts"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cl_pubkey"}},{"kind":"Field","name":{"kind":"Name","value":"gid"}},{"kind":"Field","name":{"kind":"Name","value":"pid"}},{"kind":"Field","name":{"kind":"Name","value":"st"}},{"kind":"Field","name":{"kind":"Name","value":"tid"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<GetAllPostByGroupIdQuery, GetAllPostByGroupIdQueryVariables>;
export const GetPostByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_post_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cl_pubkey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cl_pubkey"}},{"kind":"Field","name":{"kind":"Name","value":"gid"}},{"kind":"Field","name":{"kind":"Name","value":"pid"}},{"kind":"Field","name":{"kind":"Name","value":"st"}},{"kind":"Field","name":{"kind":"Name","value":"tid"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<GetPostByPublicKeyQuery, GetPostByPublicKeyQueryVariables>;
export const GetPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cl_pubkey"}},{"kind":"Field","name":{"kind":"Name","value":"gid"}},{"kind":"Field","name":{"kind":"Name","value":"pid"}},{"kind":"Field","name":{"kind":"Name","value":"st"}},{"kind":"Field","name":{"kind":"Name","value":"tid"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}}]}}]}}]} as unknown as DocumentNode<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetAllTagsByPublicKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTagsByPublicKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_tags_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cl_pubkey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taglist"}}]}}]}}]} as unknown as DocumentNode<GetAllTagsByPublicKeyQuery, GetAllTagsByPublicKeyQueryVariables>;
export const GetUserByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"bigint"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"splinglabs_0_1_0_decoded_userprofile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"uid"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cl_pubkey"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"groups"}},{"kind":"Field","name":{"kind":"Name","value":"shdw"}},{"kind":"Field","name":{"kind":"Name","value":"st"}},{"kind":"Field","name":{"kind":"Name","value":"ts"}},{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetUserByUserIdQuery, GetUserByUserIdQueryVariables>;