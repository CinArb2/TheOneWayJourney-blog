const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function PostCardSkeleton() {
  return (
    <div className="my-2 p-4">
      <div
        className={`${shimmer} h-80 relative overflow-hidden rounded-xl bg-gray-300 p-5 shadow-sm`}
      ></div>
      <div className="flex items-center justify-center truncate bg-gray-200 px-2 py-3 mt-5 mb-2 mx-8"></div>
      <div className="flex items-center justify-center truncate w-2/4 bg-gray-200 px-2 py-3 mt-5 mb-2 m-auto"></div>
    </div>
  )
}
