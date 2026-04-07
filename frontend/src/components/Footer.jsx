import "./footer.css";
import { Mail, Twitter, Instagram } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Footer() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("tsurjan506@gmail.com");
      toast.success("email copied!");
    } catch (err) {
      toast.error("Failed to copy oops!");
    }
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <h3 className="footer-title">Write Different with AI ✅</h3>
          <div className="footer-icons">
            <a href="https://x.com/tsurjan16">
              <Instagram size={18} />
            </a>
            <a href="https://x.com/tsurjan16">
              <Twitter size={18} />
            </a>
            <a onClick={handleCopyEmail}>
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Explore</h4>
            <p>Write</p>
            <p>Templates</p>
            <p>AI Tools</p>
          </div>

          <div>
            <h4>Dashboard</h4>
            <p>blogs/articles</p>
            <p>editor</p>
            <p>Contact</p>
          </div>
        </div>
      </div>

      {/* Big Background Text */}
      <div className="footer-bg-text">EZ-write</div>
    </footer>
  );
}
