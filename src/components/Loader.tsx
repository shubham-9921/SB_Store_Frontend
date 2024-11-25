const Loader = () => {
  return <div className="loader"></div>;
};

interface SkeletonProps {
  width?: string;
  length: number;
}

export const SkeletonLoader = ({ width = "unset", length }: SkeletonProps) => {
  const skelton = Array.from({ length }, (v, idx) => (
    <div key={idx} className="skeletonShape"></div>
  ));
  return (
    <div className="skeletonLoader" style={{ width }}>
      {skelton}
    </div>
  );
};

export default Loader;
