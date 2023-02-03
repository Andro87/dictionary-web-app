import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";

import Logo from "svgr/logo.svg";
import Moon from "svgr/icon-moon.svg";
import Arrow from "svgr/icon-arrow-down.svg";

import { Inconsolata, Inter, Lora } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });
const lora = Lora({ subsets: ["latin"] });
const inconsolata = Inconsolata({ subsets: ["latin"] });

interface Props {
    readonly chooseFontFamily: (font: string) => void;
}

export const Header: React.FunctionComponent<Props> = props => {
    const { chooseFontFamily } = props;

    const [isDarkMode, setIsDarkMode] = useState(false);

    const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);

    const [font, setFont] = useState("Sans Serif");

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }
    }, [isDarkMode]);

    const handleDarkMode = () => {
        setIsDarkMode(prevValue => !prevValue);
    };

    const handleOptionMenu = () => {
        setIsOptionsMenuOpen(prevValue => !prevValue);
    };

    return (
        <header className={styles.header}>
            <Logo />

            <div className={styles.options_container}>
                <div className={styles.fonts_options_container}>
                    <div
                        className={styles.selected_font}
                        onClick={handleOptionMenu}
                    >
                        <p>{font}</p>

                        <Arrow />
                    </div>
                    {isOptionsMenuOpen && (
                        <div className={styles.fonts_options}>
                            <button
                                type="button"
                                title="sans serif"
                                className={`${styles.btn_option} ${inter.className}`}
                                onClick={() => {
                                    chooseFontFamily("inter");
                                    setFont("sans serif");
                                }}
                            >
                                sans serif
                            </button>
                            <button
                                type="button"
                                title=" serif"
                                className={`${styles.btn_option} ${lora.className}`}
                                onClick={() => {
                                    chooseFontFamily("lora");
                                    setFont("serif");
                                }}
                            >
                                serif
                            </button>
                            <button
                                type="button"
                                title="mono"
                                className={`${styles.btn_option} ${inconsolata.className}`}
                                onClick={() => {
                                    chooseFontFamily("inconsolata");
                                    setFont("mono");
                                }}
                            >
                                mono
                            </button>
                        </div>
                    )}
                </div>

                <div
                    className={styles.toggle_container}
                    onClick={handleDarkMode}
                >
                    <div className={styles.toggle_wrap}>
                        <div
                            className={`${styles.toggle_circle}  ${
                                isDarkMode && styles.toggle_circle_dark
                            }`}
                        ></div>
                    </div>
                    <Moon />
                </div>
            </div>
        </header>
    );
};
