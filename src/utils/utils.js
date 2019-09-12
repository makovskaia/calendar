import moment from 'moment'
const re = /[0-9]{4}-[0-9]{2}-[0-9]{2}\D*\s*[0-9]{2}:[0-9]{2}/ig

export const date = date => moment(date).format("YYYY-MM-DD, HH:MM")

export const validateEvent = e => !e.title || !e.title.length ? 'Event should have a title' :
  !e.start || !e.end ? 'Event should have date and duration' :
    e.notes && e.notes.length > 30 ? 'Description can not be longer than 30 characters' :
      !e.start.match(re).length || !e.end.match(re).length ? 'Dates should be in "YYYY-MM-DD, HH:MM" format'+e.start + '' + e.end :
        !e.notes ? 'Fill in notes' :
          new Date(e.end) - new Date(e.start) <= 0 ? 'End date should be later than start date' :
            new Date(e.start) - new Date() < 0 ? 'Start date can not be earlier than today' :
                true
export const randomColor = () => "#"+((1<<24)*Math.random()|0).toString(16)

export const getId = e => e.title + date(e.start) + date(e.end)
