/**
 * Created by roman on 25.02.17.
 */
import store from '../../data/state-handler';
import {dropClass} from '../actions';

export const spec = {
    beginDrag(props){
        return {
            id: props.id,
            subjects_id: props.subjects_id
        }
    },
    endDrag(props, monitor){
        if (monitor.didDrop()) {
            // console.log(props, monitor.getDropResult());

            let result = {
                action: monitor.getDropResult().action,
                new_item: {
                    schedule_id: store.getState().schedule_id,
                    subject_id: props.subjects_id,
                    subject_title: props.subjects_title,
                    subject_level: props.subjects_level,
                    teacher_id: props.id,
                    teacher_name: props.name,
                    group_id: monitor.getDropResult().group_id,
                    subgroup_id: null,
                    room_id: null,
                    room_number: null,
                    classes_numbers_id: monitor.getDropResult().classes_numbers_id,
                    classes_types_id: null,
                    day: monitor.getDropResult().day
                }
            };

            dropClass(result, store);
        }
    }
};

export function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

