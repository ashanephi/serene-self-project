export const monthStrings = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export function getOrdinalSuffix(day) {
    if (day % 10 === 1 && day !== 11) return "st";
    if (day % 10 === 2 && day !== 12) return "nd";
    if (day % 10 === 3 && day !== 13) return "rd";
    return "th";
}


export function formatDate1({ _date }) {

    const date = new Date(_date)

    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  
    // Add ordinal suffix
    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
  
    return formattedDate.replace(day.toString(), `${day}${suffix}`);
}