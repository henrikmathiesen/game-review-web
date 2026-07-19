export function truncateWords(text: string, maxWords: number): string {
    const words = text.trim().split(/\s+/);

    if (words.length <= maxWords || maxWords < 1) {
        return text;
    }

    words.length = maxWords;

    words[maxWords - 1] = words[maxWords - 1].replace(/[.,!?;:]+$/, "");

    return words.join(" ") + "...";
}