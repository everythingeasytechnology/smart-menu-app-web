import { 
  ArrowRight, CheckCircle2, LayoutDashboard, QrCode, 
  Store, Users, Star, 
  Sparkles, ChefHat, Receipt, BellRing, UtensilsCrossed, 
  MonitorSmartphone, ShieldCheck, Zap as ZapIcon,
  ChevronDown, Play, Pause, BarChart3, TrendingUp,
  Menu, X
} from "lucide-react";
import { useState } from "react";

export function LandingPage() {
  const [activeTab, setActiveTab] = useState('admin');
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Tab content data
  const tabs = {
    admin: {
      title: "Control Everything",
      description: "Get a bird's eye view of your entire restaurant. Manage your menu, generate QR codes, and view real-time analytics from a single dashboard.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      features: ["Live Table Tracking", "Instant Bill Generation", "Menu Management"]
    },
    waiter: {
      title: "Empower Your Staff",
      description: "Waiters receive instant notifications when tables need assistance or place orders, allowing them to provide blazing fast service without manual note-taking.",
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f928a18?q=80&w=800&auto=format&fit=crop",
      features: ["Real-time Alerts", "One-tap Status Updates", "Direct Order Injection"]
    },
    customer: {
      title: "Delight Your Guests",
      description: "Customers scan a QR code to access a beautiful, interactive digital menu. They can filter by dietary preferences, apply coupons, and order directly from their phone.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
      features: ["No App Download Required", "Live Cart & Checkout", "Dietary Filters"]
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8f6] font-sans overflow-x-hidden selection:bg-[#F26B3A]/20">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fcf8f6]/90 backdrop-blur-md border-b border-[#F26B3A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-[#111827] rounded-[14px] flex items-center justify-center shadow-md">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-[#111827] tracking-tight">Smart Menu</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <a href="#ecosystem" onClick={(e) => scrollToSection(e, 'ecosystem')} className="text-[15px] font-semibold text-[#111827] hover:text-[#F26B3A] transition-colors">Ecosystem</a>
              <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-[15px] font-semibold text-[#111827] hover:text-[#F26B3A] transition-colors">How it Works</a>
              <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-[15px] font-semibold text-[#111827] hover:text-[#F26B3A] transition-colors">Features</a>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-[15px] font-semibold text-[#111827] hover:text-[#F26B3A] transition-colors">Pricing</a>
              <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-[15px] font-semibold text-[#111827] hover:text-[#F26B3A] transition-colors">FAQ</a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] text-[#111827] hover:bg-white hover:border-[#D1D5DB] hover:shadow-sm transition-all">
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] text-[#111827] hover:bg-white hover:border-[#D1D5DB] hover:shadow-sm transition-all group">
                <Users className="w-4 h-4 group-hover:text-[#F26B3A] transition-colors" />
              </button>
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] text-[#111827] bg-white hover:border-[#D1D5DB] hover:shadow-sm transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`fixed inset-0 z-[60] bg-white transform transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center h-20 px-4 sm:px-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#111827] rounded-[14px] flex items-center justify-center shadow-md">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold text-[#111827] tracking-tight">Smart Menu</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E7EB] text-[#111827] bg-white hover:border-[#D1D5DB] hover:shadow-sm transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col flex-1 px-6 py-8 space-y-6">
          <a href="#ecosystem" onClick={(e) => scrollToSection(e, 'ecosystem')} className="text-xl sm:text-2xl font-extrabold text-[#111827] hover:text-[#F26B3A] transition-colors">Ecosystem</a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="text-xl sm:text-2xl font-extrabold text-[#111827] hover:text-[#F26B3A] transition-colors">How it Works</a>
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-xl sm:text-2xl font-extrabold text-[#111827] hover:text-[#F26B3A] transition-colors">Features</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-xl sm:text-2xl font-extrabold text-[#111827] hover:text-[#F26B3A] transition-colors">Pricing</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-xl sm:text-2xl font-extrabold text-[#111827] hover:text-[#F26B3A] transition-colors">FAQ</a>
        </div>
        
        <div className="p-6 border-t border-[#E5E7EB] mb-8">
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="w-full flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-[#F26B3A] hover:bg-[#e05625] transition-colors">
            Start Free Trial
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-5 lg:text-left z-10 relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F26B3A]/10 border border-[#F26B3A]/20 text-[#F26B3A] text-sm font-bold mb-6 hover:bg-[#F26B3A]/20 transition-colors cursor-pointer">
                <Sparkles className="w-4 h-4" />
                <span>Smart Menu 2.0 is now live</span>
              </div>
              <h1 className="text-4xl tracking-tight font-bold text-[#111827] sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.05] mb-6 font-['Plus_Jakarta_Sans',sans-serif]">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#F26B3A] to-[#F26B3A] pb-1">Smart Menu</span>
                <span className="block mt-1">system for real-time dining</span>
              </h1>
              
              <p className="mt-6 text-base text-[#4B5563] sm:text-lg md:text-xl lg:text-[17px] leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Digitize your restaurant with an integrated admin panel, real-time waiter tracking, and seamless QR-based ordering — all without taking manual orders.
              </p>
              
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-full shadow-lg shadow-[#F26B3A]/25 relative group cursor-pointer hover:scale-105 transition-transform">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#F26B3A] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-200"></div>
                  <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="relative w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-full text-white bg-gradient-to-r from-[#a268f7] via-[#f07449] to-[#F26B3A] hover:brightness-110 transition-all md:py-4 md:text-lg md:px-10 gap-2">
                    <ArrowRight className="w-5 h-5" />
                    Start for free
                  </a>
                </div>
                <div className="mt-3 sm:mt-0">
                  <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="w-full flex items-center justify-center px-8 py-4 border border-[#D1D5DB] text-base font-semibold rounded-full text-[#111827] bg-transparent hover:bg-white hover:border-[#9CA3AF] transition-colors md:py-4 md:text-lg md:px-10 hover:shadow-sm">
                    See How It Works
                  </a>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[12px] font-bold text-[#4B5563]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                  31-day free trial
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                  No credit card required
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-[#9CA3AF]" />
                  Cancel anytime
                </div>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="mt-16 lg:mt-0 lg:col-span-7 relative h-[500px] sm:h-[600px] hidden md:block w-full ml-auto group">
              <svg className="absolute inset-0 w-full h-full" style={{ left: '10%' }} fill="none" viewBox="0 0 600 600">
                <path d="M 220 220 Q 280 280 320 280 T 420 320" stroke="url(#line-grad)" strokeWidth="1.5" className="opacity-60" />
                <path d="M 120 400 Q 180 380 200 320 T 220 220" stroke="url(#line-grad)" strokeWidth="1.5" className="opacity-40" />
                <defs>
                  <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#F26B3A" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white rounded-[32px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] shadow-[#F26B3A]/5 border-[6px] border-white overflow-hidden z-20 transition-transform duration-500 hover:scale-[1.02]">
                <div className="bg-[#111827] text-white p-5 rounded-t-[26px] h-full min-h-[360px] flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                  
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="text-sm font-semibold tracking-wide">Ongoing Orders</span>
                    <div className="w-8 h-6 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full" />
                        <div className="w-1 h-1 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10 flex-1">
                    <div className="w-full flex items-center justify-center h-20 mb-4 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                      <div className="flex items-center gap-1 h-10 relative group-hover:scale-105 transition-transform">
                        {[40, 20, 60, 100, 50, 30, 80, 40, 60, 20, 70, 40, 90, 50, 30, 100, 60, 40].map((h, i) => (
                          <div key={i} className={`w-1 rounded-full transition-all duration-300 ${i % 3 === 0 ? 'bg-[#F26B3A]' : 'bg-white/40'} ${isPlaying ? 'animate-pulse' : ''}`} style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-white/50 mb-2">
                      <span>00:15</span>
                      <div className="flex-1 border-t border-white/20 mx-3 border-dashed"></div>
                      <span className="text-white/80">05:45</span>
                      <div className="flex-1 border-t border-white/20 mx-3 border-dashed"></div>
                      <span>10:15</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-full p-2 border border-white/10 mt-6 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#F26B3A] flex items-center justify-center shadow-lg shadow-[#F26B3A]/30">
                        {isPlaying ? <Pause className="w-3 h-3 text-white fill-current" /> : <Play className="w-3 h-3 text-white fill-current" />}
                      </div>
                      <span className="text-xs font-bold text-white">00:05:39</span>
                      <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-[#a268f7]">
                        <Sparkles className="w-3 h-3" />
                        Live Status
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-[60%] left-[-30px] w-[260px] bg-white rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] p-5 border border-[#F3F4F6] z-30 transform hover:-translate-y-2 transition-transform cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-100">
                      <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#111827]">Waiter Joe</span>
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#F26B3A] to-orange-400 px-2 py-0.5 rounded-full shadow-sm shadow-orange-400/30">Table 4</span>
                    </div>
                  </div>
                  <p className="text-[15px] text-[#111827] font-semibold leading-snug group-hover:text-[#F26B3A] transition-colors">
                    Table 4 requested water and extra napkins.
                  </p>
                </div>
              </div>

              <div className="absolute top-[15%] left-[5%] w-[160px] h-[100px] bg-white rounded-[24px] shadow-xl border border-gray-100/50 z-10 overflow-hidden transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=300&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
              </div>

              <div className="absolute top-[8%] right-[12%] bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-3 border border-gray-100 z-10 cursor-default hover:scale-105 transition-transform">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F26B3A] flex items-center justify-center shadow-md shadow-[#F26B3A]/30">
                  <Star className="w-3 h-3 text-white fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-extrabold text-[#111827]">5.0 / 5.0</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#9CA3AF] tracking-wide">#1 Rated • 6,000+ Reviews</span>
                </div>
              </div>

              <div className="absolute top-[25%] right-[0%] w-[120px] h-[80px] bg-white rounded-[20px] shadow-lg border border-gray-100/50 z-10 overflow-hidden hover:rotate-2 hover:scale-105 transition-all cursor-pointer">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=300&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover opacity-90" />
              </div>

              <div className="absolute bottom-[20%] right-[5%] w-[150px] h-[90px] bg-white rounded-[24px] shadow-lg border border-gray-100/50 z-10 overflow-hidden hover:-rotate-2 hover:scale-105 transition-all cursor-pointer">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=300&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover opacity-90" />
              </div>

              <div className="absolute bottom-[25%] left-[10%] w-[160px] h-[100px] bg-white rounded-[24px] shadow-xl border border-gray-100/50 z-10 overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-all cursor-pointer">
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=300&auto=format&fit=crop" alt="Customer" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Promotional Banner & Logos */}
      <div className="bg-[#fcf8f6] py-8 border-b border-[#E5E7EB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 mb-8 sm:mb-12 text-[11px] sm:text-[13px] font-bold text-[#111827] bg-white px-4 py-3 sm:py-2 rounded-2xl sm:rounded-full shadow-sm border border-gray-100 text-center sm:text-left leading-snug">
              <Sparkles className="w-4 h-4 text-[#F26B3A] hidden sm:block flex-shrink-0" />
              <span>Enjoy 50% off premium features for first 3 months<span className="hidden sm:inline"> — 21 days remaining</span></span>
              <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="flex items-center justify-center text-[#8B5CF6] hover:text-[#F26B3A] transition-colors mt-1 sm:mt-0 sm:ml-2 group bg-[#8B5CF6]/10 sm:bg-transparent px-3 py-1 sm:p-0 rounded-full sm:rounded-none">
                <ArrowRight className="w-3.5 h-3.5 mr-1.5 group-hover:translate-x-1 transition-transform hidden sm:block" />
                Start 14 days trial
              </a>
            </div>
            
            <div className="w-full flex flex-wrap justify-center lg:justify-between items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-[#111827] hover:scale-110 transition-transform cursor-pointer">
                <div className="w-6 h-6 rounded-full border-[3px] border-[#F26B3A] flex items-center justify-center">
                   <div className="w-2 h-2 bg-[#F26B3A] rounded-full" />
                </div>
                SHELLS
              </div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#111827] hover:scale-110 transition-transform cursor-pointer">
                <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[18px] border-l-transparent border-r-transparent border-b-[#8B5CF6] transform rotate-90" />
                SmartFinder
              </div>
              <div className="flex items-center gap-2 font-black text-xl tracking-tighter text-[#111827] italic hover:scale-110 transition-transform cursor-pointer">
                <ZapIcon className="w-6 h-6 fill-[#F59E0B] text-[#F59E0B]" />
                Zoomerr
              </div>
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#111827] hover:scale-110 transition-transform cursor-pointer">
                <div className="flex">
                  <div className="w-2 h-6 bg-[#10B981] rounded-l-sm" />
                  <div className="w-3 h-6 border-y-2 border-r-2 border-[#10B981] rounded-r-sm" />
                </div>
                kontrastr
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Stats Section */}
      <section className="py-16 bg-white border-b border-[#E5E7EB]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-[#F26B3A]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#F26B3A] group-hover:scale-110 transition-all duration-300">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 text-[#F26B3A] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-[#111827] mb-1">500+</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">Restaurants Active</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#8B5CF6] group-hover:scale-110 transition-all duration-300">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-[#111827] mb-1">2M+</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">Happy Diners</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-[#10B981]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#10B981] group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-[#111827] mb-1">15m</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">Saved per table</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto bg-[#F59E0B]/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#F59E0B] group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-3xl sm:text-4xl font-black text-[#111827] mb-1">30%</h4>
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">Revenue Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive "How it Works" Section */}
      <section id="how-it-works" className="py-24 bg-[#fdfaf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#F26B3A] font-bold tracking-wide uppercase text-sm mb-3">How it Works</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#111827] mb-4 sm:mb-6 tracking-tight">One platform for your entire restaurant</h3>
            <p className="text-lg text-[#6B7280]">
              Click below to explore how Smart Menu powers every aspect of your dining experience in real-time.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(tabs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all duration-300 border ${
                  activeTab === key
                    ? "bg-[#111827] text-white border-[#111827] shadow-lg shadow-[#111827]/20 scale-105"
                    : "bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-gray-50"
                }`}
              >
                {key === 'admin' ? 'Admin App' : key === 'waiter' ? 'Waiter App' : 'Customer QR Web'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl sm:rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden transform transition-all duration-500 ease-in-out">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-12 lg:p-20 flex flex-col justify-center">
                <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-colors duration-500 ${
                  activeTab === 'admin' ? 'bg-[#F26B3A]/10 text-[#F26B3A]' : 
                  activeTab === 'waiter' ? 'bg-[#3B82F6]/10 text-[#3B82F6]' : 'bg-[#EC4899]/10 text-[#EC4899]'
                }`}>
                  {activeTab === 'admin' && <LayoutDashboard className="w-7 h-7" />}
                  {activeTab === 'waiter' && <BellRing className="w-7 h-7" />}
                  {activeTab === 'customer' && <QrCode className="w-7 h-7" />}
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 sm:mb-6 animate-slide-up" key={`${activeTab}-title`}>
                  {(tabs as any)[activeTab].title}
                </h4>
                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '100ms'}} key={`${activeTab}-desc`}>
                  {(tabs as any)[activeTab].description}
                </p>
                <ul className="space-y-4 animate-slide-up" style={{animationDelay: '200ms'}} key={`${activeTab}-features`}>
                  {(tabs as any)[activeTab].features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-base font-bold text-[#111827]">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        activeTab === 'admin' ? 'bg-[#F26B3A]' : 
                        activeTab === 'waiter' ? 'bg-[#3B82F6]' : 'bg-[#EC4899]'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[250px] sm:h-[400px] lg:h-auto bg-gray-100 overflow-hidden group">
                <img 
                  key={`${activeTab}-img`}
                  src={(tabs as any)[activeTab].image} 
                  alt={activeTab}
                  className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 animate-pop-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive 1: Admin */}
      <section id="features" className="py-24 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="relative group cursor-pointer">
              <div className="relative rounded-3xl shadow-2xl bg-white border border-[#E5E7EB] overflow-hidden p-2 z-20 transform transition-transform duration-500 group-hover:rotate-1">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Admin Dashboard" className="rounded-2xl w-full h-[250px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#F26B3A]/20 to-[#8B5CF6]/20 blur-3xl z-10 rounded-full group-hover:bg-[#F26B3A]/30 transition-colors duration-500"></div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="w-12 h-12 rounded-xl bg-[#F26B3A]/10 flex items-center justify-center mb-6">
                <MonitorSmartphone className="w-6 h-6 text-[#F26B3A]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 sm:mb-6 tracking-tight">Complete restaurant command center</h3>
              <p className="text-lg text-[#6B7280] mb-8">
                Our React Native Admin application gives managers and owners a bird's eye view of the entire operation. Track table occupancies in real-time, instantly update menu availability, and securely manage your staff roles.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-[#fcf8f6] transition-colors border border-transparent hover:border-[#F26B3A]/10 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827]">Table QR Generation</h5>
                    <p className="text-sm text-[#4B5563]">Generate, track, and print unique QR codes for every table instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-[#fcf8f6] transition-colors border border-transparent hover:border-[#F26B3A]/10 cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-5 h-5 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827]">Seamless Billing</h5>
                    <p className="text-sm text-[#4B5563]">Complete orders and process table payments directly from the dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Deep Dive 2: Waiter */}
      <section className="py-24 bg-[#fdfaf8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center flex flex-col-reverse lg:flex-row">
            <div className="mt-12 lg:mt-0 lg:order-1 order-2">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-6">
                <ChefHat className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 sm:mb-6 tracking-tight">Supercharge your serving staff</h3>
              <p className="text-lg text-[#6B7280] mb-8">
                The Waiter view ensures no table is left waiting. Staff get real-time notifications when a table needs assistance, requests the bill, or places a new order through the QR menu.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827]">Order State Management</h5>
                    <p className="text-sm text-[#4B5563]">Move items from 'Pending' to 'Preparing' to 'Served' with single taps.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl hover:bg-white transition-colors border border-transparent hover:border-gray-200 hover:shadow-sm cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <UtensilsCrossed className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#111827]">Direct Order Injection</h5>
                    <p className="text-sm text-[#4B5563]">Waiters can quickly add verbal orders to an existing digital cart.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative lg:order-2 order-1 group cursor-pointer">
              <div className="relative rounded-3xl shadow-2xl bg-white border border-[#E5E7EB] overflow-hidden p-2 z-20 transform transition-transform duration-500 group-hover:-rotate-1">
                <img src="https://images.unsplash.com/photo-1590846406792-0adc7f928a18?q=80&w=800&auto=format&fit=crop" alt="Waiter App" className="rounded-2xl w-full h-[250px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#3B82F6]/20 to-[#10B981]/20 blur-3xl z-10 rounded-full group-hover:bg-[#3B82F6]/30 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#F26B3A] font-bold tracking-wide uppercase text-sm mb-3">Transparent Pricing</h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 tracking-tight">Scale your operations without limits</h3>
            <p className="text-lg text-gray-400">
              Choose the perfect plan for your restaurant size. No hidden fees. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-[#1F2937] rounded-3xl p-6 sm:p-8 border border-gray-800 flex flex-col hover:border-gray-600 transition-colors cursor-pointer group">
              <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-gray-200">Basic</h4>
              <p className="text-gray-400 text-sm mb-6">Perfect for small cafes.</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold">$29</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Up to 10 Tables
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Digital QR Menu
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> 2 Staff Accounts
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-gray-600 hover:bg-white hover:text-black transition-colors font-semibold">Start Basic</button>
            </div>

            {/* Tier 2 */}
            <div className="bg-gradient-to-b from-[#F26B3A]/20 to-[#1F2937] rounded-3xl p-6 sm:p-8 border border-[#F26B3A] relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-[#F26B3A]/20 hover:scale-105 transition-transform cursor-pointer">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F26B3A] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h4 className="text-xl font-bold mb-2">Pro Restaurant</h4>
              <p className="text-gray-300 text-sm mb-6">Full feature suite for bustling venues.</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold">$89</span>
                <span className="text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Unlimited Tables
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Admin & Waiter Apps
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Unlimited Staff Accounts
                </li>
                <li className="flex items-center gap-3 text-sm text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#F26B3A]" /> Coupon Management
                </li>
              </ul>
              <button className="w-full py-3 rounded-full bg-[#F26B3A] hover:bg-[#e05625] text-white transition-colors font-semibold shadow-lg shadow-[#F26B3A]/30">Start 14-day Free Trial</button>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#1F2937] rounded-3xl p-6 sm:p-8 border border-gray-800 flex flex-col hover:border-gray-600 transition-colors cursor-pointer group">
              <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors text-gray-200">Enterprise</h4>
              <p className="text-gray-400 text-sm mb-6">Multi-chain operations.</p>
              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold">Custom</span>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" /> Multi-location support
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" /> Custom API integrations
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" /> Dedicated Account Manager
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-gray-600 hover:bg-white hover:text-black transition-colors font-semibold">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section id="faq" className="py-24 bg-[#fdfaf8]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#F26B3A] font-bold tracking-wide uppercase text-sm mb-3">FAQ</h2>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#111827] mb-2 sm:mb-4 tracking-tight">Got Questions?</h2>
            <p className="text-[#6B7280]">Everything you need to know about getting started.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Do I need to buy special hardware?", a: "No! The Admin App and Waiter App run seamlessly on any modern iOS or Android device. Your customers simply use their own smartphone cameras to scan the QR codes." },
              { q: "Do customers have to download an app?", a: "Not at all. Customers scan the QR code and are instantly taken to the lightning-fast web application built specifically for mobile browsers." },
              { q: "How long does setup take?", a: "You can be fully set up in less than 30 minutes. Just add your menu items, generate your QR codes, and you're ready to accept orders." },
              { q: "Is internet connectivity required?", a: "Yes, both the restaurant devices and the customer devices require an active internet connection to synchronize orders in real-time." }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${faqOpen === i ? 'border-[#F26B3A] shadow-md' : 'border-[#E5E7EB] hover:border-gray-300'}`}
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <div className="p-4 sm:p-6 flex justify-between items-center">
                  <h4 className="text-lg font-bold text-[#111827]">{faq.q}</h4>
                  <ChevronDown className={`w-5 h-5 text-[#6B7280] transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-[#F26B3A]' : ''}`} />
                </div>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-[#4B5563] border-t border-gray-100 pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#111827] to-[#1F2937] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay object-cover w-full h-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#8B5CF6]/20 to-[#F26B3A]/30 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">Ready to transform your restaurant?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join hundreds of restaurants already using Smart Menu to increase table turnover and delight their guests.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F26B3A] text-white font-bold text-base sm:text-lg hover:scale-105 transition-transform shadow-xl shadow-[#F26B3A]/20">
              Start your 14-day free trial
            </button>
            <button className="px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-base sm:text-lg hover:bg-white/20 transition-colors">
              Talk to Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B0F19] text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#F26B3A] rounded-lg flex items-center justify-center">
                  <Store className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">Smart Menu</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs mb-8">
                Modernizing dining experiences with real-time digital solutions. Elevate your service and increase revenue with zero friction.
              </p>
              
              <div className="flex gap-2">
                <input type="email" placeholder="Enter your email" className="bg-[#1F2937] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#F26B3A] w-full max-w-[200px]" />
                <button className="bg-[#F26B3A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e05625] transition-colors">Subscribe</button>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Admin App</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Waiter Interface</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Digital Menu</a></li>
                <li><a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-[#F26B3A] transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Hardware Guide</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-[#F26B3A] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Smart Menu Technologies. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Twitter</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
