export const convertirFechaYYYYMMDD = (date: any) => {
    if (date) {
        return date.toISOString().split('T')[0]
    } else {
        return null;
    }
}
