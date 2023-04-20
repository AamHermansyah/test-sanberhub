function CardProfileSkeleton({ notProfile}) {
  return (
    <div className="relative bg-[#2A303C] w-full max-w-[400px] flex flex-col items-center rounded-xl border border-emerald-400 py-6 px-4 sm:px-6 shadow-md">
      {!notProfile && (
        <span className="w-[75px] h-[30px] absolute top-5 left-5 p-1 rounded-md bg-slate-500 animate-pulse" />
      )}
      <div className="w-[100px] aspect-square rounded-full border border-slate-500 p-1 animate-pulse">
        <div className="h-full bg-slate-400 rounded-full" />
      </div>
      <span className="w-[75%] h-[35px] rounded-md bg-slate-500 my-3 animate-pulse" />
      <span className="w-[60%] h-[27px] rounded-md bg-slate-500 animate-pulse" />
      <span className="w-[40%] h-[20px] rounded-md bg-slate-500 mt-4 animate-pulse" />
    </div>
  )
}

export default CardProfileSkeleton