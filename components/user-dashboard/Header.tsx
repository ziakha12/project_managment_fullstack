export default function Header() {
    return (
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 py-4 backdrop-blur-md md:px-8">
        {/* Search */}
        <label className="flex max-w-[460px] flex-1 items-center gap-2.5 rounded-[14px] border border-line bg-white px-3.5 py-2.5 text-muted focus-within:border-[#8b3dff]">
          <i className="ri-search-line text-base" />
          <input
            type="search"
            placeholder="Search tasks, docs, people"
            aria-label="Search"
            className="min-w-0 flex-1 bg-transparent text-dark outline-none placeholder:text-muted"
          />
          <kbd className="hidden rounded-md bg-canvas px-1.5 py-0.5 text-[11px] font-medium sm:block">
            Ctrl K
          </kbd>
        </label>
  
        <div className="flex-1" />
  
        {/* Ask AI */}
        <button className="hidden items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-dark transition hover:border-[#8b3dff] lg:flex">
          <i className="ri-sparkling-2-fill gradient-text" />
          Ask Orbit
        </button>
  
        {/* Create */}
        
  
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-lg text-muted transition hover:text-primary"
        >
          <i className="ri-notification-3-line" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-orange ring-2 ring-white" />
        </button>
  
        {/* Avatar */}
        <div
          aria-label="Profile"
          className="gradient-warm flex h-10 w-10 items-center justify-center rounded-full font-nunito text-sm font-bold text-white"
        >
          SK
        </div>
      </header>
    );
  }