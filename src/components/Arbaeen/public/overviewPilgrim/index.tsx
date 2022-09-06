import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import OverviewPilgrimCount from './OverviewPilgrimCount';
import OverviewPilgrimPercentage from './OverviewPilgrimPercentage';

const OverviewPilgrim: React.FC<{}> = () => {
  const {data: pilgrims, loading: dataLoading} = useGetArbaeenCountDataOnRegisterTime({
    countIranian: true,
    countMaleIranian: true,
    countFemaleIranian: true,
    countNonIranian: true,
    countMaleNonIranian: true,
    countFemaleNonIranian: true,
    countTotal: true,
  });
  return (
    <>
      <OverviewPilgrimCount pilgrims={pilgrims} loading={dataLoading} />
      <OverviewPilgrimPercentage pilgrims={pilgrims} loading={dataLoading} />
    </>
  );
};
export default OverviewPilgrim;
