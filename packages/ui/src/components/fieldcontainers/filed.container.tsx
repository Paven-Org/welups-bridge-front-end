import * as React from 'react';
import clsx from 'clsx';
import { Box } from '@mui/material';
import styles from './field.container.module.css';

export interface FieldContainerProps {
  forceShrink?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FieldContainer = ({ className, children }: FieldContainerProps) => {
  return <Box className={clsx(styles.root, className)}>{children}</Box>;
};

export default FieldContainer;
