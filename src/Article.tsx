import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";      // shared colors, fonts and dark mode
import "./Article.css";
import { ARTICLES } from "./Articles";
import NotFound from "./Notfound";

// Accepts a full YouTube link or just the video id
function youtubeId(input: string): string | null {
  const m = input.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/) || input.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

/*
  The article page layout. You don't need to edit this file.
  Write your articles in articles.tsx.
*/
export default function Article() {
  const { slug } = useParams();
  const article = ARTICLES.find((a) => a.slug === slug && a.text);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <NotFound />;

  return (
    <div className="art-page">
      <header className="art-top">
        <Link className="art-back" to="/">← Back to home</Link>
        <span className="art-name">Shashank Tiwari</span>
      </header>

      <div className="art-layout">
        <aside className="art-rail">
          <dl>
            <dt>Published</dt>
            <dd>{article.date}</dd>
            <dt>Reading time</dt>
            <dd>{article.readTime}</dd>
          </dl>
        </aside>

        <article className="art">
          <h1>{article.title}</h1>
          <p className="art-summary">{article.summary}</p>
          <div className="art-body">
            {article.text!.split(/\n\s*\n/).map((raw, i) => {
              const block = raw.trim();
              const img = block.match(/^!\[(.*)\]\((.+)\)$/); // ![caption](/images/file.png)
              if (img) {
                return (
                  <figure key={i}>
                    <img src={img[2]} alt={img[1]} loading="lazy" />
                    {img[1] && <figcaption>{img[1]}</figcaption>}
                  </figure>
                );
              }
              const vid = block.match(/^video:\s*(\S+)(?:\s*\|\s*(.*))?$/); // video: /videos/demo.mp4 | caption
              if (vid) {
                return (
                  <figure key={i}>
                    <video src={vid[1]} controls playsInline preload="metadata" />
                    {vid[2] && <figcaption>{vid[2]}</figcaption>}
                  </figure>
                );
              }
              const yt = block.match(/^youtube:\s*(\S+)(?:\s*\|\s*(.*))?$/); // youtube: <link or id> | caption
              if (yt && youtubeId(yt[1])) {
                return (
                  <figure key={i}>
                    <div className="video-frame">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${youtubeId(yt[1])}`}
                        title={yt[2] || "YouTube video"}
                        loading="lazy"
                        allow="accelerometer; encrypted-media; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    {yt[2] && <figcaption>{yt[2]}</figcaption>}
                  </figure>
                );
              }
              if (block.startsWith("## ") || block.startsWith("### ")) {
                const small = block.startsWith("### ");
                const [first, ...rest] = block.split("\n");
                const heading = first.slice(small ? 4 : 3).trim();
                const after = rest.join(" ").trim();
                return (
                  <Fragment key={i}>
                    {small ? <h3>{heading}</h3> : <h2>{heading}</h2>}
                    {after && <p>{after}</p>}
                  </Fragment>
                );
              }
              return <p key={i}>{block}</p>;
            })}
          </div>
        </article>
      </div>

      <footer className="art-foot">
        <Link to="/">← All articles</Link>
      </footer>
    </div>
  );
}