/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import GridTable from '../../../components/groups-view/grid/grid-table';

const mapStateToProps = (state) => {
    return {
        groups: state.groups,
        classes: state.classes,
        day: state.day
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(GridTable);