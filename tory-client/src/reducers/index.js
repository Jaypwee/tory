import { combineReducers } from 'redux';
import items from './items';
import itemgroup from './itemgroup';
import contactlist from './contactlist';
import settings from './settings';
import logs from './log';

export default combineReducers({
    items,
    itemgroup,
    settings,
    contactlist,
    logs
});