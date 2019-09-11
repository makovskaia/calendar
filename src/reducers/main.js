import { getId } from '../utils/utils'

const initState = {
  events: {}
}

const main = (state = initState, action) => {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case 'ADD_EVENT':
      newState.events[getId(state.events)] = action.event
    default: 
      return newState
  }
}

export default main