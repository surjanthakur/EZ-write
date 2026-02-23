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
          p-2 rounded-lg transition-all duration-150
          hover:bg-black active:bg-black
          ${editor.isActive("bold") ? "bg-black text-white" : "text-black hover:text-neutral-200"}
        `}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} strokeWidth={2.4} /> Bold
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`
          p-2 rounded-lg transition-all duration-150
          hover:bg-black active:bg-black
          ${editor.isActive("italic") ? "bg-black text-white" : "text-black hover:text-neutral-200"}
        `}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} strokeWidth={2.4} /> Italic
      </button>

      {/* Heading 2 */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`
          p-2 rounded-lg transition-all duration-150
          hover:bg-black active:bg-black
          ${editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : "text-black hover:text-neutral-200"}
        `}
        title="Heading 2"
      >
        <Heading2 size={18} strokeWidth={2.4} /> H2
      </button>

      {/* Bullet List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`
          p-2 rounded-lg transition-all duration-150
          hover:bg-black active:bg-black
          ${editor.isActive("bulletList") ? "bg-black text-white" : "text-black hover:text-neutral-200"}
        `}
        title="Bullet List"
      >
        <List size={18} strokeWidth={2.4} /> Bullet List
      </button>

      {/* Ordered List */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`
          p-2 rounded-lg transition-all duration-150
          hover:bg-black active:bg-black
          ${editor.isActive("orderedList") ? "bg-black text-white" : "text-black hover:text-neutral-200"}
        `}
        title="Numbered List"
      >
        <ListOrdered size={18} strokeWidth={2.4} /> Order List
      </button>
    </div>
  );
}
