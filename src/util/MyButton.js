import React from 'react';
import ToolTip from '@material-ui/core/ToolTip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
  <ToolTip title={tip} className={tipClassName}>
    <IconButton onClick={onClick} className={btnClassName}>
      {children}
    </IconButton>
  </ToolTip>
)
