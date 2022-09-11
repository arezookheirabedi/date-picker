import PilogrimListWithFiltering from 'src/components/Arbaeen/pilogrimListWithFiltering';

const ArbaeenPilgrimsList: React.FC<{}> = () => {
  return (
    <div className="space-y-16 mb-8">
      <PilogrimListWithFiltering />
      <fieldset className=" rounded-xl border py-2 px-4 text-center">
        <div className=" flex justify-center">
          <a href="https://irancell.ir" target="_blank" rel="noreferrer">
            <img
              src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell.png`}
              className="w-12 ml-1"
              alt=""
            />
          </a>
          <a href="https://irancell.ir" target="_blank" rel="noreferrer">
            <img
              src={`${process.env.PUBLIC_URL}/images/logos/irancell/irancell-labs.png`}
              className="w-8 ml-1"
              alt=""
            />
          </a>
        </div>
      </fieldset>
    </div>
  );
};
export default ArbaeenPilgrimsList;
