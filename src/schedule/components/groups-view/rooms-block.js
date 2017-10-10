/**
 * Created by roman on 11.02.17.
 */
import React from 'react'
import RoomCategory from './rooms/room-category';

export default class RoomsBlock extends React.Component {
    items() {
        let result = [];

        for (let key in this.props.rooms_categories) {
            let item = this.props.rooms_categories[key];

            result.push(<RoomCategory
                key={'schedule-group-rooms-category-list' + item.id}
                {...item}/>);
        }

        return result;
    }

    render() {
        return (
            <div className="col-sm-2 schedule__right-module">
                <div className="scroll_content" style={{marginRight: 10 + 'px'}}>
                    <div className="panel-group schedule__rooms" id="rooms-accordion">
                        {this.items()}
                    </div>
                </div>
            </div>
        );
    }
}

RoomsBlock.propTypes = {
    rooms_categories: React.PropTypes.objectOf(React.PropTypes.object),
};

RoomsBlock.defaultProps = {
    rooms_categories: {},
};