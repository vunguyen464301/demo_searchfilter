import actions from '../actions/types'

const reducer = (state = {}, payload) => {
  switch (payload.type) {
    case actions.GET_DATA: {
      return {
        data:payload.data,
      }
    }
    default:
      return state
  }
}

export default reducer