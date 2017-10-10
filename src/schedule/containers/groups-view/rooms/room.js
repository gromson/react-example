/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import Room from '../../../components/groups-view/rooms/room';
import {DragSource} from 'react-dnd';
import {DRAG_TYPE_ROOM} from '../../../drag-and-drop/draggable-types';
import {spec,collect} from '../../../drag-and-drop/drag/room';

const mapStateToProps = (state) => {
    return {
        classes: state.classes,
        day: state.day
    };
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

let RoomContainer = connect(mapStateToProps, mapDispatchToProps)(Room);
export default DragSource(DRAG_TYPE_ROOM, spec, collect)(RoomContainer);