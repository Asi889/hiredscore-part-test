export const daysBetweenDates = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays
}