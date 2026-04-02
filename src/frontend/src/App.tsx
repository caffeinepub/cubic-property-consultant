import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaBath,
  FaBed,
  FaChartLine,
  FaChevronRight,
  FaEnvelope,
  FaHome,
  FaKey,
  FaMapMarkerAlt,
  FaPhone,
  FaRulerCombined,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const WHATSAPP_URL =
  "https://wa.me/918291391217?text=Hello%20Cubic%20Property%20Consultant%2C%20I%20am%20interested%20in%20a%20property";

const properties = [
  {
    id: 1,
    image: "/assets/generated/property-1.dim_600x400.jpg",
    title: "Sea View Penthouse",
    location: "Malabar Hill, Mumbai",
    price: "\u20b98.5 Cr",
    beds: 4,
    baths: 4,
    area: "3,200 sqft",
  },
  {
    id: 2,
    image: "/assets/generated/property-2.dim_600x400.jpg",
    title: "Sky Terrace Residence",
    location: "Worli, Mumbai",
    price: "\u20b912 Cr",
    beds: 5,
    baths: 5,
    area: "4,500 sqft",
  },
  {
    id: 3,
    image: "/assets/generated/property-3.dim_600x400.jpg",
    title: "Luxury 3BHK Apartment",
    location: "Bandra West, Mumbai",
    price: "\u20b94.2 Cr",
    beds: 3,
    baths: 3,
    area: "1,850 sqft",
  },
  {
    id: 4,
    image: "/assets/generated/property-4.dim_600x400.jpg",
    title: "Premium Villa",
    location: "Juhu, Mumbai",
    price: "\u20b918 Cr",
    beds: 6,
    baths: 6,
    area: "6,000 sqft",
  },
];

function useFadeInObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    for (const el of document.querySelectorAll(".fade-in-up")) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroBgLoaded, setHeroBgLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

  useFadeInObserver();

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/generated/hero-bg.dim_1920x1080.jpg";
    img.onload = () => setHeroBgLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Unable to connect. Please try again.");
      return;
    }
    setSubmitting(true);
    try {
      await actor.submitContactForm(
        formData.name,
        formData.email,
        formData.phone,
        formData.message,
      );
      toast.success("Enquiry sent! Our team will contact you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />

      {/* ======= NAVBAR ======= */}
      <nav
        className={`navbar${scrolled ? " scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              type="button"
              onClick={() => scrollTo("hero")}
              className="flex items-center gap-2.5"
              aria-label="Cubic Property Consultant home"
            >
              <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                C
              </div>
              <span className="text-white font-bold text-sm leading-tight hidden sm:block">
                Cubic Property
                <span className="block font-light text-xs opacity-80">
                  Consultant
                </span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {["hero", "services", "properties", "about", "contact"].map(
                (id) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="nav-link"
                    data-ocid={`nav.${id}.link`}
                  >
                    {id === "hero"
                      ? "Home"
                      : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ),
              )}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="btn-primary hidden md:inline-flex text-xs py-2.5 px-4"
                data-ocid="nav.schedule_viewing.button"
              >
                Schedule a Viewing
              </button>
              <button
                type="button"
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                data-ocid="nav.hamburger.button"
              >
                {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ======= MOBILE MENU ======= */}
      <div
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="absolute top-5 right-5 text-white"
          onClick={() => setMenuOpen(false)}
          data-ocid="mobile_menu.close_button"
        >
          <FaTimes size={26} />
        </button>
        {["hero", "services", "properties", "about", "contact"].map((id) => (
          <button
            type="button"
            key={id}
            onClick={() => scrollTo(id)}
            className="mobile-nav-link"
            data-ocid={`mobile_menu.${id}.link`}
          >
            {id === "hero" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="btn-primary mt-4"
          data-ocid="mobile_menu.schedule_viewing.button"
        >
          Schedule a Viewing
        </button>
      </div>

      {/* ======= HERO ======= */}
      <section id="hero" className="hero-section">
        <div className={`hero-bg${heroBgLoaded ? " loaded" : ""}`} />
        <div className="hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-40">
          <div className="max-w-2xl">
            <p
              className="section-eyebrow text-sm mb-3"
              style={{ color: "#ff9f4a" }}
            >
              Welcome to Cubic Property Consultant
            </p>
            <h1
              className="text-white font-black leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Mumbai's Premier
              <span className="block" style={{ color: "#ff6b00" }}>
                Property Consultants
              </span>
            </h1>
            <p
              className="font-semibold text-lg mb-3"
              style={{ color: "#ff9f4a" }}
            >
              Find Your Dream Home in the City of Dreams.
            </p>
            <p className="text-white/70 text-base mb-10 font-light max-w-lg">
              Curated luxury properties across Mumbai's finest neighborhoods.
              Expert guidance, personalized service.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => scrollTo("properties")}
                className="btn-primary"
                data-ocid="hero.explore_properties.button"
              >
                Explore Properties <FaChevronRight size={11} />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="btn-outline-white"
                data-ocid="hero.contact_us.button"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FLOATING SEARCH BAR ======= */}
      <div className="bg-graybg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="search-card">
            <p className="text-xs font-semibold text-navy/50 uppercase tracking-widest mb-3">
              Quick Property Search
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <select
                className="form-input"
                defaultValue=""
                aria-label="Location"
                data-ocid="search.location.select"
              >
                <option value="" disabled>
                  Location
                </option>
                <option>Bandra</option>
                <option>Juhu</option>
                <option>Worli</option>
                <option>Malabar Hill</option>
                <option>Andheri</option>
              </select>
              <select
                className="form-input"
                defaultValue=""
                aria-label="Property Type"
                data-ocid="search.property_type.select"
              >
                <option value="" disabled>
                  Property Type
                </option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Office</option>
              </select>
              <select
                className="form-input"
                defaultValue=""
                aria-label="Price Range"
                data-ocid="search.price_range.select"
              >
                <option value="" disabled>
                  Price Range
                </option>
                <option>Under &#8377;50L</option>
                <option>&#8377;50L &#8211; &#8377;1Cr</option>
                <option>&#8377;1Cr &#8211; &#8377;5Cr</option>
                <option>Above &#8377;5Cr</option>
              </select>
              <button
                type="button"
                className="btn-primary justify-center"
                data-ocid="search.search.button"
                onClick={() => scrollTo("properties")}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======= SERVICES ======= */}
      <section id="services" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-in-up">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title">Our Premium Services</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaHome />,
                title: "Property Renting",
                desc: "Find the perfect rental home tailored to your lifestyle and budget in Mumbai's finest localities.",
                delay: "delay-1",
                ocid: "services.renting.card",
              },
              {
                icon: <FaChartLine />,
                title: "Property Selling",
                desc: "Maximize your property value with our expert guidance, market insights, and a vast buyer network.",
                delay: "delay-2",
                ocid: "services.selling.card",
              },
              {
                icon: <FaKey />,
                title: "Full Management",
                desc: "End-to-end property management handled for you \u2014 from tenancy to maintenance, seamlessly.",
                delay: "delay-3",
                ocid: "services.management.card",
              },
            ].map((s) => (
              <div
                key={s.title}
                className={`service-card fade-in-up ${s.delay}`}
                data-ocid={s.ocid}
              >
                <div className="service-icon">{s.icon}</div>
                <h3 className="text-navy font-bold text-base tracking-wide uppercase mb-3">
                  {s.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= FEATURED PROPERTIES ======= */}
      <section id="properties" className="bg-graybg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 fade-in-up">
            <p className="section-eyebrow">Handpicked for You</p>
            <h2 className="section-title">Featured Properties</h2>
            <div className="divider mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((p, i) => (
              <div
                key={p.id}
                className={`property-card fade-in-up delay-${i + 1}`}
                data-ocid={`properties.item.${i + 1}`}
              >
                <div className="property-image-wrap">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className="price-badge">{p.price}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-navy text-sm mb-1">
                    {p.title}
                  </h3>
                  <p className="text-navy/50 text-xs flex items-center gap-1 mb-3">
                    <FaMapMarkerAlt className="text-orange flex-shrink-0" />
                    {p.location}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-navy/50 mb-4">
                    <span className="flex items-center gap-1">
                      <FaBed className="text-orange" /> {p.beds} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="text-orange" /> {p.baths} Baths
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRulerCombined className="text-orange" /> {p.area}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-outline-navy"
                    data-ocid={`properties.view_details.button.${i + 1}`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="fade-in-up">
              <p className="section-eyebrow">Our Story</p>
              <h2 className="section-title mb-4">
                About Cubic Property Consultant
              </h2>
              <div className="divider mb-6" />
              <p className="text-navy/70 text-sm leading-loose mb-4">
                Founded with a vision to redefine luxury real estate in Mumbai,
                Cubic Property Consultant has been the trusted partner for
                discerning homebuyers and investors for over a decade.
              </p>
              <p className="text-navy/70 text-sm leading-loose mb-6">
                Led by Mrs Laxmi Varma, our team brings deep expertise in
                Mumbai's premium property market \u2014 from iconic sea-facing
                penthouses in Malabar Hill to sprawling villas in Juhu. We are
                committed to personalized service, transparency, and delivering
                homes that exceed expectations.
              </p>
              <div className="bg-orange-light rounded-lg p-4 border-l-4 border-orange mb-8">
                <p className="text-navy font-semibold text-sm">
                  Led by{" "}
                  <span className="text-orange font-bold">Mrs Laxmi Varma</span>{" "}
                  \u2014 15+ years in Mumbai's premium real estate market.
                </p>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { n: "500+", l: "Properties Sold" },
                  { n: "15+", l: "Years Experience" },
                  { n: "98%", l: "Client Satisfaction" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <p className="stat-number">{s.n}</p>
                    <p className="text-navy/50 text-xs mt-1 font-medium">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= CONTACT ======= */}
      <section id="contact" className="bg-graybg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div className="fade-in-up">
              <p className="section-eyebrow">Reach Out</p>
              <h2 className="section-title mb-4">Get in Touch</h2>
              <div className="divider mb-6" />
              <p className="text-navy/70 text-sm leading-loose mb-8">
                Ready to find your perfect property? Our experts are here to
                guide you through every step of the journey \u2014 from
                discovery to keys in hand.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: <FaPhone />,
                    label: "Phone",
                    val: "+91 82913 91217",
                    href: "tel:+918291391217",
                  },
                  {
                    icon: <FaEnvelope />,
                    label: "Email",
                    val: "cubicproperties6@gmail.com",
                    href: "mailto:cubicproperties6@gmail.com",
                  },
                  {
                    icon: <FaMapMarkerAlt />,
                    label: "Address",
                    val: "Bandra Kurla Complex, Mumbai 400051",
                    href: null,
                  },
                ].map((c) => (
                  <div key={c.label} className="contact-info-item">
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <p className="text-xs text-navy/40 font-medium uppercase tracking-wider mb-0.5">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="text-navy font-semibold text-sm hover:text-orange transition-colors"
                        >
                          {c.val}
                        </a>
                      ) : (
                        <p className="text-navy font-semibold text-sm">
                          {c.val}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                data-ocid="contact.whatsapp.button"
              >
                <FaWhatsapp size={20} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="fade-in-up delay-2">
              <div className="bg-white rounded-2xl shadow-card p-8">
                <h3 className="text-navy font-bold text-lg mb-6">
                  Send us an Enquiry
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="contact.form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold text-navy/60 uppercase tracking-wide block mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        className="form-input"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        data-ocid="contact.name.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold text-navy/60 uppercase tracking-wide block mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        data-ocid="contact.email.input"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="text-xs font-semibold text-navy/60 uppercase tracking-wide block mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      data-ocid="contact.phone.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold text-navy/60 uppercase tracking-wide block mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      className="form-input"
                      rows={4}
                      placeholder="Tell us about the property you're looking for..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      data-ocid="contact.message.textarea"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                    disabled={submitting}
                    data-ocid="contact.submit.button"
                  >
                    {submitting ? "Sending..." : "Send Enquiry"}
                  </button>
                  {submitting && (
                    <p
                      className="text-center text-xs text-navy/40 animate-pulse"
                      data-ocid="contact.loading_state"
                    >
                      Submitting your enquiry\u2026
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center text-white font-black text-lg">
                  C
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Cubic Property</p>
                  <p className="text-white/50 text-xs">Consultant</p>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                Mumbai's most trusted partner for luxury real estate. Turning
                property dreams into reality since 2009.
              </p>
              <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} Cubic Property Consultant. All
                rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { id: "hero", label: "Home" },
                  { id: "services", label: "Services" },
                  { id: "properties", label: "Properties" },
                  { id: "about", label: "About" },
                  { id: "contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(l.id)}
                      className="text-white/50 hover:text-orange transition-colors text-sm flex items-center gap-2"
                      data-ocid={`footer.${l.id}.link`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block" />
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5">
                Mumbai's Premier Property Consultants
              </h4>
              <div className="space-y-3">
                <p className="text-white/50 text-sm flex items-start gap-2">
                  <FaMapMarkerAlt className="text-orange mt-0.5 flex-shrink-0" />
                  Bandra Kurla Complex, Mumbai 400051
                </p>
                <p className="text-white/50 text-sm flex items-center gap-2">
                  <FaPhone className="text-orange flex-shrink-0" />
                  <a
                    href="tel:+918291391217"
                    className="hover:text-orange transition-colors"
                  >
                    +91 82913 91217
                  </a>
                </p>
                <p className="text-white/50 text-sm flex items-center gap-2">
                  <FaEnvelope className="text-orange flex-shrink-0" />
                  <a
                    href="mailto:cubicproperties6@gmail.com"
                    className="hover:text-orange transition-colors"
                  >
                    cubicproperties6@gmail.com
                  </a>
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm mt-2 text-white/50 hover:text-orange transition-colors"
                >
                  <FaWhatsapp className="text-green-400" />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Cubic Property Consultant
              &middot; Bandra Kurla Complex, Mumbai
            </p>
            <p className="text-white/20 text-xs">
              Built with &#10084;&#65039; using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/40 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ======= FLOATING WHATSAPP ======= */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="float-whatsapp"
        aria-label="Chat on WhatsApp"
        data-ocid="whatsapp.float.button"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}
