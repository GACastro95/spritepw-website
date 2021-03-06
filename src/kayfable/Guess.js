function Guess(props) {
    function convertWeightToImperial() {
        return Math.round(props.guess.weight / 0.45359237)
    }

    function convertHeightToImperial() {
        let totalInches = props.guess.height / 2.54;
        let feet = Math.floor(totalInches / 12)
        let inches = totalInches - 12 * feet
        return `${feet}'${Math.round(inches)}"`
    }


    return (
        <tr>
            {props.evaluations.Name === 1 ?
                <th className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white w-2/5'>{props.guess.name}</th> :
                <th className='!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white w-2/5'>{props.guess.name}</th>}
            {
                props.evaluations.Gender === 1 ?
                    <td className="!bg-green-500 dark:!bg-green-800 text-black dark:text-white">{props.guess.gender.charAt(0).toUpperCase() + props.guess.gender.slice(1)}</td> :
                    <td className="!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white ">{props.guess.gender.charAt(0).toUpperCase() + props.guess.gender.slice(1)}</td>
            }
            {props.evaluations.Age === 1 ?
                <td className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white'>{props.guess.birth_year}</td> : <>{
                    props.evaluations.Age === 2 ?
                        <td className='!bg-yellow-300 dark:!bg-yellow-600 text-black dark:text-white'>
                            {props.guess.birth_year} {props.hardMode ? "" : `${props.evaluations.Age_HOL === 1 ? "▲" : props.evaluations.Age_HOL === 2 ? "▼" : ""}`}
                        </td> :
                        <>{
                            props.evaluations.Age === 3 ?
                                <td className='!bg-orange-400 dark:!bg-orange-700 text-black dark:text-white'>{props.guess.birth_year}</td> :
                                <td className="!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white ">{props.guess.birth_year} {props.hardMode ? "" : `${props.evaluations.Age_HOL === 1 ? "▲" : props.evaluations.Age_HOL === 2 ? "▼" : ""}`}</td>
                        }</>
                }</>
            }
            {
                props.evaluations.Country === 1 ?
                    <td className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white'>{props.guess.birth_place}</td> :
                    <td className="!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white ">{props.guess.birth_place}</td>
            }
            {
                props.evaluations.Debut === 1 ?
                    <td className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white'>{props.guess.debut_year}</td> : <>{
                        props.evaluations.Debut === 2 ?
                            <td className='!bg-yellow-300 dark:!bg-yellow-600 text-black dark:text-white'>
                                {props.guess.debut_year} {props.hardMode ? "" : `${props.evaluations.Debut_HOL === 1 ? "▲" : props.evaluations.Debut_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Debut === 3 ?
                                    <td className='!bg-orange-400 dark:!bg-orange-700 text-black dark:text-white'>{props.guess.debut_year}</td> :
                                    <td className="!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white ">{props.guess.debut_year} {props.hardMode ? "" : `${props.evaluations.Debut_HOL === 1 ? "▲" : props.evaluations.Debut_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
            {
                props.evaluations.Height === 1 ?
                    <td className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white'>{props.metricMode ? props.guess.height : convertHeightToImperial()}</td> : <>{
                        props.evaluations.Height === 2 ?
                            <td className='!bg-yellow-300 dark:!bg-yellow-600 text-black dark:text-white'>
                                {props.metricMode ? props.guess.height : convertHeightToImperial()} {props.hardMode ? "" : `${props.evaluations.Height_HOL === 1 ? "▲" : props.evaluations.Height_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Height === 3 ?
                                    <td className='!bg-orange-400 dark:!bg-orange-700 text-black dark:text-white'>{props.guess.height !== "N/A" ? `${props.metricMode ? props.guess.height : convertHeightToImperial()}` : props.guess.height}</td> :
                                    <td className="!bg-slate-200  dark:!bg-slate-700 text-black dark:text-white ">{props.metricMode ? props.guess.height : convertHeightToImperial()} {props.hardMode ? "" : `${props.evaluations.Height_HOL === 1 ? "▲" : props.evaluations.Height_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
            {
                props.evaluations.Weight === 1 ?
                    <td className='!bg-green-500 dark:!bg-green-800 text-black dark:text-white'>{props.metricMode ? props.guess.weight : convertWeightToImperial()}</td> : <>{
                        props.evaluations.Weight === 2 ?
                            <td className='!bg-yellow-300 dark:!bg-yellow-600 text-black dark:text-white'>
                                {props.metricMode ? props.guess.weight : convertWeightToImperial()} {props.hardMode ? "" : `${props.evaluations.Weight_HOL === 1 ? "▲" : props.evaluations.Weight_HOL === 2 ? "▼" : ""}`}
                            </td> :
                            <>{
                                props.evaluations.Weight === 3 ?
                                    <td className='!bg-orange-400 dark:!bg-orange-700 text-black dark:text-white'>{props.guess.weight !== "N/A" ? `${props.metricMode ? props.guess.weight : convertWeightToImperial()}` : props.guess.weight}</td> :
                                    <td className="!bg-slate-200 text-black dark:!bg-slate-700 dark:text-white ">{props.metricMode ? props.guess.weight : convertWeightToImperial()} {props.hardMode ? "" : `${props.evaluations.Weight_HOL === 1 ? "▲" : props.evaluations.Weight_HOL === 2 ? "▼" : ""}`}</td>
                            }</>
                    }</>
            }
        </tr >

    )
}


export default Guess;