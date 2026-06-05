// ============================================================
// Church Father metadata
// Add new Fathers here and create their data/ folder
// ============================================================

export const FATHERS = {
  augustine: {
    id: "augustine",
    name: "Augustine of Hippo",
    era: "354–430 AD",
    tradition: "Western",
    color: "#c9a96e",
    keyWorks: [
      "Confessions",
      "City of God",
      "On the Trinity",
      "Tractates on the Gospel of John",
      "Sermons on the Psalms",
    ],
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
    notableFor: "Doctrine of grace, original sin, the Trinity, and the definitive Western theological framework",
    defaultOverview: `Augustine of Hippo was the most influential theologian of the Western church. 
Shaped by Neo-Platonism before his conversion in 386 AD, he brought philosophical rigor to Christian doctrine. 
His early works engaged Manichaean dualism; later writings developed the doctrine of original sin and grace 
contra the Pelagians. His hermeneutics moved from allegorical to increasingly literal readings over his lifetime. 
Key theological commitments: total depravity, predestination, irresistible grace, the visible/invisible church distinction. 
His Confessions pioneered Christian autobiography; City of God reframed history as the story of two cities. 
Grace theology hardened significantly after 410 AD — treat early and late Augustine as somewhat distinct voices.`,
  },

  chrysostom: {
    id: "chrysostom",
    name: "John Chrysostom",
    era: "347–407 AD",
    tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: [
      "Homilies on Matthew",
      "Homilies on Romans",
      "Homilies on the Epistles of Paul",
      "On the Priesthood",
    ],
    topics: [
      { label: "Wealth & the Poor", query: "What do you teach about wealth, poverty, and our obligation to the poor?" },
      { label: "The Eucharist", query: "What is the meaning and importance of the Eucharist?" },
      { label: "Homiletics & Preaching", query: "What is the proper method and purpose of Christian preaching?" },
      { label: "Matthew's Gospel", query: "What is the central theological message of the Gospel of Matthew?" },
      { label: "Paul's Letter to Romans", query: "How do you interpret Paul's argument in the letter to the Romans?" },
      { label: "The Priesthood", query: "What is the dignity and responsibility of the Christian priesthood?" },
      { label: "Anger & Patience", query: "What do you teach about controlling anger and cultivating patience?" },
      { label: "Marriage & Family", query: "What is the Christian understanding of marriage and family life?" },
    ],
    notableFor: "Literal-historical exegesis, social justice preaching, and the most complete homilies on the New Testament",
    defaultOverview: `John Chrysostom (Golden-Mouthed) was the greatest preacher of the Eastern church and Patriarch of Constantinople. 
His hermeneutical method was rigorously Antiochene — historical-grammatical, literal, anti-allegorical. 
He read scripture through the lens of moral formation and pastoral care for the poor. 
Unlike the Alexandrians, he resisted speculative allegory, preferring to ask what the text demands of the Christian life. 
His 88 homilies on Matthew and 32 on Romans are among the most complete patristic commentaries in existence. 
Key emphases: the Eucharist, almsgiving, the dignity of the poor, the dangers of wealth, clerical integrity.`,
  },

  origen: {
    id: "origen",
    name: "Origen of Alexandria",
    era: "184–253 AD",
    tradition: "Alexandrian",
    color: "#7eb8c9",
    keyWorks: [
      "On First Principles",
      "Commentary on John",
      "Commentary on Matthew",
      "Against Celsus",
      "Homilies on Genesis",
    ],
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
    notableFor: "Allegorical hermeneutics, Logos theology, mystical exegesis, and the foundations of Christian spirituality",
    defaultOverview: `Origen was the most prolific and intellectually ambitious theologian of the early church. 
He pioneered the allegorical method — every passage has a bodily (literal), soulish (moral), and spiritual (mystical) sense. 
His Hexapla was the first critical edition of the Old Testament. 
His speculative theology — pre-existence of souls, universal restoration (apokatastasis), subordinationist Christology — 
was later condemned, but his exegetical method shaped all subsequent Alexandrian theology. 
Approach him as a daring explorer whose conclusions are sometimes heterodox but whose questions are always illuminating. 
He read the Song of Songs as the soul's ascent to union with the Logos — the foundation of Christian mysticism.`,
  },

  jerome: {
    id: "jerome",
    name: "Jerome",
    era: "347–420 AD",
    tradition: "Western",
    color: "#c9a96e",
    keyWorks: [
      "Vulgate Bible",
      "Commentary on Matthew",
      "Commentary on Galatians",
      "Letters",
      "Lives of Illustrious Men",
    ],
    topics: [
      { label: "Biblical Translation", query: "What is your approach to translating scripture from the original Hebrew and Greek?" },
      { label: "Monasticism & Asceticism", query: "What is the value of monastic and ascetic life for the Christian?" },
      { label: "Virginity & Chastity", query: "What do you teach about the spiritual value of virginity and chastity?" },
      { label: "Hebrew Scripture", query: "How does knowledge of the Hebrew original illuminate the meaning of the Old Testament?" },
      { label: "Galatians & Paul", query: "How do you interpret Paul's letter to the Galatians, especially on law and grace?" },
      { label: "Prophecy & Fulfillment", query: "How do the Old Testament prophets point forward to Christ?" },
      { label: "Scripture & Tradition", query: "What is the relationship between scripture and the tradition of the church?" },
      { label: "The Dangers of Heresy", query: "How should the church respond to heresy and false teaching?" },
    ],
    notableFor: "Producing the Latin Vulgate Bible, Hebrew scholarship, and foundational Western biblical commentary",
    defaultOverview: `Jerome was the greatest biblical scholar of the ancient church — translator of the Latin Vulgate, 
master of Hebrew, Greek, and Latin, and tireless correspondent. His hermeneutics combined Alexandrian allegory 
(learned from Origen) with Antiochene attention to the Hebrew original. He was often polemical and personally combative, 
engaging in fierce controversies with Rufinus, Jovinian, and others. His letters are a window into late 4th century 
Christian intellectual life. He interpreted monasticism as the highest Christian vocation and read the OT prophets 
as speaking directly of Christ. His commentary on Galatians shaped medieval Western exegesis.`,
  },

  cyril: {
    id: "cyril",
    name: "Cyril of Alexandria",
    era: "376–444 AD",
    tradition: "Alexandrian",
    color: "#7eb8c9",
    keyWorks: [
      "Commentary on John",
      "Commentary on Isaiah",
      "On the Unity of Christ",
      "Letters",
    ],
    topics: [
      { label: "The Incarnation", query: "What is the meaning and mechanism of the Incarnation — God becoming flesh?" },
      { label: "Hypostatic Union", query: "How are the divine and human natures united in the one person of Christ?" },
      { label: "Theotokos", query: "Why is it correct and important to call Mary the Theotokos, God-bearer?" },
      { label: "Gospel of John", query: "What is the central Christological teaching of the Gospel of John?" },
      { label: "Typology in the Old Testament", query: "How does the Old Testament prefigure and point to Christ?" },
      { label: "Salvation & Deification", query: "What is salvation and how does it lead to theosis — participation in divine nature?" },
      { label: "The Holy Spirit", query: "What is the nature and work of the Holy Spirit?" },
      { label: "Against Nestorianism", query: "Why is it wrong to divide Christ into two persons as Nestorius taught?" },
    ],
    notableFor: "Christology, the Council of Ephesus, the Theotokos controversy, and Alexandrian typological exegesis",
    defaultOverview: `Cyril of Alexandria was the architect of Chalcedonian Christology and the driving force behind 
the Council of Ephesus (431 AD). His theological contribution centers on the hypostatic union — one person, two natures — 
and the title Theotokos (God-bearer) for Mary. His Commentary on John is the most comprehensive patristic treatment of 
the Fourth Gospel, reading it through a relentlessly Christological and typological lens. He used the OT as a sustained 
typological preparation for the Incarnation. His hermeneutics are Alexandrian — allegorical, typological, deeply 
shaped by Athanasius. Approach him as a precise dogmatician whose exegesis always serves Christological ends.`,
  },

  ambrose: {
    id: "ambrose",
    name: "Ambrose of Milan",
    era: "340–397 AD",
    tradition: "Western",
    color: "#c9a96e",
    keyWorks: [
      "On the Duties of the Clergy",
      "Hexameron",
      "On the Mysteries",
      "Commentary on Luke",
      "Hymns",
    ],
    topics: [
      { label: "The Sacraments", query: "What is the meaning and power of baptism and the Eucharist?" },
      { label: "Christian Ethics & Duty", query: "What are the moral duties of the Christian and the clergy?" },
      { label: "The Six Days of Creation", query: "How do you interpret the six days of creation in Genesis?" },
      { label: "Church & State", query: "What is the proper relationship between church authority and civil power?" },
      { label: "The Holy Spirit", query: "What is the divinity and procession of the Holy Spirit?" },
      { label: "Mary as Model", query: "What is the spiritual significance of the Virgin Mary as a model for the church?" },
      { label: "Allegory in the Old Testament", query: "How do you read the Old Testament allegorically as preparation for Christian worship?" },
      { label: "Hymns & Worship", query: "What is the theological purpose and power of hymns in Christian worship?" },
    ],
    notableFor: "Sacramental theology, church-state relations, allegorical exegesis, and Christian hymnody",
    defaultOverview: `Ambrose of Milan was bishop, statesman, theologian, and the mentor who baptized Augustine. 
He brought Alexandrian allegorical method to the Latin West through his reading of Philo and Origen. 
His Hexameron (six days of creation) is a masterpiece of allegorical-scientific exegesis. 
His mystagogical catecheses on baptism and Eucharist (On the Mysteries, On the Sacraments) are foundational liturgical texts. 
He held a high sacramental theology and read the Old Testament as a sustained allegorical preparation for Christian worship. 
As bishop he wielded church authority against emperors — his conflict with Theodosius shaped Western church-state relations for centuries.`,
  },

  evagrius: {
    id: "evagrius",
    name: "Evagrius Ponticus",
    era: "345–399 AD",
    tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: [
      "Praktikos",
      "On Prayer",
      "Chapters on Knowledge",
      "Scholia on Psalms",
      "Scholia on Proverbs",
    ],
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
    notableFor: "Monastic theology, the eight deadly thoughts, contemplative prayer, and the foundations of hesychasm",
    defaultOverview: `Evagrius Ponticus was the first systematic theologian of Christian monasticism and the father of the 
hesychast tradition. His framework of the spiritual life — praktike (active purification of passions) leading to 
theorike (contemplative knowledge) — shaped all subsequent Eastern Christian spirituality. He identified the eight 
logismoi (thoughts/passions) that became the seven deadly sins in the West. He was a student of the Cappadocians and 
deeply Origenist — his speculative metaphysics were condemned alongside Origen's. But his practical and contemplative 
writings survived under pseudonyms and shaped Maximus the Confessor, John Climacus, and the entire hesychast lineage. 
Read his Psalms and Proverbs scholia as guides to contemplative exegesis.`,
  },
};

export const getFather = (id) => FATHERS[id];
export const getAllFathers = () => Object.values(FATHERS);
