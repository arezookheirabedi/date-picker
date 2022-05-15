import React, {useEffect, useRef} from "react";

let clearId: any;
const CountUpTimer: React.FC<any> = ({date}) => {
  const DaysRef = useRef<HTMLSpanElement>(null);
  const HoursRef = useRef<HTMLSpanElement>(null);
  const MinutesRef = useRef<HTMLSpanElement>(null);
  const SecondsRef = useRef<HTMLSpanElement>(null);
  const countUpFromTime = (count: any) => {
    const countFrom: any = new Date(count).getTime();
    const now: any = new Date();
    const countFrom2: any = new Date(countFrom);
    const timeDifference = (now - countFrom2);

    const secondsInADay = 60 * 60 * 1000 * 24;
    const secondsInAHour = 60 * 60 * 1000;

    const days = Math.floor(timeDifference / (secondsInADay));
    const hours = Math.floor((timeDifference % (secondsInADay)) / (secondsInAHour));
    const minus = Math.floor(((timeDifference % (secondsInADay)) % (secondsInAHour)) / (60 * 1000));
    const secs = Math.floor((((timeDifference % (secondsInADay)) % (secondsInAHour)) % (60 * 1000)) / 1000);

    DaysRef.current!.innerHTML = days.toLocaleString('fa');
    HoursRef.current!.innerHTML = hours.toLocaleString('fa');
    MinutesRef.current!.innerHTML = minus.toLocaleString('fa');
    SecondsRef.current!.innerHTML = secs.toLocaleString('fa');

    clearTimeout(clearId);
    clearId = setTimeout(() => {
      countUpFromTime(countFrom);
    }, 1000);
  }

  useEffect(() => {
    countUpFromTime(date);
    return () => {
      clearTimeout(clearId)
    }
  }, []);
  return (
    <>
      <div>
        <span className="count-up-timer__days" ref={DaysRef}>00</span>
        <span className="count-up-timer__days--title">روز</span>
      </div>
      <div>
        <span className="count-up-timer__hours" ref={HoursRef}>00</span>
        <span className="count-up-timer__hours--title">ساعت</span>
      </div>
      <div>
        <span className="count-up-timer__minutes" ref={MinutesRef}>00</span>
        <span className="count-up-timer__minutes--title">دقیقه</span>
      </div>
      <div>
        <span className="count-up-timer__seconds" ref={SecondsRef}>00</span>
        <span className="count-up-timer__seconds--title">ثانیه</span>
      </div>
    </>
  )
}

export default CountUpTimer;