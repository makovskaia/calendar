import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import { connect } from 'react-redux'
import Event from './Event'
import { addEvent } from './actions/actions'
import { validateEvent } from './utils/utils'

let allViews = Object.keys(Views).map(k => Views[k])
const localizer = momentLocalizer(moment)

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchor: null,
      tmpEvent: {}
    }
    this.onSelectSlot = this.onSelectSlot.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  onSelectSlot(e) {
    this.setState({ anchor: e, tmpEvent: Object.assign(this.state.tmpEvent, { start: e.start, end: e.end })})
    console.log(this.state)
  }
  onCancel() {
    this.setState({ anchor: null, tmpEvent: {} })
  }
  onSave() {
    if(validateEvent(this.state.tmpEvent)) {
      this.props.newEvent(this.state.tmpEvent)
      this.setState({ anchor: null, tmpEvent: {} })
    } else {
      alert('sowwy')
    }
  }
  onChange(e) {
    let newState = this.state
    newState.tmpEvent[e.target.name] = e.target.value
    this.setState(newState)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          calendar
        </header>
        <body className="App-body">
          <BigCalendar
            localizer={localizer}
            events={[]}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            onSelectSlot={this.onSelectSlot}
            selectable
          />
          <Event
            event={this.state.tmpEvent}
            anchor={this.state.anchor}
            className='modal'
            onX={this.onCancel}
            onCancel={this.onCancel}
            onSave={this.onSave}
            onChange={this.onChange}
          />
      </body>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events
})

const mapDispatchToProps = dispatch => ({
  newEvent: e => {
    dispatch(addEvent(e))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
