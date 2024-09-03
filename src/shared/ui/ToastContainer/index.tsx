import * as styles from './styles.css';
import { ReactNode } from 'react';

export default function ToastContainer({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
