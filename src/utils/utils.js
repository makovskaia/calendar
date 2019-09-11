import moment from 'moment'

export const validateEvent = e => !e.title || !e.title.length ? 'Event should have a title' :
  !e.start || !e.end ? 'Event should have date and duration' :
    e.notes && e.notes.length > 30 ? 'Description can not be longer than 30 characters' :
      true
export const randomColor = () => "#"+((1<<24)*Math.random()|0).toString(16)

export const date = date => typeof(date) === 'string' ? date :
  moment(date).format().substring(0,16)

export const getId = e => e.title + date(e.start) + date(e.end)
