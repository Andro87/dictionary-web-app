type BasicPhoneticsInfo = {
    audio: string;
    text: string;
};
type DetailedPhoneticsInfo = {
    readonly audio: string;
    readonly license: {
        name: string;
        url: string;
    };
    readonly sourceUrl: string;
    text: string;
};

type WordMeaning = {
    readonly antonyms: string[];
    readonly definitions: {
        synonyms: [];
        definition: string;
        antonyms: [];
        example: string;
    }[];
    readonly partOfSpeech: string;
    readonly synonyms: string[];
};

export type WordData = {
    readonly license: {
        name: string;
        url: string;
    };
    readonly meanings: WordMeaning[];
    readonly phonetic: string;
    readonly phonetics: (BasicPhoneticsInfo | DetailedPhoneticsInfo)[];
    readonly sourceUrls: string[];
    readonly word: string;
};
