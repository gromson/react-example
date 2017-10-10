/**
 * Created by roman on 11.03.17.
 */
import React from 'react';
import {DropTarget} from 'react-dnd';
import {DRAG_TYPE_TEACHER_PLACED} from '../../drag-and-drop/draggable-types';
import {spec, collect} from '../../drag-and-drop/drop/trash-zone';

function TrashZone(props){
    let className = ' schedule-trash-zone';

    if(props.visible == true){
        className += ' schedule-trash-zone_visible';
    }

    return props.connectDropTarget(<div className={'img-circle' + className}><i className="fa fa-trash"></i></div>);
}

TrashZone.propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    visible:React.PropTypes.bool
};

TrashZone.defaultProps = {
    visible: false
};



export default DropTarget(DRAG_TYPE_TEACHER_PLACED, spec, collect)(TrashZone);