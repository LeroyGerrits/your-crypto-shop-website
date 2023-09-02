export abstract class Constants {
    static readonly DATE_FORMAT: string = 'dd-MM-yyyy';
    static readonly DATE_TIME_FORMAT: string = 'dd-MM-yyyy HH:mm';
    static readonly DIGIBYTE_WALLET_ADDRESS_GENERAL: string = 'DQpWL4dufgTbLXKhQvT6sezFNMU4hbofja';
    static readonly DIGIBYTE_WALLET_ADDRESS_TRANSACTIONS: string = 'dgb1q9mrhpl6a3z9srmr0hg59jsc9hu6uzev4dl2fc5';
    static readonly EMPTY_GUID: string = '00000000-0000-0000-0000-000000000000';
    static readonly RESERVED_SUBDOMAINS = ['admin', 'api', 'mail', 'shop', 'smtp', 'www'];
    static readonly REGEX_PATTERN_DECIMAL = /^-?\d*[.,]?\d{0,2}$/;
    static readonly REGEX_PATTERN_DIGIBYTE_ADDRESS = /^-?\d*[.,]?\d{0,2}$/;
}