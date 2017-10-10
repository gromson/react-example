/**
 * Created by roman on 09.04.17.
 */
import {moveClassAction, moveRoomAction} from '../data/state-handler';

export function dropClass(items, store) {
    $.ajax({
        url: 'http://schedule.dev:4000/classes/check',
        data: items.new_item,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.status == true) {
                saveClass(items, store);
            } else {
                let htmlMessages = '<ul>';

                for (let m of data.messages) {
                    htmlMessages += '<li>' + m + '</li>';
                }

                htmlMessages += '</ul>';

                swal({
                        type: 'warning',
                        title: 'Обнаружены следующие конфликты! Все равно продолжить?',
                        text: htmlMessages,
                        html: true,
                        showCancelButton: true,
                        cancelButtonText: 'Нет',
                        confirmButtonText: 'Да'
                    },
                    function () {
                        saveClass(items, store);
                    });
            }
        }
    });
}

export function removeClass(items, store) {
    $.ajax({
        url: 'http://schedule.dev:4000/classes/delete',
        data: items.prev_item,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status == true) {
                store.dispatch(moveClassAction(items));
            }
        }
    });
}

export function dropRoom(items, store) {
    $.ajax({
        url: 'http://schedule.dev:4000/room/save',
        data: items.new_item,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status == true) {
                store.dispatch(moveRoomAction(items));
            }
        }
    });
}

function saveClass(items, store) {
    if (items.prev_item != undefined) {
        $.ajax({
            url: 'http://schedule.dev:4000/classes/delete',
            data: items.prev_item,
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                if (data.status != true) {
                    swal('Ошибка!', 'При переносе урока произошла ошибка!', 'error')
                }
            }
        });
    }

    $.ajax({
        url: 'http://schedule.dev:4000/classes/save',
        data: items.new_item,
        type: 'POST',
        dataType: 'json',
        success: function (data) {
            if (data.status == true) {
                store.dispatch(moveClassAction(items));
            }
        }
    });
}