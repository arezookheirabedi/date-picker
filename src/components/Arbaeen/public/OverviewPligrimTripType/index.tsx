import useGetArbaeenCountDataOnRegisterTime from 'src/hooks/apis/useGetArbaeenCountDataOnRegisterTime';
import OverviewPligrimTripTypeCount from './OverviewPligrimTripTypeCount';
import OverviewPligrimTripTypePercentage from './OverviewPligrimTripTypePercentage';

const OverviewPligrimTripType: React.FC<{}> = () => {
  const {data: pilgrims, loading: dataLoading} = useGetArbaeenCountDataOnRegisterTime({
    countZaerinAir: true,
    countTotal: true,
    countZaerinGround: true,
    countZaerinRail: true,
  });
  return (
    <>
      <OverviewPligrimTripTypeCount pilgrims={pilgrims} loading={dataLoading} />
      <OverviewPligrimTripTypePercentage pilgrims={pilgrims} loading={dataLoading} />
    </>
  );
};
export default OverviewPligrimTripType;
