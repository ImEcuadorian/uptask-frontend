export const formatDateTime = (date: string): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString();
}
