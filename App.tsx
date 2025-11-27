import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Check, 
  Heart, 
  ShieldCheck, 
  Utensils, 
  ChevronDown, 
  Star,
  AlertTriangle,
  Bone,
  Clock,
  Sparkles,
  Cat,
  Dog,
  GlassWater,
  Calendar,
  Trees,
  Mail
} from 'lucide-react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { Testimonial, FaqItem, RecipePreview } from './types';

// --- Constants & Data ---

const RECIPES: RecipePreview[] = [
  {
    id: 1,
    title: "Biscoitos Natalinos Crock",
    description: "Crocantes, seguros e em formato de árvore. O sucesso da noite.",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
    category: 'Cães'
  },
  {
    id: 2,
    title: "Patê Festivo de Salmão",
    description: "Textura perfeita e aroma irresistível para os felinos.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
    category: 'Gatos'
  },
  {
    id: 3,
    title: "Drink Refrescante de Melancia",
    description: "Hidratação e sabor para os dias quentes de dezembro.",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=800&auto=format&fit=crop",
    category: 'Bebidas'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Júlia Mendes",
    role: "Tutora do Thor",
    content: "Achei que seria difícil, mas as receitas são super práticas. O Thor comeu tudo e passou o Natal super bem, sem passar mal como ano passado!",
    avatar: "https://i.ibb.co/sdqdX2yQ/8061eb66d7eb7c79db8e3f8149b43a00.jpg"
  },
  {
    id: 2,
    name: "Dr. Ricardo Alves",
    role: "Veterinário Nutrólogo",
    content: "Como profissional, aprovo o material. As receitas respeitam a fisiologia animal e são uma alternativa segura aos perigos da ceia humana.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Amanda Costa",
    role: "Mãe de 3 Gatos",
    content: "Finalmente algo pensado para gatos! Fiz o patê de atum festivo e eles amaram. O eBook é lindo e muito fácil de ler no celular.",
    avatar: "https://i.ibb.co/7NZ1G49t/3bc79cabbd34d6ba2d2214368b060ddf.jpg"
  }
];

const FAQS: FaqItem[] = [
  {
    question: "Quando recebo o acesso?",
    answer: "Imediatamente! Assim que o pagamento é confirmado, você recebe um e-mail com o link para baixar seu eBook em PDF."
  },
  {
    question: "Preciso saber cozinhar bem?",
    answer: "Zero! As receitas foram criadas pensando na praticidade. Se você sabe ferver água e misturar ingredientes, vai conseguir fazer pratos incríveis."
  },
  {
    question: "Serve para cães e gatos?",
    answer: "Sim! O guia contém 5 receitas exclusivas para cães, 3 especialmente para gatos e 2 bebidas refrescantes que ambos podem aproveitar."
  },
  {
    question: "E se meu pet não gostar?",
    answer: "Oferecemos garantia incondicional de 7 dias. Se você ou seu pet não amarem, devolvemos 100% do seu dinheiro."
  }
];

// --- Sub-components ---

const AccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-dark-border last:border-0">
      <button
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg font-semibold text-gray-200 group-hover:text-neon-red transition-colors pr-4">{item.question}</span>
        <ChevronDown className={`w-5 h-5 text-neon-red transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 text-sm md:text-base">{item.answer}</p>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ElementType, title: string, description: string, color?: string }> = ({ icon: Icon, title, description, color = 'text-neon-green' }) => (
  <div className="bg-dark-card/50 backdrop-blur-md p-6 rounded-xl border border-dark-border hover:border-neon-green/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center">
    <div className={`w-14 h-14 bg-dark-surface rounded-full flex items-center justify-center mb-4 group-hover:shadow-neon-green shadow-none transition-shadow duration-300`}>
      <Icon className={`w-7 h-7 ${color}`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </div>
);

const ModuleCard: React.FC<{ title: string, items: string[], icon: React.ElementType }> = ({ title, items, icon: Icon }) => (
  <div className="bg-gradient-to-br from-dark-card to-dark-surface p-1 rounded-2xl h-full">
    <div className="bg-dark-bg h-full p-6 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={80} />
      </div>
      <h3 className="text-xl font-bold text-neon-gold mb-4 flex items-center gap-2">
        <Icon size={20} /> {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start text-gray-300 text-sm">
            <Check className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// --- Main Application Component ---

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPrice = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg overflow-x-hidden font-sans">
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-dark-bg/90 backdrop-blur-md border-dark-border py-3' : 'bg-transparent border-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co/C52BdLyC/Whats-App-Image-2025-10-21-at-10-20-44.jpg" 
              alt="Petshoppis Logo" 
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover" 
            />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl text-white tracking-tight leading-none">
                Petshoppis
              </span>
              <span className="text-[10px] font-bold text-neon-red tracking-widest uppercase">
                Especial de Natal
              </span>
            </div>
          </div>
          {/* Desktop Button - Added Price for Clarity */}
          <Button 
            size="sm" 
            variant={scrolled ? "neon-primary" : "ghost"}
            onClick={scrollToPrice}
            className="hidden md:inline-flex"
          >
            GARANTIR POR R$19,90
          </Button>
          {/* Mobile Button */}
          <Button 
            size="sm" 
            variant="neon-primary"
            onClick={scrollToPrice}
            className="md:hidden text-xs px-3 py-1.5"
          >
            GARANTIR AGORA
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-red/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-green/15 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Left Column: Image + Text */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Main Hero Image Above Headline */}
              <div className="mb-8 relative group w-full max-w-lg mx-auto lg:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-red to-neon-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                {/* Added Social Proof Stars Overlay */}
                <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 z-20 border border-neon-gold/30">
                   <div className="flex text-neon-gold"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                   <span className="text-[10px] font-bold text-white uppercase">Aprovado por Vets</span>
                </div>
                <img 
                    src="https://i.ibb.co/rRDj024q/Chat-GPT-Image-19-de-nov-de-2025-15-25-09.png" 
                    alt="Pet feliz comemorando o natal" 
                    className="relative rounded-2xl w-full shadow-2xl border border-white/10 object-cover aspect-video lg:aspect-auto"
                />
              </div>

              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-neon-red/10 border border-neon-red/30 backdrop-blur-sm">
                <span className="text-neon-red text-xs font-bold tracking-wider uppercase">Edição Limitada 2025</span>
              </div>
              
              {/* Reverted Headline to previous version */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 font-display">
                🎄 Neste Natal, permita que seu pet esteja à mesa com você — <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red via-neon-gold to-neon-green">com todo o cuidado, amor e segurança que ele merece.</span>
              </h1>
              
              {/* Reverted Subheadline to previous version */}
              <div className="text-lg text-gray-300 mb-8 leading-relaxed space-y-4 max-w-xl mx-auto lg:mx-0">
                <p>Receitas aprovadas por veterinários para garantir uma ceia deliciosa sem riscos para o seu melhor amigo.</p>
                <p className="font-semibold text-white flex items-center justify-center lg:justify-start gap-2">
                   <Check className="text-neon-green w-4 h-4" /> 
                   ➡️ Transforme o Natal do seu pet em um momento especial e 100% seguro.
                </p>
              </div>

              <div className="flex flex-col gap-4 justify-center lg:justify-start items-center lg:items-start">
                {/* Optimized CTA: Low friction with Price Anchor */}
                <Button size="lg" pulse onClick={scrollToPrice}>
                  Proporcionar um natal especial para meu pet
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-400 text-center">
                <ShieldCheck className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span>Conteúdo validado por Nutrólogos Veterinários</span>
              </div>
            </div>

            {/* Right Column: Product Mockup - Reverted to Pet Food Image */}
            <div className="flex-1 w-full max-w-md lg:max-w-none relative">
              <div className="relative z-10 transform transition-transform duration-500 hover:scale-105">
                <div className="absolute -inset-4 bg-neon-green/20 rounded-full blur-xl"></div>
                <img 
                  src="https://i.ibb.co/bg0sR30D/Chat-GPT-Image-19-de-nov-de-2025-16-04-18.png" 
                  alt="eBook Mockup Receitas Natalinas" 
                  className="relative w-full drop-shadow-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Benefits Section - Grid Layout */}
      <Section bg="darker">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-display">
            Por que você precisa deste guia?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Evite a emergência veterinária e garanta um Natal tranquilo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={Heart} 
            title="Conexão Real" 
            description="Seu pet deixa de ficar pedindo comida e passa a celebrar junto com a família."
          />
          <FeatureCard 
            icon={ShieldCheck} 
            title="Zero Risco" 
            description="Diga adeus ao medo de intoxicação. Ingredientes 100% seguros selecionados por vets."
          />
          <FeatureCard 
            icon={Clock} 
            title="Sem Complicação" 
            description="Não precisa saber cozinhar. Receitas simples, rápidas e com ingredientes que você já tem."
          />
          <FeatureCard 
            icon={Trees} 
            title="Especial de Natal" 
            description="Biscoitos e patês temáticos que deixam as fotos de Natal ainda mais lindas."
            color="text-neon-red"
          />
        </div>
      </Section>

      {/* Content Preview Section - Side by Side */}
      <Section bg="dark">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6 font-display">
                O que você vai receber agora:
              </h2>
              <p className="text-gray-400 text-lg mb-8 mx-auto md:mx-0">
                Acesso imediato ao PDF com o menu completo para agradar até os paladares mais exigentes.
              </p>
            </div>

            <div className="grid gap-4">
              <ModuleCard 
                title="Para Cães" 
                icon={Dog}
                items={[
                  "Ceia Clássica Dog",
                  "Arroz Festivo Canino",
                  "Carne Natalina Fit",
                  "Panetone Dog",
                  "Rabanada Canina"
                ]}
              />
              <ModuleCard 
                title="Para Gatos" 
                icon={Cat}
                items={[
                  "Natal Premium Felino",
                  "Salmão Suave de Festa",
                  "Patê de Atum Light"
                ]}
              />
              <ModuleCard 
                title="Refrescantes" 
                icon={GlassWater}
                items={[
                  "Sorvetinho Natal de Coco",
                  "Picolé Relaxe Anti-Fogos"
                ]}
              />
            </div>
          </div>
          
          <div className="flex-1 relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-red/20 to-neon-green/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-dark-card p-8 rounded-3xl border border-dark-border">
               <div className="space-y-4">
                 {RECIPES.map((recipe) => (
                   <div key={recipe.id} className="flex items-center gap-4 p-3 bg-dark-bg rounded-xl border border-dark-border hover:border-neon-red/30 transition-colors">
                     <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
                     <div>
                       <div className="text-xs font-bold text-neon-gold mb-1 uppercase">{recipe.category}</div>
                       <h4 className="text-white font-bold text-sm">{recipe.title}</h4>
                     </div>
                   </div>
                 ))}
               </div>
               {/* Added Persuasion Note */}
               <div className="mt-6 text-center text-xs text-gray-500">
                  Imagens ilustrativas. Resultado final pode variar com muito amor!
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing Section - Side by Side */}
      <Section id="pricing" bg="darker" className="relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-dark-bg border-2 border-neon-red rounded-3xl p-8 md:p-12 shadow-neon-red relative overflow-hidden">
            
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-neon-red text-white text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-widest">
              Oferta de Natal
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2 font-display flex items-center justify-center md:justify-start gap-2">
                   <Trees className="text-neon-green" /> OFERTA ESPECIAL <Trees className="text-neon-green" />
                </h2>
                <p className="text-gray-400 mb-6">Pague uma vez, acesse para sempre.</p>
                
                <div className="flex items-baseline justify-center md:justify-start gap-2 mb-6">
                  <span className="text-gray-500 line-through text-xl">R$ 49,90</span>
                  <span className="text-5xl font-black text-neon-gold">R$ 19,90</span>
                </div>

                <div className="space-y-3 mb-8 flex flex-col md:items-start items-center">
                  <div className="flex items-center gap-2 text-gray-300 text-left">
                    <div className="bg-neon-green/20 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-neon-green" /></div>
                    <span className="whitespace-nowrap">10 Receitas Natalinas Exclusivas</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-left">
                    <div className="bg-neon-green/20 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-neon-green" /></div>
                    <span className="whitespace-nowrap">Checklist rápido de preparo (Bônus)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-left">
                    <div className="bg-neon-green/20 p-1 rounded-full flex-shrink-0"><Check size={14} className="text-neon-green" /></div>
                    <span className="whitespace-nowrap">Dicas Anti-Fogos (Bônus)</span>
                  </div>
                </div>

                <Button fullWidth size="lg" pulse onClick={() => window.open('https://checkout.checkoutpetshoppis.online/VCCL1O8SCJ9E', '_blank')}>
                  GARANTIR OFERTA AGORA
                </Button>
                
                <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-xs text-gray-500">
                  <ShieldCheck size={14} />
                  Ambiente Seguro & Entrega Imediata no E-mail
                </div>
              </div>

              <div className="flex-1 w-full max-w-xs">
                 <div className="relative rounded-xl overflow-hidden border border-neon-red/30 shadow-2xl transform hover:rotate-2 transition-transform">
                    <img 
                      src="https://i.ibb.co/qMP5c8Jc/Gemini-Generated-Image-2bsh1z2bsh1z2bsh.png" 
                      alt="Capa do eBook Oferta" 
                      className="w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                       <p className="text-white font-bold text-sm">Download Digital Instantâneo</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Urgency Bar - Optimized Copy */}
            <div className="mt-8 pt-6 border-t border-dark-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
               <div className="flex items-center gap-2 text-neon-red font-bold animate-pulse">
                 <AlertTriangle size={20} />
                 <span>Atenção: Oferta válida até o Natal!</span>
               </div>
               <div className="flex items-center gap-2 text-gray-400 text-sm">
                 <Calendar size={16} />
                 Garanta antes que o preço suba
               </div>
            </div>

          </div>
        </div>
      </Section>

      {/* Testimonials - Grid Layout */}
      <Section bg="dark">
        <h2 className="text-3xl font-black text-white text-center mb-12 font-display">
          Tutores Felizes, Pets Saudáveis <Heart className="inline text-neon-red fill-neon-red" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-dark-card p-6 rounded-2xl border border-dark-border relative">
              <div className="absolute -top-4 left-6">
                <div className="bg-neon-gold text-black p-2 rounded-lg">
                  <Star size={16} fill="black" />
                </div>
              </div>
              <p className="text-gray-300 italic mb-6 pt-4">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-neon-green" />
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Social Proof - Responsive Layout (Stack Mobile / Grid Desktop) */}
        <div className="mt-16 w-full max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Resultados Reais de Clientes</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image 1 */}
            <div className="rounded-2xl border border-dark-border shadow-2xl overflow-hidden bg-dark-card relative">
              {/* Privacy Overlay - Header */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-md z-10 border-b border-white/5"></div>
              <img 
                src="https://i.ibb.co/bRPysHLj/photo-2024-07-19-20-00-10.jpg" 
                alt="Feedback de cliente satisfeito 1" 
                className="w-full h-auto object-cover opacity-95"
              />
              <div className="p-3 bg-dark-bg/95 border-t border-dark-border text-center">
                <p className="text-xs text-gray-400">"Amou a receita!"</p>
              </div>
            </div>
            
            {/* Image 2 */}
            <div className="rounded-2xl border border-dark-border shadow-2xl overflow-hidden bg-dark-card relative">
               {/* Privacy Overlay - Header */}
               <div className="absolute top-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-md z-10 border-b border-white/5"></div>
               <img 
                 src="https://i.ibb.co/Kz20KGFP/photo-2024-11-17-07-17-04.jpg" 
                 alt="Feedback de cliente satisfeito 2" 
                 className="w-full h-auto object-cover opacity-95"
               />
               <div className="p-3 bg-dark-bg/95 border-t border-dark-border text-center">
                 <p className="text-xs text-gray-400">"Super aprovado"</p>
               </div>
            </div>
            
            {/* Image 3 */}
            <div className="rounded-2xl border border-dark-border shadow-2xl overflow-hidden bg-dark-card relative">
               {/* Privacy Overlay - Header */}
               <div className="absolute top-0 left-0 right-0 h-24 bg-black/40 backdrop-blur-md z-10 border-b border-white/5"></div>
               <img 
                 src="https://i.ibb.co/k2TBSXXb/photo-2024-11-17-07-17-17.jpg" 
                 alt="Feedback de cliente satisfeito 3" 
                 className="w-full h-auto object-cover opacity-95"
               />
               <div className="p-3 bg-dark-bg/95 border-t border-dark-border text-center">
                 <p className="text-xs text-gray-400">"Praticidade total"</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Quem Somos Section */}
      <Section bg="darker">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-6 font-display">Quem Somos</h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>Na Petshoppis, acreditamos que pet é família e merece celebrar junto.</p>
            <p>Criamos conteúdos práticos e 100% seguros para tutores exigentes.</p>
            <p className="font-semibold text-neon-green">Porque quem ama, cuida e inclui no Natal! 🐾</p>
          </div>
        </div>
      </Section>

      {/* Guarantee Section */}
      <Section bg="dark">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="relative group">
             <div className="absolute -inset-4 bg-neon-green/20 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
             <img 
               src="https://i.ibb.co/q3Xn8NvN/imagens-de-7-dias-de-garantia-png-1-1-removebg-preview.png" 
               alt="Garantia Incondicional de 7 Dias" 
               className="w-40 md:w-48 relative z-10"
             />
          </div>
          <p className="text-white font-bold text-base font-display max-w-md">
            Se seu pet não amar, devolvemos cada centavo. Risco Zero.
          </p>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section bg="darker">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-8 font-display">Dúvidas Frequentes</h2>
          <div className="bg-dark-card rounded-2xl p-6 border border-dark-border">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} item={faq} />
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-dark-bg border-t border-dark-border py-12">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <div className="flex justify-center mb-6">
             <img 
              src="https://i.ibb.co/C52BdLyC/Whats-App-Image-2025-10-21-at-10-20-44.jpg" 
              alt="Petshoppis Logo Footer" 
              className="w-16 h-16 rounded-full object-cover" 
            />
          </div>
          
          {/* Contact Information */}
          <div className="mb-6 flex flex-col items-center gap-2">
             <div className="flex items-center gap-2 text-gray-400 text-sm">
               <Mail size={16} className="text-neon-red" />
               <span>Suporte ao Cliente:</span>
             </div>
             <a href="mailto:suporte.petshoppis@gmail.com" className="text-neon-gold font-semibold hover:text-white transition-colors">
               suporte.petshoppis@gmail.com
             </a>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            © 2025 Petshoppis. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs mx-auto">
            Este produto não substitui o parecer profissional. Sempre consulte um veterinário sobre a saúde do seu animal.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA - Hidden on Desktop */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-dark-surface/90 backdrop-blur-lg border-t border-neon-red/30 md:hidden z-40 transition-transform duration-300 ${scrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-xl mx-auto">
          <Button fullWidth size="md" pulse onClick={() => window.open('https://checkout.checkoutpetshoppis.online/VCCL1O8SCJ9E', '_blank')}>
            Garantir por apenas R$19,90
          </Button>
        </div>
      </div>

    </div>
  );
};

export default App;