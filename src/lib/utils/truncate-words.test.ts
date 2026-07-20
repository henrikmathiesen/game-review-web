import { describe, expect, it } from 'vitest';

import { truncateWords } from './truncate-words';

describe('truncateWords', () => {
    it('returns the original text when it contains fewer words than the limit', () => {
        const text = 'A short sentence';

        expect(truncateWords(text, 5)).toBe(text);
    });

    it('returns the original text when it contains exactly the word limit', () => {
        const text = 'Exactly four words here';

        expect(truncateWords(text, 4)).toBe(text);
    });

    it('truncates text after the specified number of words', () => {
        expect(truncateWords('One two three four five', 3)).toBe('One two three...');
    });

    it('removes trailing punctuation from the final word before adding an ellipsis', () => {
        expect(truncateWords('One two, three four', 2)).toBe('One two...');
    });
});
