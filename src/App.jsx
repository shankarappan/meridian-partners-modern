import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Buildings,
  CaretRight,
  Check,
  EnvelopeSimple,
  GraduationCap,
  HouseLine,
  List,
  MapPin,
  PenNib,
  Phone,
  Scales,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import { articles } from "./data/articles.js";

const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

const serviceItems = [
  {
    label: "Tax disputes & IRD negotiation",
    icon: Scales,
    href: "https://mplaw.nz/tax-disputes-ird-negotiation/",
  },
  {
    label: "Student loan debt & penalties",
    icon: GraduationCap,
    href: "https://mplaw.nz/student-loan-debt-ird-negotiation/",
  },
  {
    label: "Commercial litigation",
    icon: Buildings,
    href: "https://mplaw.nz/services-meridian-partners/",
  },
  {
    label: "Property",
    icon: HouseLine,
    href: "https://mplaw.nz/acquisitions-and-sales-property-business/",
  },
  {
    label: "Family law",
    icon: UsersThree,
    href: "https://mplaw.nz/services-meridian-partners/",
  },
  {
    label: "Notary public",
    icon: PenNib,
    href: "https://mplaw.nz/notary-public-auckland/",
  },
];

const team = [
  {
    name: "Adelina Ong",
    role: "Partner & Notary Public",
    image: asset("adelina-ong.webp"),
    href: "https://mplaw.nz/about/adelina-ong/",
  },
  {
    name: "Dave Ananth",
    role: "Partner, Tax Disputes",
    image: asset("dave-ananth.webp"),
    href: "https://mplaw.nz/about/dave-ananth/",
  },
  {
    name: "Arvind Nair",
    role: "Partner, Commercial Litigation",
    image: asset("arvind-nair.webp"),
    href: "https://mplaw.nz/about/arvind-nair/",
  },
  {
    name: "Michelle Delegat",
    role: "Solicitor, Family Law",
    image: asset("michelle-delegat.webp"),
    href: "https://mplaw.nz/about/michelle-delegat/",
  },
];

const bookingHref = "https://mplaw.nz/book-a-consultation/";

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? "logo--light" : ""}`} href="#top" aria-label="Meridian Partners home">
      <img src={asset("meridian-logo.png")} width="210" height="110" alt="Meridian Partners, Barristers and Solicitors" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = menuRef.current?.querySelectorAll("a, button");
    focusable?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key === "Tab" && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#people">Our people</a>
          <a href="#insights">Articles & media</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button--gold header-cta" href={bookingHref} target="_blank" rel="noreferrer">
          Book a free <span>10-minute consultation</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </div>
      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-menu" ref={menuRef} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <a href="#expertise" onClick={closeMenu}>Expertise</a>
          <a href="#people" onClick={closeMenu}>Our people</a>
          <a href="#insights" onClick={closeMenu}>Articles & media</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="button button--gold" href={bookingHref} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Book a free consultation
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-copy-inner">
          <p className="eyebrow eyebrow--light">Auckland-based legal counsel</p>
          <h1 id="hero-title">Practical counsel.<br /><em>Clear direction.</em></h1>
          <span className="gold-rule" aria-hidden="true" />
          <p className="hero-lede">Legal experts helping individuals, families, and businesses resolve complex issues and move forward with confidence.</p>
          <div className="hero-actions">
            <a className="button button--gold" href={bookingHref} target="_blank" rel="noreferrer">Book a free consultation</a>
            <a className="text-link text-link--gold" href="#expertise">Explore our expertise <ArrowRight size={17} /></a>
          </div>
        </div>
      </div>
      <figure className="hero-image">
        <img src={asset("auckland-skyline.jpg")} width="1056" height="1280" alt="Auckland skyline and Sky Tower viewed across the harbour at night" />
      </figure>
    </section>
  );
}

function Expertise() {
  return (
    <section className="expertise section" id="expertise" aria-labelledby="expertise-title">
      <div className="shell expertise-grid">
        <div className="expertise-intro">
          <p className="eyebrow">Legal expertise</p>
          <h2 id="expertise-title">How can we help?</h2>
          <p>Find the right expertise for your situation.</p>
        </div>
        <div className="service-list">
          {serviceItems.map(({ label, icon: Icon, href }) => (
            <a className="service-item" key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={34} weight="thin" aria-hidden="true" />
              <span>{label}</span>
              <ArrowRight size={19} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function DaveProfile() {
  return (
    <section className="dave section section--soft" id="about" aria-labelledby="dave-title">
      <div className="shell dave-grid">
        <div className="dave-story">
          <p className="eyebrow">Why Meridian</p>
          <h2>Focused expertise.<br />Human understanding.</h2>
          <p>We combine deep legal knowledge with practical experience to deliver clear advice and effective solutions. Our approach is calm, commercial, and tailored to your circumstances.</p>
          <a className="button button--outline" href="https://mplaw.nz/about-meridian-partners/" target="_blank" rel="noreferrer">
            About Meridian Partners <CaretRight size={17} />
          </a>
        </div>
        <figure className="dave-portrait">
          <img src={asset("dave-ananth.webp")} width="1200" height="1200" alt="Dave Ananth, Partner at Meridian Partners" loading="lazy" />
        </figure>
        <div className="dave-profile">
          <p className="eyebrow">Meet our lead tax lawyer</p>
          <h2 id="dave-title">Meet Dave Ananth</h2>
          <ul className="credentials">
            <li><Check size={20} weight="bold" aria-hidden="true" /> Former Inland Revenue prosecutor</li>
            <li><Check size={20} weight="bold" aria-hidden="true" /> 35+ years’ legal experience</li>
          </ul>
          <p>Dave leads Meridian’s tax and IRD practice, bringing rare institutional knowledge to disputes, negotiations, and resolutions.</p>
          <a className="text-link" href="https://mplaw.nz/about/dave-ananth/" target="_blank" rel="noreferrer">View Dave’s profile <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="team section" id="people" aria-labelledby="team-title">
      <div className="shell team-grid">
        <div className="team-intro">
          <p className="eyebrow">Our team</p>
          <h2 id="team-title">Experienced lawyers.<br />Focused on you.</h2>
          <a className="text-link" href="https://mplaw.nz/about-meridian-partners/" target="_blank" rel="noreferrer">Meet our people <ArrowRight size={17} /></a>
        </div>
        <div className="team-list">
          {team.map((person) => (
            <a className="person" key={person.name} href={person.href} target="_blank" rel="noreferrer">
              <img src={person.image} width="1200" height="1200" alt="" loading="lazy" />
              <span className="person-overlay">
                <strong>{person.name}</strong>
                <small>{person.role}</small>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? articles : articles.filter((article) => article.category === filter);
  const lead = filtered[0];
  const supporting = filtered.slice(1, 5);

  return (
    <section className="insights section section--soft" id="insights" aria-labelledby="insights-title">
      <div className="shell">
        <div className="section-heading insights-heading">
          <div>
            <p className="eyebrow">Insights</p>
            <h2 id="insights-title">Articles & media</h2>
          </div>
          <div className="filters" role="group" aria-label="Filter articles">
            {["All", "Analysis", "Media", "Updates"].map((label) => (
              <button className={filter === label ? "is-active" : ""} key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>
            ))}
          </div>
        </div>

        {lead ? (
          <div className="articles-layout" aria-live="polite">
            <article className="lead-article">
              <a href={lead.href} target="_blank" rel="noreferrer" aria-label={`Read ${lead.title}`}>
                <img src={asset(lead.image ?? "article-auckland-architecture.png")} width="1664" height="944" alt={lead.imageAlt ?? "Contemporary Auckland commercial architecture with the Sky Tower in the distance"} loading="lazy" />
              </a>
              <div className="article-meta"><span>{lead.category}</span><time dateTime={lead.isoDate}>{lead.date}</time></div>
              <h3><a href={lead.href} target="_blank" rel="noreferrer">{lead.title}</a></h3>
              <p>{lead.summary}</p>
              <a className="text-link" href={lead.href} target="_blank" rel="noreferrer">Read article <ArrowRight size={17} /></a>
            </article>
            <div className="article-list">
              {supporting.map((article) => (
                <article className="article-row" key={article.href}>
                  <div className="article-meta"><span>{article.category}</span><time dateTime={article.isoDate}>{article.date}</time></div>
                  <h3><a href={article.href} target="_blank" rel="noreferrer">{article.title}</a></h3>
                  <p>{article.source}</p>
                  <a href={article.href} target="_blank" rel="noreferrer" aria-label={`Read ${article.title}`}><ArrowRight size={18} /></a>
                </article>
              ))}
            </div>
          </div>
        ) : <p className="empty-state">More {filter.toLowerCase()} will be published here soon.</p>}
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="contact-band" id="contact" aria-labelledby="contact-title">
      <div className="shell contact-band-inner">
        <div>
          <p className="eyebrow eyebrow--light">Start with a conversation</p>
          <h2 id="contact-title">Let’s talk.</h2>
          <p>Book a free 10-minute phone consultation to discuss your situation.</p>
        </div>
        <a className="button button--gold" href={bookingHref} target="_blank" rel="noreferrer">Book a free consultation</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Practical legal advice for individuals, families, and businesses across New Zealand.</p>
        </div>
        <div>
          <h2>Expertise</h2>
          <a href="https://mplaw.nz/tax-disputes-ird-negotiation/" target="_blank" rel="noreferrer">Tax & IRD negotiation</a>
          <a href="https://mplaw.nz/student-loan-debt-ird-negotiation/" target="_blank" rel="noreferrer">Student loans</a>
          <a href="https://mplaw.nz/services-meridian-partners/" target="_blank" rel="noreferrer">All services</a>
        </div>
        <div>
          <h2>Meridian</h2>
          <a href="#people">Our people</a>
          <a href="#insights">Articles & media</a>
          <a href="https://mplaw.nz/about-meridian-partners/" target="_blank" rel="noreferrer">About the firm</a>
        </div>
        <address>
          <h2>Contact</h2>
          <a href="mailto:info@mplaw.nz"><EnvelopeSimple size={18} aria-hidden="true" /> info@mplaw.nz</a>
          <a href="tel:+64210216888"><Phone size={18} aria-hidden="true" /> 021 0216 8888</a>
          <a href="https://maps.google.com/?q=97+Great+South+Road+Epsom+Auckland+1051" target="_blank" rel="noreferrer"><MapPin size={18} aria-hidden="true" /> 97 Great South Road, Epsom, Auckland 1051</a>
        </address>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Meridian Partners</p>
        <div><a href="https://mplaw.nz/" target="_blank" rel="noreferrer">Barristers & Solicitors</a><span aria-hidden="true">·</span><a href="https://mplaw.nz/notary-public-auckland/" target="_blank" rel="noreferrer">Notary Public</a></div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main-content">
        <Hero />
        <Expertise />
        <DaveProfile />
        <Team />
        <Insights />
        <ContactBand />
      </main>
      <Footer />
    </>
  );
}
