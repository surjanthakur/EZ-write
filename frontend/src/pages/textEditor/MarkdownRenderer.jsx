import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "../css/markdown.css";

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      className="markdown-body"
      remarkPlugins={[remarkGfm]}
      components={{
        // Code blocks with syntax highlighting
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              className="code-block"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className="inline-code" {...props}>
              {children}
            </code>
          );
        },
        // Headings
        h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
        // Paragraph
        p: ({ children }) => <p className="md-p">{children}</p>,
        // Lists
        ul: ({ children }) => <ul className="md-ul">{children}</ul>,
        ol: ({ children }) => <ol className="md-ol">{children}</ol>,
        li: ({ children }) => <li className="md-li">{children}</li>,
        // Blockquote
        blockquote: ({ children }) => (
          <blockquote className="md-blockquote">{children}</blockquote>
        ),
        // Bold / Italic
        strong: ({ children }) => (
          <strong className="md-strong">{children}</strong>
        ),
        em: ({ children }) => <em className="md-em">{children}</em>,
        // Horizontal rule
        hr: () => <hr className="md-hr" />,
        // Table
        table: ({ children }) => (
          <div className="md-table-wrapper">
            <table className="md-table">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="md-th">{children}</th>,
        td: ({ children }) => <td className="md-td">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
