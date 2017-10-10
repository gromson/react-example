/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import RoomsBlock from '../../components/groups-view/rooms-block';

const mapStateToProps = (state) => {
    return {
        rooms_categories: state.rooms_categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsBlock);