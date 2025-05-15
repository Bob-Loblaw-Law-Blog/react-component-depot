import React, { useState, useEffect } from "react";

function useThemeSwitcher() {
    const [mode, setMode] = useState(() => localStorage.getItem("mode"));

    

    useEffect(() => {
        window.addEventListener("storage", setPreferedTheme);
        return () => {
            window.removeEventListener("storage", setPreferedTheme);
        };
    }, []);

    const setPreferedTheme = () => {
        const _mode = localStorage.getItem("mode");
        if (_mode) {
            setMode(_mode);
        } else {
            setMode(0);
        }
    };

    useEffect(() => {
        const modeList = ["light", "dark", "blue", "green", "purple"]
        let modeValue = mode
        if (modeValue > 4) {
            modeValue = 0
        }
        console.log(modeValue)
        let currentModeValue = modeList[modeValue]
        console.log(currentModeValue)
        document.body.classList.add(`theme-${currentModeValue}`);
        console.log(document.body.classList)
        localStorage.setItem("mode", modeValue);
        let prevValue = --modeValue
        if (prevValue < 0) {
            prevValue = 4
        }
        let lastModeValue = modeList[prevValue]
        document.body.classList.remove(`theme-${lastModeValue}`)
        console.log(document.body.classList)
    }, [mode]);

    return (
        <a
            className="cursor-pointer"
            onClick={() =>
                setMode(mode => mode > 3 ? mode = 0 : ++mode)
            }
        >
            <small> Cycle Mode </small>
        </a>
    );
}

export default useThemeSwitcher;
