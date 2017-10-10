/**
 * Created by roman on 18.02.17.
 */
import {createStore} from 'redux';
import state from './state';

function reducer(state, action) {
    switch (action.type) {
        case 'SET_DATA':
            return Object.assign({}, state, action.data);
            break;
        case 'SET_DAY':
            return Object.assign({}, state, {day: action.day});
            break;
        case 'MOVE_CLASS':
            return moveClass(state, action.data);
            break;
        case 'MOVE_ROOM':
            return moveRoom(state, action.data);
            break;
        case 'TRASH_ZONE_VISIBILITY':
            return Object.assign({}, state, {trash_zone: action.trash_zone});
            break;
        default:
            return state;
    }
}

function setDayAction(day) {
    return {type: 'SET_DAY', day: day};
}

function setStateData(data) {
    return {type: 'SET_DATA', data: data};
}

function moveClassAction(data) {
    return {type: 'MOVE_CLASS', data: data}
}

function moveRoomAction(data) {
    return {type: 'MOVE_ROOM', data: data}
}

function trashVisibilityAction(value) {
    return {type: 'TRASH_ZONE_VISIBILITY', trash_zone: value}
}

const store = createStore(reducer, state);

export {store as default, setStateData, setDayAction, moveClassAction, moveRoomAction, trashVisibilityAction}

function moveClass(state, data) {
    let newState = JSON.parse(JSON.stringify(state));
    let sm = new StateModifier(newState);

    sm.moveTeacherInSchedule(data.action, data.prev_item, data.new_item);

    return newState;
}

function moveRoom(state, data) {
    let newState = JSON.parse(JSON.stringify(state));
    let sm = new StateModifier(newState);

    sm.moveRoom(data.prev_item, data.new_item);

    return newState;
}

class StateModifier {
    constructor(state) {
        this.state = state;
    }

    moveTeacherInSchedule(action, prev, next) {
        for (let g of this.state.groups) {
            if (prev != null && prev != undefined && g.id == prev.group_id) {
                for (let ci in g.classes) {
                    let c = g.classes[ci];
                    if (
                        c.subject_id == prev.subject_id
                        && c.teacher_id == prev.teacher_id
                        && c.classes_numbers_id == prev.classes_numbers_id
                    ) {
                        g.classes.splice(ci, 1);
                    }
                }
            }

            if (action == 'move') {
                if (g.id == next.group_id) {
                    g.classes.push(next)
                }
            } else if (action == 'remove' && prev != null && prev != undefined) {
                this.changeRoomClassesNumbers(prev);
            }
        }

        if (prev != null && prev != undefined) {
            this.changeTeachersScheduledHours('decrease', prev.subject_id, prev.teacher_id);
        }

        if (action != 'remove') {
            this.changeTeachersScheduledHours('increase', next.subject_id, next.teacher_id);
        }

        this.changeRoomClassesNumbers(prev, next)
    }

    changeTeachersScheduledHours(action, subject_id, teacher_id) {
        for (let s of this.state.subjects) {
            if (s.id == subject_id) {
                for (let t of s.teachers) {
                    if (t.id == teacher_id) {
                        if (t.schedule.subjects == undefined) {
                            t.schedule.subjects = {};
                        }
                        if (t.schedule.subjects[subject_id] == undefined) {
                            t.schedule.subjects[subject_id] = {hours: 0};
                        }

                        if (action == 'increase') {
                            t.schedule.subjects[subject_id].hours += 1;
                        } else if (action == 'decrease') {
                            t.schedule.subjects[subject_id].hours -= 1;
                        }
                    }
                }
            }
        }
    }

    moveRoom(prev, next) {
        for (let g of this.state.groups) {
            for (let c of g.classes) {
                if (
                    prev != null
                    && prev != undefined
                    && g.id == prev.group_id
                    && c.subject_id == prev.subject_id
                    && c.teacher_id == prev.teacher_id
                    && c.classes_numbers_id == prev.classes_numbers_id
                ) {
                    c.room_id = null;
                    c.room_number = null;
                }

                if (
                    next != null
                    && next != undefined
                    && g.id == next.group_id
                    && c.subject_id == next.subject_id
                    && c.teacher_id == next.teacher_id
                    && c.classes_numbers_id == next.classes_numbers_id
                ) {
                    c.room_id = next.room_id;
                    c.room_number = next.room_number;
                }
            }
        }

        this.changeRoomClassesNumbers(prev, next);
    }

    changeRoomClassesNumbers(prev, next) {
        let exists = 0;

        for (let rci in this.state.rooms_categories) {
            let rc = this.state.rooms_categories[rci];

            for (let ri in rc.rooms) {
                let r = rc.rooms[ri];

                for (let cni in r.classes_numbers) {
                    let cn = r.classes_numbers[cni];

                    if (
                        prev != null
                        && prev.room_id == r.id
                        && prev.classes_numbers_id == cn.classes_numbers_id
                        && prev.day == cn.day
                    ) {
                        $.ajax({
                            url: 'http://schedule.dev:4000/room/count',
                            data: {
                                'schedule_id': this.state.schedule_id,
                                'rooms_id': r.id,
                                'classes_numbers_id': cn.classes_numbers_id,
                                'day': cn.day
                            },
                            type: 'GET',
                            dataType: 'json',
                            success: function (data) {
                                if (data.status == true && data.number == 0) {
                                    r.classes_numbers.splice(cni, 1);
                                    // delete r.classes_numbers[cni];
                                }
                            }
                        });

                    }

                    if (
                        next != null
                        && next.room_id == r.id
                        && next.classes_numbers_id == cn.classes_numbers_id
                        && next.day == cn.day
                    ) {
                        exists++;
                    }
                }


                if (
                    next != null
                    && next.room_id == r.id
                    && !exists
                // && next.classes_numbers_id == cn.classes_numbers_id
                // && next.day == cn.day
                ) {
                    r.classes_numbers.push({classes_numbers_id: next.classes_numbers_id, day: next.day});
                }
            }
        }
    }

    changeRoomClassesNumbers_v1() {
        let roomsOccupied = {};

        for (let g of this.state.groups) {
            for (let ci in g.classes) {
                let c = g.classes[ci];

                if (c.room_id > 0) {
                    if (roomsOccupied[c.room_id] == undefined) {
                        roomsOccupied[c.room_id] = []
                    }
                    roomsOccupied[c.room_id].push({classes_numbers_id: c.classes_numbers_id, day: c.day});
                }
            }
        }

        for (let rci in this.state.rooms_categories) {
            let rc = this.state.rooms_categories[rci];

            for (let ri in rc.rooms) {
                let r = rc.rooms[ri];
                r.classes_numbers = [];


                if (roomsOccupied[r.id] != undefined) {
                    r.classes_numbers = roomsOccupied[r.id];
                }
            }
        }

        /*
         for (let rci in this.state.rooms_categories) {
         let rc = this.state.rooms_categories[rci];

         for (let ri in rc.rooms) {
         let r = rc.rooms[ri];
         let marked = false;

         for (let ci in r.classes_numbers) {
         let c = r.classes_numbers[ci];

         if (
         prev != null
         && prev != undefined
         && r.id == prev.room_id
         && c.classes_numbers_id == prev.classes_numbers_id
         && c.day == prev.day
         ) {
         r.classes_numbers.splice(ci, 1);
         }

         if (
         next != null
         && next != undefined
         && c.classes_numbers_id == next.classes_numbers_id
         && c.day == next.day
         ) {
         if (r.id != next.room_id) {
         r.classes_numbers.splice(ci, 1);
         } else {
         marked = true;
         }
         }
         }

         if (next != null && next != undefined && r.id == next.room_id && marked == false) {
         r.classes_numbers.push({classes_numbers_id: next.classes_numbers_id, day: next.day});
         }
         }
         }
         */
    }
}