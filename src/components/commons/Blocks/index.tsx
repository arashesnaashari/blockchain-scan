import React from 'react';
import { IBlock } from '../../../types';
import { fitString } from '../../../utils';
import Box from '../../cubes/Box';

export interface BlocksProps {
  blocks: Array<IBlock>;
  selectedBlock?: null | IBlock;
  onChange: (id: IBlock) => void;
}

const Blocks: React.FunctionComponent<BlocksProps> = ({ selectedBlock, blocks, onChange }) => {
  return (
    <Box title="Latest Blocks">
      <ul className="list-group list-group-flush">
        {blocks.map(el => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={el.id}
          >
            <div className="d-flex me-auto">
              <input
                className="form-check-input me-1"
                type="checkbox"
                checked={selectedBlock?.id === el.id}
                onChange={() => onChange(el)}
                value=""
              />
              <div className="d-flex flex-column ms-2">
                <div className="fw-bold">
                  <span className="text-muted">Block No.</span> {el.id}
                </div>
                <span className="text-muted">Winner:</span>
                <span className="ms-1">
                  <em>{fitString(el.winner)}</em>
                </span>
              </div>
            </div>
            <span className="badge bg-primary rounded-pill">{el.transactions.length}</span>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Blocks;
