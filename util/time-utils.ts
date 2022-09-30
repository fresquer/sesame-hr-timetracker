import { DateTime, DurationObjectUnits } from 'luxon'
import { TrankInfoModel } from '../interfaces';

export const calculateTime = (start: string): string => {
    const diff = getDiff(start, DateTime.local());
    // Ignore because seems a bug with Luxon typing
    // @ts-ignore
    return diff.toFormat('hh:mm:ss')
}

export const getDiff = (start: string, end: DateTime): DurationObjectUnits => {
    const timeStart = DateTime.fromISO(start)
    return end.diff(timeStart, ["hours", "minutes", "seconds"])
}

export const timeInterval = (start: string, end: string, secs: number): string => {
    const timeStart = DateTime.fromISO(start)
    let InittimeEnd = DateTime.local()
    // let InittimeEnd = DateTime.fromISO(end)
    InittimeEnd = InittimeEnd.plus({ seconds: secs })
    const diff = InittimeEnd.diff(timeStart, ["hours", "minutes", "seconds"])
    return diff.toFormat('hh:mm:ss')
}


export const getLastTracking = (serverData: TrankInfoModel[]): TrankInfoModel => {
    const filterToday = serverData.filter((register: TrankInfoModel) => {
        const data = DateTime.fromISO(register.workEntryIn.date)
        return data.hasSame(DateTime.local(), "day")
    })

    const arrayMaxDateTimes: DateTime[] = []
    filterToday.forEach((register: TrankInfoModel) => {
        arrayMaxDateTimes.push(DateTime.fromISO(register.updatedAt))
    }
    )

    const maxDateRegister = DateTime.max(...arrayMaxDateTimes)

    return filterToday.filter(item => {
        const rgisterDate = DateTime.fromISO(item.updatedAt)
        const day = rgisterDate.hasSame(maxDateRegister, "day");
        const hour = rgisterDate.hasSame(maxDateRegister, "hour");
        const minutes = rgisterDate.hasSame(maxDateRegister, "minute");
        const secs = rgisterDate.hasSame(maxDateRegister, "second");
        return (day && hour && hour && minutes && secs)
    })[0]
}

