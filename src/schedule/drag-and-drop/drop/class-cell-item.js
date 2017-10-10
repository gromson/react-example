/**
 * Created by roman on 26.03.17.
 */
export const spec = {
    drop(props){
        return {
            action: 'move',
            schedule_id: 0,
            subject_id: props.subject_id,
            teacher_id: props.teacher_id,
            group_id: props.group_id,
            subgroup_id: null,
            room_id: props.room_id,
            classes_numbers_id: props.classes_numbers_id,
            classes_types_id: null,
            day: props.day
        }
    },
    canDrop(){
        return true;
    }
};

export function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}