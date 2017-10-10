/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import DaySelectorItem from '../../../components/groups-view/day-selector/day-selector-item';
import {setDayAction} from '../../../data/state-handler'

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDayHandler: (day) => {
            dispatch(setDayAction(day));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DaySelectorItem);