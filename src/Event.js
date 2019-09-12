import React from 'react'

const Event = ({ onX, onCancel, onSave, anchor, event, onChange, onDelete, onChangeColor }) => anchor && event ? (
  <div className="overlay" disabled>
    <div className="modal" style={{ top: anchor.y, left: anchor.x }}>
      <button className="modal-x" onClick={onCancel}>
        &times;
      </button>
      <label>Title<input type="text" name="title" value={event.title} onChange={onChange} autoFocus  /></label>
      <label>Start<input type="text" name="start" value={event.start} onChange={onChange} /></label>
      <label>End<input type="text" name="end" value={event.end} onChange={onChange} /></label>
      <label>Notes<textarea name="notes" value={event.notes} onChange={onChange} rows="2" className="modal-input-notes" /></label>
      <button
        style={{ backgroundColor: event.color || '#3174ad' }}
        onClick={onChangeColor}
        className="modal-color-picker"
      />
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