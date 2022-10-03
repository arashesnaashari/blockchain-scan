import React from 'react';
import { CommonProps } from '../../../types';
import './styles.scss';

export interface BoxProps extends CommonProps {
  title: string;
}

const Box: React.FunctionComponent<BoxProps> = ({ title, children }) => {
  return (
    <div className="card box">
      <div className="card-header">
        <h5 className="card-title my-2">{title}</h5>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default Box;
