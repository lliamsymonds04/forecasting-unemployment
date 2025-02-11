export default function interpolateDateRange(start: string, end: string, t: number): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const newDate = new Date(startDate.getTime() + diff * t);

    // const roundedMonth = Math.floor(newDate.getMonth() / 3) * 3; //round to nearest quarter
    const roundedMonth = Math.floor(newDate.getMonth()) ; //round to nearest quarter

    newDate.setMonth(roundedMonth);
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear().toString().slice(-2);
    return `${month.toString().padStart(2, '0')}/${year}`;
}