/**
 * Created by roman on 26.02.17.
 */
import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {DRAG_TYPE_TEACHER_PLACED, DRAG_TYPE_ROOM} from '../../../drag-and-drop/draggable-types';
import {spec, collect} from '../../../drag-and-drop/drag/teacher_placed';
import {spec as dropSpec, collect as dropCollect} from '../../../drag-and-drop/drop/class-cell-item';

class ClassCellItem extends React.Component {
    render() {
        let props = this.props;

        let className = 'schedule-class-item schedule-class-item_level_' + props.subject_level;

        if (props.canDrop && !props.isOver) {
            className += ' schedule-class-item_available';
        } else if (props.isOver) {
            className += ' schedule-class-item_hovered';
        }

        return props.connectDropTarget(
            props.connectDragSource(
                <div className={className}
                     style={{width: props.width}}>
                    <div className="schedule-class-item__subject">{props.subject_title}</div>
                    <div className="schedule-class-item__teacher">{props.teacher_name}</div>
                    <div className="schedule-class-item__room badge badge-primary">{props.room_number}</div>
                </div>
            )
        );
    }
}

ClassCellItem.propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    group_id: React.PropTypes.number.isRequired,
    classes_numbers_id: React.PropTypes.number,
    day: React.PropTypes.number,
    room_id: React.PropTypes.number,
    room_number: React.PropTypes.string,
    subject_id: React.PropTypes.number,
    subject_level: React.PropTypes.number,
    subject_title: React.PropTypes.string,
    teacher_id: React.PropTypes.number,
    teacher_name: React.PropTypes.string,
    width: React.PropTypes.string
};

ClassCellItem.defaultProps = {
    width: '100%'
};

export default DropTarget(
    DRAG_TYPE_ROOM,
    dropSpec,
    dropCollect
)(DragSource(DRAG_TYPE_TEACHER_PLACED, spec, collect)(ClassCellItem));