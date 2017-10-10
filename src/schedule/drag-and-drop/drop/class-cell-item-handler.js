/**
 * Created by roman on 25.02.17.
 */
export const spec = {
    drop(props){
        return {
            action: 'move',
            day: props.day,
            group_id: props.group_id,
            classes_numbers_id: props.id
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