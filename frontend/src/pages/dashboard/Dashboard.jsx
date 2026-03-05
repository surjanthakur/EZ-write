import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { PostCard } from "./PostCards";
import { PenLine, Search, Menu, X } from "lucide-react";

// No TS types/annotations, just normal JS
const ALL_POSTS = [
  {
    id: 1,
    title: "Next in Fashion: Trends to Watch",
    type: "Blog",
    createdAt: "March 1, 2026",
    description:
      "Explore the latest runway trends dominating the fashion world this season. From oversized silhouettes to bold color palettes, discover what's shaping style in 2026.",
    thumbnail:
      "https://images.unsplash.com/photo-1575111507952-2d4f371374f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZWRpdG9yaWFsJTIwYmxvZyUyMHBvc3R8ZW58MXx8fHwxNzcyNzIxNDM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "Digital Marketing Today: What Works",
    type: "Article",
    createdAt: "February 24, 2026",
    description:
      "A deep dive into modern digital marketing strategies that actually convert. Learn how top brands are leveraging AI, short-form video, and community building.",
    thumbnail:
      "https://images.unsplash.com/photo-1770876577940-297a5b6f31b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwc3RyYXRlZ3klMjBvZmZpY2V8ZW58MXx8fHwxNzcyNzE4MzU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Startup Stories: Building in Public",
    type: "Article",
    createdAt: "February 18, 2026",
    description:
      "How founders are sharing their journey openly — failures, pivots and all — and why transparency is becoming a competitive advantage in the startup ecosystem.",
    thumbnail:
      "https://images.unsplash.com/photo-1573496267401-787d33fd0532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc3RhcnR1cCUyMGFydGljbGUlMjBibG9nfGVufDF8fHx8MTc3MjcyMTQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "Travel on a Budget: Hidden Gems",
    type: "Blog",
    createdAt: "February 10, 2026",
    description:
      "Discover underrated destinations that offer incredible experiences without breaking the bank. From scenic coastal towns to mountain villages, adventure awaits.",
    thumbnail:
      "https://images.unsplash.com/photo-1620749423939-59b4a8348d0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsaWZlc3R5bGUlMjBjb250ZW50JTIwY3JlYXRvcnxlbnwxfHx8fDE3NzI3MjE0NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Mastering the Art of Slow Cooking",
    type: "Blog",
    createdAt: "January 30, 2026",
    description:
      "From hearty stews to tender braised meats, slow cooking transforms simple ingredients into extraordinary meals. Here are five recipes to get you started.",
    thumbnail:
      "https://images.unsplash.com/photo-1692288843207-786c8cb62e7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcmVjaXBlJTIwY29va2luZyUyMGFydGljbGV8ZW58MXx8fHwxNzcyNzIxNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const FILTERS = ["All", "Blog", "Article"];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState(ALL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = activeFilter === "All" || post.type === activeFilter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit post #${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-30 transition-transform duration-300 lg:static lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          activeItem={activeNav}
          onNavChange={(id) => {
            setActiveNav(id);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
          <span className="text-sm text-gray-700 font-medium">Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">AJ</span>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block">
          <Header username="Alyssa Jones" avatarInitials="AJ" />
        </div>

        {/* Page content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-5xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="rounded-2xl bg-linear-to-r from-violet-100 via-purple-50 to-indigo-50 border border-violet-100 px-8 py-6 flex items-center justify-between overflow-hidden relative">
            <div>
              <h2 className="text-gray-900 text-2xl">Hi, Alyssa 👋</h2>
              <p className="text-gray-500 text-sm mt-1">
                Ready to write something great today?
              </p>
              <button
                onClick={() => setActiveNav("write")}
                className="mt-4 inline-flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition-colors"
              >
                <PenLine size={14} />
                New Post
              </button>
            </div>
            <div className="hidden sm:block shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-white/60 border border-violet-100 flex items-center justify-center">
                <PenLine size={40} className="text-violet-300" />
              </div>
            </div>
          </div>

          {/* Overview, Filters, and Search Bar */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-gray-700">Overview</h3>
                <p className="text-xs text-gray-400">
                  {filteredPosts.length} post
                  {filteredPosts.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-xl text-sm transition-all duration-150 ${
                    activeFilter === filter
                      ? "bg-black text-white shadow-sm"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-800"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Post Cards */}
          <div className="space-y-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">No posts found</p>
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                  className="mt-3 text-xs text-indigo-500 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
