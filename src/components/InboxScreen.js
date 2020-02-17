import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskList from './TaskList';

import Task from './Task';

export function PureInboxScreen({ error, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask,
  };

  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === 'TASK_PINNED'),
    ...tasks.filter(t => t.state !== 'TASK_PINNED'),
  ];

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      {/* <TaskList /> */}
      {tasksInOrder.map(task => <Task key={task.id} task={task} {...events} />)}
    </div>
  );
}

PureInboxScreen.propTypes = {
  error: PropTypes.string,
};

PureInboxScreen.defaultProps = {
  error: null,
};

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(t => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'),
  }),
  ({ error }) => ({ error }))(PureInboxScreen);