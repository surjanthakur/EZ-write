export function Header({ username, avatarInitials }) {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex border-b border-black items-center justify-between px-8 py-5 bg-white">
      {/* Left side: Page Title and Date */}
      <div>
        <h1 className="text-gray-900 text-lg">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">{dateStr}</p>
      </div>
      {/* Right side: Action Icons and User Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 ml-1 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xs font-semibold">
              {avatarInitials}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm text-gray-800">{username}</p>
            <p className="text-xs text-gray-400">Author</p>
          </div>
        </div>
      </div>
    </header>
  );
}
