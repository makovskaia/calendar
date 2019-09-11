import React from 'react'

const Event = ({ onX, onCancel, onSave, anchor, event, onChange, onDelete, onChangeColor }) => anchor && anchor.box && event ? (
  <div className="overlay" disabled>
    <div className="modal" style={{ top: anchor.box.clientY, left: anchor.box.clientX }}>
      <button className="modal-x" onClick={onCancel}>
        &times;
      </button>
      <div className="modal-body">
        <label>Title<input type="text" name="title" value={event.title} onChange={onChange} autoFocus /></label>
        <label>Start<input type="text" name="start" value={event.start} onChange={onChange} /></label>
        <label>End<input type="text" name="end" value={event.end} onChange={onChange} /></label>
        <label>Notes<input type="text" name="notes" value={event.notes} onChange={onChange} /></label>
        <button
          style={{ backgroundColor: event.color || '#3174ad' }}
          onClick={onChangeColor}
          className="modal-color-picker"
        />
      </div>
      <div className="modal-footer">
        <button className="modal-cancel" onClick={onDelete}>
          Delete
        </button>
        <button className="modal-save" onClick={onSave}>
          Save        
        </button>
      </div>
    </div>
  </div>
) : (
  <div />
)

export default Event