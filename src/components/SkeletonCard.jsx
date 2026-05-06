const SkeletonCard = () => (
  <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/60 shadow-2xl rounded-2xl p-6 md:p-8 animate-pulse">
    <div className="bg-gray-800/80 rounded-lg w-10 h-10 mb-6" />
    <div className="space-y-3 mb-6">
      <div className="bg-gray-800/80 rounded-lg h-5 w-full" />
      <div className="bg-gray-800/80 rounded-lg h-5 w-11/12" />
      <div className="bg-gray-800/80 rounded-lg h-5 w-3/4" />
    </div>
    <div className="flex items-center gap-3 mb-5">
      <div className="bg-gray-800/80 rounded-full w-8 h-8" />
      <div className="bg-gray-800/80 rounded-lg h-4 w-28" />
    </div>
    <div className="flex gap-2 mb-5">
      <div className="bg-gray-800/80 rounded-full h-6 w-16" />
      <div className="bg-gray-800/80 rounded-full h-6 w-20" />
    </div>
    <div className="pt-4 border-t border-gray-800/60 flex gap-3">
      <div className="bg-gray-800/80 rounded-lg h-8 w-16" />
      <div className="bg-gray-800/80 rounded-lg h-8 w-16" />
      <div className="bg-gray-800/80 rounded-lg h-8 w-16 ml-auto" />
    </div>
  </div>
);

const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export { SkeletonCard, SkeletonGrid };
export default SkeletonGrid;
