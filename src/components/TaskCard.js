import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#ffc107';
      case 'InProgress':
        return '#17a2b8';
      case 'Completed':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = (e) => {
    onStatusUpdate(task.taskID, { status: e.target.value });
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span
          className="task-status-badge"
          style={{ backgroundColor: getStatusColor(task.status) }}
        >
          {task.status}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <div className="task-deadline">
          <strong>Deadline:</strong> {formatDate(task.deadline)}
        </div>
        <div className="task-dates">
          <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
          {task.Updated !== task.createdAt && (
            <small>Updated: {new Date(task.Updated).toLocaleDateString()}</small>
          )}
        </div>
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
          style={{ borderColor: getStatusColor(task.status) }}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="action-buttons">
          <button
            onClick={() => onEdit(task)}
            className="btn-edit"
            title="Edit task"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(task.taskID)}
            className="btn-delete"
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

