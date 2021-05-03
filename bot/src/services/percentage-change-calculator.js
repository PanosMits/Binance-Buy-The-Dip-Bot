/**
 * Calculates percentages differences between 2 numbers, close prices in this case.
 * The result can be either a negative or a positive number
 * @param {number} oldClose 
 * @param {number} newClose
 * @returns The percentage difference up to 2 decimal points
 */
const calculate = (oldClose, newClose) => {
    let percent;
    if (newClose !== 0) {
        if (oldClose !== 0) {
            percent = (newClose - oldClose) / oldClose * 100;
        } else {
            percent = newClose * 100;
        }
    } else {
        percent = - oldClose * 100;
    }
    return percent.toFixed(2);
}

module.exports = { calculate };
