const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative flex gap-2">
        <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;
