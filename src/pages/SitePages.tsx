import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ClipboardCheck,
  Hammer,
  Home,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ThermometerSun,
  Wrench,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { ContactDemoForm } from '../components/ContactDemoForm'
import { Seo } from '../components/Seo'
import {
  ContactCta,
  FeatureList,
  ProcessSteps,
  SectionHeading,
  ServiceCard,
} from '../components/Ui'
import type { ImageName } from '../data/images'

const processSteps = [
  {
    title: 'Vertel wat er speelt',
    text: 'Uw vraag en de situatie in uw woning of pand vormen het vertrekpunt.',
  },
  {
    title: 'Bespreek de werkzaamheden',
    text: 'Maak helder wat er nodig is, welke aanpak past en wat de kosten zijn.',
  },
  {
    title: 'Stem de uitvoering af',
    text: 'Bespreek de planning en de afspraken rond het werk.',
  },
]

function TextImageSection({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
  id,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  image: ImageName
  imageAlt: string
  reverse?: boolean
  id?: string
}) {
  return (
    <section className="section" id={id}>
      <div
        className={`container split-layout${reverse ? ' split-layout--reverse' : ''}`}
      >
        <div className="prose-block">
          <SectionHeading eyebrow={eyebrow} title={title} />
          {children}
        </div>
        <figure className="image-panel">
          <Photo name={image} alt={imageAlt} />
          <figcaption>Een blik op het werk van BKW Groep</figcaption>
        </figure>
      </div>
    </section>
  )
}

function RelatedServices({ exclude }: { exclude: string }) {
  const services = [
    { to: '/onderhoud/', label: 'Onderhoud' },
    { to: '/slotenservice/', label: 'Slotenservice' },
    { to: '/isolatie/', label: 'Isolatie' },
    { to: '/zakelijk/', label: 'Zakelijk' },
  ]
  return (
    <section className="related-services">
      <div className="container">
        <h2>Ook bij BKW Groep</h2>
        <nav aria-label="Gerelateerde diensten">
          {services
            .filter((s) => s.to !== exclude)
            .map((s) => (
              <Link key={s.to} to={s.to}>
                {s.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
        </nav>
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <Seo
        title="BKW Groep | Onderhoud, isolatie en slotenservice"
        description="Vakwerk voor woning en vastgoed. BKW Groep helpt particulieren en zakelijke opdrachtgevers met onderhoud, isolatie en slotenservice."
      />
      <section className="home-hero">
        <div className="home-hero__photo">
          <Photo
            name="teamBanner"
            alt="BKW-medewerkers met gereedschap en bedrijfsvoertuigen"
            priority
            sizes="(max-width: 760px) 1100px, 100vw"
          />
        </div>
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <span className="eyebrow">
              Onderhoud · Slotenservice · Isolatie
            </span>
            <h1>
              Vakwerk voor{' '}
              woning <span>&amp; vastgoed.</span>
            </h1>
            <p>
              Onderhoud, slotenservice en isolatie.
              Voor uw woning of zakelijk pand.
            </p>
            <div className="hero-actions">
              <Link className="button button--primary" to="/contact/">
                Neem contact op
                <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="text-link" to="/#diensten">
                Onze diensten
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="urgent-strip" aria-label="Direct hulp nodig">
        <div className="container urgent-strip__inner">
          <div className="urgent-strip__question">
            <span className="urgent-icon">
              <Phone aria-hidden="true" />
            </span>
            <div>
              <strong>Buitengesloten of een storing?</strong>
              <span>Bespreek uw situatie direct telefonisch.</span>
            </div>
          </div>
          <a href="tel:+31850606663">
            085 060 66 63
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>
      <section className="section section--warm" id="diensten">
        <div className="container">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Waarmee kunnen we helpen?"
              title="Van herstel tot verbetering."
              intro="De juiste vakmensen voor de vraag achter uw voordeur — of die van uw organisatie."
            />
            <span className="section-index" aria-hidden="true">
              01 / DIENSTEN
            </span>
          </div>
          <div className="service-grid">
            <ServiceCard
              number="01"
              icon={Wrench}
              image="maintenance"
              imageAlt="BKW-medewerker in gesprek bij een voordeur"
              title="Onderhoud"
              description="Herstel, woningverbetering en renovatie. Voor het werk dat vandaag nodig is en morgen verschil maakt."
              to="/onderhoud/"
            />
            <ServiceCard
              number="02"
              icon={KeyRound}
              image="locks"
              imageAlt="Slotenmakers werken aan een deurslot"
              title="Slotenservice"
              description="Een deur openen, een slot vervangen of schade herstellen. Ook voor advies over inbraakpreventie."
              to="/slotenservice/"
            />
            <ServiceCard
              number="03"
              icon={ThermometerSun}
              image="insulation"
              imageAlt="BKW-medewerker brengt spouwmuurisolatie aan"
              title="Isolatie"
              description="Spouwmuur, dak, vloer of bodem. Verken welke isolatie bij uw woning of gebouw past."
              to="/isolatie/"
            />
            <ServiceCard
              number="04"
              icon={Building2}
              image="property"
              imageAlt="Gebouw uit de bedrijfsfotografie van BKW Groep"
              title="Zakelijk"
              description="Onderhoud, storingen en isolatie voor VvE’s, woningcorporaties en andere vastgoedorganisaties."
              to="/zakelijk/"
            />
          </div>
        </div>
      </section>
      <section className="section approach-section">
        <div className="container approach-grid">
          <div className="approach-intro">
            <span className="eyebrow">Praktisch. Persoonlijk. BKW.</span>
            <h2>Goed werk begint met duidelijke afspraken.</h2>
            <p>
              Bespreek vooraf welke werkzaamheden nodig zijn en welke kosten
              daarbij horen. Een duidelijke vraag is het begin van een
              duidelijke aanpak.
            </p>
            <Link className="text-link" to="/contact/">
              Maak uw vraag concreet
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="approach-points">
            <div>
              <span>01</span>
              <h3>Uw woning of pand als vertrekpunt</h3>
              <p>
                Een storing, verbetering of onderhoudsplan: eerst bespreken wat
                er speelt en wat er nodig is.
              </p>
            </div>
            <div>
              <span>02</span>
              <h3>Inzicht in het werk en de kosten</h3>
              <p>
                Stem de werkzaamheden vooraf af. Zo weet u wat u met BKW Groep
                bespreekt.
              </p>
            </div>
            <div>
              <span>03</span>
              <h3>Meerdere diensten, één contactlijn</h3>
              <p>
                Onderhoud, slotenwerk en isolatie vanuit dezelfde organisatie.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="business-feature">
        <div className="container business-feature__grid">
          <figure>
            <Photo
              name="fleet"
              alt="BKW-bedrijfsvoertuigen in een werkplaats, van de bestaande website"
            />
          </figure>
          <div>
            <span className="eyebrow eyebrow--light">
              Voor beheerders &amp; organisaties
            </span>
            <h2>
              Uw vastgoed.
              <br />
              Onze aandacht.
            </h2>
            <p>
              Van mutatieonderhoud tot isolatie. BKW Groep ondersteunt VvE’s,
              woningcorporaties, gemeentes, aannemers en installatiebedrijven.
            </p>
            <ul className="business-topics">
              <li>Vastgoedonderhoud</li>
              <li>Storingsdienst</li>
              <li>Renovatie &amp; isolatie</li>
            </ul>
            <Link className="button button--primary" to="/zakelijk/">
              Ontdek BKW Zakelijk
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  )
}

export function MaintenancePage() {
  return (
    <>
      <Seo
        title="Professioneel woningonderhoud | BKW Groep"
        description="Onderhoud, woningverbetering, renovatie en hulp bij bouwkundige storingen door BKW Groep."
      />
      <PageHero
        eyebrow="BKW Onderhoud"
        title="Professioneel woningonderhoud"
        description="Van een kleine herstelvraag tot renovatie. Een praktische aanpak voor uw woning of vastgoed, met duidelijke afstemming over de werkzaamheden."
        image="maintenance"
        imageAlt="BKW-medewerker bespreekt werkzaamheden bij een woning"
      />
      <section className="section section--warm" id="werkzaamheden">
        <div className="container scope-grid">
          <SectionHeading
            eyebrow="Wat we doen"
            title="Een pand vraagt om aandacht."
            intro="BKW Groep ondersteunt zowel particuliere eigenaren als zakelijke opdrachtgevers."
          />
          <div className="scope-list">
            {[
              [
                'Herstel & storingen',
                'Bouwkundige calamiteiten en water- en elektrastoringen. Bij een urgente situatie kunt u het beste bellen.',
              ],
              [
                'Woningverbetering',
                'Werkzaamheden die uw bestaande woning verbeteren, afgestemd op uw vraag.',
              ],
              [
                'Verbouwing & renovatie',
                'Bespreek de omvang, planning en werkzaamheden aan uw woning of pand.',
              ],
              [
                'Mutatieonderhoud',
                'Onderhoud rond een bewonerswissel. Ook voor beheerders en vastgoedorganisaties.',
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TextImageSection
        eyebrow="BKW in de praktijk"
        title="Vakmensen voor het werk aan uw woning."
        image="workshop"
        imageAlt="BKW-vakman aan het werk met een zaag"
      >
        <p>
          Een herstelvraag is anders dan een complete renovatie. Vertel wat er
          aan de hand is en bespreek welke werkzaamheden daarbij passen.
        </p>
        <FeatureList
          items={[
            'Onderhoud en woningverbetering',
            'Verbouwings- en renovatievragen',
            'Ook voor zakelijke panden',
          ]}
        />
        <a className="text-link" href="tel:+31850606663">
          <Phone aria-hidden="true" />
          Bespreek uw onderhoudsvraag
        </a>
      </TextImageSection>
      <section className="section section--warm">
        <div className="container">
          <SectionHeading
            eyebrow="Samen afstemmen"
            title="Maak het vooraf helder."
            intro="Bespreek deze punten bij uw aanvraag. De definitieve aanpak wordt per opdracht afgestemd."
          />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>
      <RelatedServices exclude="/onderhoud/" />
      <ContactCta
        eyebrow="Onderhoudsvraag?"
        title="Vertel wat er aan uw woning moet gebeuren."
      />
    </>
  )
}

export function LocksPage() {
  return (
    <>
      <Seo
        title="Slotenservice | BKW Groep"
        description="BKW Groep helpt bij het openen en vervangen van sloten, herstel na inbraak en inbraakpreventie."
      />
      <PageHero
        eyebrow="BKW Sloten"
        title="Slotenservice"
        description="Buitengesloten, een defect slot of schade aan uw deur? Bel om de situatie te bespreken. Ook voor het vervangen van sloten en inbraakpreventie."
        image="locks"
        imageAlt="BKW-slotenmakers werken aan een deurslot"
        urgent
      />
      <section className="section section--warm" id="werkzaamheden">
        <div className="container">
          <SectionHeading
            eyebrow="Toegang & beveiliging"
            title="Hulp bij uw deur. Advies voor daarna."
            intro="Een probleem oplossen en uw deur goed beveiligen zijn twee verschillende vragen. BKW Groep ondersteunt bij beide."
          />
          <div className="service-grid service-grid--three">
            <ServiceCard
              icon={KeyRound}
              title="Deur openen"
              description="Ondersteuning wanneer u niet meer naar binnen kunt. Bespreek uw situatie direct telefonisch."
              to="tel:+31850606663"
              actionLabel="Bel voor hulp"
            />
            <ServiceCard
              icon={ShieldCheck}
              title="Herstel & vervangen"
              description="Een defect slot vervangen, een noodafsluiting plaatsen of schade na inbraak herstellen."
              to="/contact/"
              actionLabel="Bespreek herstel"
            />
            <ServiceCard
              icon={ClipboardCheck}
              title="Inbraakpreventie"
              description="Advies en inspectie van deuren en ramen. Bespreek wat er aan de beveiliging kan worden verbeterd."
              to="/contact/"
              actionLabel="Vraag preventief advies"
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container scope-grid">
          <SectionHeading
            eyebrow="Als u nu hulp nodig heeft"
            title="Vertel wat er aan de hand is."
            intro="Houd uw adres en een korte beschrijving van het probleem bij de hand."
          />
          <div className="call-panel">
            <Phone aria-hidden="true" />
            <h3>Rechtstreeks contact</h3>
            <a href="tel:+31850606663">
              085 060 66 63
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p>
              Bespreek de passende vervolgstap en maak vooraf duidelijke
              afspraken over werkzaamheden en kosten.
            </p>
            <p className="small-note">
              Beschikbaarheid en planning worden telefonisch afgestemd.
            </p>
          </div>
        </div>
      </section>
      <RelatedServices exclude="/slotenservice/" />
      <ContactCta
        eyebrow="Preventief advies?"
        title="Een goed slot begint bij uw situatie."
      />
    </>
  )
}

export function InsulationPage() {
  return (
    <>
      <Seo
        title="Isolatie voor woning en vastgoed | BKW Groep"
        description="Lees hoe BKW Groep ondersteunt bij spouwmuur-, dak-, vloer- en bodemisolatie."
      />
      <PageHero
        eyebrow="Isolatie & verduurzaming"
        title="Isolatie voor een comfortabeler pand"
        description="Een woning of gebouw isoleren begint met de constructie. Verken samen met BKW Groep welke aanpak bij uw pand past."
        image="insulation"
        imageAlt="BKW-medewerker voert spouwmuurisolatiewerkzaamheden uit"
      />
      <section className="section section--warm" id="werkzaamheden">
        <div className="container">
          <SectionHeading
            eyebrow="Van gevel tot vloer"
            title="De juiste aanpak voor uw gebouw."
            intro="De mogelijkheden hangen af van de bouwsituatie en de staat van het pand."
          />
          <div className="service-grid">
            <ServiceCard
              icon={Home}
              title="Spouwmuur"
              description="Onderzoek naar de spouw en de mogelijkheden voor het aanbrengen van isolatie."
              to="/contact/"
              actionLabel="Bespreek spouwmuurisolatie"
            />
            <ServiceCard
              icon={ThermometerSun}
              title="Dakisolatie"
              description="Bespreek isolatie van het dak als onderdeel van de gebouwschil."
              to="/contact/"
              actionLabel="Bespreek dakisolatie"
            />
            <ServiceCard
              icon={Hammer}
              title="Vloerisolatie"
              description="Isolatie aan de onderzijde van de vloer, waar de constructie dit toelaat."
              to="/contact/"
              actionLabel="Bespreek vloerisolatie"
            />
            <ServiceCard
              icon={Building2}
              title="Bodemisolatie"
              description="Verken een oplossing voor de bodem van een geschikte kruipruimte."
              to="/contact/"
              actionLabel="Bespreek bodemisolatie"
            />
          </div>
        </div>
      </section>
      <TextImageSection
        eyebrow="Begin bij uw pand"
        title="Elke bouwsituatie is anders."
        image="craft"
        imageAlt="BKW-vakman werkt bij de gevel van een woning"
      >
        <p>
          Welke oplossing zinvol is, verschilt per woning en gebouw. Bespreek de
          bestaande situatie voordat u een keuze maakt.
        </p>
        <FeatureList
          items={[
            'Uw constructie als uitgangspunt',
            'Ook voor VvE’s en zakelijke panden',
            'Bespreek subsidiemogelijkheden waar relevant',
          ]}
        />
        <Link className="text-link" to="/zakelijk/">
          Isolatie voor uw organisatie
          <ArrowRight aria-hidden="true" />
        </Link>
      </TextImageSection>
      <RelatedServices exclude="/isolatie/" />
      <ContactCta
        eyebrow="Isolatie bespreken?"
        title="Wat past bij uw woning of gebouw?"
      />
    </>
  )
}

export function BusinessPage() {
  return (
    <>
      <Seo
        title="Zakelijk onderhoud en isolatie | BKW Groep"
        description="BKW Groep ondersteunt VvE’s, woningcorporaties en andere organisaties bij onderhoud, renovatie en isolatie."
      />
      <PageHero
        eyebrow="BKW Zakelijk"
        title="Zakelijk onderhoud en isolatie"
        description="Een partner voor het werk aan bestaand vastgoed. Voor VvE’s, woningcorporaties, gemeentes, aannemers en installatiebedrijven."
        image="property"
        imageAlt="Zakelijk gebouw afgebeeld op de bestaande BKW-website"
      />
      <section className="audience-band">
        <div className="container">
          <span>Voor uw organisatie</span>
          <ul>
            <li>VvE’s</li>
            <li>Woningcorporaties</li>
            <li>Gemeentes</li>
            <li>Aannemers</li>
            <li>Installatiebedrijven</li>
          </ul>
        </div>
      </section>
      <section className="section" id="werkzaamheden">
        <div className="container scope-grid">
          <SectionHeading
            eyebrow="Van melding tot onderhoudsvraag"
            title="Aandacht voor uw pand én uw organisatie."
            intro="Bespreek een concrete opdracht of de behoefte aan structurele samenwerking."
          />
          <div className="scope-list">
            {[
              [
                'Vastgoedonderhoud',
                'Grootschalig onderhoud en mutatieonderhoud aan bestaand vastgoed.',
              ],
              [
                'Storingsdienst',
                'Ondersteuning bij storingen en bouwkundige calamiteiten. Stem bereikbaarheid en afspraken af.',
              ],
              [
                'Renovatie & isolatie',
                'Werkzaamheden aan bestaande panden, van renovatie tot verduurzaming.',
              ],
            ].map(([title, text], i) => (
              <div key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <TextImageSection
        eyebrow="Zakelijk contact"
        title="Bespreek uw vastgoedvraag."
        image="team"
        imageAlt="BKW-bedrijfsvoertuigen bij een werkplaats, van de bestaande website"
        reverse
      >
        <p>
          Gaat het om één pand, meerdere locaties of een samenwerking? Geef aan
          welke werkzaamheden en planning u voor ogen heeft.
        </p>
        <div className="business-contact">
          <span className="icon-tile">
            <Mail aria-hidden="true" />
          </span>
          <div>
            <strong>Yoeri de Jong</strong>
            <span>Zakelijk contact</span>
            <a href="mailto:yoeri@bkwgroep.nl">
              yoeri@bkwgroep.nl
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <Link className="text-link" to="/contact/">
          Contact &amp; adresgegevens
          <ArrowRight aria-hidden="true" />
        </Link>
      </TextImageSection>
      <RelatedServices exclude="/zakelijk/" />
      <ContactCta
        eyebrow="Een zakelijke aanvraag?"
        title="Maak uw volgende onderhoudsvraag concreet."
        text="Bespreek de omvang, planning en afstemming met BKW Groep."
      />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact opnemen | BKW Groep"
        description="Neem telefonisch of per e-mail contact op met BKW Groep in Berkel en Rodenrijs."
      />
      <section className="contact-intro">
        <div className="container">
          <nav className="breadcrumb" aria-label="Kruimelpad">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Contact</span>
          </nav>
          <span className="eyebrow">Laten we het bespreken</span>
          <h1>
            Contact opnemen <br />
            met BKW Groep
          </h1>
          <p>
            Een storing, onderhoudsvraag of plan voor uw pand?
            <br className="desktop-break" /> Kies de manier van contact die bij
            uw vraag past.
          </p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-layout">
          <div>
            <div className="contact-cards">
              <a className="contact-phone" href="tel:+31850606663">
                <span className="icon-tile">
                  <Phone aria-hidden="true" />
                </span>
                <span>
                  <strong>Direct bespreken</strong>
                  <b>085 060 66 63</b>
                  <small>Bij een urgente situatie: bel ons.</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href="mailto:info@bkwgroup.nl">
                <span className="icon-tile">
                  <Mail aria-hidden="true" />
                </span>
                <span>
                  <strong>Liever per e-mail?</strong>info@bkwgroup.nl
                  <small>Beschrijf kort de situatie en uw vraag.</small>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <div>
                <span className="icon-tile">
                  <MapPin aria-hidden="true" />
                </span>
                <span>
                  <strong>BKW Groep</strong>Noordeindseweg 256A
                  <br />
                  2651 LL Berkel en Rodenrijs
                </span>
              </div>
            </div>
            <div className="contact-tip">
              <h2>Handig om te vermelden</h2>
              <p>
                Om welk pand gaat het, wat is er aan de hand en welk werk wilt u
                bespreken? Foto’s kunt u meesturen in uw e-mail.
              </p>
            </div>
            <Photo
              name="detail"
              alt="Gereedschap uit de bedrijfsfotografie van BKW Groep"
              className="contact-detail-photo"
            />
          </div>
          <ContactDemoForm />
        </div>
      </section>
    </>
  )
}

export function NotFoundPage() {
  return (
    <section className="not-found container">
      <Seo
        title="Pagina niet gevonden | BKW Groep"
        description="Deze pagina bestaat niet in de BKW Groep-preview."
      />
      <span className="eyebrow">Fout 404</span>
      <h1>Pagina niet gevonden</h1>
      <p>De pagina is niet beschikbaar of heeft een ander adres gekregen.</p>
      <Link className="button button--primary" to="/">
        Terug naar home
        <ArrowRight aria-hidden="true" />
      </Link>
    </section>
  )
}
