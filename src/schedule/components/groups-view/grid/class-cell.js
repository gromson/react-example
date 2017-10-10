/**
 * Created by roman on 05.02.17.
 */
import React from 'react';
import ClassCellItemHandler from './classes-cell-item-handler';

export default class ClassCell extends React.Component {
    render() {
        return (
            <td className="schedule-table__classes-row-cell">
                <ClassCellItemHandler
                    id={this.props.id}
                    day={this.props.day}
                    classes={this.props.classes}
                    group_id={this.props.group_id} />
            </td>
        );
    }
}

ClassCell.propTypes = {
    id: React.PropTypes.number.isRequired,
    number: React.PropTypes.string.isRequired,
    day: React.PropTypes.number.isRequired,
    group_id: React.PropTypes.number.isRequired,
    classes: React.PropTypes.arrayOf(React.PropTypes.object)
};

ClassCell.defaultProps = {
    classes: []
};