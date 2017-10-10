/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import Grid from '../../components/groups-view/grid';

const mapStateToProps = (state) => {
    return {
        day: state.day,
        week_length: state.week_length
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);