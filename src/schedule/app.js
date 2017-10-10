/**
 * Created by roman on 29.01.17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './data/state-handler';
import ScheduleGroups from './containers/groups-view/schedule';

class App extends React.Component {
    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return (
            <div className="tabs-container">
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#tab-1">По классам</a></li>
                    <li><a data-toggle="tab" href="#tab-2">По преподавателями</a></li>
                </ul>
                <div className="tab-content">
                    <div id="tab-1" className="tab-pane active">
                        <div className="panel-body">
                            <ScheduleGroups id={this.props.scheduleId}/>
                        </div>
                    </div>
                    <div id="tab-2" className="tab-pane">
                        <div className="panel-body">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    scheduleId: React.PropTypes.number.isRequired
};

ReactDOM.render(<Provider store={store}><App scheduleId={scheduleId}/></Provider>, document.getElementById('schedule'));