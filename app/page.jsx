"use client";
import { useState, useRef, useEffect } from "react";

const FATHERS_META = {
  augustine: {
    name: "Augustine of Hippo", era: "354–430 AD", tradition: "Western", color: "#c9a96e",
    notableFor: "Doctrine of grace, original sin, the Trinity, and the definitive Western theological framework",
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
    name: "John Chrysostom", era: "347–407 AD", tradition: "Eastern", color: "#a97eb8",
    notableFor: "Literal-historical exegesis, social justice preaching, and the most complete NT homilies",
    topics: [
      { label: "Wealth & the Poor", query: "What do you teach about wealth, poverty, and our obligation to the poor?" },
      { label: "The Eucharist", query: "What is the meaning and importance of the Eucharist?" },
      { label: "Preaching", query: "What is the proper method and purpose of Christian preaching?" },
      { label: "Gospel of Matthew", query: "What is the central theological message of the Gospel of Matthew?" },
      { label: "Letter to the Romans", query: "How do you interpret Paul's argument in the letter to the Romans?" },
      { label: "The Priesthood", query: "What is the dignity and responsibility of the Christian priesthood?" },
      { label: "Anger & Patience", query: "What do you teach about controlling anger and cultivating patience?" },
      { label: "Marriage & Family", query: "What is the Christian understanding of marriage and family life?" },
    ],
  },
  origen: {
    name: "Origen of Alexandria", era: "184–253 AD", tradition: "Alexandrian", color: "#7eb8c9",
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
    name: "Jerome", era: "347–420 AD", tradition: "Western", color: "#c9a96e",
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
    name: "Cyril of Alexandria", era: "376–444 AD", tradition: "Alexandrian", color: "#7eb8c9",
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
    name: "Ambrose of Milan", era: "340–397 AD", tradition: "Western", color: "#c9a96e",
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
    name: "Evagrius Ponticus", era: "345–399 AD", tradition: "Eastern", color: "#a97eb8",
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
          : <span key={i} title={`Source: ${p.content}`} style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", borderRadius: 2, fontSize: 10, padding: "1px 6px", margin: "0 2px", color: "#c9a96e", verticalAlign: "middle", cursor: "default" }}>
              📜 {p.content.length > 40 ? p.content.slice(0, 40) + "…" : p.content}
            </span>
      )}
    </span>
  );
}

function RelevanceBar({ score }) {
  const pct = Math.round(score * 100);
  const color = score >= 0.7 ? "#5a8a6e" : score >= 0.5 ? "#c9a96e" : "#8a6e5a";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
      <div style={{ flex: 1, height: 2, background: "#1a1510", borderRadius: 1 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 1, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 8, color: "#4a3e2a", width: 28, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

// Father card shown on the empty state
function FatherCard({ father, fatherId, onTopicClick }) {
  const [expanded, setExpanded] = useState(false);
  const color = father.color;

  return (
    <div style={{
      background: "#0a0806",
      border: `1px solid ${color}20`,
      borderTop: `3px solid ${color}`,
      padding: "14px 16px",
      transition: "border-color 0.2s",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, color, letterSpacing: "0.03em" }}>{father.name}</div>
          <div style={{ fontSize: 9, color: "#3a2e1e", marginTop: 2 }}>{father.era} · {father.tradition}</div>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{
          background: "none", border: `1px solid ${color}25`, color: expanded ? color : "#4a3e2a",
          fontSize: 9, padding: "2px 8px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em",
          flexShrink: 0, marginLeft: 8,
        }}>
          {expanded ? "▲ less" : "▼ topics"}
        </button>
      </div>

      {/* Notable for */}
      <div style={{ fontSize: 10, color: "#5a4e38", lineHeight: 1.5, marginBottom: expanded ? 10 : 0, fontStyle: "italic" }}>
        {father.notableFor}
      </div>

      {/* Topic chips */}
      {expanded && (
        <div>
          <div style={{ fontSize: 8, color: "#3a2e1e", letterSpacing: "0.12em", marginBottom: 7, marginTop: 4 }}>
            CLICK A TOPIC TO ASK
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {father.topics.map(topic => (
              <button
                key={topic.label}
                onClick={() => onTopicClick(topic.query)}
                style={{
                  background: `${color}0d`,
                  border: `1px solid ${color}30`,
                  color: "#c8bfa8",
                  fontSize: 10,
                  padding: "4px 10px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  lineHeight: 1.3,
                }}
                onMouseEnter={e => { e.target.style.background = `${color}22`; e.target.style.color = color; }}
                onMouseLeave={e => { e.target.style.background = `${color}0d`; e.target.style.color = "#c8bfa8"; }}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      )}
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
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [showConvoPanel, setShowConvoPanel] = useState(false);
  const chatEndRef = useRef();
  const textareaRef = useRef();

  const [sessions, setSessions] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vof_sessions_v2") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    if (responses.length === 0) return;
    const session = {
      id: currentSessionId || `s_${Date.now()}`,
      name: sessionName, updatedAt: new Date().toISOString(),
      responses, conversations,
    };
    if (!currentSessionId) setCurrentSessionId(session.id);
    setSessions(prev => {
      const updated = [session, ...prev.filter(s => s.id !== session.id)].slice(0, 20);
      localStorage.setItem("vof_sessions_v2", JSON.stringify(updated));
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

  const clearFatherHistory = (fatherId) => setConversations(prev => ({ ...prev, [fatherId]: [] }));

  const handleTopicClick = (query) => {
    setQuestion(query);
    setInputMode("question");
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
      return `📖 ${passageBook} ${passageChapter}:${passageVerse}${passageQ ? ` — ${passageQ}` : " (exegetical commentary)"}`;
    return question;
  };

  const ask = async () => {
    const q = buildQuery();
    if (!q.trim() || loading) return;
    setQuestion(""); setPassageQ("");
    setLoading(true);
    setResponses(prev => [...prev, { type: "question", text: buildDisplayQ() }]);

    const msgs = ["Expanding query…", "Searching all corpora…", "Re-ranking passages…", "Consulting the Fathers…"];
    let mi = 0; setLoadingMsg(msgs[0]);
    const iv = setInterval(() => { mi = (mi + 1) % msgs.length; setLoadingMsg(msgs[mi]); }, 2000);

    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, conversations }),
      });
      const data = await res.json();
      clearInterval(iv);

      if (data.error) { setResponses(prev => [...prev, { type: "error", text: data.error }]); setLoading(false); return; }
      if (data.noRelevantFathers) { setResponses(prev => [...prev, { type: "noMatch", text: data.message }]); setLoading(false); return; }

      data.results.forEach(({ fatherId, updatedHistory }) => {
        setConversations(prev => ({ ...prev, [fatherId]: updatedHistory }));
      });
      setResponses(prev => [...prev, { type: "answers", answers: data.results, sharedRefs: data.sharedRefs || [] }]);
    } catch {
      clearInterval(iv);
      setResponses(prev => [...prev, { type: "error", text: "Network error. Please try again." }]);
    }
    setLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const activeFathers = Object.entries(conversations).filter(([, h]) => h.length > 0).map(([id]) => id);

  return (
    <div style={{ height: "100vh", background: "#0d0b08", color: "#e8dfc8", fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #2a2015", padding: "12px 24px", background: "linear-gradient(180deg,#1a1208,#0d0b08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.3em", color: "#4a3e2a", textTransform: "uppercase" }}>Voices of the Fathers · Hybrid Agent</div>
          {editingName
            ? <input autoFocus value={sessionName} onChange={e => setSessionName(e.target.value)} onBlur={() => setEditingName(false)} onKeyDown={e => e.key === "Enter" && setEditingName(false)} style={{ background: "none", border: "none", borderBottom: "1px solid #c9a96e", color: "#e8dfc8", fontSize: 18, fontFamily: "inherit", outline: "none", width: 280 }} />
            : <h1 onClick={() => setEditingName(true)} title="Click to rename" style={{ margin: 0, fontSize: 18, fontWeight: 400, cursor: "text" }}>{sessionName}</h1>
          }
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {activeFathers.length > 0 && (
            <button onClick={() => setShowConvoPanel(s => !s)} style={{ background: showConvoPanel ? "rgba(169,126,184,0.15)" : "none", border: "1px solid #3a2e1e", color: "#a97eb8", padding: "5px 12px", fontSize: 10, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>
              💬 {activeFathers.length} thread{activeFathers.length > 1 ? "s" : ""}
            </button>
          )}
          <button onClick={newSession} style={{ background: "none", border: "1px solid #2a2015", color: "#5a4e38", padding: "5px 12px", fontSize: 10, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.1em" }}>+ New</button>
          <button onClick={() => setShowSessions(s => !s)} style={{ background: showSessions ? "#c9a96e" : "none", border: "1px solid #2a2015", color: showSessions ? "#0d0b08" : "#5a4e38", padding: "5px 12px", fontSize: 10, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.1em" }}>
            Sessions {sessions.length > 0 ? `(${sessions.length})` : ""}
          </button>
        </div>
      </div>

      {/* Sessions dropdown */}
      {showSessions && (
        <div style={{ position: "absolute", top: 60, right: 24, zIndex: 100, background: "#0f0c07", border: "1px solid #2a2015", width: 300, maxHeight: 380, overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
          <div style={{ padding: "8px 14px", borderBottom: "1px solid #1a1510", fontSize: 9, color: "#3a2e1e", letterSpacing: "0.15em" }}>SAVED SESSIONS</div>
          {sessions.length === 0 && <div style={{ padding: 14, fontSize: 11, color: "#3a2e1e" }}>No sessions yet.</div>}
          {sessions.map(s => (
            <div key={s.id} onClick={() => loadSession(s)} style={{ padding: "9px 14px", cursor: "pointer", borderBottom: "1px solid #1a1510", background: currentSessionId === s.id ? "rgba(201,169,110,0.07)" : "transparent", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11, color: currentSessionId === s.id ? "#c9a96e" : "#8a7855" }}>{s.name}</div>
                <div style={{ fontSize: 9, color: "#2a2015", marginTop: 1 }}>{new Date(s.updatedAt).toLocaleDateString()} · {(s.responses || []).filter(r => r.type === "answers").length} exchanges</div>
              </div>
              <button onClick={e => { e.stopPropagation(); setSessions(prev => { const u = prev.filter(x => x.id !== s.id); localStorage.setItem("vof_sessions_v2", JSON.stringify(u)); return u; }); }} style={{ background: "none", border: "none", color: "#2a2015", cursor: "pointer", fontSize: 14 }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Active threads panel */}
      {showConvoPanel && (
        <div style={{ position: "absolute", top: 60, right: activeFathers.length > 0 ? 220 : 120, zIndex: 100, background: "#0f0c07", border: "1px solid #2a2015", width: 260, boxShadow: "0 8px 32px rgba(0,0,0,0.7)" }}>
          <div style={{ padding: "8px 14px", borderBottom: "1px solid #1a1510", fontSize: 9, color: "#3a2e1e", letterSpacing: "0.15em" }}>ACTIVE THREADS</div>
          {activeFathers.map(id => {
            const f = FATHERS_META[id];
            const turns = Math.floor((conversations[id] || []).length / 2);
            return (
              <div key={id} style={{ padding: "8px 14px", borderBottom: "1px solid #1a1510", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: f?.color || "#c9a96e" }}>{f?.name?.split(" ")[0] || id}</div>
                  <div style={{ fontSize: 9, color: "#3a2e1e", marginTop: 1 }}>{turns} turn{turns !== 1 ? "s" : ""}</div>
                </div>
                <button onClick={() => clearFatherHistory(id)} style={{ background: "none", border: "1px solid #2a2015", color: "#4a3e2a", fontSize: 8, padding: "2px 7px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.08em" }}>↺ Clear</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "22px 28px" }}>

        {/* Empty state — Father roster with topics */}
        {responses.length === 0 && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>✝</div>
              <div style={{ fontSize: 16, color: "#5a4e38", marginBottom: 4 }}>Ask anything. The Fathers will answer.</div>
              <div style={{ fontSize: 11, color: "#3a2e1e" }}>
                The agent searches all corpora and surfaces only Fathers whose writings speak to your question.
                <br />Expand any Father below to browse their topics, or type your own question.
              </div>
            </div>

            {/* Father cards grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
              {Object.entries(FATHERS_META).map(([id, f]) => (
                <FatherCard key={id} fatherId={id} father={f} onTopicClick={handleTopicClick} />
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {responses.map((entry, i) => {
          if (entry.type === "question") return (
            <div key={i} style={{ marginBottom: 20, textAlign: "right" }}>
              <div style={{ display: "inline-block", background: "#141008", border: "1px solid #2a2015", padding: "10px 16px", maxWidth: "70%", textAlign: "left" }}>
                <div style={{ fontSize: 8, color: "#4a3e2a", marginBottom: 3, letterSpacing: "0.12em" }}>YOUR QUESTION</div>
                <div style={{ fontSize: 13, lineHeight: 1.6 }}>{entry.text}</div>
              </div>
            </div>
          );

          if (entry.type === "error" || entry.type === "noMatch") return (
            <div key={i} style={{ marginBottom: 20, padding: "12px 16px", background: "#140808", border: "1px solid #3a1e1e", borderLeft: "3px solid #8a4e4e" }}>
              <div style={{ fontSize: 11, color: "#8a6e6e" }}>{entry.text}</div>
            </div>
          );

          if (entry.type === "answers") {
            const { answers, sharedRefs } = entry;
            return (
              <div key={i} style={{ marginBottom: 28 }}>
                {/* Routing summary */}
                <div style={{ marginBottom: 14, padding: "8px 14px", background: "#0a0806", border: "1px solid #1a1510", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 9, color: "#4a3e2a", letterSpacing: "0.12em" }}>AGENT ROUTED TO</div>
                  {answers.map(({ fatherId, topScore }) => {
                    const f = FATHERS_META[fatherId];
                    return (
                      <div key={fatherId} style={{ display: "flex", alignItems: "center", gap: 5, background: `${f?.color}0d`, border: `1px solid ${f?.color}25`, padding: "3px 9px" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: f?.color }} />
                        <span style={{ fontSize: 10, color: f?.color }}>{f?.name?.split(" ")[0] || fatherId}</span>
                        <span style={{ fontSize: 8, color: "#3a2e1e" }}>{Math.round(topScore * 100)}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* Cross-reference convergence */}
                {sharedRefs?.length > 0 && (
                  <div style={{ background: "rgba(126,184,201,0.05)", border: "1px solid rgba(126,184,201,0.15)", borderLeft: "3px solid #7eb8c9", padding: "9px 14px", marginBottom: 14 }}>
                    <div style={{ fontSize: 9, color: "#7eb8c9", letterSpacing: "0.15em", marginBottom: 6 }}>🔗 CROSS-REFERENCE CONVERGENCE</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {sharedRefs.map(({ ref, ids }) => (
                        <div key={ref} style={{ background: "rgba(126,184,201,0.08)", border: "1px solid rgba(126,184,201,0.15)", padding: "3px 10px", fontSize: 10 }}>
                          <span style={{ color: "#7eb8c9" }}>{ref}</span>
                          <span style={{ color: "#3a5e68", fontSize: 8, marginLeft: 5 }}>{ids.map(id => FATHERS_META[id]?.name?.split(" ")[0] || id).join(", ")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Response cards */}
                <div style={{ display: "grid", gridTemplateColumns: answers.length === 1 ? "1fr" : answers.length === 2 ? "1fr 1fr" : "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                  {answers.map(({ fatherId, response, crossrefs, topScore, hasContext, sourceChunks }) => {
                    const f = FATHERS_META[fatherId];
                    if (!f) return null;
                    const turns = Math.floor((conversations[fatherId] || []).length / 2);
                    return (
                      <div key={fatherId} style={{ background: "#0a0806", border: `1px solid ${f.color}20`, borderTop: `3px solid ${f.color}`, padding: "15px 17px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                          <div>
                            <div style={{ fontSize: 12, color: f.color }}>{f.name}</div>
                            <div style={{ fontSize: 8, color: "#2a2015", marginTop: 1 }}>
                              {f.era} · {f.tradition}
                              {turns > 0 && <span style={{ color: "#5a5280", marginLeft: 5 }}>· {turns} turn{turns !== 1 ? "s" : ""}</span>}
                            </div>
                          </div>
                          {hasContext && <div style={{ fontSize: 7, color: "#4a7a5e", background: "#081510", padding: "2px 5px", letterSpacing: "0.08em" }}>RAG</div>}
                        </div>
                        <RelevanceBar score={topScore} />
                        <div style={{ fontSize: 13, lineHeight: 1.85, color: "#b8af98", marginTop: 12 }}>
                          <CitedResponse text={response} />
                        </div>
                        {crossrefs?.length > 0 && (
                          <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${f.color}10` }}>
                            <div style={{ fontSize: 8, color: "#2a2015", letterSpacing: "0.1em", marginBottom: 4 }}>SCRIPTURE REFERENCES</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                              {crossrefs.map(ref => (
                                <span key={ref} style={{ fontSize: 8, padding: "2px 6px", background: `${f.color}10`, border: `1px solid ${f.color}20`, color: f.color }}>{ref}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {sourceChunks?.length > 0 && (
                          <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${f.color}08` }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                              {[...new Set(sourceChunks.map(c => c.sourceDoc))].map(doc => (
                                <span key={doc} style={{ fontSize: 8, color: "#3a5e4a", background: "#081510", padding: "1px 5px" }}>📄 {doc}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}

        {loading && (
          <div style={{ textAlign: "center", padding: 20, color: "#3a2e1e" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", animation: "pulse 1.5s infinite" }}>{loadingMsg}</div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div style={{ borderTop: "1px solid #1a1510", padding: "12px 20px", background: "#0a0806", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 9 }}>
          {[["question","💬 Question"],["passage","📖 Passage"]].map(([mode, label]) => (
            <button key={mode} onClick={() => setInputMode(mode)} style={{ padding: "4px 13px", fontSize: 9, letterSpacing: "0.1em", background: inputMode === mode ? "#c9a96e" : "none", color: inputMode === mode ? "#0d0b08" : "#4a3e2a", border: "1px solid #2a2015", cursor: "pointer", fontFamily: "inherit", marginRight: -1 }}>{label}</button>
          ))}
        </div>

        {inputMode === "passage" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
              <select value={passageBook} onChange={e => setPassageBook(e.target.value)} style={{ background: "#141008", border: "1px solid #2a2015", color: "#e8dfc8", padding: "7px 9px", fontSize: 11, fontFamily: "inherit", flex: 2 }}>
                {BOOKS.map(b => <option key={b}>{b}</option>)}
              </select>
              <input value={passageChapter} onChange={e => setPassageChapter(e.target.value)} placeholder="Ch" style={{ background: "#141008", border: "1px solid #2a2015", color: "#e8dfc8", padding: "7px 9px", fontSize: 11, fontFamily: "inherit", width: 52 }} />
              <span style={{ color: "#2a2015" }}>:</span>
              <input value={passageVerse} onChange={e => setPassageVerse(e.target.value)} placeholder="V" style={{ background: "#141008", border: "1px solid #2a2015", color: "#e8dfc8", padding: "7px 9px", fontSize: 11, fontFamily: "inherit", width: 52 }} />
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              <input value={passageQ} onChange={e => setPassageQ(e.target.value)} onKeyDown={e => e.key === "Enter" && ask()} placeholder="Optional: specific question about this passage…" disabled={loading} style={{ flex: 1, background: "#141008", border: "1px solid #2a2015", color: "#e8dfc8", padding: "7px 12px", fontSize: 12, fontFamily: "inherit" }} />
              <AskBtn onClick={ask} disabled={loading} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 7, alignItems: "flex-end" }}>
            <textarea ref={textareaRef} value={question} onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(); } }}
              placeholder="Ask a theological question — or click a topic above to explore a Father's thought…"
              disabled={loading} rows={2}
              style={{ flex: 1, background: "#141008", border: "1px solid #2a2015", color: "#e8dfc8", padding: "9px 12px", fontSize: 13, fontFamily: "inherit", resize: "none", lineHeight: 1.5, outline: "none" }} />
            <AskBtn onClick={ask} disabled={!question.trim() || loading} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0a0806}
        ::-webkit-scrollbar-thumb{background:#1a1510}
        textarea::placeholder,input::placeholder{color:#1a1510}
        select option{background:#141008}
      `}</style>
    </div>
  );
}

function AskBtn({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: disabled ? "#141008" : "#c9a96e", color: disabled ? "#1a1510" : "#0d0b08", border: "none", padding: "9px 16px", cursor: disabled ? "default" : "pointer", fontSize: 10, letterSpacing: "0.15em", fontFamily: "'Palatino Linotype',serif", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}>ASK</button>
  );
}
