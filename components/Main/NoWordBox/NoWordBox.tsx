import styles from "./NoWordBox.module.scss";

export const NoWordBox = () => {
    return (
        <div className={styles.container}>
            <p className={styles.emoji}>😕</p>
            <h1>No Definitions Found</h1>
            <p>
                Sorry pal, we can `&apos;`t find definitions for the word you
                were looking for. You can try the search again at later time or
                head to the web instead.
            </p>
        </div>
    );
};
