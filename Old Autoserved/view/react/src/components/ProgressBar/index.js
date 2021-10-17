import React from "react";
import { Progress } from "shards-react";

export default function ProgressBar(props) {
  const { currentIndex, doneIndex, max, className } = props;
  return (
    <div className={`${className} progress-wrapper progress-tracker`}>
      <div className="progress-tracker__header">
        <h1 className="title">Completion Progress</h1>
        <span className="label">{props.progressLabel}</span>
      </div>

      <div className="progress-tracker__bars">
        <Progress
          className="progress-sm progress-tracker__bars__current"
          value={currentIndex}
          max={max}
        />
        {doneIndex !== null && (
          <Progress
            className="progress-sm progress-tracker__bars__done"
            value={doneIndex}
            max={max}
          />
        )}
      </div>
    </div>
  );
}
