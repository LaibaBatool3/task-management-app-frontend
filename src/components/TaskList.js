import React from 'react';
import TaskCard from './TaskCard';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete, onStatusUpdate }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="task-list">
        {tasks.map(task => (
          <TaskCard
            key={task.taskID}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusUpdate={onStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

