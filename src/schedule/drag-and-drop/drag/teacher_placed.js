/**
 * Created by roman on 25.02.17.
 */
import store, {trashVisibilityAction} from '../../data/state-handler';
import {dropClass, removeClass} from '../actions';

export const spec = {
    beginDrag(props){
        store.dispatch(trashVisibilityAction(true));

        return {
            teacher_id: props.teacher_id,
            teacher_name: props.teacher_name,
            subject_id: props.subject_id,
            subject_title: props.subject_title,
            subject_level: props.subject_level,
            room_id: props.room_id,
            room_number: props.room_number,
            day: props.day,
            classes_numbers_id: props.classes_numbers_id,
            group_id: props.group_id,
        }
    },
    endDrag(props, monitor){
        if (monitor.didDrop()) {
            store.dispatch(trashVisibilityAction(false));

            let result = {
                action: monitor.getDropResult().action,
                prev_item: {
                    schedule_id: store.getState().schedule_id,
                    subject_id: props.subject_id,
                    subject_title: props.subject_title,
                    subject_level: props.subject_level,
                    teacher_id: props.teacher_id,
                    teacher_name: props.teacher_name,
                    group_id: props.group_id,
                    subgroup_id: null,
                    room_id: props.room_id,
                    room_number: props.room_number,
                    classes_numbers_id: props.classes_numbers_id,
                    classes_types_id: null,
                    day: props.day
                },
                new_item: {
                    schedule_id: store.getState().schedule_id,
                    subject_id: props.subject_id,
                    subject_title: props.subject_title,
                    subject_level: props.subject_level,
                    teacher_id: props.teacher_id,
                    teacher_name: props.teacher_name,
                    group_id: monitor.getDropResult().group_id,
                    subgroup_id: null,
                    room_id: props.room_id,
                    room_number: props.room_number,
                    classes_numbers_id: monitor.getDropResult().classes_numbers_id,
                    classes_types_id: null,
                    day: monitor.getDropResult().day
                }
            };

            if (result.action == 'move') {
                dropClass(result, store);
            } else if (result.action == 'remove') {
                removeClass(result, store);
            }
        }
    }
};

export function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

