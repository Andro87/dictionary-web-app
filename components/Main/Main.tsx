import styles from "./Main.module.scss";

import Search from "svgr/icon-search.svg";

import { useEffect, useRef, useState } from "react";

import { WordData } from "@/modal/WordData";

import { Word, NoWordBox } from "./index";

const getWordData = (word: string): Promise<WordData[]> => {
    return fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    ).then(res => {
        if (!res.ok) {
            throw Error("Whoops, can’t be empty…");
        }
        return res.json();
    });
};

export const Main = () => {
    const [wordData, setWordData] = useState<WordData[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getWordData("keyboard")
            .then(data => {
                console.log(data);
                setWordData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError(true);
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    /* useEffect(() => {
        if (typeof wordData !== "undefined") {
            setError(undefined);
        }
    }, [wordData]);*/
    /*
    if (!wordData) {
        return <p>No word....</p>;
    }

    if (isLoading) {
        return <p>Is Loading...</p>;
    }*/

    function handleSubmit() {
        const value = inputRef.current?.value;

        if (typeof value !== "undefined") {
            getWordData(value)
                .then(data => {
                    setWordData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setError(true);
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        }
    }
    return (
        <main className={styles.main}>
            <form
                className={`${styles.main_form} ${
                    error && styles.main_form_error
                }`}
                onSubmit={handleSubmit}
            >
                <input
                    className={styles.main_input}
                    type="text"
                    aria-label="write a word to search"
                    placeholder="Search for a word..."
                    ref={inputRef}
                />

                <button
                    className={styles.btn_search}
                    title="search word"
                    type="submit"
                >
                    <Search />
                </button>
                {error && <p className={styles.error_message}>error!!!!</p>}
            </form>

            {isLoading && <p>Is loading</p>}

            {wordData &&
                !error &&
                wordData.map((word, index) => {
                    return <Word key={index} wordData={word} />;
                })}

            {!wordData && <NoWordBox />}
        </main>
    );
};
