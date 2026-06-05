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

// ── Additional Fathers from Schaff ANF + NPNF ────────────────
// Add these to FATHERS object and to app/page.jsx FATHERS_META

export const EXTENDED_FATHERS = {
  athanasius: {
    id: "athanasius", name: "Athanasius of Alexandria", era: "296–373 AD", tradition: "Alexandrian",
    color: "#7eb8c9",
    keyWorks: ["On the Incarnation", "Against the Arians", "Life of Anthony", "Letters"],
    topics: [
      { label: "The Incarnation", query: "What is the theological meaning and necessity of the Incarnation?" },
      { label: "Against Arianism", query: "Why is the Arian teaching that the Son is a creature a dangerous heresy?" },
      { label: "The Nicene Creed", query: "What does the Council of Nicaea establish about the nature of Christ?" },
      { label: "Deification", query: "How does salvation lead to theosis — becoming partakers of divine nature?" },
      { label: "The Holy Spirit", query: "What is the divine nature and work of the Holy Spirit?" },
      { label: "Monasticism", query: "What is the significance of monastic life as shown in the Life of Anthony?" },
    ],
    defaultOverview: `Athanasius of Alexandria was the great defender of Nicene orthodoxy against Arianism, earning the title "Athanasius contra mundum." His On the Incarnation is a masterpiece of early Christology, arguing that the Word became flesh to restore the divine image in humanity. He suffered five exiles for his defense of the full divinity of Christ. His Life of Anthony founded the literary genre of hagiography and shaped monasticism. Key theological commitments: full consubstantiality of the Son, deification (theosis) as the goal of salvation, the Holy Spirit as fully divine.`,
  },

  basil: {
    id: "basil", name: "Basil of Caesarea", era: "330–379 AD", tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: ["On the Holy Spirit", "Hexameron", "Letters", "Longer Rules", "Against Eunomius"],
    topics: [
      { label: "The Holy Spirit", query: "What is the full divinity and procession of the Holy Spirit?" },
      { label: "Six Days of Creation", query: "How do you interpret the Hexameron — the six days of creation?" },
      { label: "Monastic Rules", query: "What are the principles of authentic Christian monastic community?" },
      { label: "Christian Poverty", query: "What is the Christian obligation to the poor and the proper use of wealth?" },
      { label: "Against Eunomius", query: "How do you refute Eunomian theology about the unknowability of God?" },
      { label: "The Trinity", query: "How do you understand the unity and distinction of the three divine persons?" },
    ],
    defaultOverview: `Basil of Caesarea, one of the Cappadocian Fathers, was bishop, theologian, monastic founder, and social reformer. His On the Holy Spirit was decisive in establishing the full divinity of the Spirit. The Basilian monastic rules shaped Eastern monasticism and influenced Benedict in the West. His Hexameron blends scientific knowledge with theological reflection on creation. He founded hospitals and organized relief for the poor on a scale unprecedented in the ancient world. Key commitments: the full Trinity, the dignity of the poor, communal monasticism, theological precision against Neo-Arianism.`,
  },

  gregory_nyssa: {
    id: "gregory_nyssa", name: "Gregory of Nyssa", era: "335–395 AD", tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: ["Life of Moses", "On the Soul and Resurrection", "Against Eunomius", "Commentary on the Song of Songs"],
    topics: [
      { label: "The Life of Moses", query: "How does the life of Moses serve as a pattern for the soul's ascent to God?" },
      { label: "Epektasis", query: "What is the endless progress of the soul into God — epektasis?" },
      { label: "The Soul and Resurrection", query: "What is the nature of the soul and what happens at the resurrection?" },
      { label: "Song of Songs", query: "What is the mystical meaning of the Song of Songs?" },
      { label: "Universal Salvation", query: "What do you teach about the final restoration of all things?" },
      { label: "The Image of God", query: "What does it mean that humanity is created in the image of God?" },
    ],
    defaultOverview: `Gregory of Nyssa was the most philosophically sophisticated of the Cappadocian Fathers and the founder of Christian mystical theology as a systematic discipline. His doctrine of epektasis — the soul's endless progress into the infinite God — transformed Greek philosophy's static vision of beatitude into a dynamic movement of love. His Life of Moses and Commentary on the Song of Songs are foundational mystical texts. He pushed toward universal salvation (apokatastasis) more explicitly than most. Key commitments: infinite divine transcendence, the soul's perpetual ascent, the resurrection of the body, Trinitarian theology.`,
  },

  gregory_naz: {
    id: "gregory_naz", name: "Gregory Nazianzen", era: "329–390 AD", tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: ["Theological Orations", "Orations", "Poems", "Letters"],
    topics: [
      { label: "The Five Theological Orations", query: "What are the proper methods and boundaries of theological discourse about God?" },
      { label: "The Trinity", query: "How do you articulate the unity and distinction of Father, Son, and Holy Spirit?" },
      { label: "The Incarnation", query: "What is the meaning of God becoming flesh in Christ?" },
      { label: "Pastoral Care", query: "What are the responsibilities and burdens of the Christian pastor?" },
      { label: "The Holy Spirit", query: "Why must the Holy Spirit be confessed as fully divine and consubstantial?" },
      { label: "Christian Poetry", query: "What is the proper role of beauty and poetry in theological expression?" },
    ],
    defaultOverview: `Gregory Nazianzen, called "the Theologian" by the Eastern Church, was the great orator and poet of the Cappadocian synthesis. His Five Theological Orations are the definitive patristic statement on proper theological method and Trinitarian doctrine. He presided over the Council of Constantinople (381) that finalized Nicene orthodoxy. His theological poetry is unparalleled in the patristic period. He was deeply ambivalent about ecclesiastical politics and resigned his see rather than compromise theological integrity. Key commitments: precise Trinitarian language, the limitations of human theological knowing, the pastoral weight of episcopal office.`,
  },

  tertullian: {
    id: "tertullian", name: "Tertullian", era: "155–240 AD", tradition: "Western",
    color: "#c9a96e",
    keyWorks: ["Apologeticus", "Against Marcion", "On the Prescription of Heretics", "On the Trinity", "On Baptism"],
    topics: [
      { label: "Against Marcion", query: "How do you refute Marcion's rejection of the Old Testament and his dualistic theology?" },
      { label: "The Trinity", query: "What is your understanding of the three persons and one substance of God?" },
      { label: "Baptism", query: "What is the theology and practice of Christian baptism?" },
      { label: "Against Heresy", query: "What is the rule of faith and how does it protect against heresy?" },
      { label: "Christian and Rome", query: "How should Christians relate to the Roman Empire and pagan culture?" },
      { label: "The Resurrection", query: "Why must the physical body be resurrected at the last day?" },
    ],
    defaultOverview: `Tertullian was the founder of Latin Christian theology and the first to use the term "Trinity" (trinitas). His fierce, rhetorical Latin forged the vocabulary of Western theology. He was a brilliant apologist for Christianity against pagan persecution and a fierce polemicist against Gnostic and Marcionite heresies. His later Montanist rigorism led him to schism, but his theological legacy is foundational. He pioneered legal and juridical categories for theology — sin as debt, satisfaction, merit — that shaped Augustine and the entire Western tradition. Key works: Apologeticus, Against Marcion (5 books), On the Prescription of Heretics.`,
  },

  irenaeus: {
    id: "irenaeus", name: "Irenaeus of Lyon", era: "130–202 AD", tradition: "Western",
    color: "#c9a96e",
    keyWorks: ["Against Heresies", "Demonstration of the Apostolic Preaching"],
    topics: [
      { label: "Against Gnosticism", query: "How do you refute the Gnostic systems and their rejection of the material world?" },
      { label: "Recapitulation", query: "What is the meaning of Christ's recapitulation — summing up all things in himself?" },
      { label: "The Rule of Faith", query: "What is the apostolic rule of faith handed down through the bishops?" },
      { label: "Scripture and Tradition", query: "How do scripture and apostolic tradition work together against heresy?" },
      { label: "Creation is Good", query: "Why must we affirm the goodness of material creation against the Gnostics?" },
      { label: "The Two Testaments", query: "How do the Old and New Testaments form one unified revelation?" },
    ],
    defaultOverview: `Irenaeus of Lyon was the first great systematic theologian of Christianity and the decisive opponent of Gnosticism. His Against Heresies (5 books) remains the most comprehensive refutation of second-century Gnostic systems. His theology of recapitulation — Christ summing up and restoring all that Adam lost — is one of the most profound atonement theologies in the tradition. He insisted on the goodness of creation, the resurrection of the body, and the unity of the two Testaments against Gnostic dualism. He established the fourfold Gospel canon and the authority of apostolic succession. The foundation of what later became Catholic theology.`,
  },

  clement_alex: {
    id: "clement_alex", name: "Clement of Alexandria", era: "150–215 AD", tradition: "Alexandrian",
    color: "#7eb8c9",
    keyWorks: ["Protrepticus", "Paedagogus", "Stromata", "Who is the Rich Man that is Saved?"],
    topics: [
      { label: "Faith and Philosophy", query: "What is the proper relationship between Christian faith and Greek philosophy?" },
      { label: "The True Gnostic", query: "What is the Christian understanding of true gnosis — spiritual knowledge?" },
      { label: "The Logos", query: "How does the divine Logos illuminate all human reason and prepare for the Gospel?" },
      { label: "Wealth and Salvation", query: "Can a rich man be saved? What is the Christian view of wealth?" },
      { label: "Christian Education", query: "How does the Logos as Paedagogus educate and form the Christian soul?" },
      { label: "Allegory in Scripture", query: "How should scripture be read allegorically to find its deeper meaning?" },
    ],
    defaultOverview: `Clement of Alexandria was the first major Christian intellectual to engage seriously with Greek philosophy, arguing that philosophy was a preparation for the Gospel just as the Law was for the Jews. He taught at the Catechetical School of Alexandria and preceded Origen there. His Stromata (Miscellanies) is a wide-ranging engagement with philosophy, gnosis, and Christian life. He developed the idea of the "true Gnostic" — the Christian who has attained genuine spiritual knowledge through virtue and contemplation. Key themes: the Logos as universal teacher, the compatibility of faith and reason, allegorical exegesis, the moral formation of the Christian.`,
  },

  leo_great: {
    id: "leo_great", name: "Leo the Great", era: "400–461 AD", tradition: "Western",
    color: "#c9a96e",
    keyWorks: ["Tome of Leo", "Sermons", "Letters"],
    topics: [
      { label: "The Tome of Leo", query: "What is the Christological teaching of your letter to Flavian on the two natures of Christ?" },
      { label: "Papal Authority", query: "What is the authority of the Bishop of Rome as successor of Peter?" },
      { label: "The Incarnation", query: "How are the divine and human natures united without confusion in one person?" },
      { label: "Christmas", query: "What is the theological significance of the nativity of Christ?" },
      { label: "Peter's Confession", query: "What is the meaning of Peter's confession and what authority does it establish?" },
      { label: "Against Eutyches", query: "Why is Eutyches wrong to confuse the two natures of Christ into one?" },
    ],
    defaultOverview: `Leo the Great was the first pope to exercise primacy in a fully developed form and the decisive voice at the Council of Chalcedon (451). His Tome — a letter on the two natures of Christ — was read at Chalcedon as authoritative, with the council acclaiming "Peter has spoken through Leo." His sermons on the Christian year are masterpieces of Latin theological rhetoric. He saved Rome from Attila the Hun through personal negotiation. Key theological commitments: the Petrine primacy of Rome, the Chalcedonian two-nature Christology, the unity of person in Christ, the liturgical formation of the Christian year.`,
  },

  gregory_great: {
    id: "gregory_great", name: "Gregory the Great", era: "540–604 AD", tradition: "Western",
    color: "#c9a96e",
    keyWorks: ["Pastoral Rule", "Moralia on Job", "Dialogues", "Homilies on Ezekiel", "Homilies on the Gospels"],
    topics: [
      { label: "Pastoral Care", query: "What are the principles of the pastor's care for souls in the Pastoral Rule?" },
      { label: "Moralia on Job", query: "What is the spiritual meaning of the book of Job?" },
      { label: "Contemplation and Action", query: "How should the contemplative and active lives be balanced in the Christian?" },
      { label: "Angels and Demons", query: "What is the role of angels and demons in the spiritual life?" },
      { label: "Purgatory", query: "What happens to souls after death who are not yet fully purified?" },
      { label: "Preaching", query: "What are the principles of effective Christian preaching to the people?" },
    ],
    defaultOverview: `Gregory the Great was the last of the Latin Fathers and one of the most influential figures in medieval Western Christianity. His Pastoral Rule became the handbook for episcopal ministry throughout the Middle Ages. His Moralia on Job — a massive allegorical commentary — shaped Western theological method for centuries. He consolidated papal authority, reformed the liturgy, sent Augustine of Canterbury to England, and navigated the crisis of the Lombard invasions. His theology of purgatory, angels, and the spiritual life deeply shaped popular Western Christianity. The bridge between the patristic period and the medieval church.`,
  },

  cassian: {
    id: "cassian", name: "John Cassian", era: "360–435 AD", tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: ["Institutes", "Conferences", "On the Incarnation"],
    topics: [
      { label: "The Eight Vices", query: "What are the eight principal vices or thoughts that attack the monk?" },
      { label: "Conferences with the Desert Fathers", query: "What did you learn from the Egyptian desert fathers about the interior life?" },
      { label: "Prayer", query: "What is the nature of pure, unceasing prayer and how is it attained?" },
      { label: "Monastic Discipline", query: "What are the practical rules for the ordering of monastic life?" },
      { label: "Grace and Free Will", query: "How do divine grace and human free will cooperate in salvation?" },
      { label: "Acedia", query: "What is the vice of acedia — spiritual torpor — and how does one overcome it?" },
    ],
    defaultOverview: `John Cassian transmitted the spirituality of the Egyptian desert fathers to the Latin West. His Institutes and Conferences are the foundational texts of Western monasticism — Benedict required the Conferences to be read aloud daily in his monasteries. Cassian brought Evagrian psychology (the eight thoughts) to the West, where it became the seven deadly sins. His semi-Pelagian position on grace — that human will cooperates with grace — became standard in the West until Augustine's influence hardened. He is the primary channel through which Eastern mystical and ascetic tradition entered the medieval West.`,
  },

  eusebius: {
    id: "eusebius", name: "Eusebius of Caesarea", era: "260–339 AD", tradition: "Eastern",
    color: "#a97eb8",
    keyWorks: ["Ecclesiastical History", "Life of Constantine", "Preparation for the Gospel", "Proof of the Gospel"],
    topics: [
      { label: "Church History", query: "How does the Ecclesiastical History trace the providential development of the church?" },
      { label: "Constantine and the Church", query: "What is the significance of Constantine's conversion for the church?" },
      { label: "The Canon of Scripture", query: "Which books are universally accepted as scripture and which are disputed?" },
      { label: "Christian Apologetics", query: "How does Christianity fulfill and surpass Greek philosophy and Jewish scripture?" },
      { label: "The Logos in History", query: "How has the divine Logos been present throughout human history before the Incarnation?" },
      { label: "Martyrdom", query: "What is the theological significance of the martyrs in the history of the church?" },
    ],
    defaultOverview: `Eusebius of Caesarea was the father of church history and the most important historian of early Christianity. His Ecclesiastical History is an indispensable source for the first three centuries of the church. He was present at the Council of Nicaea, where his subordinationist Christology was shaped toward Nicene orthodoxy. His Life of Constantine idealized the emperor as a new Moses and set the pattern for Christian political theology. His Preparation for the Gospel and Proof of the Gospel are the most extensive early Christian engagement with classical philosophy. His preservation of earlier sources makes him essential for patristic scholarship.`,
  },
};

export const getAllFathersIncludingExtended = () => ({
  ...FATHERS,
  ...EXTENDED_FATHERS,
});
