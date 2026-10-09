import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link
            to="/"
            className="wordmark wordmark--footer"
            aria-label="BKW Groep home"
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/logo-bkw.svg`}
              alt=""
              width="210"
              height="69"
            />
          </Link>
          <p>
            Professionele ondersteuning bij onderhoud, storingen, sloten en
            isolatie.
          </p>
          <div className="social-links" aria-label="Sociale media">
            <a
              href="https://www.facebook.com/bkwgroep/"
              aria-label="BKW Groep op Facebook"
            >
              <Facebook aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/company/bkw-group/"
              aria-label="BKW Groep op LinkedIn"
            >
              <Linkedin aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/bkwgroup/"
              aria-label="BKW Groep op Instagram"
            >
              <Instagram aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/@bkwgroup8106"
              aria-label="BKW Groep op YouTube"
            >
              <Youtube aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2>Werkzaamheden</h2>
          <ul className="footer-links">
            <li>
              <Link to="/#diensten">Alle diensten</Link>
            </li>
            <li>
              <Link to="/onderhoud/">Onderhoud</Link>
            </li>
            <li>
              <Link to="/slotenservice/">Slotenservice</Link>
            </li>
            <li>
              <Link to="/isolatie/">Isolatie</Link>
            </li>
            <li>
              <Link to="/zakelijk/">Zakelijk</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2>Contact</h2>
          <ul className="footer-contact">
            <li>
              <Phone aria-hidden="true" />
              <a href="tel:+31850606663">085 060 66 63</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href="mailto:info@bkwgroup.nl">info@bkwgroup.nl</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>
                Noordeindseweg 256A
                <br />
                2651 LL Berkel en Rodenrijs
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom__inner">
          <span>Conceptpreview · geen officiële productiewebsite</span>
          <div>
            <a href="https://bkwgroep.nl/privacyverklaring/">
              Privacyverklaring
            </a>
            <a href="https://bkwgroep.nl/algemene-voorwaarden/">
              Algemene voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
