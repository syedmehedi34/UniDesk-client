const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );
};

export default Loader;
