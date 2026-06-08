"use client";
import { useState, useRef, useEffect } from "react";

const FATHERS_META = {
  augustine: {
    name: "Augustine of Hippo", shortName: "Augustine", era: "354–430 AD", tradition: "Western",
    notableFor: "Grace, original sin, the Trinity, and the definitive Western theological framework",
    topics: [
      { label: "Grace & Predestination", query: "What is your understanding of divine grace and predestination?" },
      { label: "Original Sin", query: "How do you explain original sin and its transmission to all humanity?" },
      { label: "The Trinity", query: "How do you understand the nature of the Holy Trinity?" },
      { label: "The Two Cities", query: "What is the meaning of the City of God versus the City of Man?" },
      { label: "Restless Heart", query: "What does it mean that our heart is restless until it rests in God?" },
      { label: "Time & Eternity", query: "What is the nature of time and how does it relate to eternity?" },
      { label: "Free Will", query: "How do you reconcile human free will with God's sovereignty?" },
      { label: "Memory & the Soul", query: "What role does memory play in the soul's knowledge of God?" },
    ],
  },
  chrysostom: {
    name: "John Chrysostom", shortName: "Chrysostom", era: "347–407 AD", tradition: "Eastern",
    notableFor: "Literal-historical exegesis, social justice preaching, and the most complete NT homilies",
    topics: [
      { label: "Wealth & the Poor", query: "What do you teach about wealth, poverty, and our obligation to the poor?" },
      { label: "The Eucharist", query: "What is the meaning and importance of the Eucharist?" },
      { label: "Preaching", query: "What is the proper method and purpose of Christian preaching?" },
      { label: "Gospel of Matthew", query: "What is the central theological message of the Gospel of Matthew?" },
      { label: "Letter to Romans", query: "How do you interpret Paul's argument in the letter to the Romans?" },
      { label: "The Priesthood", query: "What is the dignity and responsibility of the Christian priesthood?" },
      { label: "Anger & Patience", query: "What do you teach about controlling anger and cultivating patience?" },
      { label: "Marriage & Family", query: "What is the Christian understanding of marriage and family life?" },
    ],
  },
  origen: {
    name: "Origen of Alexandria", shortName: "Origen", era: "184–253 AD", tradition: "Alexandrian",
    notableFor: "Allegorical hermeneutics, Logos theology, mystical exegesis, and foundations of Christian spirituality",
    topics: [
      { label: "Allegorical Interpretation", query: "How do you interpret scripture allegorically and what are the three senses of meaning?" },
      { label: "The Logos", query: "What is the nature and role of the divine Logos, the Word of God?" },
      { label: "Song of Songs", query: "What is the spiritual meaning of the Song of Songs?" },
      { label: "Universal Restoration", query: "What is apokatastasis — the restoration of all things?" },
      { label: "The Soul's Ascent", query: "How does the soul ascend toward union with God?" },
      { label: "Prayer", query: "What is the proper nature and practice of Christian prayer?" },
      { label: "Pre-existence of Souls", query: "What do you teach about the pre-existence of souls?" },
      { label: "Spiritual Combat", query: "How do spiritual forces and demonic powers operate against the soul?" },
    ],
  },
  jerome: {
    name: "Jerome", shortName: "Jerome", era: "347–420 AD", tradition: "Western",
    notableFor: "The Latin Vulgate Bible, Hebrew scholarship, and foundational Western biblical commentary",
    topics: [
      { label: "Biblical Translation", query: "What is your approach to translating scripture from the original Hebrew and Greek?" },
      { label: "Monasticism", query: "What is the value of monastic and ascetic life for the Christian?" },
      { label: "Virginity & Chastity", query: "What do you teach about the spiritual value of virginity and chastity?" },
      { label: "Hebrew Scripture", query: "How does knowledge of the Hebrew original illuminate the Old Testament?" },
      { label: "Galatians & Paul", query: "How do you interpret Paul's letter to the Galatians on law and grace?" },
      { label: "Prophecy & Fulfillment", query: "How do the Old Testament prophets point forward to Christ?" },
      { label: "Scripture & Tradition", query: "What is the relationship between scripture and the tradition of the church?" },
      { label: "Against Heresy", query: "How should the church respond to heresy and false teaching?" },
    ],
  },
  cyril: {
    name: "Cyril of Alexandria", shortName: "Cyril", era: "376–444 AD", tradition: "Alexandrian",
    notableFor: "Christology, the Council of Ephesus, the Theotokos controversy, and Alexandrian typology",
    topics: [
      { label: "The Incarnation", query: "What is the meaning and mechanism of the Incarnation — God becoming flesh?" },
      { label: "Hypostatic Union", query: "How are the divine and human natures united in the one person of Christ?" },
      { label: "Theotokos", query: "Why is it correct and important to call Mary the Theotokos, God-bearer?" },
      { label: "Gospel of John", query: "What is the central Christological teaching of the Gospel of John?" },
      { label: "Old Testament Typology", query: "How does the Old Testament prefigure and point to Christ?" },
      { label: "Deification", query: "What is salvation and how does it lead to theosis — participation in divine nature?" },
      { label: "The Holy Spirit", query: "What is the nature and work of the Holy Spirit?" },
      { label: "Against Nestorianism", query: "Why is it wrong to divide Christ into two persons as Nestorius taught?" },
    ],
  },
  ambrose: {
    name: "Ambrose of Milan", shortName: "Ambrose", era: "340–397 AD", tradition: "Western",
    notableFor: "Sacramental theology, church-state relations, allegorical exegesis, and Christian hymnody",
    topics: [
      { label: "The Sacraments", query: "What is the meaning and power of baptism and the Eucharist?" },
      { label: "Christian Ethics & Duty", query: "What are the moral duties of the Christian and the clergy?" },
      { label: "Six Days of Creation", query: "How do you interpret the six days of creation in Genesis?" },
      { label: "Church & State", query: "What is the proper relationship between church authority and civil power?" },
      { label: "The Holy Spirit", query: "What is the divinity and procession of the Holy Spirit?" },
      { label: "Mary as Model", query: "What is the spiritual significance of the Virgin Mary as a model for the church?" },
      { label: "Old Testament Allegory", query: "How do you read the Old Testament allegorically as preparation for Christian worship?" },
      { label: "Hymns & Worship", query: "What is the theological purpose and power of hymns in Christian worship?" },
    ],
  },
  evagrius: {
    name: "Evagrius Ponticus", shortName: "Evagrius", era: "345–399 AD", tradition: "Eastern",
    notableFor: "Monastic theology, the eight deadly thoughts, contemplative prayer, and the foundations of hesychasm",
    topics: [
      { label: "The Eight Thoughts", query: "What are the eight logismoi — the principal thoughts that war against the soul?" },
      { label: "Contemplative Prayer", query: "What is pure prayer and how does the monk attain it?" },
      { label: "Praktike & Theoria", query: "What is the difference between the active life of virtue and contemplative knowledge?" },
      { label: "Acedia", query: "What is acedia — the noonday demon — and how does one overcome it?" },
      { label: "Apatheia", query: "What is apatheia — passionlessness — and is it the goal of the spiritual life?" },
      { label: "The Psalms as Prayer", query: "How do the Psalms form and express the inner life of the monk?" },
      { label: "Demonic Temptation", query: "How do demonic spirits attack the mind through thoughts and passions?" },
      { label: "Knowledge of God", query: "What is the highest form of knowledge — theologia — and how is it attained?" },
    ],
  },
};

const BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","Ezra","Nehemiah","Esther","Job",
  "Psalms","Proverbs","Ecclesiastes","Song of Songs","Isaiah","Jeremiah",
  "Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Jonah","Micah","Malachi",
  "Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians",
  "Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Timothy",
  "Titus","Hebrews","James","1 Peter","2 Peter","1 John","Jude","Revelation",
];

const themes = {
  light: {
    bg: "#FAFAF8", surface: "#fff", text: "#0F172A", textSecondary: "#64748B",
    textMuted: "#94A3B8", textFaint: "#CBD5E1", border: "#E2E8F0", borderLight: "#F1F5F9",
    hoverBg: "#F8FAFC", hoverBg2: "#F1F5F9", inputBg: "#fff",
    questionBg: "#F1F5F9", questionBorder: "#E2E8F0",
    errorBg: "#FEF9F0", errorBorder: "#FDE68A", errorText: "#92400E",
    badgeBg: "#F0FDF4", badgeText: "#15803D", badgeBorder: "#BBF7D0",
    btnBg: "#0F172A", btnText: "#fff", btnDisabledBg: "#F1F5F9", btnDisabledText: "#CBD5E1",
    shimmer1: "#E2E8F0", shimmer2: "#F8FAFC", responseText: "#1E293B",
  },
  dark: {
    bg: "#0D0B08", surface: "#161210", text: "#E8DFC8", textSecondary: "#8A7E6A",
    textMuted: "#5A4E38", textFaint: "#3A2E1E", border: "#2A2015", borderLight: "#1A1510",
    hoverBg: "#1A1510", hoverBg2: "#2A2015", inputBg: "#141008",
    questionBg: "#141008", questionBorder: "#2A2015",
    errorBg: "#1A1008", errorBorder: "#4A3E1E", errorText: "#C9A96E",
    badgeBg: "#081510", badgeText: "#4A8A5E", badgeBorder: "#1A3A28",
    btnBg: "#C9A96E", btnText: "#0D0B08", btnDisabledBg: "#141008", btnDisabledText: "#3A2E1E",
    shimmer1: "#2A2015", shimmer2: "#1A1510", responseText: "#B8AF98",
  },
};

function CitedResponse({ text }) {
  const parts = [];
  const regex = /\[\[CITE:([^\]]+)\]\]/g;
  let last = 0, m;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", content: text.slice(last, m.index) });
    parts.push({ type: "cite", content: m[1].trim() });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", content: text.slice(last) });
  if (parts.every(p => p.type === "text")) return <span style={{ whiteSpace: "pre-wrap" }}>{text}</span>;
  return (
    <span>
      {parts.map((p, i) =>
        p.type === "text"
          ? <span key={i} style={{ whiteSpace: "pre-wrap" }}>{p.content}</span>
          : <span key={i} title={`Source: ${p.content}`} style={{
              background: "var(--hover-bg2)", border: "1px solid var(--border)", borderRadius: 3,
              fontSize: 11, padding: "1px 6px", margin: "0 2px", color: "var(--text-secondary)",
              verticalAlign: "middle", cursor: "default", fontFamily: "inherit",
            }}>
              {p.content.length > 35 ? p.content.slice(0, 35) + "…" : p.content}
            </span>
      )}
    </span>
  );
}

function FatherCard({ father, onTopicClick }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 20, marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2, fontFamily: "Georgia, 'Times New Roman', serif" }}>{father.name}</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.02em" }}>{father.era} · {father.tradition}</div>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{
          background: "none", border: "1px solid var(--border)", borderRadius: 6,
          padding: "4px 10px", fontSize: 12, color: "var(--text-secondary)", cursor: "pointer",
          fontFamily: "inherit", flexShrink: 0, marginLeft: 12,
        }}>
          {expanded ? "Less" : "Topics"}
        </button>
      </div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 10px", fontStyle: "italic" }}>
        {father.notableFor}
      </p>
      {expanded && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {father.topics.map(topic => (
            <button key={topic.label} onClick={() => onTopicClick(topic.query)} style={{
              background: "var(--hover-bg)", border: "1px solid var(--border)", borderRadius: 5,
              padding: "5px 11px", fontSize: 12, color: "var(--text)", cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.12s",
            }}>
              {topic.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SkeletonLine({ width }) {
  return <div className="shimmer" style={{ width, height: 14, borderRadius: 3 }} />;
}

function LoadingSkeleton({ message }) {
  return (
    <div style={{ marginBottom: 36 }}>
      {/* Routing line skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 3 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--text-faint)", animation: `fade 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "-apple-system, sans-serif" }}>{message}</span>
      </div>

      {/* Skeleton cards */}
      {[0, 1].map(card => (
        <div key={card} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--border-light)" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div className="shimmer" style={{ width: 180, height: 17, borderRadius: 4, marginBottom: 6 }} />
              <div className="shimmer" style={{ width: 130, height: 11, borderRadius: 3 }} />
            </div>
            <div className="shimmer" style={{ width: 72, height: 20, borderRadius: 4 }} />
          </div>
          {/* Body lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
            <SkeletonLine width="100%" />
            <SkeletonLine width="97%" />
            <SkeletonLine width="90%" />
            <SkeletonLine width="94%" />
            <SkeletonLine width="85%" />
            <SkeletonLine width="70%" />
          </div>
          {/* Reference chips */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            <div className="shimmer" style={{ width: 75, height: 22, borderRadius: 4 }} />
            <div className="shimmer" style={{ width: 60, height: 22, borderRadius: 4 }} />
            <div className="shimmer" style={{ width: 85, height: 22, borderRadius: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [conversations, setConversations] = useState({});
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [inputMode, setInputMode] = useState("question");
  const [question, setQuestion] = useState("");
  const [passageBook, setPassageBook] = useState("John");
  const [passageChapter, setPassageChapter] = useState("1");
  const [passageVerse, setPassageVerse] = useState("1");
  const [passageQ, setPassageQ] = useState("");
  const [sessionName, setSessionName] = useState("New Session");
  const [editingName, setEditingName] = useState(false);
  const [showSessions, setShowSessions] = useState(false);
  const [showFathers, setShowFathers] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const chatEndRef = useRef();
  const textareaRef = useRef();

  const t = darkMode ? themes.dark : themes.light;

  useEffect(() => {
    try { const saved = localStorage.getItem("vof_dark_mode"); if (saved === "true") setDarkMode(true); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("vof_dark_mode", darkMode.toString()); } catch {}
  }, [darkMode]);

  const [sessions, setSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vof_sessions_v4") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    if (responses.length === 0) return;
    const session = { id: currentSessionId || `s_${Date.now()}`, name: sessionName, updatedAt: new Date().toISOString(), responses, conversations };
    if (!currentSessionId) setCurrentSessionId(session.id);
    setSessions(prev => {
      const updated = [session, ...prev.filter(s => s.id !== session.id)].slice(0, 20);
      localStorage.setItem("vof_sessions_v4", JSON.stringify(updated));
      return updated;
    });
  }, [responses]);

  const loadSession = (s) => {
    setResponses(s.responses || []); setConversations(s.conversations || {});
    setCurrentSessionId(s.id); setSessionName(s.name); setShowSessions(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };
  const newSession = () => {
    setResponses([]); setConversations({}); setCurrentSessionId(null);
    setSessionName("New Session"); setShowSessions(false);
  };
  const handleTopicClick = (query) => {
    setQuestion(query); setInputMode("question"); setShowFathers(false);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };
  const buildQuery = () => {
    if (inputMode === "passage") {
      const ref = `${passageBook} ${passageChapter}:${passageVerse}`;
      return passageQ.trim() ? `Regarding ${ref}: ${passageQ}` : `Please provide your exegetical commentary on ${ref}.`;
    }
    return question;
  };
  const buildDisplayQ = () => {
    if (inputMode === "passage")
      return `${passageBook} ${passageChapter}:${passageVerse}${passageQ ? ` — ${passageQ}` : ""}`;
    return question;
  };

  const ask = async () => {
    const q = buildQuery();
    if (!q.trim() || loading) return;
    setQuestion(""); setPassageQ("");
    setLoading(true);
    setResponses(prev => [...prev, { type: "question", text: buildDisplayQ(), isPassage: inputMode === "passage" }]);

    const msgs = ["Searching the corpus…", "Re-ranking passages…", "Consulting the Fathers…", "Composing responses…"];
    let mi = 0; setLoadingMsg(msgs[0]);
    const iv = setInterval(() => { mi = (mi + 1) % msgs.length; setLoadingMsg(msgs[mi]); }, 2200);

    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, conversations }),
      });
      const data = await res.json();
      clearInterval(iv);
      if (data.error) { setResponses(prev => [...prev, { type: "error", text: data.error }]); setLoading(false); return; }
      if (data.noRelevantFathers) { setResponses(prev => [...prev, { type: "noMatch", text: data.message }]); setLoading(false); return; }
      data.results.forEach(({ fatherId, updatedHistory }) => setConversations(prev => ({ ...prev, [fatherId]: updatedHistory })));
      setResponses(prev => [...prev, { type: "answers", answers: data.results, sharedRefs: data.sharedRefs || [] }]);
    } catch {
      clearInterval(iv);
      setResponses(prev => [...prev, { type: "error", text: "Network error. Please try again." }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div style={{
      "--text-secondary": t.textSecondary, "--text-muted": t.textMuted, "--text-faint": t.textFaint,
      "--text": t.text, "--border": t.border, "--border-light": t.borderLight,
      "--hover-bg": t.hoverBg, "--hover-bg2": t.hoverBg2, "--shimmer1": t.shimmer1, "--shimmer2": t.shimmer2,
      height: "100vh", background: t.bg, color: t.text,
      fontFamily: "Georgia, 'Times New Roman', serif",
      display: "flex", flexDirection: "column", overflow: "hidden",
      transition: "background 0.3s, color 0.3s",
    }}>

      {/* Header */}
      <header style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "0 28px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, transition: "background 0.3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 18, color: t.textMuted }}>✝</span>
          {editingName
            ? <input autoFocus value={sessionName} onChange={e => setSessionName(e.target.value)} onBlur={() => setEditingName(false)} onKeyDown={e => e.key === "Enter" && setEditingName(false)}
                style={{ border: "none", borderBottom: `1px solid ${t.textMuted}`, outline: "none", fontSize: 15, fontWeight: 600, background: "transparent", color: t.text, fontFamily: "Georgia, serif", width: 200 }} />
            : <span onClick={() => setEditingName(true)} style={{ fontSize: 15, fontWeight: 600, color: t.text, cursor: "text", fontFamily: "Georgia, serif" }}>{sessionName}</span>
          }
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setDarkMode(d => !d)} title={darkMode ? "Light mode" : "Dark mode"} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "5px 10px", fontSize: 15, color: t.textSecondary, cursor: "pointer", fontFamily: "inherit", lineHeight: 1, transition: "all 0.2s" }}>
            {darkMode ? "☀" : "☽"}
          </button>
          <button onClick={() => setShowFathers(s => !s)} style={{ background: showFathers ? t.hoverBg2 : "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 12, color: t.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>The Fathers</button>
          <button onClick={newSession} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 12, color: t.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>New</button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowSessions(s => !s)} style={{ background: showSessions ? t.hoverBg2 : "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "5px 12px", fontSize: 12, color: t.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>
              Sessions {sessions.length > 0 ? `(${sessions.length})` : ""}
            </button>
            {showSessions && (
              <div style={{ position: "absolute", top: 36, right: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", width: 260, zIndex: 50, maxHeight: 340, overflowY: "auto" }}>
                <div style={{ padding: "10px 14px 6px", fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "-apple-system, sans-serif" }}>Saved sessions</div>
                {sessions.length === 0 && <div style={{ padding: "10px 14px 14px", fontSize: 13, color: t.textMuted, fontFamily: "-apple-system, sans-serif" }}>No sessions yet.</div>}
                {sessions.map(s => (
                  <div key={s.id} onClick={() => loadSession(s)} style={{ padding: "9px 14px", cursor: "pointer", borderTop: `1px solid ${t.borderLight}`, background: currentSessionId === s.id ? t.hoverBg : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13, color: t.text, fontFamily: "Georgia, serif" }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, marginTop: 1, fontFamily: "-apple-system, sans-serif" }}>{new Date(s.updatedAt).toLocaleDateString()} · {(s.responses || []).filter(r => r.type === "answers").length} exchanges</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setSessions(prev => { const u = prev.filter(x => x.id !== s.id); localStorage.setItem("vof_sessions_v4", JSON.stringify(u)); return u; }); }} style={{ background: "none", border: "none", color: t.textFaint, cursor: "pointer", fontSize: 18 }}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {showFathers && (
          <div style={{ width: 300, borderRight: `1px solid ${t.border}`, background: t.surface, overflowY: "auto", padding: "20px", flexShrink: 0, transition: "background 0.3s" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 20, fontFamily: "-apple-system, sans-serif" }}>Church Fathers</div>
            {Object.entries(FATHERS_META).map(([id, f]) => (
              <FatherCard key={id} father={f} onTopicClick={handleTopicClick} />
            ))}
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>

              {responses.length === 0 && (
                <div style={{ textAlign: "center", paddingTop: 60 }}>
                  <div style={{ fontSize: 28, color: t.textFaint, marginBottom: 20 }}>✝</div>
                  <h1 style={{ fontSize: 24, fontWeight: 600, color: t.text, margin: "0 0 10px", letterSpacing: "-0.3px" }}>Voices of the Fathers</h1>
                  <p style={{ fontSize: 15, color: t.textSecondary, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
                    Ask a theological question or select a scripture passage. The agent searches all patristic writings and surfaces the Fathers whose texts speak directly to your question.
                  </p>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    {[
                      { q: "What is the spiritual meaning of the Song of Songs?", label: "Song of Songs" },
                      { q: "How do you understand the nature of the Holy Trinity?", label: "The Trinity" },
                      { q: "What does it mean to pray without ceasing?", label: "Prayer" },
                      { q: "How does the soul ascend toward union with God?", label: "Mysticism" },
                      { q: "What is the proper Christian understanding of suffering?", label: "Suffering" },
                      { q: "How do you interpret the Sermon on the Mount?", label: "Sermon on the Mount" },
                    ].map(item => (
                      <button key={item.label} onClick={() => { setQuestion(item.q); setTimeout(() => textareaRef.current?.focus(), 50); }} style={{
                        background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "7px 16px",
                        fontSize: 13, color: t.textSecondary, cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.12s",
                      }}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: t.textFaint, marginTop: 24, fontFamily: "-apple-system, sans-serif" }}>
                    Open "The Fathers" in the header to browse topics by Church Father
                  </p>
                </div>
              )}

              {responses.map((entry, i) => {
                if (entry.type === "question") return (
                  <div key={i} style={{ marginBottom: 28, display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ background: t.questionBg, borderRadius: 12, borderBottomRightRadius: 3, padding: "10px 16px", maxWidth: "72%", border: `1px solid ${t.questionBorder}` }}>
                      {entry.isPassage && <div style={{ fontSize: 10, fontWeight: 600, color: t.textMuted, marginBottom: 3, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "-apple-system, sans-serif" }}>Passage</div>}
                      <div style={{ fontSize: 14, color: t.text, lineHeight: 1.6 }}>{entry.text}</div>
                    </div>
                  </div>
                );
                if (entry.type === "error" || entry.type === "noMatch") return (
                  <div key={i} style={{ marginBottom: 20, padding: "12px 16px", background: t.errorBg, border: `1px solid ${t.errorBorder}`, borderRadius: 8 }}>
                    <div style={{ fontSize: 13, color: t.errorText, fontFamily: "-apple-system, sans-serif" }}>{entry.text}</div>
                  </div>
                );
                if (entry.type === "answers") {
                  const { answers, sharedRefs } = entry;
                  return (
                    <div key={i} style={{ marginBottom: 36 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: t.textFaint, fontFamily: "-apple-system, sans-serif", letterSpacing: "0.04em" }}>Responding:</span>
                        {answers.map(({ fatherId, topScore }, idx) => {
                          const f = FATHERS_META[fatherId];
                          return (
                            <span key={fatherId} style={{ fontSize: 12, color: t.textSecondary, fontFamily: "-apple-system, sans-serif" }}>
                              {f?.shortName || fatherId}
                              <span style={{ color: t.textFaint, marginLeft: 3 }}>{Math.round(topScore * 100)}%</span>
                              {idx < answers.length - 1 ? <span style={{ color: t.border, marginLeft: 3 }}>·</span> : ""}
                            </span>
                          );
                        })}
                      </div>
                      {sharedRefs?.length > 0 && (
                        <div style={{ background: t.hoverBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 20 }}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: t.textMuted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 7, fontFamily: "-apple-system, sans-serif" }}>Shared references</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {sharedRefs.map(({ ref, ids }) => (
                              <div key={ref} style={{ display: "flex", alignItems: "center", gap: 5, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 5, padding: "3px 10px" }}>
                                <span style={{ fontSize: 12, color: t.text, fontFamily: "Georgia, serif" }}>{ref}</span>
                                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: "-apple-system, sans-serif" }}>{ids.map(id => FATHERS_META[id]?.shortName || id).join(", ")}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {answers.map(({ fatherId, response, crossrefs, topScore, hasContext, sourceChunks }) => {
                        const f = FATHERS_META[fatherId];
                        if (!f) return null;
                        const turns = Math.floor((conversations[fatherId] || []).length / 2);
                        return (
                          <div key={fatherId} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${t.borderLight}` }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                              <div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: t.text, fontFamily: "Georgia, serif" }}>{f.name}</div>
                                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2, fontFamily: "-apple-system, sans-serif" }}>
                                  {f.era} · {f.tradition}
                                  {turns > 0 && <span style={{ marginLeft: 6 }}>· {turns} turn{turns !== 1 ? "s" : ""}</span>}
                                </div>
                              </div>
                              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                {hasContext && <span style={{ fontSize: 10, background: t.badgeBg, color: t.badgeText, border: `1px solid ${t.badgeBorder}`, borderRadius: 4, padding: "1px 7px", fontFamily: "-apple-system, sans-serif", fontWeight: 500 }}>from texts</span>}
                                <span style={{ fontSize: 11, color: t.textMuted, fontFamily: "-apple-system, sans-serif" }}>{Math.round(topScore * 100)}% match</span>
                              </div>
                            </div>
                            <div style={{ fontSize: 15, lineHeight: 1.85, color: t.responseText }}>
                              <CitedResponse text={response} />
                            </div>
                            {crossrefs?.length > 0 && (
                              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
                                <span style={{ fontSize: 11, color: t.textFaint, fontFamily: "-apple-system, sans-serif" }}>References:</span>
                                {crossrefs.map(ref => (
                                  <span key={ref} style={{ fontSize: 12, padding: "2px 8px", background: t.hoverBg, border: `1px solid ${t.border}`, color: t.textSecondary, borderRadius: 4, fontFamily: "Georgia, serif" }}>{ref}</span>
                                ))}
                              </div>
                            )}
                            {sourceChunks?.length > 0 && (
                              <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {[...new Set(sourceChunks.map(c => c.sourceDoc))].map(doc => (
                                  <span key={doc} style={{ fontSize: 10, color: t.textMuted, fontFamily: "-apple-system, sans-serif" }}>📄 {doc}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              })}

              {loading && <LoadingSkeleton message={loadingMsg} />}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input */}
          <div style={{ background: t.surface, borderTop: `1px solid ${t.border}`, padding: "14px 28px", flexShrink: 0, transition: "background 0.3s" }}>
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
              <div style={{ display: "flex", gap: 0, marginBottom: 10, width: "fit-content" }}>
                {[["question", "Question"], ["passage", "Passage"]].map(([mode, label]) => (
                  <button key={mode} onClick={() => setInputMode(mode)} style={{
                    padding: "4px 14px", fontSize: 12, background: "none", border: "none",
                    borderBottom: inputMode === mode ? `2px solid ${t.text}` : "2px solid transparent",
                    color: inputMode === mode ? t.text : t.textMuted, cursor: "pointer",
                    fontFamily: "inherit", transition: "all 0.12s", fontWeight: inputMode === mode ? 600 : 400,
                  }}>{label}</button>
                ))}
              </div>
              {inputMode === "passage" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <select value={passageBook} onChange={e => setPassageBook(e.target.value)} style={{ flex: 2, border: `1px solid ${t.border}`, borderRadius: 7, padding: "9px 12px", fontSize: 13, fontFamily: "Georgia, serif", color: t.text, background: t.inputBg, outline: "none" }}>
                      {BOOKS.map(b => <option key={b}>{b}</option>)}
                    </select>
                    <input value={passageChapter} onChange={e => setPassageChapter(e.target.value)} placeholder="Ch" style={{ width: 60, border: `1px solid ${t.border}`, borderRadius: 7, padding: "9px 10px", fontSize: 13, fontFamily: "Georgia, serif", color: t.text, background: t.inputBg, outline: "none", textAlign: "center" }} />
                    <span style={{ color: t.textFaint }}>:</span>
                    <input value={passageVerse} onChange={e => setPassageVerse(e.target.value)} placeholder="V" style={{ width: 60, border: `1px solid ${t.border}`, borderRadius: 7, padding: "9px 10px", fontSize: 13, fontFamily: "Georgia, serif", color: t.text, background: t.inputBg, outline: "none", textAlign: "center" }} />
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={passageQ} onChange={e => setPassageQ(e.target.value)} onKeyDown={e => e.key === "Enter" && ask()} placeholder="Specific question about this passage (optional)" disabled={loading} style={{ flex: 1, border: `1px solid ${t.border}`, borderRadius: 7, padding: "9px 14px", fontSize: 13, fontFamily: "Georgia, serif", color: t.text, background: t.inputBg, outline: "none" }} />
                    <AskBtn onClick={ask} disabled={loading} t={t} />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                  <textarea ref={textareaRef} value={question} onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
                    placeholder="Ask a theological question…"
                    disabled={loading} rows={2}
                    style={{ flex: 1, border: `1px solid ${t.border}`, borderRadius: 7, padding: "10px 14px", fontSize: 14, fontFamily: "Georgia, serif", color: t.text, resize: "none", lineHeight: 1.6, outline: "none", background: t.inputBg, transition: "background 0.3s, color 0.3s" }} />
                  <AskBtn onClick={ask} disabled={!question.trim() || loading} t={t} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade{0%,100%{opacity:0.3}50%{opacity:1}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .shimmer{background:linear-gradient(90deg,var(--shimmer1) 25%,var(--shimmer2) 50%,var(--shimmer1) 75%);background-size:800px 100%;animation:shimmer 1.5s ease-in-out infinite}
        input::placeholder,textarea::placeholder{color:${t.textFaint}}
        select:focus,input:focus,textarea:focus{border-color:${t.textMuted}!important;outline:none}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${t.border};border-radius:99px}
        select option{background:${t.inputBg};color:${t.text}}
      `}</style>
    </div>
  );
}

function AskBtn({ onClick, disabled, t }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? t.btnDisabledBg : t.btnBg, color: disabled ? t.btnDisabledText : t.btnText,
      border: "none", borderRadius: 7, padding: "10px 20px", cursor: disabled ? "default" : "pointer",
      fontSize: 13, fontWeight: 500, fontFamily: "Georgia, serif", transition: "all 0.2s",
      whiteSpace: "nowrap", flexShrink: 0,
    }}>
      Ask
    </button>
  );
}
