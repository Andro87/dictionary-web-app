import styles from "./Word.module.scss";

import { WordData } from "@/modal/WordData";

import NewWindow from "svgr/icon-new-window.svg";

interface Props {
    readonly wordData: WordData;
}

export const Word: React.FunctionComponent<Props> = props => {
    const { wordData } = props;
    return (
        <div className={styles.word_data_container}>
            <div className={styles.word}>
                <h1>
                    {wordData.word} <span>{wordData.phonetic}</span>
                </h1>

                <div className={styles.word_audio_container}>
                    {wordData.phonetics.map((audio, index) => {
                        const wordSound = new Audio(audio.audio);
                        return (
                            audio.audio && (
                                <button
                                    type="button"
                                    title="play"
                                    className={styles.btn_play}
                                    onClick={() => wordSound.play()}
                                    key={index}
                                >
                                    <img
                                        src="/assets/images/icon-play.svg"
                                        alt="play"
                                    />
                                </button>
                            )
                        );
                    })}
                </div>
            </div>

            {wordData.meanings.map((meaning, index) => {
                return (
                    <div className={styles.word_meanings_container} key={index}>
                        <div className={styles.word_meaning}>
                            <div className={styles.partOfSpeech_container}>
                                <h2>{meaning.partOfSpeech}</h2>
                                <hr />
                            </div>
                            <div className={styles.meaning}>
                                <h3>Meaning</h3>
                                <ul className={styles.definition_list}>
                                    {meaning.definitions.map((item, index) => {
                                        return (
                                            <>
                                                <li
                                                    className={
                                                        styles.definition_list_item
                                                    }
                                                    key={index}
                                                >
                                                    {item.definition}
                                                </li>

                                                {item.example && (
                                                    <p
                                                        className={
                                                            styles.example
                                                        }
                                                    >
                                                        "{item.example}"
                                                    </p>
                                                )}
                                            </>
                                        );
                                    })}
                                </ul>
                                {meaning.synonyms.length > 0 && (
                                    <div className={styles.synonyms_container}>
                                        <h3>Synonyms </h3>
                                        {meaning.synonyms.map(
                                            (synonym, index) => {
                                                return (
                                                    <span key={index}>
                                                        {synonym}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className={styles.source_container}>
                <h4>Source</h4>
                {wordData.sourceUrls.map((source, index) => {
                    return (
                        <div className={styles.source_wrap}>
                            <a href={source} key={index} target="_blank">
                                {source}
                            </a>
                            <NewWindow />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
