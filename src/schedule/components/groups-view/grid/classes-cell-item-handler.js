/**
 * Created by roman on 11.03.17.
 */
import React from 'react';
import {DropTarget} from 'react-dnd';
import {DRAG_TYPE_TEACHER, DRAG_TYPE_TEACHER_PLACED} from '../../../drag-and-drop/draggable-types';
import {spec, collect} from '../../../drag-and-drop/drop/class-cell-item-handler';
import ClassCellItem from './class-cell-item';

class ClassCellItemHandler extends React.Component{
    classes() {
        let itemsContainer = [], items = [];

        for (let c of this.props.classes) {
            if (c.classes_numbers_id == this.props.id && c.day == this.props.day) {
                itemsContainer.push(c);
            }
        }

        for(let c of itemsContainer) {
            items.push(
                <ClassCellItem
                    key={'classes-' + c.classes_number_id + '-day-' + c.day + '-subject-id-' + c.subject_id + '-teacher-id-' + c.teacher_id}
                    width={100/itemsContainer.length+'%'}
                    group_id={this.props.group_id}
                    {...c}/>
            );
        }

        return items;
    }

    render(){
        let className = 'schedule-class-item-handler';

        if (this.props.canDrop && !this.props.isOver) {
            className += ' schedule-class-item-handler_available';
        } else if (this.props.isOver) {
            className += ' schedule-class-item-handler_hovered';
        }

        return this.props.connectDropTarget(<div className={className}>{this.classes()}</div>);
    }
}

ClassCellItemHandler.propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    id: React.PropTypes.number.isRequired,
    day: React.PropTypes.number.isRequired,
    group_id: React.PropTypes.number.isRequired,
    classes: React.PropTypes.arrayOf(React.PropTypes.object)
};

ClassCellItemHandler.defaultProps = {
    classes: []
};

export default DropTarget([DRAG_TYPE_TEACHER,DRAG_TYPE_TEACHER_PLACED], spec, collect)(ClassCellItemHandler);