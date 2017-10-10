/**
 * Created by roman on 11.02.17.
 */
import React from 'react'
import Room from '../../../containers/groups-view/rooms/room';

export default class RoomCategory extends React.Component {
    rooms() {
        let result = [];

        for (let key in this.props.rooms) {
            let item = this.props.rooms[key];
            result.push(
                <Room key={'schedule-group-room-list' + item.id} {...item}/>);
        }

        return result;
    }

    render() {
        return (
            <div className="panel panel-default schedule__room-category"
                 data-toggle="collapse"
                 data-parent="#rooms-accordion"
                 href={'#collapse-rooms-' + this.props.id}>
                <div className="panel-heading row no-margins schedule__room-category-header">
                    <h5 className="panel-title pull-left schedule__room-category-header-title">
                        {this.props.title}
                    </h5>
                    <div className="ibox-tools pull-right">
                        <a href="javascript:;">
                            <i className="fa fa-chevron-down"></i>
                        </a>
                    </div>
                </div>
                <div id={'collapse-rooms-' + this.props.id} className="panel-collapse collapse">
                    <div className="panel-body">
                        {this.rooms()}
                    </div>
                </div>
            </div>
        );
    }
}

RoomCategory.propTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    rooms: React.PropTypes.objectOf(React.PropTypes.object),
};

RoomCategory.defaultProps = {
    rooms: {}
};