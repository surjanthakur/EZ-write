import { Bold, Italic, List, ListOrdered, Heading2 } from "lucide-react";

export default function Toolbar({ editor }) {
  if (!editor) return null;

  return (
    <div
      className="
      flex items-center gap-4 px-4 py-3
      border-b border-zinc-800
      w-fit mx-auto mb-4
    "
    >
      {/* Bold */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`
          p-2 rounded-lg transition-all duration-300
          hover:bg-gray-300 active:text-black
          ${editor.isActive("bold") ? " text-black" : "text-black"}
        `}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} strokeWidth={2.4} />
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`
          p-2 rounded-lg transition-all duration-300
          hover:bg-gray-300 active:text-black
          ${editor.isActive("italic") ? "text-black" : "text-black"}
        `}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} strokeWidth={2.4} />
      </button>

      {/* Heading 2 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`
          p-2 rounded-lg transition-all duration-300
          hover:bg-gray-300 active:text-black
          ${editor.isActive("heading", { level: 2 }) ? "text-black" : "text-black"}
        `}
        title="Heading 2"
      >
        <Heading2 size={18} strokeWidth={2.4} />
      </button>

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`
          p-2 rounded-lg transition-all duration-300
          hover:bg-gray-300 active:text-black
          ${editor.isActive("bulletList") ? "text-black" : "text-black"}
        `}
        title="Bullet List"
      >
        <List size={18} strokeWidth={2.4} />
      </button>

      {/* Ordered List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`
          p-2 rounded-lg transition-all duration-300
          hover:bg-gray-300 active:text-black
          ${editor.isActive("orderedList") ? "text-black" : "text-black"}
        `}
        title="Numbered List"
      >
        <ListOrdered size={18} strokeWidth={2.4} />
      </button>
    </div>
  );
}
