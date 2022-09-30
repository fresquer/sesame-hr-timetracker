import { DurationObjectUnits } from "luxon"
import { SetStateAction, useEffect, useState } from "react"
import { TrankInfoModel } from "../../interfaces"
import { clockIn, clockOut } from "../../services/api"
import { calculateTime, getDiff, timeInterval } from "../../util/time-utils"

type Props = {
    trackingInfo: TrankInfoModel,
    updateEntryInfo: Function,
    children: React.ReactNode;
}


export const TimeTracker = ({ trackingInfo, updateEntryInfo }: Props) => {
    const [trackingActive, setTrackingActive] = useState(false)
    const [trackingTime, setTrackingTime] = useState('00:00:00')
    const [intervalID, setIntervalID] = useState<SetStateAction<any> | null>(null)

    const handleStartTracking = async (): Promise<void> => {
        setTrackingActive(true);
        const res = await clockIn(trackingInfo?.employee?.id)
        updateEntryInfo(res.data)

        countdownMode()
    }

    const handlePauseTracking = (): void => {
        clearInterval(intervalID)
    }

    const handleEndTracking = async (): Promise<void> => {
        setTrackingActive(false);
        const res = await clockOut(trackingInfo.employee.id)
        updateEntryInfo(res.data)
        clearInterval(intervalID)
    }

    const countdownMode = () => {
        let secs = 0;
        setIntervalID(setInterval(() => {
            secs += 1
            const t: string = timeInterval(trackingInfo.workEntryIn?.date, trackingInfo.workEntryOut?.date, secs)
            console.log("🚀 ~ file: timetracker.tsx ~ line 27 ~ setInterval ~ t", t, secs)
            setTrackingTime(t)
        }, 1000))
    }

    useEffect(() => {
        if (trackingInfo) {
            const status: boolean = trackingInfo.employee.workStatus === 'online' ? true : false;
            setTrackingActive(status)
            const time: string = calculateTime(trackingInfo.workEntryIn?.date)
            setTrackingTime(time)

            if (trackingActive) {
                countdownMode()
            }
        }
    }, [trackingInfo])




    return (
        <div className="timetracker_wrapper flex">
            <div className="tiempo">{trackingTime}</div>
            <div className="buttons_wrapper flex">
                {
                    !trackingActive ?
                        <button className="start" onClick={() => handleStartTracking()}>Entrar</button>
                        :
                        <>
                            <button className="pause" onClick={() => handlePauseTracking()}>Pausar</button>
                            <button className="end" onClick={() => handleEndTracking()}>Salir</button>
                        </>
                }
            </div>
        </div>
    )
}