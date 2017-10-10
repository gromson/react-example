/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import DaySelector from '../../../components/groups-view/day-selector/day-selector';

const mapStateToProps = (state) => {
    return {
        active: state.day,
        week_length: state.week_length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(DaySelector);