import { getId } from '../utils/utils'

const initState = {
  events: {}
}

const main = (state = initState, action) => {
  let newState = Object.assign({}, state)
  switch(action.type) {
    case 'ADD_EVENT':
      let id = getId(action.event)
      newState.events[id] = {...action.event, id }
    case 'DELETE_EVENT':
      let target = newState.events[action.id]
      if(target) delete newState.events[action.id]
    default: 
      return newState
  }
}

export default main