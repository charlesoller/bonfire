export const formatDate = (dateString) => {
    // Parse the input date string
    const date = new Date(dateString);

    // Extract the components of the date
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();
    
    // Extract the components of the time
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format minutes with leading zero if needed
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Format month and day with leading zero if needed
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    // Construct the formatted date string
    const formattedDate = `${formattedMonth}/${formattedDay}/${year} ${hours}:${formattedMinutes} ${ampm}`;

    return formattedDate;
}