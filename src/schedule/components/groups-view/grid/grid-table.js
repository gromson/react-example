/**
 * Created by roman on 05.02.17.
 */
import React from 'react'
import ClassCell from './class-cell';
import days from '../../../data/days';

export default class GridTable extends React.Component {
    groupsRow() {
        let cellClassName = 'schedule-table__groups-row-cell';
        let rowCells = this.props.groups.map(
            (item) =>
                <th
                    key={cellClassName + '_day-' + this.props.day + '-' + item.id}
                    className={cellClassName}
                    style={{width: 100/this.props.groups.length+'%'}}>
                    {item.title}
                </th>
        );
        rowCells.unshift(<th key={cellClassName + '-empty_day-' + this.props.day} className={cellClassName}></th>);

        return rowCells;
    }

    lessonsRows() {
        let rows = [];

        for (let shift in this.props.classes) {
            rows.push(
                <tr key={'shift-row-day' + this.props.day + '-shift' + shift}>
                    <th className="schedule-table__shift-row" colSpan={this.props.groups.length + 1}>{shift + ' смена'}</th>
                </tr>
            );

            for (let classNumber of this.props.classes[shift]) {
                let row = this.props.groups.map(
                    (group) => {
                        let gclasses = [];

                        for (let c of group.classes) {
                            if( c.day == this.props.day && c.classes_numbers_id == classNumber.id ){
                                gclasses.push(c);
                            }
                        }

                        return <ClassCell
                            key={'class-cell-day' + this.props.day + '-group' + group.id + '-class-number' + classNumber.id}
                            id={classNumber.id}
                            number={classNumber.number}
                            time={classNumber.time}
                            day={this.props.day}
                            group_id={group.id}
                            classes={gclasses}
                        />
                    }
                );

                row.unshift(
                    <td
                        key={'class-number-cell-day' + this.props.day + '-class-number' + classNumber.id}>
                        {classNumber.number}
                    </td>
                );

                rows.push(
                    <tr
                        className="schedule-table__classes-row"
                        key={'class-row-day' + this.props.day + '-shift' + shift + '-number' + classNumber.number}>
                        {row}
                    </tr>
                );
            }
        }

        return rows;
    }

    render() {
        return (
            <table
                className="table table-bordered schedule-table">
                <thead>
                <tr className="schedule-table__day-row">
                    <th className="schedule-table__day-row-cell" colSpan={this.props.groups.length + 1}>{days[this.props.day]}</th>
                </tr>
                <tr className="schedule-table__groups-row">
                    {this.groupsRow()}
                </tr>
                </thead>

                <tbody>
                {this.lessonsRows()}
                </tbody>
            </table>
        )
    }
}

GridTable.propTypes = {
    day: React.PropTypes.number.isRequired,
    groups: React.PropTypes.arrayOf(React.PropTypes.object),
    classes: React.PropTypes.object,
};

GridTable.defaultProps = {
    groups: [],
    classes: {},
};