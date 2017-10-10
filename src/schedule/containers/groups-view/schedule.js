/**
 * Created by roman on 25.02.17.
 */
import {connect} from 'react-redux';
import Schedule from '../../components/groups-view/schedule';
import {setStateData} from '../../data/state-handler'

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (id) => {
            $.ajax({
                url: '/schedule/getinitstate/' + id,
                dataType: 'json',
                success: function (data) {
                    dispatch(setStateData(data));
                }
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);