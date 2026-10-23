import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Download,
  Menu,
  Moon,
  Phone,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import {
  contactLinks,
  journey,
  navigation,
  profile,
  projects,
  skillGroups,
  strengths,
} from "./data/portfolio";
import type { Project } from "./data/portfolio";
import AmbientCanvas from "./components/AmbientCanvas";

type Theme = "dark" | "light";
const assetUrl = (fileName: string) => `${import.meta.env.BASE_URL}${fileName}`;

function ProfileAvatar({
  buttonRef,
  onClick,
}: {
  buttonRef: RefObject<HTMLButtonElement>;
  onClick: () => void;
}) {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <button
      className="brand-mark profile-avatar"
      type="button"
      ref={buttonRef}
      aria-label="Agrandir la photo de profil"
      onClick={onClick}
      disabled={!photoLoaded}
    >
      {photoLoaded ? (
        <img src={assetUrl("profile-photo.jpeg")} alt="" onError={() => setPhotoLoaded(false)} />
      ) : (
        <span>MM</span>
      )}
    </button>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  number,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  number: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="section-number" aria-hidden="true">{number}</span>
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <div className={`project-preview preview-${project.preview.replaceAll(" ", "")}`} aria-label={`Aperçu graphique du projet ${project.name}`}>
      <div className="preview-window">
        <div className="preview-topbar">
          <span className="preview-dots"><i /><i /><i /></span>
          <span className="preview-url">{project.name.toLowerCase().replaceAll(" ", "")}.project</span>
          <span className="preview-menu">•••</span>
        </div>
        {project.preview === "nexus" && (
          <div className="nexus-scene">
            <div className="nexus-title"><span className="nexus-symbol">N</span><span><b>NEXUS HUB</b><small>API · BACK-END</small></span></div>
            <div className="nexus-flow">
              <span>Express<br /><small>API</small></span>
              <i />
              <span>Prisma<br /><small>ORM</small></span>
              <i />
              <span>PostgreSQL<br /><small>DATA</small></span>
            </div>
            <div className="nexus-status"><span /> SERVICE EN COURS DE DÉVELOPPEMENT</div>
          </div>
        )}
        {project.preview === "mentorlink" && (
          <div className="mentor-scene">
            <div className="mock-sidebar"><b>m.</b><i /><i /><i /><i /></div>
            <div className="mock-content">
              <span className="mock-kicker">ESPACE ÉTUDIANT</span>
              <b>Grandir ensemble.</b>
              <div className="mentor-card"><span className="avatar-orb">A</span><span><b>Votre communauté</b><small>Mentorat · Entraide</small></span><ArrowUpRight size={14} /></div>
              <div className="mentor-lines"><i /><i /><i /></div>
            </div>
          </div>
        )}
        {project.preview === "aliyo" && (
          <div className="aliyo-scene">
            <span className="mock-kicker">APRÈS LE BAC</span>
            <div className="aliyo-title">Et maintenant,<br /><em>quel chemin ?</em></div>
            <div className="aliyo-search"><span>Explorer les possibilités</span><ArrowRight size={14} /></div>
            <div className="aliyo-pills"><i>Études</i><i>Orientation</i><i>Conseils</i></div>
          </div>
        )}
        {project.preview === "basilic" && (
          <div className="basilic-scene">
            <div className="basilic-nav"><span>LE BASILIC</span><small>NOTRE CARTE　 LE LIEU</small></div>
            <div className="basilic-image"><span className="plate-art"><i /><i /><i /></span><span className="basilic-script">la table<br />est à vous</span></div>
            <span className="basilic-caption">CUISINE DE SAISON · DEPUIS TOUJOURS</span>
          </div>
        )}
        {project.preview === "momofood" && (
          <div className="momo-scene">
            <span className="mock-kicker">BONJOUR, GOURMAND·E</span>
            <b className="momo-title">Un bon repas,<br />juste à côté.</b>
            <div className="momo-card"><span className="momo-food-art">✳</span><span><b>À découvrir près de vous</b><small>Commande · Livraison</small></span><ArrowUpRight size={14} /></div>
            <div className="momo-bottom"><i /><i /><i /><i /></div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className={`project-card project-card-${index + 1}`} delay={(index % 2) * 0.08}>
      <ProjectPreview project={project} />
      <div className="project-content">
        <div className="project-meta">
          <span className={`project-category category-${project.category.toLowerCase().replaceAll(" ", "-")}`}>{project.category}</span>
          {project.year && <span className="project-year">{project.year}</span>}
        </div>
        <div className="project-title-row">
          <h3>{project.name}</h3>
          {project.url && (
            <a className="project-open" href={project.url} target="_blank" rel="noreferrer" aria-label={`Voir le projet ${project.name} (nouvel onglet)`}>
              <ArrowUpRight size={19} />
            </a>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <p className="project-role">{project.role}</p>
        {project.contributions && (
          <ul className="project-contributions">
            {project.contributions.map((item) => <li key={item}>{item}</li>)}
          </ul>
        )}
        {project.technologies && (
          <div className="project-tags" aria-label="Technologies utilisées">
            {project.technologies.map((item) => <span key={item}>{item}</span>)}
          </div>
        )}
        <div className="project-footer">
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="text-link">
              Voir le projet <ArrowUpRight size={15} />
            </a>
          )}
          <span className="project-index">0{index + 1}</span>
        </div>
      </div>
    </Reveal>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme === "light" ? "light" : "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const reduceMotion = useReducedMotion();
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const photoWasOpen = useRef(false);

  useEffect(() => {
    if (!photoOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setPhotoOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photoOpen]);

  useEffect(() => {
    if (photoWasOpen.current && !photoOpen) avatarButtonRef.current?.focus();
    photoWasOpen.current = photoOpen;
  }, [photoOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sectionElements = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.3, 0.6] },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
        setShowTop(window.scrollY > 640);
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const senderName = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const emailSubject = encodeURIComponent(subject || `Message de ${senderName}`);
    const body = encodeURIComponent(`${message}\n\nDe : ${senderName}\nE-mail : ${senderEmail}`);
    window.location.href = `mailto:${profile.email}?subject=${emailSubject}&body=${body}`;
  }

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <AmbientCanvas />
      <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      <header className="site-header">
        <div className="brand">
          <ProfileAvatar buttonRef={avatarButtonRef} onClick={() => setPhotoOpen(true)} />
          <a className="brand-name" href="#accueil" aria-label="Marie-Merveille, accueil">Marie-Merveille</a>
        </div>
        <nav id="main-navigation" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Navigation principale">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href.slice(1) ? "active" : ""}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-cta mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Parlons ensemble <ArrowUpRight size={15} />
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
            title={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta desktop-cta" href="#contact">Parlons ensemble <ArrowUpRight size={15} /></a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="contenu">
        <section id="accueil" className="hero section-shell">
          <div className="hero-copy">
            <Reveal>
              <span className="hero-overline"><span className="availability-dot" /> BONJOUR, JE SUIS</span>
              <h1>Marie-<br /><span>Merveille</span><i className="hero-period">.</i></h1>
              <p className="hero-role">Développeuse web <span>front-end & back-end</span><br />Étudiante en Intelligence Artificielle</p>
              <p className="hero-description">{profile.introduction}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projets">Découvrir mes projets <ArrowDownRight size={17} /></a>
                <a className="button button-quiet" href="#contact">Me contacter <ArrowUpRight size={16} /></a>
              </div>
              <a className="cv-link" href={assetUrl("cv-marie-merveille.docx")} download="CV-Marie-Merveille-Gbaguidi.docx">
                <Download size={14} /> Télécharger mon CV <span>· Word</span>
              </a>
            </Reveal>
          </div>
          <Reveal className="hero-visual-wrap" delay={0.18}>
            <div className="hero-visual" aria-label="Composition abstraite évoquant l'intelligence artificielle et la créativité">
              <div className="visual-grid" />
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-orbit orbit-three" />
              <motion.div
                className="visual-core"
                animate={reduceMotion ? undefined : { rotate: [0, 3, 0, -3, 0], y: [0, -7, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="core-glow" />
                <span className="core-letter">MM<span>.</span></span>
                <span className="core-spark spark-one"><Sparkles size={16} /></span>
                <span className="core-spark spark-two">✳</span>
              </motion.div>
              <div className="visual-chip chip-ai"><span className="chip-icon"><Sparkles size={13} /></span> front · back</div>
              <div className="visual-chip chip-code"><Code2 size={14} /> Node.js · Express</div>
              <div className="visual-caption"><span>IFRI</span><i /> Informatique · Intelligence artificielle</div>
            </div>
            <span className="visual-side-note">COTONOU · BÉNIN</span>
          </Reveal>
          <div className="hero-bottom">
            <span>Étudiante à l'IFRI · Bénin</span>
            <a href="#apropos">Faire défiler <ArrowDown size={14} /></a>
            <span>06°26' N — 02°20' E</span>
          </div>
        </section>

        <section id="apropos" className="section-shell section-block about-section">
          <Reveal>
            <SectionHeading
              eyebrow="QUI JE SUIS"
              title={<>Un peu plus<br /><em>sur moi.</em></>}
              description="Informatique à l'IFRI, développement web et IA."
              number="01"
            />
          </Reveal>
          <div className="about-layout">
            <Reveal className="about-intro">
              <span className="about-mark">“</span>
              <p>{profile.about}</p>
            </Reveal>
            <div className="strength-grid">
              {strengths.map(({ title, description, icon: Icon }, index) => (
                <Reveal key={title} delay={index * 0.08}>
                  <article className="strength-card">
                    <div className="strength-top"><span>0{index + 1}</span><Icon size={19} strokeWidth={1.5} /></div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <ArrowDownRight className="strength-arrow" size={17} />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="competences" className="section-shell section-block skills-section">
          <Reveal>
            <SectionHeading
              eyebrow="MA BOÎTE À OUTILS"
              title={<>Mes <em>compétences.</em></>}
              description="Langages, technologies et outils utilisés dans mes projets."
              number="02"
            />
          </Reveal>
          <div className="skills-layout">
            {skillGroups.map((group, groupIndex) => (
              <Reveal className="skill-group" key={group.title} delay={groupIndex * 0.08}>
                <div className="skill-group-heading"><span>0{groupIndex + 1}</span><h3>{group.title}</h3></div>
                <div className="skill-list">
                  {group.items.map((skill) => (
                    <span className="skill-pill" key={skill.name}>{skill.name}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="projets" className="section-shell section-block projects-section">
          <Reveal>
            <SectionHeading
              eyebrow="SÉLECTION DE PROJETS"
              title={<>Projets &<br /><em>collaborations.</em></>}
              description="Une sélection de projets personnels, académiques et professionnels."
              number="03"
            />
          </Reveal>
          <div className="projects-grid">
            {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
          </div>
          <Reveal className="projects-outro">
            <a href={profile.github} target="_blank" rel="noreferrer">Retrouver mon GitHub <ArrowUpRight size={15} /></a>
          </Reveal>
        </section>

        <section id="parcours" className="section-shell section-block journey-section">
          <Reveal>
            <SectionHeading
              eyebrow="EN CHEMIN"
              title={<>Mon <em>parcours.</em></>}
              description="Formation, projets d'équipe et première expérience en entreprise."
              number="04"
            />
          </Reveal>
          <div className="journey-layout">
            <Reveal className="journey-aside">
              <span className="journey-aside-icon"><Code2 size={20} /></span>
              <h3>Apprendre,<br /><em>puis construire.</em></h3>
              <p>De ma formation à l'IFRI à mon stage chez Snow Solution Now, je progresse en construisant des projets concrets.</p>
              <span className="journey-location">COTONOU, BÉNIN <i /> EN COURS</span>
            </Reveal>
            <div className="timeline">
              {journey.map(({ date, title, place, icon: Icon }, index) => (
                <Reveal key={title} delay={index * 0.1}>
                  <article className="timeline-item">
                    <div className="timeline-marker"><Icon size={15} /></div>
                    <div className="timeline-content">
                      <span className="timeline-date">{date}</span>
                      <h3>{title}</h3>
                      <p>{place}</p>
                    </div>
                    <span className="timeline-index">0{index + 1}</span>
                  </article>
                </Reveal>
              ))}
              <div className="timeline-end"><span /> La suite s'écrit maintenant</div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-shell section-block contact-section">
          <Reveal>
            <SectionHeading
              eyebrow="ET SI ON ÉCHANGEAIT ?"
              title={<>Et si nous<br /><em>collaborions ?</em></>}
              description="Pour une collaboration, une opportunité ou une question, vous pouvez m'écrire."
              number="05"
            />
          </Reveal>
          <div className="contact-layout">
            <Reveal className="contact-card">
              <span className="contact-card-icon"><Send size={19} /></span>
              <span className="contact-kicker">UN MOT SUFFIT</span>
              <h3>Commençons<br />par <em>bonjour.</em></h3>
              <p>Je réponds avec plaisir aux messages liés au développement web, aux projets et aux opportunités.</p>
              <a className="button button-primary contact-main-link" href={`mailto:${profile.email}`}>
                Envoyez-moi un message <ArrowUpRight size={16} />
              </a>
              <div className="contact-links">
                {contactLinks.map(({ label, value, href, phoneHref, icon: Icon }) => (
                  <div className="contact-link-row" key={label}>
                    <span className="contact-link-icon"><Icon size={15} /></span>
                    <span className="contact-link-label">{label}</span>
                    <span className="contact-link-actions">
                      <a href={href} target={label === "GitHub" || label === "WhatsApp" ? "_blank" : undefined} rel={label === "GitHub" || label === "WhatsApp" ? "noreferrer" : undefined}>{value}<ArrowUpRight size={12} /></a>
                      {phoneHref && <a href={phoneHref} aria-label={`Appeler le ${value}`}><Phone size={12} /> Appeler</a>}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="contact-form-wrap" delay={0.12}>
              <div className="form-heading">
                <span className="eyebrow"><span className="eyebrow-dot" /> FORMULAIRE DE CONTACT</span>
                <p>Votre message sera préparé dans votre application e-mail. Rien n'est envoyé ni stocké sur ce site.</p>
              </div>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <label>Votre nom<input name="name" autoComplete="name" required placeholder="Comment vous appelez-vous ?" /></label>
                  <label>Votre e-mail<input name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" /></label>
                </div>
                <label>Sujet<input name="subject" required placeholder="De quoi souhaitez-vous parler ?" /></label>
                <label>Votre message<textarea name="message" required rows={4} placeholder="Racontez-moi..." /></label>
                <button className="button button-primary form-submit" type="submit">Préparer mon e-mail <ArrowUpRight size={16} /></button>
              </form>
            </Reveal>
          </div>
        </section>

        <section className="closing-band section-shell" aria-label="Conclusion">
          <Reveal className="closing-inner">
            <span>MARIE-MERVEILLE · COTONOU</span>
            <p>Des interfaces au serveur.<br /><em>Je construis pour le web.</em></p>
            <span>MM. <Sparkles size={14} /></span>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="brand footer-brand" href="#accueil"><span className="brand-mark">M<span>.</span></span><span className="brand-name">Marie-Merveille</span></a>
        <span>© {new Date().getFullYear()} · Designed by Merveille</span>
        <a href="#accueil" className="footer-top">Retour en haut <ArrowUp size={14} /></a>
      </footer>

      <button
        className={`back-to-top${showTop ? " is-visible" : ""}`}
        type="button"
        aria-label="Retour en haut de page"
        onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" })}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={17} />
      </button>

      {photoOpen && (
        <div
          className="photo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo de profil de Marie-Merveille"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPhotoOpen(false);
          }}
        >
          <button
            className="photo-lightbox-close"
            type="button"
            aria-label="Fermer la photo"
            onClick={() => setPhotoOpen(false)}
            autoFocus
          >
            <X size={20} />
          </button>
          <img src={assetUrl("profile-photo.jpeg")} alt="Portrait de Marie-Merveille" />
        </div>
      )}
    </>
  );
}

export default App;
