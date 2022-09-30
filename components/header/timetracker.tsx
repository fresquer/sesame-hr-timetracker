import { DurationObjectUnits } from "luxon"
import { SetStateAction, useEffect, useState } from "react"
import { clearInterval } from "timers"
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

    const handleStartTracking = async (): Promise<void> => {
        setTrackingActive(true);
        const res = await clockIn(trackingInfo?.employee?.id)
        updateEntryInfo(res.data)
        let secs = 0;

        setInterval(() => {
            const t: string = timeInterval(trackingInfo.workEntryIn?.date, secs)
            setTrackingTime(t)
        }, 1000)
    }


    const cleanIntervals = () => {
        let interval_id = window.setInterval(() => { }, 99999);
        for (var i = 0; i < interval_id; i++)
            window.clearInterval(i);
    }



    const handleEndTracking = async (): Promise<void> => {
        setTrackingActive(false);
        await clockOut(trackingInfo.employee.id)
        cleanIntervals()
    }

    useEffect(() => {
        if (trackingInfo) {
            const status: boolean = trackingInfo.employee.workStatus === 'online' ? true : false;
            setTrackingActive(status)

            if (trackingActive) {
                const time: string = calculateTime(trackingInfo.workEntryIn?.date, '')
                setTrackingTime(time)
                let secs = 0;
                setInterval(() => {
                    const t: string = timeInterval(trackingInfo.workEntryIn?.date, secs)
                    setTrackingTime(t)
                }, 1000)

            } else {
                const time: string = calculateTime(trackingInfo.workEntryIn?.date, trackingInfo.workEntryOut?.date)
                setTrackingTime(time)
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
                            <button className="pause">Pausar</button>
                            <button className="end" onClick={() => handleEndTracking()}>Salir</button>
                        </>
                }
            </div>
        </div>
    )
}