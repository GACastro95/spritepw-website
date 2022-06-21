import React, { useState, useEffect } from "react";
import styles from './KayfableApp.module.css';

function Guess(props) {
    return (
        <tr>
            {props.evaluations.Name === 1 ?
                <th style={{ background: "#00ff2b", width: "20%" }}>{props.guess.name}</th> :
                <th style={{ background: "#fff", width: "20%" }}>{props.guess.name}</th>}
            {
                props.evaluations.Gender === 1 ?
                    <td style={{ background: "#00ff2b" }}>{props.guess.gender}</td> :
                    <td style={{ background: "#fff" }}>{props.guess.gender}</td>
            }
            {props.evaluations.Age === 1 ?
                <td style={{ background: "#00ff2b" }}>{props.guess.age}</td> : <>{
                    props.evaluations.Age === 2 ?
                        <td style={{ background: "#FFFF00" }}>
                            {props.guess.age} {props.hardMode ? "" : `${props.evaluations.Age_HOL === 1 ? "▲" : props.evaluations.Age_HOL === 2 ? "▼" : ""}`}
                        </td> :
                        <>{
                            props.evaluations.Age === 3 ?
                                <td style={{ background: "#FFA500" }}>{props.guess.age}</td> :
                                <td style={{ background: "#fff" }}>{props.guess.age} {props.hardMode ? "" : `${props.evaluations.Age_HOL === 1 ? "▲" : props.evaluations.Age_HOL === 2 ? "▼" : ""}`}</td>
                        }</>
                }</>
            }
            {
                props.evaluations.Country === 1 ?
                    <td style={{ background: "#00ff2b" }}>{props.guess.birth_place}</td> :
                    <td style={{ background: "#fff" }}>{props.guess.birth_place}</td>
            }
            {
                props.evaluations.Debut === 1 ?
                    <td style={{ background: "#00ff2b" }}>{props.guess.debut_year}</td> : <>{
                        props.evaluations.Debut === 2 ?
                            <td style={{ background: "#FFFF00" }}>
                                {props.guess.debut_year} {props.hardMode ? "" : `${props.evaluations.Debut_HOL === 1 ? "▲" : props.evaluations.Debut_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Debut === 3 ?
                                    <td style={{ background: "#FFA500" }}>{props.guess.debut_year}</td> :
                                    <td style={{ background: "#fff" }}>{props.guess.debut_year} {props.hardMode ? "" : `${props.evaluations.Debut_HOL === 1 ? "▲" : props.evaluations.Debut_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
            {
                props.evaluations.Height === 1 ?
                    <td style={{ background: "#00ff2b" }}>{props.guess.height}</td> : <>{
                        props.evaluations.Height === 2 ?
                            <td style={{ background: "#FFFF00" }}>
                                {props.guess.height} {props.hardMode ? "" : `${props.evaluations.Height_HOL === 1 ? "▲" : props.evaluations.Height_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Height === 3 ?
                                    <td style={{ background: "#FFA500" }}>{props.guess.height}</td> :
                                    <td style={{ background: "#fff" }}>{props.guess.height} {props.hardMode ? "" : `${props.evaluations.Height_HOL === 1 ? "▲" : props.evaluations.Height_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
            {
                props.evaluations.Weight === 1 ?
                    <td style={{ background: "#00ff2b" }}>{props.guess.weight}</td> : <>{
                        props.evaluations.Weight === 2 ?
                            <td style={{ background: "#FFFF00" }}>
                                {props.guess.weight} {props.hardMode ? "" : `${props.evaluations.Weight_HOL === 1 ? "▲" : props.evaluations.Weight_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Weight === 3 ?
                                    <td style={{ background: "#FFA500" }}>{props.guess.weight}</td> :
                                    <td style={{ background: "#fff" }}>{props.guess.weight} {props.hardMode ? "" : `${props.evaluations.Weight_HOL === 1 ? "▲" : props.evaluations.Weight_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
        </tr >

    );
}

function Game(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [autoComplete, setAutoComplete] = useState([]);

    useEffect(() => {
        async function searchFunction() {
            if (searchTerm.length) {
                try {
                    const searchAutoComplete = matchFunction(searchTerm);
                    setAutoComplete(() => searchAutoComplete);
                } catch (error) {
                    console.error(error);
                }

            } else {
                setAutoComplete([])
            }
        };
        searchFunction();
    }, [searchTerm])

    function matchFunction(searchTerm) {
        let suggestions = [];
        if (searchTerm.length > 0) {
            const regex = new RegExp(`${searchTerm}`, "i")
            suggestions = props.nameList.filter((v) => regex.test(v.gimmick));
        }
        const suggestionList = Array.from(new Set(suggestions.sort(compare).map(v => v.id))).map(id => {
            return suggestions.find(v => v.id === id)
        });
        return suggestionList.splice(0, 9)
    }

    function compare(a, b) {
        const gimmickA = a.gimmick.toUpperCase();
        const gimmickB = b.gimmick.toUpperCase();

        var comparison = 0;
        var x = gimmickA.match(searchTerm.toUpperCase())
        var y = gimmickB.match(searchTerm.toUpperCase())
        if (x.index === y.index) {
            if (gimmickA > gimmickB) {
                comparison = 1
            } else if (gimmickA < gimmickB) {
                comparison = -1
            }
        }
        else if (x.index > y.index) {
            comparison = 1;
        } else if (x.index < y.index) {
            comparison = -1;
        }
        return comparison;
    }

    async function match(id) {
        if (id) {
            try {
                let guess = props.wrestlerList.find(x => x.id === id)
                const guessResponse = validateGuess(guess)
                const newGuesses = [...props.guesses, guess];
                props.guessCallback(newGuesses);
                props.evaluationsCallback([...props.evaluations, guessResponse])
                if (guessResponse.Correct === true) {
                    props.stateCallback("WIN");
                    let newStats = {
                        ...props.localStats, "games_won": props.localStats.games_won + 1, "games_played": props.localStats.games_played + 1,
                        "current_streak": props.localStats.current_streak + 1, attempts: { ...props.localStats.attempts, [props.guesses.length + 1]: props.localStats.attempts[props.guesses.length + 1] + 1 }
                    };
                    if (props.localStats.current_streak + 1 > props.localStats.max_streak) {
                        newStats = { ...newStats, "max_streak": props.localStats.current_streak + 1 }
                    }
                    props.localStatsCallback(newStats)
                } else if (props.guesses.length >= 9) {
                    props.stateCallback("LOSE");
                    let newStats = {
                        ...props.localStats, "games_played": props.localStats.games_played + 1, "current_streak": 0,
                        attempts: { ...props.localStats.attempts, "fail": props.localStats.attempts["fail"] + 1 }
                    };
                    props.localStatsCallback(newStats)
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Nothing to match against");
        };
    }

    function validateGuess(data) {
        let result = props.answer
        let Correct;
        let Name;
        let Gender;
        let Age;
        let Age_HOL;
        let Country;
        let Debut;
        let Debut_HOL;
        let Height;
        let Height_HOL;
        let Weight;
        let Weight_HOL;
        let response;

        if (data.id === result.id) {
            response = {
                "Correct": true,
                "Name": 1,
                "Gender": 1,
                "Age": 1,
                "Age_HOL": 0,
                "Country": 1,
                "Debut": 1,
                "Debut_HOL": 0,
                "Height": 1,
                "Height_HOL": 0,
                "Weight": 1,
                "Weight_HOL": 0
            }
        } else {
            Correct = false;
            Name = 0;

            if (data.gender === result.gender) {
                Gender = 1
            } else {
                Gender = 0
            }

            if (data.age === "N/A" || result.age === "N/A") {
                Age = 3
            } else {
                if (data.age === result.age) {
                    Age = 1
                } else if (Math.abs(result.age - data.age) < 6) {
                    Age = 2
                } else {
                    Age = 0
                }
            }

            if (result.age > data.age) {
                Age_HOL = 1
            } else if (result.age < data.age) {
                Age_HOL = 2
            } else {
                Age_HOL = 0
            }

            if (data.birth_place === result.birth_place) {
                Country = 1
            } else {
                Country = 0
            }

            if (data.debut_year === "N/A" || result.debut_year === "N/A") {
                Debut = 3
            } else {
                if (data.debut_year === result.debut_year) {
                    Debut = 1
                } else if (Math.abs(result.debut_year - data.debut_year) < 6) {
                    Debut = 2
                } else {
                    Debut = 0
                }
            }

            if (result.debut_year > data.debut_year) {
                Debut_HOL = 1
            } else if (result.debut_year < data.debut_year) {
                Debut_HOL = 2
            } else {
                Debut_HOL = 0
            }

            if (data.height === "N/A" || result.height === "N/A") {
                Height = 3
            } else {
                if (data.height === result.height) {
                    Height = 1
                } else if (Math.abs(result.height - data.height) < 6) {
                    Height = 2
                } else {
                    Height = 0
                }
            }

            if (result.height > data.height) {
                Height_HOL = 1
            } else if (result.height < data.height) {
                Height_HOL = 2
            } else {
                Height_HOL = 0
            }

            if (data.weight === "N/A" || result.weight === "N/A") {
                Weight = 3
            } else {
                if (data.weight === result.weight) {
                    Weight = 1
                } else if (Math.abs(result.weight - data.weight) < 6) {
                    Weight = 2
                } else {
                    Weight = 0
                }
            }

            if (result.weight > data.weight) {
                Weight_HOL = 1
            } else if (result.weight < data.weight) {
                Weight_HOL = 2
            } else {
                Weight_HOL = 0
            }

            response = {
                "Correct": Correct,
                "Name": Name,
                "Gender": Gender,
                "Age": Age,
                "Age_HOL": Age_HOL,
                "Country": Country,
                "Debut": Debut,
                "Debut_HOL": Debut_HOL,
                "Height": Height,
                "Height_HOL": Height_HOL,
                "Weight": Weight,
                "Weight_HOL": Weight_HOL
            }
        }
        return response;
    }

    function handleSelect(id) {
        setSearchTerm('');
        match(id);
    };

    return (
        <div className={styles["Kayfable"]}>
            <h2>Kayfable</h2>
            <h3>A Wrestling Wordle-like Game</h3>

            {props.gameStatus !== "IN PROGRESS" ?
                <button>See Results</button> :
                <div className={styles["kayfable-guess-area"]}>
                    <form>
                        <input
                            className={styles["kayfable-dropdown-input"]}
                            type="text"
                            placeholder={`Guess ${props.guesses.length + 1} out of 10`}
                            onChange={(e) => { setSearchTerm(e.target.value); }}
                            value={searchTerm || ""}
                            required></input>
                    </form>
                    {autoComplete.length > 0 &&
                        <ul className={styles["kayfable-dropdown-list"]}>
                            {
                                autoComplete.map((definition, index) => (
                                    <li
                                        className={styles["kayfable-dropdown-content"]}
                                        key={index}
                                        onClick={() => handleSelect(definition.id)}>
                                        {definition.name === definition.gimmick ? definition.name : `${definition.gimmick} (${definition.name})`}
                                    </li>
                                ))
                            }

                        </ul>
                    }
                </div>}
            <div className={styles["kayfable-table"]}>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Age</th>
                            <th scope="col">Country of Birth</th>
                            <th scope="col">Debut Year</th>
                            <th scope="col">Height (cm)</th>
                            <th scope="col">Weight (kg)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.guesses.length === props.evaluations.length &&
                            props.guesses.map((guess, index) => (
                                <Guess
                                    key={`guess ${index}`}
                                    guess={guess}
                                    evaluations={props.evaluations[index]}
                                    hardMode = {props.hardMode}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Game;