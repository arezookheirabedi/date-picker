import React from 'react';
import loading from 'src/assets/images/icons/loading.svg';

interface IProps {}
const Loading: React.FC<IProps> = () => {
  const styles = {
    width: '20px',
    height: '20px',
    borderRadius: ' 50%',
    color: 'white',
    backgroundColor: 'white',
    marginLeft: '4px',
  };
  return <img src={loading} alt="Loading..." style={styles} />;
};
export default Loading;
