/**
 * Created by roman on 08.02.17.
 */
import React from 'react'

export default class DaySelectorItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.props.setDayHandler(this.props.index);
    }

    render() {
        return (
            <a href="#"
               className={'schedule__day-selector-item' + (this.props.active ? ' schedule__day-selector-item_active' : '')}
               onClick={this.onClick}>
                {this.props.label}
            </a>
        );
    }
}

DaySelectorItem.propTypes = {
    setDayHandler: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired,
    active: React.PropTypes.bool,
};

DaySelectorItem.defaultProps = {
    active: false
};