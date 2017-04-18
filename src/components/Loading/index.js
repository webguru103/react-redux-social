import React from 'react';

import styles from './styles.scss';

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <h1>Loading...</h1>
    </div>
  );
}
