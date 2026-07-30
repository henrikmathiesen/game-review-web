// object
export const Platform = {
    PC: 'PC',
    PLAYSTATION: 'PLAYSTATION',
    XBOX: 'XBOX',
    NINTENDO: 'NINTENDO',
} as const;

// type (it will not exist at runtime)
export type Platform = keyof typeof Platform;


/*

    EXAMPLE 1

    type T = typeof Platform;

    typeof is used here in a TypeScript type context.
    It takes the runtime value Platform and gives us its type.

    type T = {
        readonly PC: "PC";
        readonly PLAYSTATION: "PLAYSTATION";
        readonly XBOX: "XBOX";
        readonly NINTENDO: "NINTENDO";
    };


    EXAMPLE 2

    type T = keyof typeof Platform;

    keyof does not operate directly on the object.
    It operates on the type produced by typeof Platform.

    Take the type from example 1 and give me all its property names
    as a union of string literal types.

    type T = 'PC' | 'PLAYSTATION' | 'XBOX' | 'NINTENDO';


    BECAUSE THE PROPERTY NAMES AND VALUES ARE IDENTICAL IN OUR CASE,
    WE CAN STOP HERE.

    import { Platform } from "../enums";

    We now have an enum-like object that can be used at runtime:

    Platform.PC;

    We also have a type that can be used for static typing:

    const platform: Platform = Platform.PC;

*/
