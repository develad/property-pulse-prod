'use client';

import BounceLoader from 'react-spinners/BounceLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const LoadingPage = ({ loading }) => {
  return (
    <BounceLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default LoadingPage;
