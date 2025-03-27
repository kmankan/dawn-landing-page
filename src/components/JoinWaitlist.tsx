export default function JoinWaitlist() {
  return (
    <>
      <div className="relative flex items-center w-full">
        <span className="text-white text-2xl font-normal font-degular-text whitespace-nowrap mr-4">@TELEGRAM</span>
        <input
          type="text"
          className="flex-grow bg-transparent text-2xl text-white placeholder-white/50 py-2 focus:outline-none"
        />
        <button className="text-white text-2xl font-degular-text font-bold flex items-center whitespace-nowrap cursor-pointer">
          JOIN WAITLIST {'\u2794'}
        </button>
      </div>
      <div className="w-full h-[1px] bg-white"></div>
    </>
  );
}