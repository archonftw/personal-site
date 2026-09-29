import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { ARTICLES } from "./Articles";

type Side = "cars" | "pcs" | "guitar";

const LABELS: Record<Side, string> = { cars: "Cars", pcs: "Computers", guitar: "Guitar" };

const PAIRS: Record<Side, [string, string, string][]> = {
  cars: [
    ["Turbocharger", "Reuses exhaust gas to spin a compressor, so the engine breathes more air for free.", "Cache: reuses work you'd otherwise throw away."],
    ["Supercharger", "Driven by the engine itself, so boost is instant but costs power.", "Polling: always ready, always paying."],
    ["Gearbox", "Trades speed for torque so the engine stays in its useful range.", "Scheduler: fits the work to the resource."],
  ],
  pcs: [
    ["TCP handshake", "Both sides agree on sequence numbers before any data flows.", "Like checking two people can hear each other before a call."],
    ["Process vs thread", "Separate memory and safety versus shared memory and speed.", "Two garages versus two mechanics in one garage."],
    ["Hash chain", "Each block stores the hash of the one before it.", "Change one link and every link after it breaks."],
  ],
  guitar: [
    ["Frets", "Each fret shortens the string by a fixed ratio; at the 12th, half is left and the pitch doubles.", "Exponential scale: an octave is a doubling."],
    ["Pickup", "A vibrating steel string induces a tiny voltage in the coil, at the same frequency as the note.", "Sensor: vibration becomes a signal, pitch intact."],
    ["Distortion", "Push past the amp's limit and the peaks flatten, adding the harmonics you hear as crunch.", "Saturating arithmetic: clamp at the limit, don't wrap."],
  ],
};

const NOW = [
  "Building the VES Collector NOC console (Flask, NETCONF/YANG)",
  "Learning system design by asking what breaks first when traffic 10x's",
  "Reading about how TCP behaves under packet loss",
];

const PROJECTS = [
  { title: "VES Collector NOC Console", desc: "Web console that receives and shows telecom events in real time. Flask backend, live dashboard, NETCONF/YANG integration.", github: "https://github.com/archonftw/VES-Collector.git" },
  { title: "Linux Utilities", desc: "A collection of practical Linux utilities and system-level tools built in C++ for process management, monitoring, and automation.", github: "https://github.com/archonftw/Linux_Utilities.git" },
  { title: "Halfwritten", desc: "A corner for people to share their incomplete stories", github: "https://shashanktiwari.xyz" },
];

export default function App() {
  const [side, setSide] = useState<Side>("cars");

  return (
    <div className="page">
      <div className="board">
        <section className="intro">
          <h1>Shashank<br />Tiwari</h1>
          <p className="lede">
            IT undergrad who wants to know what happens under the hood: in packets, processes and pistons.
            Currently studying massively scaled systems.
          </p>
          <div className="links">
            <a href="https://github.com/archonftw">GitHub</a>
            <a href="https://www.linkedin.com/in/shashank-tiwari-91658a319/">LinkedIn</a>
            <a href="mailto:tiwarishashank950@google.com">Email</a>
          </div>
        </section>

        <section className="hood">
          <div className="sec-head">
            <h2>Under the hood</h2>
            <div className="tabs" role="tablist">
              {(["cars", "pcs", "guitar"] as Side[]).map((s) => (
                <button key={s} role="tab" aria-selected={side === s} onClick={() => setSide(s)}>
                  {LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div className="stack">
            {(Object.keys(PAIRS) as Side[]).map((k) => (
              <div className={"panel" + (k === side ? " on" : "")} key={k}>
                {PAIRS[k].map(([name, what, analogy]) => (
                  <div className="pair" key={name}>
                    <b>{name}</b> {what}
                    <span>{analogy}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="now">
          <div className="sec-head"><h2>Now</h2></div>
          <ul className="list">
            {NOW.map((n) => (
              <li key={n}><span>{n}</span></li>
            ))}
          </ul>
        </section>

        <section className="projects">
          <div className="sec-head"><h2>Projects</h2></div>
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <div className="proj" key={p.title}>
                <h3>
                  {p.title}
                  {/* {p.tag && <span className="tag">{p.tag}</span>} */}
                </h3>
                <p>{p.desc}</p>
                {p.github && (
                  <a className="repo" href={p.github} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="articles" id="articles">
          <div className="sec-head"><h2>Articles</h2></div>
          <ul className="list">
            {ARTICLES.map((a) =>
              a.draft ? (
                <li key={a.slug}>
                  <span className="row muted">{a.title}</span>
                  <small>draft</small>
                </li>
              ) : (
                <li key={a.slug}>
                  <Link className="row" to={`/articles/${a.slug}`}>
                    <span>{a.title}</span>
                    <small>{a.date}</small>
                  </Link>
                </li>
              )
            )}
          </ul>
        </section>
      </div>

    </div>
  );
}