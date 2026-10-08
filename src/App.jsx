import { useEffect, useRef, useState } from "react";
import Papa from "papaparse";

import {
  profile,
  sections,
  statement,
  milestones,
  training,
  units,
  schedule,
  tools,
  reflections,
  documents,
  feedback,
  onlineRegisters,
} from "./data.js";

const categories = [
  "All",
  ...new Set(documents.map((item) => item.category)),
];

const portraitAsset = {
  title: profile.name,
  kind: "image",
  file: profile.portrait,
  alt: `Professional portrait of ${profile.name}`,
  downloadName: profile.portraitDownloadName,
};

const whatsappAsset = {
  title: "DS1 WhatsApp Study Groups",
  kind: "image",
  file: feedback.whatsappImage,
  alt: feedback.whatsappAlt,
  downloadName: feedback.whatsappDownloadName,
};

function initialSection() {
  const id = window.location.hash.slice(1);

  return sections.some((item) => item.id === id)
    ? id
    : "personal";
}

function Picture({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src) return null;

  if (failed) {
    return (
      <p className="error-message" role="status">
        This image could not be loaded.
      </p>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function Heading({ number, title, children }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">Section {number}</p>

      <h2 id="section-heading" tabIndex={-1}>
        {title}
      </h2>

      {children && <p>{children}</p>}
    </header>
  );
}

function Panel({ title, label, children, className = "" }) {
  return (
    <article className={`panel ${className}`}>
      {label && <span className="tag">{label}</span>}
      {title && <h3>{title}</h3>}
      {children}
    </article>
  );
}

// Shared preview/download controls for images, PDFs, and CSV files.
function AssetActions({
  item,
  openPreview,
  className = "preview-actions",
}) {
  if (!item.file) return null;

  return (
    <div className={className}>
      <button
        type="button"
        className="button secondary"
        onClick={() => openPreview(item)}
        aria-label={`Preview ${item.title}`}
      >
        Preview
      </button>

      <a
        className="button primary"
        href={item.file}
        download={item.downloadName}
        aria-label={`Download ${item.title}`}
      >
        Download
      </a>
    </div>
  );
}

function Personal({ navigate }) {
  return (
    <>
      <Heading number="01" title="Quiet character. Practical purpose.">
        My development from a technically confident student into a growing
        tutor.
      </Heading>

      <div className="personal-layout">
        <Panel
          title={`Hello, I’m ${profile.firstName}.`}
          label="Personal statement"
        >
          {statement.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <button
            className="button primary"
            onClick={() => navigate("reflections")}
          >
            Read my reflections
          </button>
        </Panel>

        <aside className="profile-aside">
          <Panel title="Academic foundation" label="Student profile">
            <dl className="facts-list">
              <div>
                <dt>Programme</dt>
                <dd>{profile.qualification}</dd>
              </div>

              <div>
                <dt>Stream</dt>
                <dd>{profile.stream}</dd>
              </div>

              <div>
                <dt>Study year in 2026</dt>
                <dd>{profile.studyYear}</dd>
              </div>

              <div>
                <dt>Distinctions</dt>
                <dd>7 of 8 modules · 75% and above</dd>
              </div>
            </dl>
          </Panel>

          <div className="approach-card">
            <h3>My approach</h3>
            <p>
              Prepare thoughtfully, practise consistently, listen to students,
              and continue improving.
            </p>
          </div>
        </aside>
      </div>

      <h3 className="subheading">Journey checkpoints</h3>

      <div className="milestones">
        {milestones.map((item) => (
          <article key={item.title}>
            <span className="tag">{item.label}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function Module() {
  const facts = [
    ["Institution", profile.university],
    ["Qualification", profile.qualification],
    ["Programme", profile.stream],
    ["Course started", profile.courseStart],
    ["Study year", profile.studyYear],
    ["Module", profile.module],
    ["Tutoring year", profile.tutoringYear],
    ["Lecturer", profile.lecturer],
    ["Tutor partner", profile.partner],
    ["Practical programming language", "C#"],
  ];

  return (
    <>
      <Heading number="02" title="Development Software 1">
        Practical tutoring aligned with the 2026 Student Module Guide.
      </Heading>

      <Panel title="Module and programme details">
        <dl className="facts-grid">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <div className="grid-two space">
        <Panel title="Tutorial purpose">
          <p>
            Mrs. Twetwa-Dube taught both theory and practical content. At her
            request, our tutorials were entirely practical and supported
            students working through activities.
          </p>
        </Panel>

        <Panel title="Preparation and accountability">
          <p>
            Most resources came from the lecturer. We also created notes and
            exercises and submitted tutorial session plans with physical
            registers under the FEBEIT tutor programme policy.
          </p>
        </Panel>
      </div>
    </>
  );
}

function Training() {
  return (
    <>
      <Heading number="03" title="Training for student success">
        Practical methods, continued mentoring, and the development of my
        teaching confidence.
      </Heading>

      <div className="banner">
        <span className="eyebrow">Our programme theme</span>
        <h3>Student Success</h3>

        <p>
          The FEBEIT Tutor Training and Preparation Programme was facilitated
          by Mrs. Yawa and other student assistance representatives. Training
          took place at the start of both semesters, with mentoring continuing
          throughout the year.
        </p>
      </div>

      <div className="grid-two space">
        {training.map((item) => (
          <Panel key={item.title} title={item.title} label={item.tag}>
            <p>{item.text}</p>

            <div className="panel-detail">
              <h4>Application</h4>
              <p>{item.application}</p>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}

function Delivery() {
  return (
    <>
      <Heading number="04" title="Practical sessions, structured preparation">
        The delivery order follows the module guide exactly.
      </Heading>

      <div className="grid-two">
        <Panel title="How tutorials worked" label="Practical delivery">
          <p>
            Students were most often separated into groups for activities,
            using a technique learned during training.
          </p>

          <p>
            Whiteboards, markers, dusters, and projectors supported campus
            sessions. Some resources were provided by programme facilitators.
          </p>
        </Panel>

        <Panel title="Resources and responsiveness" label="Session support">
          <p>
            We combined lecturer-provided material with tutor-created notes and
            exercise documents. Student feedback was received and attended to
            during and immediately after sessions.
          </p>
        </Panel>
      </div>

      <h3 className="subheading">Session schedule</h3>

      <div className="schedule">
        {schedule.map(([day, time, description]) => (
          <article key={day}>
            <h4>{day}</h4>
            <p className="time">{time}</p>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <p className="small space">Times are South African Standard Time.</p>

      <h3 className="subheading">Module-guide sequence</h3>

      <ol className="unit-list">
        {units.map(([unit, title, detail], index) => (
          <li key={unit}>
            <span className="step-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <span className="tag">{unit}</span>
              <h4>{title}</h4>
              {detail && <p>{detail}</p>}
            </div>
          </li>
        ))}
      </ol>

      <div className="banner space">
        <span className="eyebrow">Online tutorial support</span>
        <h3>Strike-period revision</h3>

        <p>
          I conducted online sessions on Compound IF Statements, Flowcharts,
          and Trace Tables to prepare students for Test 3 Assessment 1 when
          physical attendance was disrupted.
        </p>
      </div>
    </>
  );
}

function Technology() {
  return (
    <>
      <Heading number="05" title="Technology supporting practical learning">
        The tools I used to prepare resources, demonstrate coding, and stay
        connected with students.
      </Heading>

      <div className="tools-grid">
        {tools.map((tool) => (
          <Panel key={tool.name} title={tool.name} label={tool.purpose}>
            <p>{tool.text}</p>
          </Panel>
        ))}
      </div>
    </>
  );
}

function Reflections() {
  return (
    <>
      <Heading number="06" title="Reflections and lessons learnt">
        Connecting training, technology, practical delivery, and personal
        development.
      </Heading>

      <div className="reflection-list">
        {reflections.map((item) => (
          <Panel key={item.title} title={item.title}>
            <dl className="reflection-grid">
              <div>
                <dt>Challenge</dt>
                <dd>{item.challenge}</dd>
              </div>

              <div>
                <dt>Action</dt>
                <dd>{item.action}</dd>
              </div>

              <div>
                <dt>Lesson</dt>
                <dd>{item.lesson}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </>
  );
}

function FileCard({ item, openPreview }) {
  return (
    <article className="file-card">
      <div className="file-icon" aria-hidden="true">
        {item.kind.toUpperCase()}
      </div>

      <div className="file-description">
        <span className="tag">{item.category}</span>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </div>

      <AssetActions
        item={item}
        openPreview={openPreview}
        className="file-actions"
      />
    </article>
  );
}

function Evidence({ openPreview }) {
  const [filter, setFilter] = useState("All");

  const visible = documents.filter(
    (item) => filter === "All" || item.category === filter,
  );

  return (
    <>
      <Heading number="07" title="Gallery and evidence">
        My professional profile, tutor-created resources, the module guide,
        and session plans.
      </Heading>

      {portraitAsset.file && (
        <figure className="portrait-evidence">
          <Picture
            src={portraitAsset.file}
            alt={portraitAsset.alt}
            className="evidence-photo"
          />

          <figcaption>
            <span className="tag">Professional profile</span>
            <h3>{profile.name}</h3>
            <p>Development Software 1 tutor · 2026</p>

            <AssetActions
              item={portraitAsset}
              openPreview={openPreview}
            />
          </figcaption>
        </figure>
      )}

      <div className="filters" role="group" aria-label="Filter evidence">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter ${filter === category ? "selected" : ""}`}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="small result-count" role="status">
        {visible.length} document {visible.length === 1 ? "entry" : "entries"}
      </p>

      <div className="file-list">
        {visible.map((item) => (
          <FileCard
            key={item.id}
            item={item}
            openPreview={openPreview}
          />
        ))}
      </div>
    </>
  );
}

function Feedback({ openPreview }) {
  return (
    <>
      <Heading number="08" title="Communication and participation">
        Channels for staying connected and records of online revision sessions.
      </Heading>

      <div className="banner">
        <h3>Listening during practical work</h3>

        <p>
          Student questions, comments, and feedback were attended to during and
          immediately after tutorials. Notepad supported recording these
          interactions during and after sessions.
        </p>
      </div>

      <div className="grid-two space">
        <Panel title="WhatsApp study groups" label="Class and residence channels">
          <p>
            The main DS1 group included the main DS1 students. Residence-based
            groups connected students living around campus, where tutors
            occasionally joined study-room sessions.
          </p>

          {whatsappAsset.file && (
            <figure className="channel-image">
              <Picture
                src={whatsappAsset.file}
                alt={whatsappAsset.alt}
              />

              <AssetActions
                item={whatsappAsset}
                openPreview={openPreview}
              />
            </figure>
          )}
        </Panel>

        <Panel title="DS1 Microsoft Teams class" label="Online channel">
          <p>
            Teams supported necessary meetings and online sessions when students
            could not attend campus physically.
          </p>

          <a
            className="button primary"
            href={feedback.teamsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open DS1 class team
          </a>

          <p className="small space">
            University sign-in and team membership may be required.
          </p>
        </Panel>
      </div>

      <h3 className="subheading">Online-session registers</h3>

      <p>
        Three CSV registers document the strike-period sessions preparing
        students for Test 3 Assessment 1. These records document participation.
      </p>

      <div className="file-list">
        {onlineRegisters.map((item) => (
          <FileCard
            key={item.id}
            item={item}
            openPreview={openPreview}
          />
        ))}
      </div>
    </>
  );
}

// Decode ordinary UTF-8 CSVs and BOM-marked UTF-16 exports.
function decodeCsv(buffer) {
  const bytes = new Uint8Array(buffer);

  if (bytes[0] === 0xff && bytes[1] === 0xfe) {
    return new TextDecoder("utf-16le").decode(bytes);
  }

  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    return new TextDecoder("utf-16be").decode(bytes);
  }

  return new TextDecoder("utf-8").decode(bytes);
}

function CsvTable({ text }) {
  const parsed = Papa.parse(text.replace(/^\uFEFF/, ""), {
    skipEmptyLines: "greedy",
  });

  const seriousError = parsed.errors.find(
    (error) => error.code !== "UndetectableDelimiter",
  );

  if (seriousError) {
    return (
      <p className="error-message" role="alert">
        This register contains invalid CSV formatting.
      </p>
    );
  }

  if (!parsed.data.length) {
    return <p>This register contains no rows.</p>;
  }

  const rows = parsed.data.slice(0, 100);
  const columns = Math.max(1, ...rows.map((row) => row.length));

  return (
    <>
      <p className="small">
        Showing {rows.length} of {parsed.data.length} rows in file order.
        The first row may contain headings.
      </p>

      <div
        className="table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Scrollable online-session register"
      >
        <table className="csv-table">
          <caption>Online-session register preview</caption>

          <thead>
            <tr>
              <th scope="col">Row</th>

              {Array.from({ length: columns }, (_, index) => (
                <th key={index} scope="col">
                  Column {index + 1}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row">{rowIndex + 1}</th>

                {Array.from({ length: columns }, (_, columnIndex) => (
                  <td key={columnIndex}>
                    {row[columnIndex] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Fetch and validate a preview before embedding it.
// This also catches Vite returning index.html for a missing asset.
function usePreviewFile(item) {
  const [state, setState] = useState({
    loading: true,
    error: "",
    url: "",
    text: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";

    async function load() {
      setState({
        loading: true,
        error: "",
        url: "",
        text: "",
      });

      try {
        const response = await fetch(item.file, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("The file could not be loaded.");
        }

        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        const start = new TextDecoder()
          .decode(bytes.slice(0, 1024))
          .replace(/^\uFEFF/, "")
          .trim();

        const contentType = response.headers.get("content-type") || "";

        if (
          /text\/html/i.test(contentType) ||
          /^(<!doctype html|<html)/i.test(start)
        ) {
          throw new Error("The file was not found at the configured address.");
        }

        let text = "";
        let mime = contentType;

        if (item.kind === "pdf") {
          if (!start.includes("%PDF-")) {
            throw new Error("This file is not a valid PDF document.");
          }

          mime = "application/pdf";
        }

        if (item.kind === "csv") {
          text = decodeCsv(buffer);

          if (/^\s*(<!doctype html|<html)/i.test(text)) {
            throw new Error("The CSV file was not found.");
          }

          mime = "text/csv";
        }

        if (controller.signal.aborted) return;

        objectUrl = URL.createObjectURL(
          new Blob([buffer], { type: mime }),
        );

        setState({
          loading: false,
          error: "",
          url: objectUrl,
          text,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            loading: false,
            error: error.message || "The preview could not be displayed.",
            url: "",
            text: "",
          });
        }
      }
    }

    load();

    return () => {
      controller.abort();

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [item.file, item.kind]);

  return state;
}

function Preview({ item, close }) {
  const dialogRef = useRef(null);
  const file = usePreviewFile(item);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog.open) {
      dialog.showModal();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="preview-dialog"
      aria-labelledby="preview-title"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <header className="preview-heading">
        <h2 id="preview-title">{item.title}</h2>

        <button
          className="close-button"
          onClick={close}
          aria-label="Close preview"
          autoFocus
        >
          ×
        </button>
      </header>

      {file.loading && (
        <p role="status">Loading preview…</p>
      )}

      {file.error && (
        <p className="error-message" role="alert">
          {file.error}
        </p>
      )}

      {!file.loading && !file.error && (
        <>
          {item.kind === "pdf" && (
            <iframe
              className="pdf-frame"
              title={`${item.title} PDF preview`}
              src={file.url}
            />
          )}

          {item.kind === "csv" && (
            <CsvTable text={file.text} />
          )}

          {item.kind === "image" && (
            <Picture
              src={file.url}
              alt={item.alt || item.title}
              className="preview-image"
            />
          )}

          <div className="preview-actions">
            <a
              className="button secondary"
              href={item.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original in a new tab
            </a>

            <a
              className="button primary"
              href={item.file}
              download={item.downloadName}
            >
              Download {item.kind === "image" ? "image" : item.kind.toUpperCase()}
            </a>
          </div>
        </>
      )}
    </dialog>
  );
}

export default function App() {
  const [active, setActive] = useState(initialSection);
  const [preview, setPreview] = useState(null);

  const mainRef = useRef(null);
  const focusNext = useRef(false);

  const current = sections.find((item) => item.id === active);

  useEffect(() => {
    function handleHash() {
      focusNext.current = true;
      setActive(initialSection());
      setPreview(null);
    }

    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, []);

  useEffect(() => {
    document.title = `${current.label} | ${profile.name}`;

    if (focusNext.current) {
      mainRef.current
        ?.querySelector("#section-heading")
        ?.focus({ preventScroll: true });

      mainRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });

      focusNext.current = false;
    }
  }, [active, current.label]);

  function navigate(id) {
    if (id === active) {
      mainRef.current?.querySelector("#section-heading")?.focus();
      return;
    }

    window.location.hash = id;
  }

  let content;

  switch (active) {
    case "module":
      content = <Module />;
      break;
    case "training":
      content = <Training />;
      break;
    case "delivery":
      content = <Delivery />;
      break;
    case "technology":
      content = <Technology />;
      break;
    case "reflections":
      content = <Reflections />;
      break;
    case "evidence":
      content = <Evidence openPreview={setPreview} />;
      break;
    case "feedback":
      content = <Feedback openPreview={setPreview} />;
      break;
    default:
      content = <Personal navigate={navigate} />;
  }

  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView();
        }}
      >
        Skip to portfolio content
      </a>

      <header className="site-header">
        <a
          className="brand"
          href="#personal"
          onClick={(event) => {
            event.preventDefault();
            navigate("personal");
          }}
        >
          <span className="brand-monogram" aria-hidden="true">
            KB
          </span>

          <span className="brand-text">
            {profile.name}
            <small>Development Software 1 Tutor</small>
          </span>
        </a>

        <span className="header-university">
          {profile.university}
        </span>
      </header>

      <div className="page-shell">
        <section className="hero" aria-labelledby="intro-title">
          <div className="hero-copy">
            <p className="eyebrow">
              Tutor portfolio · {profile.tutoringYear}
            </p>

            <h1 id="intro-title">
              Supporting learning.
              <br />
              <span>Growing in confidence.</span>
            </h1>

            <p className="hero-description">
              I’m {profile.name}, a third-year Applications Development
              student and Development Software 1 tutor. Explore my journey
              of practical teaching, collaboration, and student support.
            </p>

            <div className="hero-actions">
              <button
                className="button primary"
                onClick={() => navigate("personal")}
              >
                Read my story
              </button>

              <button
                className="button secondary"
                onClick={() => navigate("evidence")}
              >
                View my evidence
              </button>
            </div>

            <div className="hero-highlights">
              <div>
                <strong>{profile.courseStart}</strong>
                <span>Course started</span>
              </div>

              <div>
                <strong>Third year</strong>
                <span>Mainstream programme</span>
              </div>

              <div>
                <strong>7 of 8</strong>
                <span>Modules passed with distinctions</span>
              </div>
            </div>
          </div>

          <aside className="hero-profile" aria-label="Tutor profile">
            <Picture
              src={portraitAsset.file}
              alt={portraitAsset.alt}
              className="hero-portrait"
            />

            <div className="hero-profile-details">
              <p className="eyebrow">Meet the tutor</p>
              <h2>{profile.name}</h2>
              <p>{profile.qualification}</p>
              <p>{profile.university}</p>

              <AssetActions
                item={portraitAsset}
                openPreview={setPreview}
              />
            </div>
          </aside>
        </section>

        <section className="portfolio" aria-label="Tutor portfolio sections">
          <nav className="portfolio-navigation" aria-label="Portfolio sections">
            {sections.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navigation-link ${
                  active === item.id ? "active" : ""
                }`}
                aria-current={active === item.id ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <main
            id="main-content"
            ref={mainRef}
            className="main-content"
            tabIndex={-1}
          >
            <div key={active} className="section-content">
              {content}
            </div>
          </main>
        </section>

        <footer className="site-footer">
          <p>{profile.name} · Tutor portfolio · {profile.tutoringYear}</p>
          <p>Personal student portfolio · {profile.university}</p>
        </footer>
      </div>

      {preview && (
        <Preview
          key={`${preview.kind}:${preview.file}`}
          item={preview}
          close={() => setPreview(null)}
        />
      )}
    </>
  );
}