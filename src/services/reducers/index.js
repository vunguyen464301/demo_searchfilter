
import { combineReducers } from 'redux'
import getDataReducer from './reducerGetData'

const rootReducer = combineReducers({
  dataUser: getDataReducer
})

export default rootReducer