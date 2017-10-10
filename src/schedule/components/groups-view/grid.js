/**
 * Created by roman on 04.02.17.
 */
import React from 'react'
import GridTable from '../../containers/groups-view/grid/grid-table';

export default class Grid extends React.Component {
    // tables() {
    //     let tables = [];
    //
    //     for (let d = 0; d < this.props.week_length; d++) {
    //         tables.push(
    //             <GridTable key={'schedule-table-' + d} visible={this.props.day == d}/>
    //         );
    //     }
    //
    //     return tables;
    // }

    render() {
        return (
            <div className="col-sm-8 schedule__table-module">
                <GridTable key={'schedule-table-' + this.props.day} visible={true}/>
            </div>
        );
    }
}

Grid.propTypes = {
    day: React.PropTypes.number,
    week_length: React.PropTypes.number,
};

Grid.defaultProps = {
    day: 0,
    week_length: 6
};