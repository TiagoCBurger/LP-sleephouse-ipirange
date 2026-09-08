import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Layers3,
  MapPin,
  Menu,
  MessageCircle,
  Move3D,
  Rocket,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Store,
  Thermometer,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { COMPANY_LEGAL, type SleepHouseRegion } from "./SleepHouse";
import { captureTrackingParams } from "./tracking";

const TEMPUR_FORM_WEBHOOK = "https://hook.us1.make.celonis.com/0f3y9xvvji46epnlrhe1yc47gh4jqa39";
const WHATSAPP_MESSAGE = "Olá! Quero saber mais sobre a linha Tempur e falar com um especialista da Sleep House.";

const tempurFormQuestions = [
  {
    id: "interesse",
    label: "O que você está buscando?",
    options: ["Colchão Tempur", "Travesseiro Tempur", "Base ajustável ErgoMotion", "Ainda não sei, quero orientação"],
  },
  {
    id: "tamanho",
    label: "Qual o tamanho que você busca?",
    options: ["King", "Queen", "Casal", "Solteiro", "Medida especial"],
  },
  {
    id: "firmeza",
    label: "Qual sua preferência de firmeza?",
    options: ["Macio", "Intermediário", "Firme", "Quero ajuda do especialista"],
  },
  {
    id: "prazo",
    label: "Para quando é a compra?",
    options: ["O mais rápido possível", "Este mês", "Nos próximos 3 meses", "Apenas pesquisando"],
  },
  {
    id: "regiao",
    label: "Qual loja fica mais perto de você?",
    options: ["Ipiranga", "São Caetano"],
  },
] as const;

const differentials = [
  {
    icon: Layers3,
    number: "01",
    title: "Adaptação ao seu corpo",
    text: "O material TEMPUR® responde ao formato, ao peso e ao calor do corpo para oferecer uma sensação de conforto personalizada.",
  },
  {
    icon: Move3D,
    number: "02",
    title: "Menos interferência de movimento",
    text: "A tecnologia ajuda a absorver movimentos para que a mudança de posição de uma pessoa incomode menos a outra.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Suporte onde importa",
    text: "A distribuição uniforme da pressão combina suporte e acolhimento em diferentes pontos do corpo.",
  },
] as const;

const journey = [
  {
    icon: ScanSearch,
    title: "Entenda as diferenças",
    text: "Um especialista apresenta as tecnologias, sensações de conforto e modelos disponíveis.",
  },
  {
    icon: Sparkles,
    title: "Experimente com calma",
    text: "Deite, mude de posição e compare as opções no seu tempo, dentro da loja.",
  },
  {
    icon: Check,
    title: "Decida com segurança",
    text: "Leve em conta seu perfil, sua rotina e a sensação real de cada colchão antes de escolher.",
  },
] as const;

const productGallery = [
  {
    image: "/images/tempur/linha-tempur.png",
    eyebrow: "Coleções TEMPUR®",
    title: "Sensações de conforto para comparar",
    className: "tempur-product-card--collection",
  },
  {
    image: "/images/tempur/pro-plus-medium-firm.png",
    eyebrow: "TEMPUR PRO® Plus",
    title: "Suporte e adaptação em cada camada",
    className: "tempur-product-card--cutout",
  },
  {
    image: "/images/tempur/pro-adapt.jpg",
    eyebrow: "Experiência completa",
    title: "Tecnologia Tempur integrada ao quarto",
    className: "tempur-product-card--room",
  },
  {
    image: "/images/tempur/coolquilt-conforto.webp",
    eyebrow: "Resposta ao corpo",
    title: "Uma superfície que reage ao seu toque",
    className: "tempur-product-card--detail",
  },
  {
    image: "/images/tempur/coolquilt-detalhe.webp",
    eyebrow: "Acabamento TEMPUR®",
    title: "Detalhes que você pode ver e sentir",
    className: "tempur-product-card--detail",
  },
  {
    image: "/images/tempur/lifestyle-casal-quarto-claro.webp",
    eyebrow: "No dia a dia",
    title: "Conforto que cabe na rotina a dois",
    className: "tempur-product-card--detail",
  },
  {
    image: "/images/tempur/lifestyle-casal-cabeceira.webp",
    eyebrow: "Momentos de leveza",
    title: "Espaço para relaxar e desconectar",
    className: "tempur-product-card--detail",
  },
  {
    image: "/images/tempur/lifestyle-mulher-textura-colchao.webp",
    eyebrow: "Textura TEMPUR®",
    title: "Uma superfície que convida ao descanso",
    className: "tempur-product-card--detail",
  },
  {
    image: "/images/tempur/lifestyle-tablet-cama.webp",
    eyebrow: "Seu tempo, seu ritmo",
    title: "Confortável em qualquer momento do dia",
    className: "tempur-product-card--detail",
  },
] as const;

const spaceFeatures = [
  {
    eyebrow: "Postura de descanso",
    title: "Posição Gravidade Zero",
    text: "Inspirada na postura neutra adotada por astronautas em órbita — com as pernas mais altas que o coração —, a Posição Gravidade Zero melhora a circulação sanguínea e alivia a pressão venosa. Com a base ajustável ErgoMotion, você encontra essa posição com o toque de um controle.",
    image: "/images/tempur/nasa-gravidade-zero-astronauta.webp",
    alt: "Astronauta em caminhada espacial, referência para a Posição Gravidade Zero desenvolvida pela Tempur",
    reverse: false,
  },
  {
    eyebrow: "Material adaptativo",
    title: "Camadas TEMPUR PRO® Plus SmartCool",
    text: "Por dentro do TEMPUR PRO® Plus SmartCool Soft está o colchão mais adaptável já criado pela marca: camadas que se moldam ao formato, ao peso e à temperatura do corpo, unindo a ciência original da NASA a décadas de pesquisa própria da TEMPUR®.",
    image: "/images/tempur/tempur-pro-plus-camadas-smartcool.webp",
    alt: "Corte em camadas do colchão TEMPUR PRO Plus SmartCool Soft sobre um fundo estrelado",
    reverse: true,
  },
  {
    eyebrow: "Ajuste personalizado",
    title: "Base ErgoMotion",
    text: "Eleve a cabeceira para ler ou assistir à TV, incline os pés para relaxar ou alcance a Posição Gravidade Zero — tudo ajustável ao toque de um controle, respeitando a preferência de cada pessoa que divide a cama.",
    image: "/images/tempur/ergomotion-base-ajustavel.webp",
    alt: "Mulher lendo relaxada em uma cama com a base ajustável ErgoMotion inclinada",
    reverse: false,
  },
] as const;

const testimonials = [
  {
    author: "Monique Quin",
    text: "A Sandra me atendeu com muita paciência e me ajudou a achar o modelo certo para minha necessidade. Produto de qualidade, adoramos!",
  },
  {
    author: "Michele Turci",
    text: "Atendimento excelente e produtos de qualidade. Me explicaram tudo em detalhes e deram ótimas sugestões. Entrega rápida e perfeita!",
  },
  {
    author: "Marcelo P.",
    text: "Excelente loja, bom atendimento, entrega rápida, super recomendo. Estou amando meu colchão novo.",
  },
] as const;

const faqs = [
  {
    question: "O que torna o material TEMPUR® diferente?",
    answer: "É um material adaptativo que responde ao formato, ao peso e ao calor do corpo. Na prática, a sensação combina acolhimento, suporte e distribuição uniforme da pressão.",
  },
  {
    question: "Preciso testar o colchão antes de escolher?",
    answer: "É altamente recomendável. Sensações como firmeza e acolhimento são pessoais; experimentar e comparar modelos ajuda você a tomar uma decisão mais segura.",
  },
  {
    question: "A Sleep House vende online?",
    answer: "Esta página não realiza compra direta. Nosso objetivo é orientar você pelo WhatsApp e, se desejar, agendar uma experiência presencial na loja.",
  },
  {
    question: "Vocês atendem quais regiões?",
    answer: "Atendemos clientes de Ipiranga e São Caetano, com lojas e consultores preparados para apresentar a linha Tempur.",
  },
  {
    question: "Como funciona o atendimento consultivo?",
    answer: "Você conta o que busca, recebe uma explicação clara sobre as opções e pode testar os colchões. A indicação considera suas preferências, sem obrigação de compra.",
  },
] as const;

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const TEMPUR_STORE_MAP_QUERIES = [
  "Avenida Nazaré 550 Ipiranga São Paulo",
  "Avenida Goiás 436 Santo Antônio São Caetano do Sul",
];

function tempurStores(region: SleepHouseRegion) {
  const stores = region.stores.filter((store) => TEMPUR_STORE_MAP_QUERIES.includes(store.mapQuery));
  return stores.length > 0 ? stores : region.stores;
}

function whatsappHref(region: SleepHouseRegion) {
  return `https://wa.me/${region.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

function track(event: Record<string, unknown>) {
  (window as DataLayerWindow).dataLayer?.push({
    page_variant: "tempur",
    region: "sao-paulo-grande-abc",
    ...event,
  });
}

function TempurButton({
  region,
  location,
  label = "Quero conhecer a linha Tempur",
  className = "",
}: {
  region: SleepHouseRegion;
  location: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={`tempur-button ${className}`.trim()}
      data-cta-location={location}
      href={whatsappHref(region)}
      onClick={() => track({ event: "whatsapp_click", cta_location: location })}
      rel="noreferrer"
      target="_blank"
    >
      <span>{label}</span>
      <ArrowRight aria-hidden="true" strokeWidth={1.8} />
    </a>
  );
}

function LeadForm({ region }: { region: SleepHouseRegion }) {
  const [tracking] = useState(() => captureTrackingParams());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const isContactStep = step === tempurFormQuestions.length;
  const question = tempurFormQuestions[step];

  const selectAnswer = (id: string, option: string) => {
    setAnswers((current) => ({ ...current, [id]: option }));
    window.setTimeout(() => setStep((current) => Math.min(current + 1, tempurFormQuestions.length)), 180);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!answers.nome || !answers.whatsapp || answers.consentimento !== "sim") return;
    setStatus("sending");
    const body = new URLSearchParams({
      ...answers,
      interesse: answers.interesse ?? "Linha Tempur",
      cidade: region.label,
      versao: "landing-page-tempur-multistep",
      pagina: window.location.href,
      enviado_em: new Date().toISOString(),
      ...tracking,
    });

    try {
      await fetch(TEMPUR_FORM_WEBHOOK, { method: "POST", mode: "no-cors", body });
      track({ event: "lead_form_submit", form_version: "landing-page-tempur-multistep", ...answers, ...tracking });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="tempur-form-success" role="status">
        <span><Check aria-hidden="true" /></span>
        <h3>Recebemos seu contato.</h3>
        <p>Um especialista da Sleep House vai falar com você. Se preferir, continue agora pelo WhatsApp.</p>
        <TempurButton label="Continuar no WhatsApp" location="form_success" region={region} />
      </div>
    );
  }

  return (
    <form className="tempur-form tempur-form--multistep" onSubmit={submit}>
      {Object.entries(tracking).map(([key, value]) => (value ? <input key={key} name={key} type="hidden" value={value} /> : null))}
      <div className="tempur-form-heading">
        <span>Atendimento personalizado</span>
        <h3>Vamos montar sua recomendação Tempur</h3>
        <p>Responda algumas perguntas rápidas. Ao final, um especialista entra em contato.</p>
      </div>
      <div className="tempur-form-progress" aria-label={`Etapa ${step + 1} de ${tempurFormQuestions.length + 1}`}>
        <span style={{ transform: `scaleX(${(step + 1) / (tempurFormQuestions.length + 1)})` }} />
      </div>
      <p className="tempur-form-step">Etapa {step + 1} de {tempurFormQuestions.length + 1}</p>

      {!isContactStep && question ? (
        <fieldset key={question.id}>
          <legend>{question.label}</legend>
          <div className="tempur-form-options">
            {question.options.map((option) => (
              <label className={answers[question.id] === option ? "is-selected" : ""} key={option}>
                <input
                  checked={answers[question.id] === option}
                  name={question.id}
                  onChange={() => selectAnswer(question.id, option)}
                  type="radio"
                  value={option}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : (
        <fieldset className="tempur-form-contact">
          <legend>Como podemos falar com você?</legend>
          <label>
            <span>Nome</span>
            <input
              autoComplete="name"
              name="nome"
              onChange={(event) => setAnswers((current) => ({ ...current, nome: event.target.value }))}
              placeholder="Como podemos chamar você?"
              required
              type="text"
              value={answers.nome ?? ""}
            />
          </label>
          <label>
            <span>WhatsApp</span>
            <input
              autoComplete="tel"
              inputMode="tel"
              name="whatsapp"
              onChange={(event) => setAnswers((current) => ({ ...current, whatsapp: event.target.value }))}
              placeholder="(11) 99999-9999"
              required
              type="tel"
              value={answers.whatsapp ?? ""}
            />
          </label>
          <label>
            <span>E-mail <small>(opcional)</small></span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => setAnswers((current) => ({ ...current, email: event.target.value }))}
              type="email"
              value={answers.email ?? ""}
            />
          </label>
          <label className="tempur-consent">
            <input
              checked={answers.consentimento === "sim"}
              name="consentimento"
              onChange={(event) => setAnswers((current) => ({ ...current, consentimento: event.target.checked ? "sim" : "" }))}
              required
              type="checkbox"
            />
            <span>Autorizo o contato da Sleep House sobre a linha Tempur.</span>
          </label>
          <button className="tempur-button tempur-form-submit" disabled={status === "sending"} type="submit">
            <span>{status === "sending" ? "Enviando..." : "Quero falar com um especialista"}</span>
            <ArrowRight aria-hidden="true" strokeWidth={1.8} />
          </button>
          {status === "error" ? <p className="tempur-form-error" role="alert">Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.</p> : null}
          <small>Seus dados serão usados apenas para este atendimento.</small>
        </fieldset>
      )}
      {step > 0 ? <button className="tempur-form-back" onClick={() => setStep((current) => current - 1)} type="button">Voltar</button> : null}
    </form>
  );
}

export default function TempurPage({ region }: { region: SleepHouseRegion }) {
  const stores = tempurStores(region);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cursorDotRef = useRef<HTMLSpanElement>(null);
  const cursorRingRef = useRef<HTMLSpanElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const title = "Colchões Tempur em Ipiranga e São Caetano | Sleep House";
    const description = "Conheça e experimente a linha Tempur com atendimento especializado da Sleep House para Ipiranga e São Caetano.";
    document.documentElement.classList.add("tempur-route");
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", `${region.domain}/videos/tempur-hero-poster.jpg`);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", new URL("/tempur", region.domain).href);
    track({ event: "landing_version_view" });

    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    document.querySelectorAll(".tempur-reveal").forEach((element) => observer.observe(element));

    return () => {
      document.documentElement.classList.remove("tempur-route");
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [region]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const playFromStart = () => {
      video.currentTime = 0;
      void video.play().catch(() => {
        // The muted autoplay attributes remain as the browser-level fallback.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      playFromStart();
      return;
    }

    video.addEventListener("loadeddata", playFromStart, { once: true });
    return () => video.removeEventListener("loadeddata", playFromStart);
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let frame = 0;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      document.documentElement.toggleAttribute(
        "data-cursor-interactive",
        event.target instanceof Element && Boolean(event.target.closest("a, button, input, select, summary, [role='button']")),
      );
    };
    const updateScrollProgress = () => {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      ring.style.setProperty("--tempur-scroll-progress", String(progress));
    };
    const leave = () => {
      targetX = -100;
      targetY = -100;
    };
    const render = () => {
      dotX += (targetX - dotX) * 0.34;
      dotY += (targetY - dotY) * 0.34;
      ringX += (targetX - ringX) * 0.11;
      ringY += (targetY - ringY) * 0.11;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    updateScrollProgress();
    frame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", updateScrollProgress);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeAttribute("data-cursor-interactive");
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [gsapModule, scrollTriggerModule, lenisModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add("tempur-gsap-ready");

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      let raf = 0;
      const tick = (time: number) => {
        lenis.raf(time);
        raf = window.requestAnimationFrame(tick);
      };
      lenis.on("scroll", ScrollTrigger.update);
      raf = window.requestAnimationFrame(tick);

      const scope = document.querySelector(".tempur-page") ?? undefined;
      const context = gsap.context(() => {
        gsap.fromTo(
          ".tempur-hero-media video",
          { scale: 1 },
          {
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: ".tempur-hero", start: "top top", end: "bottom top", scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>(".tempur-reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 42 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 88%", once: true },
            },
          );
        });

        gsap.fromTo(
          ".tempur-differentials article",
          { opacity: 0, y: 28, scale: 0.975 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.78,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ".tempur-differentials", start: "top 84%", once: true },
          },
        );

        gsap.fromTo(
          ".tempur-product-card",
          { opacity: 0, y: 52, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".tempur-products-grid", start: "top 86%", once: true },
          },
        );

        gsap.utils.toArray<HTMLImageElement>(".tempur-parallax").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: 0.55 },
            },
          );
        });

        gsap.fromTo(
          ".tempur-testimonial-grid blockquote",
          { opacity: 0, x: 28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".tempur-testimonial-grid", start: "top 86%", once: true },
          },
        );
      }, scope);

      ScrollTrigger.refresh();
      cleanup = () => {
        window.cancelAnimationFrame(raf);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        document.documentElement.classList.remove("tempur-gsap-ready");
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return (
    <div className="tempur-page">
      <a className="skip-link" href="#conteudo-tempur">Pular para o conteúdo</a>

      <header className={`tempur-header ${scrolled ? "is-scrolled" : ""}`}>
        <a aria-label="Sleep House — página inicial" className="tempur-header-brand" href="/">
          <img alt="Sleep House" src="/brand/sleep-house/logo.svg" />
        </a>
        <span className="tempur-header-divider" aria-hidden="true" />
        <img className="tempur-header-tempur" alt="Tempur" src="/brand/optimized/tempur.webp" />

        <nav aria-label="Navegação principal" className={menuOpen ? "is-open" : ""}>
          <a href="#tecnologia" onClick={() => setMenuOpen(false)}>Tecnologia</a>
          <a href="#nasa" onClick={() => setMenuOpen(false)}>Origem NASA</a>
          <a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a>
          <a href="#experiencia" onClick={() => setMenuOpen(false)}>Experimente</a>
          <a href="#depoimentos" onClick={() => setMenuOpen(false)}>Depoimentos</a>
          <a href="#duvidas" onClick={() => setMenuOpen(false)}>Dúvidas</a>
        </nav>

        <TempurButton className="tempur-header-cta" label="Falar com especialista" location="header" region={region} />
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="tempur-menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <main id="conteudo-tempur">
        <section className="tempur-hero">
          <div className="tempur-hero-media" aria-hidden="true">
            <video
              autoPlay
              disablePictureInPicture
              loop
              muted
              playsInline
              poster="/videos/tempur-hero-poster.jpg"
              preload="auto"
              ref={heroVideoRef}
              tabIndex={-1}
            >
              <source src="/videos/tempur-hero-6s.webm" type="video/webm" />
              <source src="/videos/tempur-hero-6s.mp4" type="video/mp4" />
            </video>
            <span className="tempur-hero-shade" />
          </div>
          <div className="tempur-hero-grid">
            <div className="tempur-hero-copy">
              <p className="tempur-kicker"><span /> Linha Tempur na Sleep House</p>
              <h1>Seu corpo sente a diferença antes mesmo de você explicar.</h1>
              <p className="tempur-hero-lead">Conheça a tecnologia Tempur, compare as opções e experimente o conforto pessoalmente com orientação especializada.</p>
              <div className="tempur-hero-actions">
                <TempurButton location="hero" region={region} />
                <a className="tempur-text-link" href="#tecnologia">Entender a tecnologia <ArrowRight aria-hidden="true" /></a>
              </div>
              <ul className="tempur-hero-trust" aria-label="Diferenciais do atendimento">
                <li><Check aria-hidden="true" /> Teste presencial</li>
                <li><Check aria-hidden="true" /> Atendimento consultivo</li>
                <li><Check aria-hidden="true" /> Ipiranga e São Caetano</li>
              </ul>
            </div>
            <div className="tempur-hero-note">
              <span>Experiência real</span>
              <p>Colchão premium não se escolhe só por foto. Seu corpo precisa participar da decisão.</p>
            </div>
          </div>
          <a className="tempur-scroll-cue" href="#tecnologia"><span /> Role para conhecer</a>
        </section>

        <section className="tempur-testimonials tempur-testimonials--second-fold" id="depoimentos">
          <div className="tempur-shell">
            <div className="tempur-testimonials-heading tempur-reveal">
              <div>
                <p className="tempur-section-label">Experiências Sleep House</p>
                <h2>Quem escolhe com a gente, conta assim.</h2>
              </div>
              <span className="tempur-rating"><strong>5,0</strong><span>★★★★★</span><small>Relatos de clientes</small></span>
            </div>
          </div>
          <div className="tempur-testimonials-marquee tempur-reveal" aria-label="Depoimentos de clientes Sleep House">
            <div className="tempur-testimonials-track">
              {[0, 1].map((groupIndex) => (
                <div className="tempur-testimonials-group" aria-hidden={groupIndex === 1} key={groupIndex}>
                  {testimonials.map((testimonial) => (
                    <blockquote className="tempur-testimonial-card" key={`${groupIndex}-${testimonial.author}`}>
                      <span aria-label="5 de 5 estrelas">★★★★★</span>
                      <p>“{testimonial.text}”</p>
                      <footer>{testimonial.author}</footer>
                    </blockquote>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="tempur-intro" id="tecnologia">
          <div className="tempur-shell tempur-reveal">
            <p className="tempur-section-label">Por dentro da tecnologia</p>
            <div className="tempur-intro-heading">
              <h2>Um material que se adapta. Uma sensação que só você pode avaliar.</h2>
              <p>Desenvolvido originalmente pela NASA e aprimorado ao longo de décadas de pesquisa própria, o material TEMPUR® responde ao corpo de forma progressiva. O resultado não é uma promessa genérica: é uma experiência de conforto que vale comparar pessoalmente.</p>
            </div>
            <div className="tempur-differentials">
              {differentials.map((item) => (
                <article key={item.number}>
                  <div className="tempur-card-top">
                    <span>{item.number}</span>
                    <item.icon aria-hidden="true" strokeWidth={1.45} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tempur-space" id="nasa">
          <div className="tempur-shell tempur-space-intro tempur-reveal">
            <div className="tempur-space-intro-copy">
              <p className="tempur-section-label">Origem espacial</p>
              <h2>A única marca de colchões certificada pela NASA.</h2>
              <p className="tempur-space-lead">Na década de 1970, a NASA desenvolveu um material viscoelástico para proteger astronautas da pressão extrema durante o lançamento das naves. Décadas de pesquisa depois, essa mesma ciência resultou no material TEMPUR® — hoje reconhecido pela Space Foundation com o selo Certified Space Technology, que nenhuma outra marca de colchões possui.</p>
              <ul className="tempur-space-badges">
                <li><Rocket aria-hidden="true" strokeWidth={1.6} /> Origem no programa espacial da NASA</li>
                <li><Award aria-hidden="true" strokeWidth={1.6} /> Selo Certified Space Technology</li>
                <li><Thermometer aria-hidden="true" strokeWidth={1.6} /> Camadas que respondem ao calor do corpo</li>
              </ul>
            </div>
            <figure className="tempur-space-seal">
              <img alt="Selo Certified Space Technology da Space Foundation, que certifica a tecnologia TEMPUR® como tecnologia espacial" loading="lazy" src="/images/tempur/nasa-space-certified-technology.webp" />
              <figcaption>Única marca de colchões reconhecida pela NASA</figcaption>
            </figure>
          </div>

          <div className="tempur-shell tempur-space-features">
            {spaceFeatures.map((feature) => (
              <article className={`tempur-space-feature ${feature.reverse ? "tempur-space-feature--reverse" : ""}`.trim()} key={feature.title}>
                <div className="tempur-space-feature-media tempur-reveal">
                  <img alt={feature.alt} className="tempur-parallax" loading="lazy" src={feature.image} />
                </div>
                <div className="tempur-space-feature-copy tempur-reveal">
                  <small>{feature.eyebrow}</small>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="tempur-shell tempur-space-cta tempur-reveal">
            <TempurButton label="Quero sentir a tecnologia Tempur" location="nasa" region={region} />
          </div>
        </section>

        <section className="tempur-products" id="produtos">
          <div className="tempur-shell">
            <div className="tempur-products-heading tempur-reveal">
              <div>
                <p className="tempur-section-label">Conheça de perto</p>
                <h2>Tecnologia que aparece em cada camada e detalhe.</h2>
              </div>
              <p>Veja algumas das linhas, acabamentos e sensações que você pode comparar com a orientação de um especialista Sleep House.</p>
            </div>
            <div className="tempur-products-grid">
              {productGallery.map((product, index) => (
                <figure className={`tempur-product-card ${product.className}`} key={product.image}>
                  <div className="tempur-product-media">
                    <img
                      alt={`${product.eyebrow}: ${product.title}`}
                      className="tempur-parallax"
                      loading="lazy"
                      src={product.image}
                    />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <figcaption>
                    <small>{product.eyebrow}</small>
                    <h3>{product.title}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="tempur-test-section" id="experiencia">
          <div className="tempur-shell tempur-test-grid">
            <div className="tempur-test-media tempur-reveal">
              <img alt="Colchões Tempur disponíveis para experimentar na Sleep House" className="tempur-parallax" loading="lazy" src="/images/sleep-house/optimized/produto-tempur.webp" />
              <div className="tempur-image-caption">
                <span>Showroom Sleep House</span>
                <strong>Experimente antes de decidir</strong>
              </div>
            </div>
            <div className="tempur-test-copy tempur-reveal">
              <p className="tempur-section-label">Por que testar?</p>
              <h2>Conforto premium é uma decisão pessoal.</h2>
              <p className="tempur-test-lead">Fotos ajudam a conhecer. Especificações ajudam a comparar. Mas só o teste mostra como cada opção conversa com o seu corpo.</p>
              <div className="tempur-journey">
                {journey.map((item, index) => (
                  <article key={item.title}>
                    <span className="tempur-journey-icon"><item.icon aria-hidden="true" strokeWidth={1.5} /></span>
                    <div>
                      <small>Passo {index + 1}</small>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <TempurButton label="Agendar uma experiência" location="experience" region={region} />
            </div>
          </div>
        </section>

        <section className="tempur-guidance">
          <div className="tempur-shell tempur-guidance-grid tempur-reveal">
            <div>
              <p className="tempur-section-label">Orientação Sleep House</p>
              <h2>Você não precisa entender tudo de colchão para escolher bem.</h2>
            </div>
            <div className="tempur-guidance-copy">
              <p>Nosso papel é traduzir tecnologia em sensação prática. Você conta o que procura, testa as opções e recebe uma orientação clara — sem transformar uma escolha importante em um palpite.</p>
              <ul>
                <li><Check aria-hidden="true" /> Explicação simples das diferenças entre modelos</li>
                <li><Check aria-hidden="true" /> Comparação de sensações de conforto</li>
                <li><Check aria-hidden="true" /> Atendimento no seu ritmo e sem obrigação de compra</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="tempur-location">
          <div className="tempur-shell tempur-location-grid">
            <div className="tempur-location-copy tempur-reveal">
              <p className="tempur-section-label">Perto de você</p>
              <h2>Atendimento para Ipiranga e São Caetano.</h2>
              <p>Fale com um especialista para conhecer os modelos disponíveis e encontrar a loja mais conveniente para sua experiência.</p>
              <div className="tempur-location-badges">
                <span><MapPin aria-hidden="true" /> Ipiranga</span>
                <span><MapPin aria-hidden="true" /> São Caetano</span>
              </div>
              <TempurButton label="Encontrar a melhor loja" location="location" region={region} />
            </div>
            <div className="tempur-location-media tempur-reveal">
              <img alt="Fachada de uma loja Sleep House com exposição Tempur" className="tempur-parallax" loading="lazy" src="/images/sleep-house/loja-fachada.jpg" />
              <div className="tempur-location-card">
                <Store aria-hidden="true" strokeWidth={1.5} />
                <div>
                  <small>Atendimento presencial</small>
                  <strong>Consulte a unidade mais próxima</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="tempur-shell tempur-store-directory">
            <div className="tempur-store-directory-heading tempur-reveal">
              <div>
                <p className="tempur-section-label">Unidades com linha Tempur</p>
                <h3>Escolha onde quer viver a experiência Tempur.</h3>
              </div>
              <span>{stores.length} lojas com atendimento Tempur</span>
            </div>
            <div className="tempur-store-grid">
              {stores.map((store, index) => (
                <article className="tempur-store-card tempur-reveal" key={`${store.name}-${store.address}`}>
                  <span className="tempur-store-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h4>{store.name}</h4>
                    <p>{store.address}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.mapQuery)}`}
                    onClick={() => track({ event: "store_directions_click", store_name: store.name })}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Como chegar <ArrowRight aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tempur-faq" id="duvidas">
          <div className="tempur-shell tempur-faq-grid">
            <div className="tempur-faq-heading tempur-reveal">
              <p className="tempur-section-label">Dúvidas frequentes</p>
              <h2>Antes de experimentar, vale saber.</h2>
              <p>Ainda ficou com alguma dúvida? Nosso time conversa com você pelo WhatsApp.</p>
              <TempurButton label="Tirar uma dúvida" location="faq" region={region} />
            </div>
            <div className="tempur-faq-list tempur-reveal">
              {faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
                  <summary><span>{faq.question}</span><ChevronDown aria-hidden="true" /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="tempur-conversion">
          <div className="tempur-shell tempur-conversion-grid">
            <div className="tempur-conversion-copy tempur-reveal">
              <p className="tempur-section-label">Seu próximo passo</p>
              <h2>Conheça a linha Tempur com quem entende da sua escolha.</h2>
              <p>Converse agora pelo WhatsApp ou deixe seus dados para receber um atendimento consultivo.</p>
              <TempurButton location="final" region={region} />
              <span className="tempur-conversion-note"><MessageCircle aria-hidden="true" /> Atendimento humano, direto e sem compromisso.</span>
            </div>
            <div className="tempur-reveal"><LeadForm region={region} /></div>
          </div>
        </section>
      </main>

      <footer className="tempur-footer">
        <div className="tempur-shell tempur-footer-main">
          <div className="tempur-footer-brand">
            <img alt="Sleep House" src="/brand/sleep-house/logo.svg" />
            <span aria-hidden="true" />
            <img alt="Tempur" src="/brand/optimized/tempur.webp" />
          </div>
          <p>Linha Tempur com atendimento especializado Sleep House para Ipiranga e São Caetano.</p>
          <nav aria-label="Links do rodapé">
            <a href="/">Site Sleep House</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
        </div>
        <div className="tempur-shell tempur-footer-legal">
          <div className="footer-company">
            <span>© 2026 Sleep House {region.label}. Todos os direitos reservados.</span>
            <p>
              {COMPANY_LEGAL.legalName}
              <br />
              CNPJ {COMPANY_LEGAL.cnpj} · {COMPANY_LEGAL.city}, {COMPANY_LEGAL.country} ·{" "}
              <a href={COMPANY_LEGAL.phoneHref}>{COMPANY_LEGAL.phone}</a>
            </p>
          </div>
          <span>TEMPUR® é uma marca de seus respectivos proprietários.</span>
        </div>
      </footer>

      <TempurButton className="tempur-floating-cta" label="Falar no WhatsApp" location="floating" region={region} />
      <div aria-hidden="true" className="custom-cursor tempur-custom-cursor">
        <span className="custom-cursor-dot" ref={cursorDotRef} />
        <span className="custom-cursor-ring" ref={cursorRingRef} />
      </div>
    </div>
  );
}
