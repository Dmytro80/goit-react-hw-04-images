import { ThreeDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <>
      <ThreeDots
        height="50"
        width="50"
        radius="5"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

export default Loader;
