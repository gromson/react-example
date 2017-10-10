/**
 * Created by roman on 15.04.17.
 */
import {connect} from 'react-redux';
import TrashZone from '../../components/groups-view/trash-zone';

const mapStateToProps = (state) => {
    return {
        trash_zone: state.trash_zone
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(TrashZone);