import {
  ArrowRight,
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
import { ContactDemoForm } from '../components/ContactDemoForm'
import { Seo } from '../components/Seo'
import {
  ContactCta,
  FeatureList,
  ProcessSteps,
  SectionHeading,
  ServiceCard,
} from '../components/Ui'

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/images/${path}`

const processSteps = [
  { title: 'Uw vraag', text: 'Vertel ons wat er speelt en om welk pand of welke woning het gaat.' },
  { title: 'Afstemming', text: 'We bespreken de situatie en bepalen welke aanpak daarbij past.' },
  { title: 'Uitvoering', text: 'Na akkoord wordt het werk gepland en zorgvuldig uitgevoerd.' },
]

function ImagePanel({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <figure className="image-panel">
      <img src={asset(src)} alt={alt} loading="lazy" />
      <figcaption>{label}</figcaption>
    </figure>
  )
}

function TextImageSection({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  image: string
  imageAlt: string
  reverse?: boolean
}) {
  return (
    <section className="section">
      <div className={`container split-layout${reverse ? ' split-layout--reverse' : ''}`}>
        <div className="prose-block">
          <SectionHeading eyebrow={eyebrow} title={title} />
          {children}
        </div>
        <ImagePanel src={image} alt={imageAlt} label="BKW Groep in de praktijk" />
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <>
      <Seo
        title="BKW Groep | Onderhoud, isolatie en slotenservice"
        description="BKW Groep helpt particulieren en zakelijke opdrachtgevers met onderhoud, isolatie en slotenservice."
      />
      <PageHero
        eyebrow="Onderhoud · isolatie · slotenservice"
        title="Professioneel onderhoud zonder verrassingen"
        description="Eén aanspreekpunt voor werkzaamheden aan uw woning of pand, van dagelijks onderhoud tot isolatie en slotenservice."
        image={asset('home-hero.webp')}
        imageAlt="Team van BKW Groep bij bedrijfsvoertuigen"
      />

      <section className="section section--warm">
        <div className="container">
          <SectionHeading
            eyebrow="Onze diensten"
            title="Eén team voor onderhoud en verbetering"
            intro="Bekijk waarmee BKW Groep particuliere en zakelijke opdrachtgevers ondersteunt."
            align="center"
          />
          <div className="service-grid">
            <ServiceCard icon={Wrench} title="Onderhoud" description="Onderhoud, woningverbetering, verbouwing en renovatie." to="/onderhoud" />
            <ServiceCard icon={KeyRound} title="Slotenservice" description="Hulp bij sloten, deuren, inbraakschade en preventie." to="/slotenservice" />
            <ServiceCard icon={ThermometerSun} title="Isolatie" description="Isolatieoplossingen voor een comfortabeler en energiezuiniger pand." to="/isolatie" />
            <ServiceCard icon={Building2} title="Zakelijk" description="Onderhoud en isolatie voor onder meer VvE’s en vastgoedorganisaties." to="/zakelijk" />
          </div>
        </div>
      </section>

      <TextImageSection
        eyebrow="BKW Groep"
        title="Praktische vakmensen voor woning en vastgoed"
        image="professionals.webp"
        imageAlt="BKW-vakman aan het werk in een woning"
      >
        <p>BKW Groep voert onderhoud, renovatie, isolatie en slotenwerk uit voor particuliere en zakelijke opdrachtgevers.</p>
        <p>De werkzaamheden worden vanuit één organisatie afgestemd, zodat u met een duidelijke contactlijn werkt.</p>
        <FeatureList items={['Onderhoud en woningverbetering', 'Isolatie en verduurzaming', 'Slotenservice en herstel', 'Diensten voor zakelijke opdrachtgevers']} />
        <Link className="text-link" to="/contact">Bespreek uw vraag <ArrowRight aria-hidden="true" /></Link>
      </TextImageSection>

      <section className="section section--dark">
        <div className="container">
          <SectionHeading eyebrow="Werkwijze" title="Van vraag naar uitvoering" intro="Een helder voorstel voor de stappen; de definitieve werkwijze wordt per opdracht afgestemd." />
          <ProcessSteps steps={processSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container business-band">
          <div>
            <span className="eyebrow">Voor organisaties</span>
            <h2>Onderhoud en isolatie voor grotere panden</h2>
            <p>BKW Groep werkt onder meer voor VvE’s, woningcorporaties, gemeentes, aannemers en installatiebedrijven.</p>
          </div>
          <Link className="button button--secondary" to="/zakelijk">Bekijk BKW Zakelijk <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
      <ContactCta />
    </>
  )
}

export function MaintenancePage() {
  return (
    <>
      <Seo title="Professioneel woningonderhoud | BKW Groep" description="Onderhoud, woningverbetering, renovatie en hulp bij bouwkundige storingen door BKW Groep." />
      <PageHero eyebrow="BKW Onderhoud" title="Professioneel woningonderhoud" description="Voor onderhoud, woningverbetering, verbouwing en renovatie aan uw woning of vastgoed." image={asset('maintenance-hero.webp')} imageAlt="BKW-medewerker bespreekt onderhoud bij een woning" secondaryLabel="Bekijk slotenservice" secondaryTo="/slotenservice" />
      <TextImageSection eyebrow="Onderhoud" title="Werkzaamheden passend bij uw pand" image="professionals.webp" imageAlt="Vakman voert onderhoudswerk uit">
        <p>Van een concrete herstelvraag tot gepland onderhoud: BKW Groep stemt de werkzaamheden af op de situatie in uw woning of pand.</p>
        <FeatureList items={['Bouwkundige calamiteiten', 'Water- en elektrastoringen', 'Mutatieonderhoud', 'Woningverbetering', 'Verbouwing en renovatie']} />
      </TextImageSection>
      <section className="section section--warm"><div className="container"><SectionHeading eyebrow="Aanpak" title="Duidelijke afstemming vooraf" align="center" /><ProcessSteps steps={processSteps} /></div></section>
      <ContactCta eyebrow="Onderhoudsvraag?" title="Laat weten wat er aan uw woning of pand moet gebeuren." />
    </>
  )
}

export function LocksPage() {
  return (
    <>
      <Seo title="Slotenservice | BKW Groep" description="BKW Groep helpt bij het openen en vervangen van sloten, herstel na inbraak en inbraakpreventie." />
      <PageHero eyebrow="BKW Sloten" title="Slotenservice" description="Hulp bij sloten en deuren, herstel na inbraakschade en advies over inbraakpreventie." image={asset('locks-hero.webp')} imageAlt="BKW-slotenmaker werkt aan een deurslot" secondaryLabel="Bekijk onderhoud" secondaryTo="/onderhoud" />
      <section className="section section--warm"><div className="container"><SectionHeading eyebrow="Werkzaamheden" title="Ondersteuning bij sloten en beveiliging" intro="Neem direct telefonisch contact op als uw situatie spoed heeft." align="center" /><div className="service-grid service-grid--three"><ServiceCard icon={KeyRound} title="Deur openen" description="Ondersteuning wanneer een deur niet meer toegankelijk is." to="/contact" /><ServiceCard icon={ShieldCheck} title="Herstel en vervangen" description="Herstel na inbraakschade en vervanging van sloten." to="/contact" /><ServiceCard icon={ClipboardCheck} title="Inbraakpreventie" description="Advies en inspectie rond de beveiliging van deuren en ramen." to="/contact" /></div></div></section>
      <TextImageSection eyebrow="Direct contact" title="Bespreek de situatie met BKW Groep" image="maintenance-hero.webp" imageAlt="BKW-medewerker bij de voordeur van een klant">
        <p>Leg telefonisch uit wat er aan de hand is. BKW Groep kan dan aangeven welke vervolgstap passend is.</p>
        <a className="button button--primary" href="tel:+31850606663"><Phone aria-hidden="true" /> Bel 085 060 66 63</a>
      </TextImageSection>
      <ContactCta eyebrow="Slotenservice nodig?" title="Neem contact op voor hulp of preventief advies." />
    </>
  )
}

export function InsulationPage() {
  return (
    <>
      <Seo title="Isolatie voor woning en vastgoed | BKW Groep" description="Lees hoe BKW Groep ondersteunt bij spouwmuur-, dak-, vloer- en bodemisolatie." />
      <PageHero eyebrow="Isolatie en verduurzaming" title="Isolatie voor een comfortabeler pand" description="Verken passende isolatiemogelijkheden voor uw woning, VvE of ander vastgoed." image={asset('contact.webp')} imageAlt="BKW-medewerker brengt isolatiemateriaal aan" secondaryLabel="Voor zakelijke panden" secondaryTo="/zakelijk" />
      <section className="section section--warm"><div className="container"><SectionHeading eyebrow="Mogelijkheden" title="Isolatie afgestemd op de bouwsituatie" intro="Welke oplossing past, hangt af van de constructie en de staat van het pand." align="center" /><div className="service-grid service-grid--four"><ServiceCard icon={Home} title="Spouwmuur" description="Onderzoek naar en uitvoering van spouwmuurisolatie." to="/contact" /><ServiceCard icon={ThermometerSun} title="Dakisolatie" description="Isolatie van het dak als onderdeel van de gebouwschil." to="/contact" /><ServiceCard icon={Hammer} title="Vloerisolatie" description="Isolatie aan de onderzijde van de vloer waar passend." to="/contact" /><ServiceCard icon={Building2} title="Bodemisolatie" description="Een oplossing voor specifieke kruipruimtes en situaties." to="/contact" /></div></div></section>
      <TextImageSection eyebrow="Eerst de situatie" title="Een passende aanpak begint met inventariseren" image="business.webp" imageAlt="Zakelijk pand waarvoor onderhoud en isolatie wordt afgestemd">
        <p>De mogelijkheden verschillen per pand. Daarom begint een traject met het bespreken en beoordelen van de bestaande situatie.</p>
        <FeatureList items={['Woning of pand als uitgangspunt', 'Verschillende isolatieonderdelen mogelijk', 'Ook voor zakelijke opdrachtgevers', 'Contact over subsidiemogelijkheden waar relevant']} />
      </TextImageSection>
      <ContactCta eyebrow="Isolatie bespreken?" title="Vraag welke aanpak bij uw woning of pand past." />
    </>
  )
}

export function BusinessPage() {
  return (
    <>
      <Seo title="Zakelijk onderhoud en isolatie | BKW Groep" description="BKW Groep ondersteunt VvE’s, woningcorporaties en andere organisaties bij onderhoud, renovatie en isolatie." />
      <PageHero eyebrow="BKW Zakelijk" title="Zakelijk onderhoud en isolatie" description="Ondersteuning voor VvE’s, woningcorporaties, gemeentes, aannemers en installatiebedrijven." image={asset('business.webp')} imageAlt="Bedrijfspand in beheer van een zakelijke opdrachtgever" secondaryLabel="Bekijk onderhoud" secondaryTo="/onderhoud" />
      <TextImageSection eyebrow="Voor vastgoedorganisaties" title="Werkzaamheden op gebouw- en organisatieniveau" image="professionals.webp" imageAlt="BKW-vakman voert werkzaamheden uit" reverse>
        <p>BKW Groep combineert onderhoud, renovatie, storingswerk en isolatie voor organisaties met vastgoed of uitvoeringsprojecten.</p>
        <FeatureList items={['Grootschalig onderhoud', 'Mutatieonderhoud', 'Storingsdienst', 'Renovatie', 'Isolatiewerkzaamheden']} />
        <a className="text-link" href="mailto:yoeri@bkwgroep.nl">E-mail Yoeri de Jong <Mail aria-hidden="true" /></a>
      </TextImageSection>
      <section className="section section--warm"><div className="container"><SectionHeading eyebrow="Doelgroepen" title="Samenwerken rond bestaand vastgoed" align="center" /><div className="audience-grid"><span>VvE’s</span><span>Woningcorporaties</span><span>Gemeentes</span><span>Aannemers</span><span>Installatiebedrijven</span></div></div></section>
      <ContactCta eyebrow="Zakelijke aanvraag?" title="Bespreek de omvang en planning van uw vraag." text="Neem contact op voor een eerste afstemming met BKW Groep." />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <Seo title="Contact opnemen | BKW Groep" description="Neem telefonisch of per e-mail contact op met BKW Groep in Berkel en Rodenrijs." />
      <PageHero compact eyebrow="Contact" title="Contact opnemen met BKW Groep" description="Vertel ons waar we u mee kunnen helpen. Voor een urgente situatie kunt u het beste direct bellen." image={asset('contact.webp')} imageAlt="BKW-medewerker tijdens isolatiewerkzaamheden" secondaryLabel="Bekijk diensten" secondaryTo="/onderhoud" />
      <section className="section section--warm">
        <div className="container contact-layout">
          <div>
            <SectionHeading eyebrow="Direct bereikbaar" title="Uw vraag begint bij één contactpunt" intro="Gebruik onderstaande gegevens voor een eerste afstemming." />
            <div className="contact-cards">
              <a href="tel:+31850606663"><Phone aria-hidden="true" /><span><strong>Telefoon</strong>085 060 66 63</span></a>
              <a href="mailto:info@bkwgroup.nl"><Mail aria-hidden="true" /><span><strong>E-mail</strong>info@bkwgroup.nl</span></a>
              <div><MapPin aria-hidden="true" /><span><strong>Adres</strong>Noordeindseweg 256A<br />2651 LL Berkel en Rodenrijs</span></div>
            </div>
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
      <Seo title="Pagina niet gevonden | BKW Groep" description="Deze pagina bestaat niet in de BKW Groep-preview." />
      <span className="eyebrow">Fout 404</span>
      <h1>Pagina niet gevonden</h1>
      <p>De pagina is niet beschikbaar of heeft een ander adres gekregen.</p>
      <Link className="button button--primary" to="/">Terug naar home <ArrowRight aria-hidden="true" /></Link>
    </section>
  )
}
