import Charts from "../../components/Charts";

const {Map} = Charts;
const TransportProvince = () => {
  return (
    <div className="space-y-16 mb-8">
      <fieldset className="text-center border rounded-xl p-4">
        <legend className="text-black mx-auto px-3">نگاه کلی به وضعیت استان‌ تهران</legend>
        <div className="flex flex-col align-center justify-center w-full rounded-xl bg-white p-4 shadow">
          <Map/>
        </div>
      </fieldset>
    </div>
  )
}

export default TransportProvince;