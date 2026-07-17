export const Platform = {
    PC: 'PC',
    PLAYSTATION: 'PLAYSTATION',
    XBOX: 'XBOX',
    NINTENDO: 'NINTENDO',
} as const;

export type Platform = keyof typeof Platform;

// TODO: work on this documentation with chat gpt
// keyof typeof Platform betyder:
// Ge mig alla nycklar (properties) i typen Platform som en union av strängar.
// typeof Platform[keyof typeof Platform] betyder:
// Ta typen Platform och indexera in med alla dess nycklar.
// I vårt fall är nycklar och värden samma, så detta räcker
// export type Platform = keyof typeof Platform;