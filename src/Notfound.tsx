import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";      // shared colors, fonts and dark mode
import "./NotFound.css";

/*
  Shown for any address that doesn't exist, and for article links
  that have no published article behind them.
*/
export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="nf-page">
      <header className="nf-top">
        <Link className="nf-name" to="/">Shashank Tiwari</Link>
      </header>

      <main className="nf-main">
        <p className="nf-code" aria-hidden="true">404</p>
        <h1>Nothing here</h1>
        <p className="nf-text">
          There is no page at <code>{pathname}</code>. Like a packet sent to an address that doesn't
          exist, this request went nowhere. The link may be mistyped, or the page may have moved.
        </p>
        <div className="nf-actions">
          <Link className="nf-btn primary" to="/">Go to home</Link>
          <button className="nf-btn" onClick={() => navigate(-1)}>Go back</button>
        </div>
      </main>

      <footer className="nf-foot">
        <span>Found a broken link? Send a <a href="#">PR</a>.</span>
      </footer>
    </div>
  );
}