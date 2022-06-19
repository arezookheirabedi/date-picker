import CountUpDate from "../CountUpTimer";


const CountUpTimer = () => {
  return (
    <fieldset className="text-center border rounded-xl p-8">
      <legend className="text-black mx-auto px-3">زمان ارائه خدمات بدون وقفه</legend>

      <div
        className="flex justify-center items-center">
        <div className="count-up-timer flex justify-center items-center md:px-24">
          <CountUpDate date="October 1, 2021 12:00:00"/>
        </div>
      </div>
    </fieldset>
  )
}

export default CountUpTimer;