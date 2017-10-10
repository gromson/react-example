/**
 * Created by roman on 26.03.17.
 */
import store, {moveRoomAction} from '../../data/state-handler';

export const spec = {
    beginDrag(props){
        return {
            id: props.id,
            number: props.number
        }
    },
    endDrag(props, monitor){
        if (monitor.didDrop()) {
            let dropResult = monitor.getDropResult();

            let result = {
                action: dropResult.action,
                prev_item:{
                    schedule_id: store.getState().schedule_id,
                    subject_id: dropResult.subject_id,
                    teacher_id: dropResult.teacher_id,
                    group_id: dropResult.group_id,
                    subgroup_id: null,
                    room_id: dropResult.id,
                    classes_numbers_id: dropResult.classes_numbers_id,
                    classes_types_id: null,
                    day: dropResult.day
                },
                new_item: {
                    schedule_id: store.getState().schedule_id,
                    subject_id: dropResult.subject_id,
                    teacher_id: dropResult.teacher_id,
                    group_id: dropResult.group_id,
                    subgroup_id: null,
                    room_id: props.id,
                    room_number: props.number,
                    classes_numbers_id: dropResult.classes_numbers_id,
                    classes_types_id: null,
                    day: dropResult.day
                }
            };

            store.dispatch(moveRoomAction(result));
        }
    }
};

export function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

