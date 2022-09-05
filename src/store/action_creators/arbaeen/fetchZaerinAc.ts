import {Dispatch} from 'redux';
import arbaeenService from 'src/services/arbaeen.service';
import JSZip from 'jszip';
import csvtojson from 'csvtojson';
import {ActionType} from '../../action_type';
import {Action} from '../../actions/arbaeen/fetchZaerin.action';

const FILE_NAME = 'ar_location_ptrue_tmp_loc';

export const fetchZaerinAc = () => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.FETCH_ZAERIN,
    payload: undefined,
  });

  try {
    // make a request to fetch guild info and dispatch with appropriate type and payload
    const {data: response} = await arbaeenService.getPiligrimReportAsFile(
      {
        fileName: `${FILE_NAME}.zip`,
      },
      {responseType: 'blob'}
    );
    const zip = await JSZip.loadAsync(response);

    const file = await zip.file(`${FILE_NAME}.csv`)?.async('text');

    const json = await csvtojson().fromString(file || '');

    dispatch({type: ActionType.FETCH_ZAERIN_SUCCESS, payload: json});
  } catch (error: any) {
    dispatch({
      type: ActionType.FETCH_ZAERIN_ERROR,
      payload: error.message || 'خطایی در عملیات',
    });
  }
};
