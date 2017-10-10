/**
 * Created by roman on 11.03.17.
 */
export const spec = {
    drop(props, monitor){
        let itemProps = monitor.getItem();

        return {
            action: 'remove',
            day: itemProps.day,
            classes_numbers_id: itemProps.classes_numbers_id,
            group_id: itemProps.groups_id
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