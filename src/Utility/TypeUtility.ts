// https://stackoverflow.com/questions/57510388/define-prefix-for-object-keys-using-types-in-typescript

export type AddPrefix<TKey, TPrefix extends string> = TKey extends string
    ? `${TPrefix}${TKey}`
    : never;

export type RemovePrefix<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends AddPrefix<infer TKey, TPrefix>
    ? TKey
    : '';

export type PrefixedKeys<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends AddPrefix<string, TPrefix>
  ? TPrefixedKey
  : never;
