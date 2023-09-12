export abstract class Constants {
    static readonly DATE_FORMAT: string = 'dd-MM-yyyy';
    static readonly DATE_TIME_FORMAT: string = 'dd-MM-yyyy HH:mm';
    static readonly DIGIBYTE_WALLET_ADDRESS_GENERAL: string = 'DGB1QVKXGPELLS5Z2YEAZS0HQ6SPKS362URNJ3FS86K';
    static readonly DIGIBYTE_WALLET_ADDRESS_TRANSACTIONS: string = 'DGB1QZXU0RAPYVJZ9WWS8CDYQJ6T7T5LNE0LGNM4W5W';
    static readonly EMPTY_GUID: string = '00000000-0000-0000-0000-000000000000';    
    static readonly QR_CODE_COLOR_DARK: string = '#ffffff';
    static readonly QR_CODE_COLOR_LIGHT: string = '#202020';
    static readonly QR_CODE_LOGO: string = 'assets/images/QrCodeLogo.png';
    static readonly QR_CODE_LOGO_SIZE: number = 50;
    static readonly QR_CODE_SIZE: number = 220;
    static readonly RESERVED_SUBDOMAINS = ['admin', 'api', 'mail', 'shop', 'smtp', 'www'];
    static readonly REGEX_PATTERN_DECIMAL = /^-?\d*[.,]?\d{0,2}$/;
    static readonly REGEX_PATTERN_DIGIBYTE_ADDRESS = /^-?\d*[.,]?\d{0,2}$/;
}