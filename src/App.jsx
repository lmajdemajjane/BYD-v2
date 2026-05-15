import React, { useState, useEffect } from 'react';
import { 
  Car, Wrench, Calendar, MapPin, Zap, Phone, MessageSquare, 
  ChevronRight, ChevronLeft, Bell, Search, Shield, History, 
  Settings, User, Map, Battery, AlertTriangle, CheckCircle2, 
  Download, ChevronDown, Star, Filter, ArrowRight, X, Plus, LogOut, FileText, ShoppingBag, Gift, Info,
  Disc, Cpu, Wind, Package, Paperclip, Mic, Check, Mail, Globe, Smartphone, Lock, Edit2, BookOpen, PlayCircle, Activity, Database
} from 'lucide-react';

// Renommage de Wrench lors de l'utilisation si besoin, mais vous l'aviez importé deux fois dans l'original (Wrench et Wrench as WrenchIcon).
// On va juste utiliser WrenchIcon pour s'aligner sur votre code.
const WrenchIcon = Wrench;

// --- ASSETS OFFICIELS BYD (Remplacés par des versions PNG Transparentes) ---
const ASSETS = {
  logo: 'https://i.imgur.com/1pSEOur.png',
  atto3: 'https://i.imgur.com/bVaYmWf.png',
  han: 'https://i.imgur.com/LODJahS.png',
  seal: 'https://i.imgur.com/s6ePFs7.png',
  maintenance: 'https://i.imgur.com/A0Lbzhk.jpeg'
};

// --- STYLES & THEME PREMIUM ---
const THEME = `
  :root {
    --primary: #00285E;
    --primary-dark: #001B42;
    --primary-deep: #00122E;
    --accent: #005BBB;
    --cyan: #57C7F3;
    --ice: #EAF4FF;
    --bg-color: #F5F9FF;
    --surface: #FFFFFF;
    --text: #071A35;
    --text-muted: #6B7890;
    --success: #16A34A;
    --warning: #F59E0B;
    --danger: #EF4444;
  }
  
  body {
    background-color: #0b1120;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  
  /* Arrière-plan global avec glow ambiant */
  .premium-bg {
    background-color: var(--bg-color);
    background-image: 
      radial-gradient(circle at 10% 0%, rgba(87, 199, 243, 0.12) 0%, transparent 40%),
      radial-gradient(circle at 90% 20%, rgba(0, 91, 187, 0.08) 0%, transparent 45%),
      radial-gradient(circle at 50% 100%, rgba(87, 199, 243, 0.08) 0%, transparent 50%);
  }

  /* Effets Glassmorphism & Neumorphism */
  .glass-panel {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(32px);
    -webkit-backdrop-filter: blur(32px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 10px 40px -10px rgba(0, 40, 94, 0.08), inset 0 1px 0 rgba(255,255,255,1);
  }
  
  .glass-panel-dark {
    background: rgba(0, 20, 46, 0.5);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
  }

  .premium-card {
    background: linear-gradient(160deg, #FFFFFF 0%, #F8FBFF 100%);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0 12px 32px -8px rgba(0, 40, 94, 0.06), inset 0 2px 0 rgba(255, 255, 255, 0.8);
  }

  .premium-card-active:active {
    transform: scale(0.98);
    box-shadow: 0 4px 12px -4px rgba(0, 40, 94, 0.1);
  }

  .gradient-blue {
    background: linear-gradient(135deg, var(--primary-deep) 0%, var(--primary) 100%);
  }
  
  .gradient-accent {
    background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  }

  .car-shadow {
    filter: drop-shadow(0 25px 25px rgba(0, 18, 46, 0.6));
  }

  .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  .animate-slide-up { animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .animate-slide-in-right { animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes slideInRight { from { transform: translateX(30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
`;

// --- UI COMPONENTS ---
const Button = ({ children, variant = 'primary', onClick, className = '', fullWidth = false, icon: Icon }) => {
  const baseStyle = "flex items-center justify-center gap-2.5 font-bold transition-all active:scale-[0.97] rounded-[22px] px-6 py-4 text-[15px] shadow-sm";
  const variants = {
    primary: "gradient-blue text-white shadow-[0_12px_24px_-8px_rgba(0,40,94,0.4)] hover:brightness-110 border-t border-white/20",
    secondary: "bg-white text-[var(--primary)] border border-[var(--ice)] shadow-[0_8px_16px_-6px_rgba(0,40,94,0.06)] hover:bg-[#F0F6FF]",
    outline: "bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--ice)]",
    danger: "bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white shadow-[0_12px_24px_-8px_rgba(239,68,68,0.4)] border-t border-white/20",
    glass: "glass-panel-dark text-white border-white/20 hover:bg-white/20"
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {children}
    </button>
  );
};

const PremiumCard = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`premium-card rounded-[32px] p-6 transition-all ${onClick ? 'cursor-pointer premium-card-active' : ''} ${className}`}>
    {children}
  </div>
);

const IconBubble = ({ icon: Icon, variant = 'primary', size = 'md', className = '' }) => {
  const sizes = { sm: 'p-2 rounded-xl', md: 'p-3.5 rounded-[20px]', lg: 'p-4 rounded-[22px]' };
  const iconSizes = { sm: 16, md: 24, lg: 28 };
  const variants = {
    primary: 'bg-[var(--ice)] text-[var(--primary)]',
    white: 'bg-white text-[var(--primary)] shadow-sm border border-gray-100',
    gradient: 'gradient-accent text-white shadow-md border-t border-white/20',
    success: 'bg-[#F0FDF4] text-[var(--success)] border border-[#bbf7d0]',
    danger: 'bg-red-50 text-red-500'
  };
  return (
    <div className={`flex items-center justify-center ${sizes[size]} ${variants[variant]} ${className}`}>
      <Icon size={iconSizes[size]} strokeWidth={2} />
    </div>
  );
};

const Header = ({ title, onBack, rightAction, transparent = false }) => (
  <div className={`pt-14 pb-4 px-6 flex items-center justify-between z-30 relative ${transparent ? '' : 'bg-white/70 backdrop-blur-xl border-b border-[var(--ice)] sticky top-0'}`}>
    <div className="flex-1 flex justify-start">
      {onBack && (
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-white active:scale-95 transition-all text-[var(--text)]">
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
      )}
    </div>
    <h1 className="text-[17px] font-black text-[var(--text)] tracking-tight text-center flex-[2]">{title}</h1>
    <div className="flex-1 flex justify-end">
      {rightAction}
    </div>
  </div>
);

const PremiumScreen = ({ children, className = '' }) => (
  <div className={`flex-1 flex flex-col relative overflow-hidden premium-bg ${className}`}>
    {children}
  </div>
);

const Input = ({ label, type = "text", placeholder, defaultValue, value, onChange }) => (
  <div className="flex flex-col gap-2 mb-5 w-full">
    <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-[var(--ice)] shadow-[0_2px_10px_rgba(0,40,94,0.02)] rounded-[20px] px-5 py-4 text-[15px] text-[var(--text)] focus:outline-none focus:border-[var(--cyan)] focus:ring-4 focus:ring-[var(--cyan)]/10 transition-all font-medium placeholder:text-gray-300"
      />
    </div>
  </div>
);

const ToggleRow = ({ icon: Icon, title, desc, active, onToggle }) => (
  <div className="flex items-center justify-between p-5 bg-white rounded-[24px] border border-[var(--ice)] shadow-sm cursor-pointer hover:shadow-md transition-shadow mb-3" onClick={onToggle}>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-[var(--bg-color)] rounded-[18px] flex items-center justify-center text-[var(--primary)] border border-[var(--ice)] shadow-inner">
        <Icon size={22} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[15px] font-black text-[var(--text)] tracking-tight">{title}</div>
        <div className="text-[12px] font-medium text-[var(--text-muted)] mt-0.5 max-w-[200px] leading-tight">{desc}</div>
      </div>
    </div>
    <div className={`w-12 h-7 rounded-full flex items-center p-1 transition-colors duration-300 ${active ? 'bg-[var(--success)]' : 'bg-gray-200'}`}>
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [currentView, setCurrentView] = useState('splash');
  const [activeTab, setActiveTab] = useState('accueil');
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [currentRepairStep, setCurrentRepairStep] = useState(5);
  const [selectedProfileVehicle, setSelectedProfileVehicle] = useState(null);

  const [vehicles, setVehicles] = useState([
    { id: 1, name: "BYD HAN", vin: "LC99999999999", km: 15200, img: ASSETS.han },
    { id: 2, name: "BYD ATTO 3", vin: "LC00000000000", km: 42050, img: ASSETS.atto3 }
  ]);
  const [activeVehicleId, setActiveVehicleId] = useState(1);
  const activeVehicle = vehicles.find(v => v.id === activeVehicleId) || vehicles[0];

  // In-app maintenance popup states
  const [showMaintenancePopup, setShowMaintenancePopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  const handleAddVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setActiveVehicleId(newVehicle.id);
  };

  useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => setCurrentView('welcome'), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Maintenance Popup Effect
  useEffect(() => {
    let timer;
    if (currentView === 'main' && !hasShownPopup) {
      timer = setTimeout(() => {
        setShowMaintenancePopup(true);
        setHasShownPopup(true);
      }, 45000); // 45 seconds
    }
    return () => clearTimeout(timer);
  }, [currentView, hasShownPopup]);

  const navigateTo = (view) => setCurrentView(view);
  const openOverlay = (overlay) => setActiveOverlay(overlay);
  const closeOverlay = () => setActiveOverlay(null);

  const handleNotificationAction = (action, overlay, tab) => {
    setNotificationsOpen(false);
    if (tab) setActiveTab(tab);
    if (overlay) openOverlay(overlay);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 relative bg-[#0b1120]">
      <style>{THEME}</style>
      
      {/* Phone Frame */}
      <div className="w-full max-w-[428px] h-[926px] bg-black rounded-[56px] overflow-hidden shadow-2xl relative border-[12px] border-[#111] flex flex-col ring-1 ring-gray-800">
        
        {/* Dynamic Views */}
        {currentView === 'splash' && <SplashScreen />}
        {currentView === 'welcome' && <WelcomeScreen onNavigate={navigateTo} />}
        {currentView === 'login' && <LoginScreen onNavigate={navigateTo} />}
        {currentView === 'signup' && <SignupScreen onNavigate={navigateTo} />}
        {currentView === 'otp' && <OTPScreen onNavigate={navigateTo} />}
        {currentView === 'vehicle-recognition' && <VehicleRecognitionScreen onNavigate={navigateTo} />}
        {currentView === 'add-vehicle' && <AddVehicleScreen onNavigate={navigateTo} onAdd={handleAddVehicle} />}
        
        {/* Main App Interface */}
        {currentView === 'main' && (
          <PremiumScreen>
            {/* Main Tabs Container */}
            <div className="flex-1 overflow-y-auto hide-scrollbar pb-32 relative z-10">
              {activeTab === 'accueil' && <HomeTab onOpen={openOverlay} onNotifications={() => setNotificationsOpen(true)} activeVehicle={activeVehicle} onNavigateTab={setActiveTab} />}
              {activeTab === 'services' && <ServicesTab onOpen={openOverlay} />}
              {activeTab === 'suivi' && <HistoryTab onOpenReport={(report) => { setSelectedReport(report); openOverlay('report-preview'); }} currentRepairStep={currentRepairStep} onOpenQuote={() => openOverlay('repair-quote')} />}
              {activeTab === 'explorer' && <ExploreTab onOpen={openOverlay} />}
              {activeTab === 'profil' && <ProfileTab onNavigate={navigateTo} onOpen={openOverlay} vehicles={vehicles} setVehicles={setVehicles} activeVehicleId={activeVehicleId} setActiveVehicleId={setActiveVehicleId} onOpenVehicleDetails={(v) => { setSelectedProfileVehicle(v); openOverlay('vehicle-details'); }} />}
            </div>

            {/* Premium Floating Bottom Navigation */}
            <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-[32px] px-2 py-2 flex justify-between items-center z-40 shadow-[0_24px_48px_-12px_rgba(0,40,94,0.2)]">
              <NavItem icon={Car} label="Accueil" active={activeTab === 'accueil'} onClick={() => setActiveTab('accueil')} />
              <NavItem icon={WrenchIcon} label="Services" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
              <NavItem icon={Activity} label="Suivi SAV" active={activeTab === 'suivi'} onClick={() => setActiveTab('suivi')} />
              <NavItem icon={Map} label="Explorer" active={activeTab === 'explorer'} onClick={() => setActiveTab('explorer')} />
              <NavItem icon={User} label="Profil" active={activeTab === 'profil'} onClick={() => setActiveTab('profil')} />
            </div>

            {/* Global Overlays */}
            {activeOverlay && (
              <div className="absolute inset-0 z-50 flex flex-col bg-transparent">
                {activeOverlay === 'booking' && <BookingFlow onClose={closeOverlay} />}
                {activeOverlay === 'simulator' && <SimulatorScreen onClose={closeOverlay} />}
                {activeOverlay === 'emergency' && <EmergencyScreen onClose={closeOverlay} onOpen={openOverlay} />}
                {activeOverlay === 'chatbot' && <ChatbotScreen onClose={closeOverlay} />}
                {activeOverlay === 'map' && <InteractiveMapScreen onClose={closeOverlay} />}
                {activeOverlay === 'faq' && <FAQScreen onClose={closeOverlay} />}
                {activeOverlay === 'maintenance-info' && <MaintenanceInfoScreen onClose={closeOverlay} />}
                {activeOverlay === 'offers' && <OffersScreen onClose={closeOverlay} onBook={() => openOverlay('booking')} />}
                {activeOverlay === 'accessories' && <AccessoriesScreen onClose={closeOverlay} />}
                {activeOverlay === 'loyalty' && <LoyaltyScreen onClose={closeOverlay} />}
                {activeOverlay === 'contact' && <ContactScreen onClose={closeOverlay} onOpen={openOverlay} />}
                {activeOverlay === 'repair-quote' && <RepairQuoteModal onClose={closeOverlay} onAccept={() => { setCurrentRepairStep(6); }} />}
                {activeOverlay === 'report-preview' && <ReportPreviewModal report={selectedReport} onClose={closeOverlay} />}
                
                {/* Profile specific Overlays */}
                {activeOverlay === 'personal-info' && <PersonalInfoScreen onClose={closeOverlay} />}
                {activeOverlay === 'profile-notifications' && <ProfileNotificationsScreen onClose={closeOverlay} />}
                {activeOverlay === 'app-settings' && <AppSettingsScreen onClose={closeOverlay} />}
                {activeOverlay === 'privacy' && <PrivacyScreen onClose={closeOverlay} />}
                {activeOverlay === 'add-vehicle-profile' && <AddVehicleProfileScreen onClose={closeOverlay} onAdd={handleAddVehicle} />}
                {activeOverlay === 'vehicle-details' && selectedProfileVehicle && <VehicleDetailsScreen vehicle={selectedProfileVehicle} onClose={closeOverlay} vehicles={vehicles} setVehicles={setVehicles} activeVehicleId={activeVehicleId} setActiveVehicleId={setActiveVehicleId} />}
                {activeOverlay === 'select-vehicle' && <SelectVehicleScreen onClose={closeOverlay} vehicles={vehicles} activeVehicleId={activeVehicleId} onSelect={(id) => { setActiveVehicleId(id); closeOverlay(); }} />}
                {activeOverlay === 'manuals' && <ManualsScreen onClose={closeOverlay} activeVehicle={activeVehicle} />}
              </div>
            )}

            {/* Notifications Overlay */}
            {notificationsOpen && (
              <NotificationsOverlay onClose={() => setNotificationsOpen(false)} onAction={handleNotificationAction} />
            )}

            {/* In-app Maintenance Popup */}
            {showMaintenancePopup && (
              <MaintenancePopup 
                vehicle={activeVehicle} 
                onClose={() => setShowMaintenancePopup(false)} 
                onPlanify={() => {
                  setShowMaintenancePopup(false);
                  openOverlay('simulator');
                }} 
              />
            )}

            {/* Global Floating Chatbot Button */}
            {activeOverlay !== 'chatbot' && activeOverlay !== 'simulator' && (
              <button 
                onClick={() => openOverlay('chatbot')}
                className="absolute bottom-28 right-6 w-14 h-14 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-full flex items-center justify-center text-white shadow-[0_12px_28px_rgba(0,40,94,0.4)] z-[55] active:scale-95 transition-all border border-white/20 hover:scale-105 group"
                aria-label="Ouvrir le Chatbot IA"
              >
                <MessageSquare size={24} strokeWidth={2.5} className="group-hover:animate-pulse" />
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[var(--success)] border-2 border-[var(--primary)] rounded-full shadow-sm"></div>
              </button>
            )}
          </PremiumScreen>
        )}
      </div>
    </div>
  );
}

// --- BOTTOM NAV ITEM ---
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button onClick={onClick} className="relative flex flex-col items-center justify-center w-16 h-16 group">
    {active && (
      <div className="absolute inset-0 bg-[var(--ice)] rounded-[24px] transition-all duration-300 scale-100"></div>
    )}
    <div className={`relative z-10 transition-colors duration-300 ${active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--primary)]'}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} className="mb-1" />
    </div>
    <span className={`absolute bottom-1 z-10 text-[9px] font-black tracking-wide transition-all duration-300 ${active ? 'text-[var(--primary)] translate-y-0 opacity-100' : 'text-transparent translate-y-2 opacity-0'}`}>
      {label}
    </span>
  </button>
);

// --- MAINTENANCE IN-APP POPUP ---
const MaintenancePopup = ({ vehicle, onClose, onPlanify }) => (
  <PremiumScreen className="h-full z-[100] fixed inset-0 bg-transparent">
    <div className="absolute inset-0 bg-[var(--primary-deep)]/70 backdrop-blur-md transition-opacity" onClick={onClose}></div>
    <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-color)] rounded-t-[48px] p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.3)] border-t border-white/50 animate-slide-up flex flex-col">
      <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 shrink-0"></div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-[#F0FDF4] rounded-[24px] flex items-center justify-center text-[var(--success)] shadow-inner border border-[#bbf7d0]">
          <WrenchIcon size={32} strokeWidth={2.5}/>
        </div>
        <div>
          <h3 className="text-[24px] font-black text-[var(--text)] tracking-tight leading-tight">Entretien recommandé</h3>
        </div>
      </div>

      <p className="text-[15px] font-medium text-[var(--text-muted)] mb-8 leading-relaxed">
        Votre véhicule approche du seuil recommandé pour un entretien SAV. Planifiez votre passage dans un centre BYD.
      </p>

      <PremiumCard className="!p-5 mb-8 border-l-4 !border-l-[var(--success)] shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <Car size={20} className="text-[var(--primary)]" />
             <span className="text-[16px] font-black text-[var(--text)]">{vehicle.name}</span>
          </div>
          <span className="text-[13px] font-bold text-[var(--text-muted)] bg-[var(--ice)] px-2 py-1 rounded-md">{vehicle.km.toLocaleString()} km</span>
        </div>
        <div className="pt-4 border-t border-[var(--ice)] flex flex-col gap-3">
           <div className="flex justify-between items-center">
              <span className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest">Recommandation</span>
              <span className="text-[14px] font-black text-[var(--primary)]">Forfait Essentiel</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest">Durée estimée</span>
              <span className="text-[14px] font-bold text-[var(--text)]">1h30</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest">Prix estimatif</span>
              <span className="text-[14px] font-black text-[var(--success)]">à partir de 1 200 DH</span>
           </div>
        </div>
      </PremiumCard>

      <div className="flex flex-col gap-3 mt-auto">
        <Button variant="primary" onClick={onPlanify} fullWidth className="!py-4.5 !text-[16px]">
          Planifier maintenant
        </Button>
        <button onClick={onClose} className="py-4 text-[15px] font-bold text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
          Plus tard
        </button>
      </div>
    </div>
  </PremiumScreen>
);

// --- AUTH SCREENS ---
const SplashScreen = () => (
  <PremiumScreen className="gradient-blue items-center justify-center !bg-none">
    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
    <div className="z-10 flex flex-col items-center animate-fade-in">
      <img src={ASSETS.logo} alt="BYD Logo" className="h-16 mb-6 brightness-0 invert" />
      <div className="text-white/80 text-[13px] tracking-[0.4em] font-semibold mb-12 uppercase">SAV Maroc</div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite] blur-[1px]"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  </PremiumScreen>
);

const WelcomeScreen = ({ onNavigate }) => (
  <PremiumScreen className="bg-white !bg-none">
    <div className="flex-[55] gradient-blue relative rounded-b-[48px] shadow-2xl flex flex-col items-center justify-center pb-8 z-20">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,var(--cyan)_0%,transparent_70%)] opacity-30"></div>
       <img src={ASSETS.logo} alt="BYD" className="h-12 brightness-0 invert opacity-90 z-20 animate-fade-in" />
    </div>
    
    <div className="flex-[45] px-8 py-10 flex flex-col justify-between animate-slide-up premium-bg pt-16">
      <div className="text-center">
        <h1 className="text-[28px] font-black text-[var(--text)] mb-3 tracking-tight">Votre mobilité,<br/>notre priorité.</h1>
        <p className="text-[var(--text-muted)] text-[15px] leading-relaxed font-medium px-4">Gérez l'entretien et les services de votre BYD en toute simplicité, où que vous soyez.</p>
      </div>
      <div className="flex flex-col gap-4 mt-8 pb-4">
        <Button onClick={() => onNavigate('login')}>Se connecter</Button>
        <Button variant="secondary" onClick={() => onNavigate('signup')}>Créer un compte</Button>
      </div>
    </div>
  </PremiumScreen>
);

const LoginScreen = ({ onNavigate }) => (
  <PremiumScreen>
    <Header onBack={() => onNavigate('welcome')} transparent />
    <div className="px-8 py-4 flex-1 flex flex-col animate-slide-in-right">
      <h2 className="text-[32px] font-black text-[var(--text)] mb-2 tracking-tight">Bon retour.</h2>
      <p className="text-[var(--text-muted)] text-[15px] font-medium mb-10">Connectez-vous pour gérer votre BYD.</p>
      
      <Input label="Adresse e-mail" placeholder="yassine@example.com" />
      <Input label="Mot de passe" type="password" placeholder="••••••••" />
      
      <div className="flex justify-end mb-10">
        <button className="text-[13px] text-[var(--accent)] font-bold hover:underline">Mot de passe oublié ?</button>
      </div>
      
      <Button onClick={() => onNavigate('main')} fullWidth>Se connecter</Button>
      
      <div className="mt-10 flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--ice)]"></div></div>
          <span className="relative bg-[var(--bg-color)] px-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Ou continuer avec</span>
        </div>
        <div className="flex gap-4 mt-2">
           <button className="flex-1 bg-white shadow-sm border border-[var(--ice)] rounded-[20px] py-4 text-[14px] font-bold text-[var(--text)] active:scale-95 transition-transform flex justify-center items-center gap-2">
             G Google
           </button>
           <button className="flex-1 bg-white shadow-sm border border-[var(--ice)] rounded-[20px] py-4 text-[14px] font-bold text-[var(--text)] active:scale-95 transition-transform flex justify-center items-center gap-2">
              Apple
           </button>
        </div>
      </div>
      
      <div className="mt-auto pb-10 text-center">
        <p className="text-[14px] font-medium text-[var(--text-muted)]">
          Nouveau sur BYD ? <button onClick={() => onNavigate('signup')} className="text-[var(--accent)] font-bold ml-1">Créer un compte</button>
        </p>
      </div>
    </div>
  </PremiumScreen>
);

const SignupScreen = ({ onNavigate }) => (
  <PremiumScreen>
    <Header onBack={() => onNavigate('welcome')} transparent />
    <div className="px-8 py-4 flex-1 overflow-y-auto hide-scrollbar flex flex-col animate-slide-in-right pb-10">
      <h2 className="text-[32px] font-black text-[var(--text)] mb-2 tracking-tight">Créer un compte</h2>
      <p className="text-[var(--text-muted)] text-[15px] font-medium mb-8">Rejoignez l'univers BYD Maroc.</p>
      
      <Input label="Nom complet" placeholder="Yassine El Amrani" />
      <Input label="Téléphone" type="tel" placeholder="06 00 00 00 00" />
      <Input label="Adresse e-mail" type="email" placeholder="yassine@example.com" />
      <Input label="Mot de passe" type="password" placeholder="••••••••" />
      
      <Button onClick={() => onNavigate('otp')} fullWidth className="mt-6 mb-10">Continuer</Button>
    </div>
  </PremiumScreen>
);

const OTPScreen = ({ onNavigate }) => (
  <PremiumScreen>
    <Header onBack={() => onNavigate('signup')} transparent />
    <div className="px-8 py-4 flex-1 flex flex-col animate-slide-in-right">
      <div className="w-16 h-16 bg-[var(--ice)] rounded-[24px] flex items-center justify-center mb-6 shadow-inner">
         <Shield size={32} className="text-[var(--primary)]" strokeWidth={2}/>
      </div>
      <h2 className="text-[32px] font-black text-[var(--text)] mb-2 tracking-tight">Vérification</h2>
      <p className="text-[var(--text-muted)] text-[15px] font-medium mb-10 leading-relaxed">Nous avons envoyé un code à 4 chiffres au numéro terminant par <span className="font-bold text-[var(--text)]">**64</span>.</p>
      
      <div className="flex justify-between gap-4 mb-10">
        {[1, 2, 3, 4].map((i) => (
          <input 
            key={i} type="text" maxLength="1" 
            className="w-full aspect-square bg-white border border-[var(--ice)] shadow-sm rounded-[24px] text-center text-[28px] font-black text-[var(--primary)] focus:outline-none focus:border-[var(--cyan)] focus:ring-4 focus:ring-[var(--cyan)]/10 transition-all"
            defaultValue={i === 1 ? "4" : i === 2 ? "2" : ""}
          />
        ))}
      </div>
      
      <Button onClick={() => onNavigate('vehicle-recognition')} fullWidth>Vérifier le code</Button>
      
      <div className="mt-8 text-center">
        <button className="text-[14px] text-[var(--text-muted)] font-bold hover:text-[var(--accent)]">Renvoyer le code (00:45)</button>
      </div>
    </div>
  </PremiumScreen>
);

const VehicleRecognitionScreen = ({ onNavigate }) => {
  const [step, setStep] = useState(0);
  const [isVehicleFound, setIsVehicleFound] = useState(false); 

  useEffect(() => {
    // Séquence d'animation simulée pour la connexion Autoline/BDD
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3000);
    const t3 = setTimeout(() => setStep(3), 4500);
    const t4 = setTimeout(() => setStep(4), 5500); // Résultat final
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const steps = [
    { icon: User, text: "Recherche du profil client" },
    { icon: Shield, text: "Connexion sécurisée" },
    { icon: Database, text: "Recherche des véhicules associés" }
  ];

  return (
    <PremiumScreen className="relative flex flex-col justify-center px-8">
      {/* Bouton de démo */}
      <button onClick={() => setIsVehicleFound(!isVehicleFound)} className="absolute top-12 right-6 bg-white px-3 py-1.5 rounded-full text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest z-50 border border-[var(--ice)] shadow-sm hover:bg-[var(--ice)] transition-colors">
        Mode présentation : {isVehicleFound ? 'Véhicule trouvé' : 'Aucun véhicule'}
      </button>
      
      {/* Background Radar Animation (Light Theme) */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-[var(--primary)]/10 rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-[var(--primary)]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] delay-300"></div>

      <div className="relative z-10 flex flex-col items-center mb-12 mt-10">
        <div className="w-24 h-24 bg-white border border-[var(--ice)] rounded-full flex items-center justify-center mb-8 shadow-md relative">
          {step < 4 ? (
             <Search size={40} className="text-[var(--primary)] animate-pulse" strokeWidth={2.5} />
          ) : isVehicleFound ? (
             <>
               <div className="absolute inset-0 bg-[var(--success)] rounded-full animate-ping opacity-20"></div>
               <CheckCircle2 size={48} className="text-[var(--success)] drop-shadow-sm bg-white rounded-full" strokeWidth={2.5} />
             </>
          ) : (
             <>
               <div className="absolute inset-0 bg-[var(--warning)] rounded-full animate-ping opacity-20"></div>
               <AlertTriangle size={40} className="text-[var(--warning)] drop-shadow-sm" strokeWidth={2.5} />
             </>
          )}
        </div>
        
        <h2 className="text-[28px] font-black text-[var(--text)] tracking-tight mb-3 text-center leading-tight">
          {step < 4 ? "Synchronisation" : isVehicleFound ? "Véhicule trouvé !" : "Aucun véhicule"}
        </h2>
        <p className="text-[14px] text-[var(--text-muted)] font-medium text-center max-w-[90%] leading-relaxed">
          {step < 4 
            ? "Veuillez patienter pendant la recherche de votre dossier dans notre base." 
            : isVehicleFound
            ? "Nous avons identifié un véhicule correspondant à votre profil."
            : "Aucun véhicule n'a été trouvé automatiquement. Vous pouvez l'ajouter manuellement."}
        </p>
      </div>

      {/* Loading Steps */}
      {step < 4 && (
        <div className="bg-white rounded-[32px] p-6 w-full flex flex-col gap-6 animate-slide-up relative z-10 border border-[var(--ice)] shadow-sm">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center border-2 shrink-0 transition-all duration-500 shadow-sm ${
                step > i ? 'bg-[var(--success)] border-[var(--success)] text-white shadow-sm' :
                step === i ? 'bg-[var(--ice)] border-blue-200 text-[var(--primary)] animate-pulse' :
                'bg-gray-50 border-gray-200 text-gray-400'
              }`}>
                {step > i ? <Check size={20} strokeWidth={3} /> : <s.icon size={20} strokeWidth={2.5} />}
              </div>
              <span className={`text-[15px] font-bold transition-all duration-500 ${step >= i ? 'text-[var(--text)]' : 'text-gray-400'}`}>
                {s.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Result Card (Found) */}
      {step === 4 && isVehicleFound && (
        <div className="w-full flex flex-col gap-4 animate-slide-up relative z-10">
           <PremiumCard className="!p-5 shadow-md">
             {/* Header */}
             <div className="flex justify-between items-center mb-5">
               <span className="text-[10px] font-black uppercase tracking-widest bg-[#F0FDF4] text-[var(--success)] px-3 py-1.5 rounded-lg border border-[#bbf7d0]">Correspondance exacte</span>
             </div>

             {/* Vehicle Hero */}
             <div className="flex items-center gap-4 mb-6">
               <div className="w-28 h-20 relative flex items-center justify-center bg-[var(--bg-color)] rounded-[16px] border border-[var(--ice)] shadow-inner shrink-0">
                 <img src={ASSETS.atto3} className="w-[140%] max-w-none object-contain drop-shadow-md translate-x-2" alt="ATTO 3" />
               </div>
               <div>
                 <div className="text-[var(--text)] font-black text-[22px] tracking-tight mb-1.5">BYD ATTO 3</div>
                 <div className="flex flex-col gap-1.5">
                   <div className="text-[var(--text-muted)] font-bold text-[12px] tracking-widest uppercase flex items-center gap-2"><span className="text-[var(--primary)] border border-blue-200 px-1.5 py-0.5 rounded text-[9px] w-8 text-center bg-[var(--ice)]">IMM</span> 12*** | A | *</div>
                   <div className="text-[var(--text-muted)] font-bold text-[12px] tracking-widest uppercase flex items-center gap-2"><span className="text-[var(--primary)] border border-blue-200 px-1.5 py-0.5 rounded text-[9px] w-8 text-center bg-[var(--ice)]">VIN</span> LC000000***</div>
                 </div>
               </div>
             </div>

             {/* Details Grid */}
             <div className="grid grid-cols-2 gap-3 mb-2">
               <div className="bg-[var(--bg-color)] rounded-[16px] p-3.5 border border-[var(--ice)]">
                 <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><History size={12}/> Dernier SAV</div>
                 <div className="text-[13px] font-bold text-[var(--text)]">12 Janv 2024</div>
               </div>
               <div className="bg-[var(--bg-color)] rounded-[16px] p-3.5 border border-[var(--ice)]">
                 <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><MapPin size={12}/> Kilométrage</div>
                 <div className="text-[13px] font-bold text-[var(--text)]">42 050 km</div>
               </div>
               <div className="bg-[var(--bg-color)] rounded-[16px] p-3.5 border border-[var(--ice)] col-span-2 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <WrenchIcon size={14} className="text-[var(--primary)]" strokeWidth={2.5}/>
                   <span className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest">Centre habituel</span>
                 </div>
                 <div className="text-[13px] font-black text-[var(--primary)]">Casa - Ain Sebaâ</div>
               </div>
             </div>
           </PremiumCard>

           <Button variant="primary" fullWidth className="mt-4 !py-4.5 !text-[16px]" onClick={() => onNavigate('main')}>
             Sélectionner ce véhicule
           </Button>
           
           <button onClick={() => onNavigate('add-vehicle')} className="text-[var(--text-muted)] text-[14px] font-bold mt-2 hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline py-2">
             Ce n'est pas mon véhicule
           </button>
        </div>
      )}

      {/* Result Card (Not Found) */}
      {step === 4 && !isVehicleFound && (
        <div className="w-full flex flex-col gap-4 animate-slide-up relative z-10 mt-6">
           <Button variant="primary" fullWidth className="!py-4.5 !text-[16px]" onClick={() => onNavigate('add-vehicle')}>
             Ajouter un véhicule manuellement
           </Button>
           
           <button onClick={() => onNavigate('main')} className="text-[var(--text-muted)] text-[14px] font-bold mt-2 hover:text-[var(--primary)] transition-colors underline-offset-4 hover:underline py-2">
             Passer cette étape
           </button>
        </div>
      )}
    </PremiumScreen>
  );
};

const AddVehicleScreen = ({ onNavigate, onAdd }) => {
  const [step, setStep] = useState('form');
  const [model, setModel] = useState('ATTO 3');
  const [vin, setVin] = useState('');
  const [km, setKm] = useState('');
  const [immat, setImmat] = useState('');
  const [city, setCity] = useState('Casablanca');
  const [center, setCenter] = useState('BYD Casa - Ain Sebaâ');

  const handleSave = () => {
    onAdd({
      id: Date.now(),
      name: `BYD ${model}`,
      vin: vin || "LC00000000000",
      km: parseInt(km) || 0,
      img: model === 'ATTO 3' ? ASSETS.atto3 : model === 'HAN' ? ASSETS.han : ASSETS.seal
    });
    setStep('success');
  };

  if (step === 'success') {
    return (
      <PremiumScreen className="items-center justify-center px-8 !bg-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--ice)_0%,transparent_70%)] opacity-50"></div>
        <div className="z-10 flex flex-col items-center text-center animate-slide-up">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[var(--success)] rounded-full blur-[30px] opacity-20 animate-pulse"></div>
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(22,163,74,0.3)] relative z-10 border border-green-100">
              <CheckCircle2 size={48} className="text-[var(--success)]" strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="text-[32px] font-black text-[var(--text)] mb-4 tracking-tight leading-none">Véhicule ajouté !</h2>
          <p className="text-[15px] font-medium text-[var(--text-muted)] mb-10 leading-relaxed max-w-[90%]">
            Votre véhicule a été ajouté à votre garage. Certaines informations pourront être vérifiées avec notre base SAV pour plus de précision.
          </p>
          <Button onClick={() => onNavigate('main')} fullWidth className="!py-4.5 !text-[16px]">
            Accéder à mon espace
          </Button>
        </div>
      </PremiumScreen>
    );
  }

  return (
    <PremiumScreen>
      <Header transparent onBack={() => onNavigate('vehicle-recognition')} />
      <div className="px-8 py-4 flex-1 overflow-y-auto hide-scrollbar flex flex-col animate-slide-in-right pb-10">
        <h2 className="text-[32px] font-black text-[var(--text)] mb-2 tracking-tight">Votre Véhicule</h2>
        <p className="text-[var(--text-muted)] text-[15px] font-medium mb-8">Ajoutez votre BYD pour personnaliser votre expérience SAV.</p>
        
        {/* Modèle */}
        <div className="flex flex-col gap-2 mb-5">
          <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Modèle BYD</label>
          <div className="relative">
            <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[20px] px-5 py-4 text-[15px] font-bold text-[var(--primary)] focus:outline-none appearance-none">
              <option value="ATTO 3">BYD ATTO 3</option>
              <option value="SEAL">BYD SEAL</option>
              <option value="HAN">BYD HAN</option>
            </select>
            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>
        
        <Input label="Immatriculation" placeholder="12345 | A | 1" value={immat} onChange={(e) => setImmat(e.target.value)} />
        <Input label="Numéro de châssis (VIN)" placeholder="LC00000000000000" value={vin} onChange={(e) => setVin(e.target.value)} />
        <Input label="Kilométrage actuel" type="number" placeholder="ex: 15000" value={km} onChange={(e) => setKm(e.target.value)} />
        
        {/* Ville */}
        <div className="flex flex-col gap-2 mb-5">
          <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Ville de résidence</label>
          <div className="relative">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-white border border-[var(--ice)] shadow-[0_2px_10px_rgba(0,40,94,0.02)] rounded-[20px] px-5 py-4 text-[15px] font-bold text-[var(--text)] focus:outline-none appearance-none">
              <option>Casablanca</option>
              <option>Rabat</option>
              <option>Marrakech</option>
              <option>Tanger</option>
              <option>Agadir</option>
              <option>Fès</option>
            </select>
            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>

        {/* Centre SAV */}
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Centre SAV Préféré</label>
          <div className="relative">
            <select value={center} onChange={(e) => setCenter(e.target.value)} className="w-full bg-white border border-[var(--ice)] shadow-[0_2px_10px_rgba(0,40,94,0.02)] rounded-[20px] px-5 py-4 text-[15px] font-bold text-[var(--primary)] focus:outline-none appearance-none">
              <option>BYD Casa - Ain Sebaâ</option>
              <option>BYD Casa - Anfa</option>
              <option>BYD Rabat - Agdal</option>
              <option>BYD Marrakech - Guéliz</option>
              <option>BYD Tanger - Free Zone</option>
            </select>
            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>
        
        <div className="mt-auto pt-4 pb-8 flex flex-col gap-4">
           <Button onClick={handleSave} fullWidth>Enregistrer mon véhicule</Button>
           <button onClick={() => onNavigate('main')} className="w-full py-2 text-[14px] text-[var(--text-muted)] font-bold hover:text-[var(--text)]">Passer cette étape</button>
        </div>
      </div>
    </PremiumScreen>
  );
};

// --- MAIN TABS ---
const HomeTab = ({ onOpen, onNotifications, activeVehicle, onNavigateTab }) => (
  <div className="flex flex-col animate-fade-in">
    {/* Global Header */}
    <div className="px-6 pt-16 pb-6 flex justify-between items-center z-20 gap-4 relative">
      <div className="flex-1">
        <h1 className="text-[26px] font-black text-[var(--text)] tracking-tight leading-tight mb-1.5">
          Bonjour, <span className="text-[var(--primary)]">Yassine</span>
        </h1>
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)] shadow-[0_0_8px_rgba(22,163,74,0.8)]"></span>
          </div>
          <p className="text-[13px] font-bold text-[var(--text-muted)]">
            Votre BYD est prête pour la route.
          </p>
        </div>
      </div>
      
      {/* Premium Grouped Actions Pill */}
      <div className="flex items-center gap-1 shrink-0 bg-white/60 backdrop-blur-xl p-1.5 rounded-full border border-white shadow-[0_8px_24px_-6px_rgba(0,40,94,0.12)]">
        <button onClick={() => onOpen('loyalty')} className="bg-white h-11 px-4 rounded-full flex items-center gap-2.5 active:scale-95 transition-all shadow-sm border border-[var(--ice)] hover:border-blue-100 group">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
            <Star size={13} className="text-[var(--warning)] fill-[var(--warning)]" strokeWidth={2.5} />
          </div>
          <span className="text-[14px] font-black text-[var(--text)] tracking-tight">
            1 280 <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider ml-0.5">pts</span>
          </span>
        </button>
        <button onClick={onNotifications} className="w-11 h-11 rounded-full flex items-center justify-center relative active:scale-95 transition-all bg-transparent hover:bg-white text-[var(--primary)] border border-transparent hover:border-[var(--ice)] hover:shadow-sm">
          <Bell size={22} strokeWidth={2.5} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[var(--danger)] rounded-full border-2 border-white shadow-[0_2px_4px_rgba(239,68,68,0.4)]"></span>
        </button>
      </div>
    </div>

    {/* Immersive Vehicle Hero Card */}
    <div className="px-6 mb-8 mt-1">
      <div className="gradient-blue rounded-[36px] p-6 text-white relative overflow-hidden shadow-[0_24px_48px_-12px_rgba(0,40,94,0.4)]">
        {/* Glows & Abstract patterns */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--cyan)] rounded-full blur-[80px] opacity-30 mix-blend-screen pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[var(--accent)] rounded-full blur-[60px] opacity-40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-2 relative z-20">
          <button onClick={() => onOpen('select-vehicle')} className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-[16px] border border-white/20 active:scale-95 transition-all shadow-sm">
            <h2 className="text-[20px] font-black tracking-tight drop-shadow-md text-white">{activeVehicle.name}</h2>
            <ChevronDown size={20} className="text-white/80" strokeWidth={2.5}/>
          </button>
          <div className="text-right">
            <div className="text-[10px] text-white/90 uppercase tracking-widest font-black bg-black/20 px-3 py-1.5 rounded-[10px] border border-white/10 shadow-inner">
              Mon garage
            </div>
          </div>
        </div>

        {/* Transparent Vehicle Visual integration perfectly styled */}
        <div className="relative h-44 flex items-center justify-center mt-2 mb-8 z-20 w-full pointer-events-none">
           <div className="absolute bottom-2 w-4/5 h-6 bg-[var(--cyan)] rounded-full blur-[40px] opacity-20"></div>
           <div className="absolute bottom-1 w-3/4 h-3 bg-black/60 rounded-[100%] blur-lg"></div>
           <img src={activeVehicle.img} alt={activeVehicle.name} className="w-[125%] max-w-none object-contain drop-shadow-[0_20px_30px_rgba(0,10,30,0.9)] scale-110 translate-x-2" />
        </div>

        {/* Glassmorphism Stats */}
        <div className="relative z-20 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel-dark rounded-[20px] p-4 flex flex-col gap-1">
               <div className="text-[10px] text-white/60 font-black uppercase tracking-widest flex items-center gap-1.5">
                 <History size={14} strokeWidth={2.5} className="text-[var(--cyan)]"/> Dernier SAV
               </div>
               <div className="font-black text-[18px] tracking-tight">12 Janv 2024</div>
            </div>
            <div className="glass-panel-dark rounded-[20px] p-4 flex flex-col gap-1">
               <div className="text-[10px] text-white/60 font-black uppercase tracking-widest flex items-center gap-1.5">
                 <MapPin size={14} strokeWidth={2.5} className="text-[var(--cyan)]"/> Kilométrage
               </div>
               <div className="font-black text-[20px]">{activeVehicle.km.toLocaleString()} <span className="text-[12px] font-bold text-white/70">km</span></div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5 text-[9px] font-black text-white/40 uppercase tracking-[0.2em] relative z-20">
          Dernière mise à jour il y a 10 min
        </div>
      </div>
    </div>

    {/* Floating Quick Actions */}
    <div className="px-6 mb-10">
      <div className="grid grid-cols-4 gap-3">
        <QuickAction icon={Calendar} label="Rendez-vous" onClick={() => onOpen('booking')} />
        <QuickAction icon={WrenchIcon} label="Forfaits SAV" onClick={() => onOpen('simulator')} />
        <QuickAction icon={Activity} label="Suivi réparation" onClick={() => onNavigateTab('suivi')} />
        <QuickAction icon={Phone} label="Assistance" onClick={() => onOpen('emergency')} variant="danger" />
      </div>
    </div>

    {/* Premium Smart Insight */}
    <div className="px-6 mb-10">
      <PremiumCard className="flex items-start gap-4 !bg-gradient-to-br from-[#F0FDF4] to-white border-l-4 !border-l-[var(--success)] shadow-sm !p-5">
        <IconBubble icon={CheckCircle2} variant="success" size="md" className="shrink-0" />
        <div className="flex-1 pt-1">
          <p className="text-[15px] text-[var(--text)] font-black leading-tight mb-1">Entretien recommandé</p>
          <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed mb-3">Votre cap des 30 000 km approche. Planifiez votre visite.</p>
          <button onClick={() => onOpen('booking')} className="text-[12px] bg-[var(--success)] hover:bg-green-700 text-white px-5 py-2.5 rounded-[14px] font-bold active:scale-95 transition-all shadow-md">
            Planifier maintenant
          </button>
        </div>
      </PremiumCard>
    </div>

    {/* Rich Offers Preview */}
    <div className="px-6 mb-10">
      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-[18px] font-black text-[var(--text)] tracking-tight">Offres du moment</h3>
        <button onClick={() => onOpen('offers')} className="text-[13px] text-[var(--accent)] font-bold flex items-center gap-1">Voir tout <ArrowRight size={14}/></button>
      </div>
      <PremiumCard className="relative overflow-hidden !p-0 shadow-lg" onClick={() => onOpen('offers')}>
         <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-deep)] to-[var(--primary)]/90 z-10 mix-blend-multiply"></div>
         <img src={ASSETS.maintenance} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" alt="Maintenance" />
         
         <div className="relative z-20 p-6 flex flex-col items-start h-full justify-between">
           <span className="inline-block bg-[var(--warning)] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-[10px] shadow-sm mb-4">Promotion exclusive</span>
           <div className="flex justify-between items-end w-full">
             <div className="text-white max-w-[70%]">
               <h4 className="text-[20px] font-black mb-1 leading-tight tracking-tight">Contrôle de printemps</h4>
               <p className="text-[14px] text-[var(--cyan)] font-bold mb-4">-20% sur le forfait entretien</p>
               <div className="text-[12px] font-bold text-white flex items-center gap-1.5 uppercase tracking-wider bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit border border-white/30">
                 Profiter <ArrowRight size={14} strokeWidth={2.5} />
               </div>
             </div>
           </div>
         </div>
      </PremiumCard>
    </div>

  </div>
);

const QuickAction = ({ icon: Icon, label, onClick, variant = 'default' }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-3 group active:scale-[0.95] transition-all">
    <div className={`w-[72px] h-[72px] rounded-[24px] flex items-center justify-center shadow-sm transition-all duration-300 border ${variant === 'danger' ? 'bg-gradient-to-br from-red-50 to-white text-[var(--danger)] border-red-100 group-hover:shadow-[0_8px_20px_rgba(239,68,68,0.2)]' : 'bg-white text-[var(--primary)] border-[var(--ice)] group-hover:shadow-[0_12px_24px_-8px_rgba(0,40,94,0.15)] group-hover:border-[var(--primary)]/20'}`}>
      <Icon size={28} strokeWidth={2} />
    </div>
    <span className="text-[11px] font-bold text-[var(--text)] text-center leading-tight px-1">{label}</span>
  </button>
);

const ServicesTab = ({ onOpen }) => (
  <div className="flex flex-col animate-fade-in px-6 pt-16">
    <div className="mb-8">
      <h1 className="text-[32px] font-black text-[var(--text)] tracking-tight">Nos services</h1>
      <p className="text-[15px] font-medium text-[var(--text-muted)] mt-2">Tout ce dont vous avez besoin, au même endroit.</p>
    </div>
    
    {/* Featured Large Module */}
    <PremiumCard className="mb-4 relative overflow-hidden !p-0 shadow-lg group" onClick={() => onOpen('booking')}>
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-[var(--ice)] rounded-tl-full -z-0 opacity-50 group-active:scale-110 transition-transform"></div>
      <div className="p-8 relative z-10 flex flex-col h-full">
        <span className="text-[10px] font-black bg-[var(--primary)] text-white px-2.5 py-1 rounded mb-4 w-fit uppercase tracking-widest">Service prioritaire</span>
        <IconBubble icon={Calendar} variant="gradient" size="lg" className="w-fit mb-5" />
        <h3 className="text-[22px] font-black text-[var(--text)] mb-2 tracking-tight">Prendre rendez-vous</h3>
        <p className="text-[14px] font-medium text-[var(--text-muted)] mb-8 max-w-[80%] leading-relaxed">Réservez, simulez ou planifiez votre entretien officiel BYD en quelques secondes.</p>
        <div className="mt-auto flex items-center gap-2 text-[13px] font-black text-[var(--accent)] uppercase tracking-wider bg-[var(--ice)] px-4 py-2.5 rounded-full w-fit">
          Planifier <ArrowRight size={16} strokeWidth={2.5} />
        </div>
      </div>
    </PremiumCard>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <ServiceSquare icon={WrenchIcon} title="Simulateur des forfaits" onClick={() => onOpen('simulator')} />
      <ServiceSquare icon={Phone} title="Contact & Support" onClick={() => onOpen('contact')} />
    </div>

    <div className="flex flex-col gap-4">
      <ServiceHorizontal icon={Phone} title="Assistance téléphonique" desc="Notre équipe est à votre écoute en cas de besoin." onClick={() => onOpen('emergency')} danger />
      <ServiceHorizontal icon={Map} title="Carte & Réseau BYD" desc="Localisez les centres SAV, showrooms et points de service BYD au Maroc." onClick={() => onOpen('map')} />
      <ServiceHorizontal icon={FileText} title="Manuels & Guides" desc="Téléchargez la documentation de votre véhicule." onClick={() => onOpen('manuals')} />
    </div>
  </div>
);

const ServiceSquare = ({ icon: IconComponent, title, onClick }) => (
  <PremiumCard className="!p-6 flex flex-col justify-center items-center text-center gap-4 shadow-sm" onClick={onClick}>
    <IconBubble icon={IconComponent} variant="primary" size="lg" />
    <span className="text-[14px] font-black text-[var(--text)] leading-tight">{title}</span>
  </PremiumCard>
);

const ServiceHorizontal = ({ icon: Icon, title, desc, onClick, danger }) => (
  <div onClick={onClick} className={`bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm border cursor-pointer active:scale-95 transition-transform ${danger ? 'border-red-100 bg-red-50/50' : 'border-[var(--ice)]'}`}>
    <div className={`p-4 rounded-[20px] ${danger ? 'bg-red-100 text-[var(--danger)] shadow-inner' : 'bg-[var(--bg-color)] text-[var(--primary)] shadow-inner border border-[var(--ice)]'}`}>
      <Icon size={24} strokeWidth={2.5} />
    </div>
    <div className="flex-1">
      <h3 className={`text-[15px] font-black mb-1 tracking-tight ${danger ? 'text-[var(--danger)]' : 'text-[var(--text)]'}`}>{title}</h3>
      <p className="text-[13px] font-medium text-[var(--text-muted)] leading-tight">{desc}</p>
    </div>
    <ChevronRight size={20} className={danger ? "text-red-300" : "text-gray-300"} />
  </div>
);

const HistoryTab = ({ onOpenReport, currentRepairStep, onOpenQuote }) => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  const [isServiceActive, setIsServiceActive] = useState(true);

  const interventionsData = [
    { id: 1, date: "24 MAI 2024", km: "30 000 km", category: "Entretien", title: "Entretien périodique", details: ["Filtre à air", "Filtre d'habitacle", "Diagnostic complet"], isRecent: true, techNote: "L'état général du véhicule est excellent. La batterie Blade affiche un SOH de 99%." },
    { id: 2, date: "12 JANV 2024", km: "20 000 km", category: "Révision", title: "Révision générale", details: ["Huile moteur", "Filtre à huile", "Pression pneus"], isRecent: false, techNote: "Niveaux de fluides complétés. Plaquettes de frein avant à 70%." },
    { id: 3, date: "18 SEPT 2023", km: "12 500 km", category: "Contrôle", title: "Contrôle & diagnostic", details: ["Vérification électronique", "Mise à jour système"], isRecent: false, techNote: "Mise à jour du système d'infodivertissement (V2.1) effectuée avec succès. Aucun défaut signalé." },
  ];

  const filters = ['Tout', 'Entretien', 'Révision', 'Contrôle'];
  const filteredData = activeFilter === 'Tout' ? interventionsData : interventionsData.filter(item => item.category === activeFilter);

  return (
    <div className="flex flex-col animate-fade-in px-6 pt-16">
      <div className="mb-6">
        <h1 className="text-[32px] font-black text-[var(--text)] tracking-tight leading-none mb-1">Suivi SAV</h1>
        <p className="text-[14px] font-medium text-[var(--text-muted)]">État de votre véhicule en temps réel et historique</p>
      </div>

      {/* NOUVEAU: Sélecteur de présentation */}
      <div className="mb-8">
         <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 px-1 flex items-center gap-1.5">
           <Activity size={12} strokeWidth={3}/> Scénario de présentation
         </div>
         <div className="flex p-1 bg-[var(--bg-color)] rounded-[16px] shadow-inner border border-[var(--ice)]">
            <button 
              onClick={() => setIsServiceActive(true)} 
              className={`flex-1 py-2.5 text-[13px] font-bold rounded-[12px] transition-all duration-300 ${isServiceActive ? 'bg-white text-[var(--primary)] shadow-sm border border-[var(--ice)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              Service en cours
            </button>
            <button 
              onClick={() => setIsServiceActive(false)} 
              className={`flex-1 py-2.5 text-[13px] font-bold rounded-[12px] transition-all duration-300 ${!isServiceActive ? 'bg-white text-[var(--primary)] shadow-sm border border-[var(--ice)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
            >
              Aucun service en cours
            </button>
         </div>
      </div>

      <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Intervention en cours</h3>
      
      {isServiceActive ? (
        <PremiumCard className="mb-10 !p-0 overflow-hidden shadow-md border-2 border-[var(--primary)]">
           {/* Header de la carte */}
           <div className="bg-[var(--ice)] p-5 border-b border-blue-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-blue flex items-center justify-center text-white shadow-sm border border-white">
                      <WrenchIcon size={18} strokeWidth={2.5}/>
                    </div>
                    <div>
                      <div className="text-[15px] font-black text-[var(--text)] tracking-tight">BYD ATTO 3</div>
                      <div className="text-[12px] font-medium text-[var(--text-muted)]">Casa - Ain Sebaâ</div>
                    </div>
                 </div>
                 <div className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest animate-pulse shadow-inner border border-white ${currentRepairStep === 5 ? 'bg-yellow-100 text-[var(--warning)]' : currentRepairStep === 6 ? 'bg-blue-100 text-[var(--primary)]' : 'bg-blue-100 text-[var(--primary)]'}`}>
                   {currentRepairStep === 5 ? 'Devis en attente' : currentRepairStep === 6 ? 'Devis validé' : 'En atelier'}
                 </div>
              </div>
              {/* Nouvelles informations métier */}
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-blue-200/50">
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--primary)] bg-white/50 px-2 py-1 rounded-md">
                   <FileText size={14} /> OR-2026-00482
                 </div>
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-muted)]">
                   <Calendar size={14} /> MAJ : Aujourd'hui à 11h35
                 </div>
              </div>
           </div>
           
           {/* Barre de progression des étapes verticale */}
           <div className="p-6">
              <div className="relative ml-2 mb-8 flex flex-col gap-6">
                {/* Ligne grise de fond */}
                <div className="absolute left-[14px] top-4 bottom-4 w-1 bg-gray-100 rounded-full z-0"></div>
                {/* Ligne verte de progression */}
                <div className="absolute left-[14px] top-4 w-1 bg-[var(--success)] rounded-full z-0 shadow-[0_0_8px_rgba(22,163,74,0.6)] transition-all duration-1000" style={{ height: `${((currentRepairStep - 1) / 11) * 100}%` }}></div>
                
                {[
                  { id: 1, title: "Rendez-vous confirmé", desc: "Votre créneau est réservé en centre." },
                  { id: 2, title: "Véhicule réceptionné", desc: "Prise en charge par notre conseiller." },
                  { id: 3, title: "Diagnostic en cours", desc: "Analyse approfondie par nos experts." },
                  { id: 4, title: "Diagnostic terminé", desc: "Bilan complet de votre véhicule." },
                  { id: 5, title: "Devis complémentaire en attente", desc: "Une action est requise de votre part." },
                  { id: 6, title: "Devis validé", desc: "Les réparations peuvent reprendre." },
                  { id: 7, title: "Réparation en cours", desc: "Le technicien intervient sur votre véhicule." },
                  { id: 8, title: "Pièce en attente", desc: "Approvisionnement en cours depuis notre magasin." },
                  { id: 9, title: "Contrôle qualité", desc: "Vérification selon les standards BYD." },
                  { id: 10, title: "Véhicule prêt", desc: "En attente de votre récupération." },
                  { id: 11, title: "Véhicule livré", desc: "Restitution effectuée avec succès." },
                  { id: 12, title: "Intervention clôturée", desc: "Dossier SAV archivé." }
                ].map((step) => {
                  const status = step.id < currentRepairStep ? 'completed' : step.id === currentRepairStep ? 'current' : 'upcoming';
                  const isQuoteStep = step.id === 5;
                  
                  return (
                    <div key={step.id} 
                         className={`relative flex items-center gap-4 ${isQuoteStep && status === 'current' ? 'cursor-pointer group' : ''}`}
                         onClick={() => { if (isQuoteStep && status === 'current') onOpenQuote(); }}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ring-4 ring-white transition-all duration-500 ${
                        status === 'completed' ? 'bg-[var(--success)] text-white shadow-sm z-10' : 
                        status === 'current' ? 'bg-white border-4 border-[var(--primary)] text-[var(--primary)] scale-125 shadow-[0_0_15px_rgba(0,40,94,0.2)] relative z-20' : 
                        'bg-gray-50 border-2 border-gray-200 text-gray-300 z-10'
                      }`}>
                        {status === 'completed' && <Check size={14} strokeWidth={3}/>}
                        {status === 'current' && <WrenchIcon size={14} strokeWidth={2.5} className="animate-pulse"/>}
                        {status === 'upcoming' && <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>}
                      </div>
                      <div className={`flex flex-col justify-center ${status === 'current' ? 'pl-1' : ''}`}>
                         <div className={`transition-all duration-300 ${
                           status === 'completed' ? 'text-[14px] font-bold text-[var(--text)]' : 
                           status === 'current' ? 'text-[16px] font-black text-[var(--primary)] tracking-tight mb-0.5' : 
                           'text-[14px] font-bold text-gray-400'
                         }`}>
                           {step.title}
                         </div>
                         
                         {status === 'current' && (
                           <div className="text-[13px] font-medium text-[var(--text-muted)] leading-snug animate-fade-in">
                             {step.desc}
                           </div>
                         )}

                         {isQuoteStep && status === 'current' && (
                            <div className="mt-2 flex items-center gap-1.5 bg-[var(--warning)] text-white px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest w-fit shadow-sm group-hover:scale-105 transition-transform">
                               <FileText size={12} strokeWidth={3}/> Voir le devis
                            </div>
                         )}
                         {isQuoteStep && status === 'completed' && (
                            <div className="mt-1.5 flex items-center gap-1.5 bg-[#F0FDF4] text-[var(--success)] px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest w-fit shadow-sm border border-green-100">
                               <Check size={12} strokeWidth={3}/> Devis accepté
                            </div>
                         )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center bg-[var(--bg-color)] p-4 rounded-[20px] border border-[var(--ice)] shadow-inner">
                <div className="flex items-center gap-3 text-[13px] font-bold text-[var(--text-muted)]">
                   <div className="w-8 h-8 rounded-[12px] bg-white flex items-center justify-center shadow-sm text-[var(--primary)] border border-[var(--ice)]"><Calendar size={16} strokeWidth={2.5}/></div>
                   Restitution estimée
                </div>
                <div className="text-[15px] font-black text-[var(--text)]">Aujourd'hui, 16:30</div>
              </div>
           </div>
        </PremiumCard>
      ) : (
        <PremiumCard className="mb-10 !p-8 text-center flex flex-col items-center justify-center border border-[var(--ice)] border-dashed bg-white/50">
           <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center text-[var(--success)] mb-4 border border-[#bbf7d0] shadow-sm">
             <CheckCircle2 size={32} strokeWidth={2.5}/>
           </div>
           <h4 className="text-[18px] font-black text-[var(--text)] tracking-tight mb-2">Aucune intervention</h4>
           <p className="text-[13px] font-medium text-[var(--text-muted)] leading-relaxed">Votre véhicule n'est actuellement pas en atelier. Tout est en ordre !</p>
        </PremiumCard>
      )}

      <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Historique des interventions</h3>

      {/* Premium Filter Chips */}
      <div className="flex gap-2.5 overflow-x-auto hide-scrollbar mb-8 pb-2 -mx-6 px-6">
        {filters.map((c) => (
          <button 
            key={c} 
            onClick={() => setActiveFilter(c)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${activeFilter === c ? 'gradient-blue text-white shadow-[0_8px_16px_-6px_rgba(0,40,94,0.4)]' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:bg-[var(--ice)]'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Top Summary Dashboard */}
      <div className="flex flex-col gap-4 mb-10">
        <div className="grid grid-cols-2 gap-4">
          <PremiumCard className="!p-5 flex flex-col justify-center relative overflow-hidden group shadow-sm">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500"><WrenchIcon size={80}/></div>
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative z-10"><WrenchIcon size={12}/> Interventions</div>
            <div className="text-[32px] font-black text-[var(--primary)] leading-none relative z-10">06</div>
          </PremiumCard>
          <PremiumCard className="!p-5 flex flex-col justify-center relative overflow-hidden group shadow-sm">
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500"><Shield size={80}/></div>
            <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5 flex items-center gap-1.5 relative z-10"><Shield size={12}/> Statut SAV</div>
            <div className="text-[18px] font-black text-[var(--success)] tracking-tight leading-none relative z-10 mt-2">À jour</div>
          </PremiumCard>
        </div>
        <PremiumCard className="!p-5 flex justify-between items-center bg-gradient-to-r from-white to-[var(--ice)]/50 shadow-sm">
          <div className="flex-1">
             <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Dernière visite</div>
             <div className="text-[15px] font-black text-[var(--text)]">24 mai 2024</div>
          </div>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[var(--ice)] to-transparent mx-4"></div>
          <div className="flex-1 text-right">
             <div className="text-[10px] font-black text-[var(--success)] uppercase tracking-widest mb-1">Prochain entretien</div>
             <div className="text-[15px] font-black text-[var(--text)]">30 000 km</div>
          </div>
        </PremiumCard>
      </div>

      {/* Premium Timeline */}
      <div className="relative ml-1 pb-4 flex flex-col">
        <div className="absolute left-[11px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[var(--primary)]/20 via-[var(--ice)] to-transparent rounded-full"></div>
        
        {filteredData.length > 0 ? filteredData.map(item => (
          <TimelineItem 
            key={item.id}
            date={item.date} 
            km={item.km} 
            type={item.title} 
            details={item.details}
            isRecent={item.isRecent}
            onClick={() => onOpenReport(item)}
          />
        )) : (
          <div className="text-center py-10 text-[var(--text-muted)] font-medium bg-white/50 rounded-2xl border border-[var(--ice)]">Aucune intervention trouvée pour ce filtre.</div>
        )}
      </div>
    </div>
  );
};

const TimelineItem = ({ date, km, type, details, isRecent, onClick }) => (
  <div className="relative pl-10 group mb-10 last:mb-0">
    {/* Timeline Dot */}
    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white shadow-sm border-2 ${isRecent ? 'border-[var(--primary)]' : 'border-[var(--ice)]'} z-10 transition-colors`}>
       <div className={`w-2.5 h-2.5 rounded-full ${isRecent ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}></div>
    </div>
    
    <div className="flex justify-between items-center mb-3">
      <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-[10px] shadow-sm ${isRecent ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)]'}`}>{date}</span>
    </div>
    
    <h4 className="text-[18px] font-black text-[var(--text)] tracking-tight mb-2.5">{type}</h4>
    
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[11px] font-bold bg-white border border-[var(--ice)] px-3 py-1.5 rounded-lg text-[var(--text-muted)] flex items-center gap-1.5 shadow-sm">
        <MapPin size={14} strokeWidth={2.5} className="text-[var(--primary)]"/> {km}
      </span>
    </div>

    {/* Details Block (Glass effect) */}
    <div onClick={onClick} className="bg-white/70 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_4px_20px_-4px_rgba(0,40,94,0.05)] border border-[var(--ice)] hover:shadow-[0_8px_24px_-4px_rgba(0,40,94,0.1)] transition-all cursor-pointer">
      <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3 flex items-center gap-1.5"><WrenchIcon size={12}/> Détails de l'intervention</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {details.map((d, i) => (
          <span key={i} className="text-[12px] font-bold bg-white text-[var(--text)] px-3.5 py-2 rounded-[12px] border border-[var(--ice)] shadow-sm">
            {d}
          </span>
        ))}
      </div>
      <div className="pt-4 border-t border-[var(--ice)] flex justify-between items-center">
         <span className="text-[13px] font-black text-[var(--primary)] group-hover:underline flex items-center gap-1.5">
           Voir le rapport complet
         </span>
         <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-sm border border-[var(--ice)] group-active:scale-95 transition-transform group-hover:bg-[var(--ice)]">
           <ArrowRight size={18} strokeWidth={2.5}/>
         </button>
      </div>
    </div>
  </div>
);

const ExploreTab = ({ onOpen }) => (
  <div className="flex flex-col animate-fade-in px-6 pt-16">
    <h1 className="text-[32px] font-black text-[var(--text)] tracking-tight mb-8">Explorer</h1>

    {/* Featured Banner with Search */}
    <div className="mb-10">
      <PremiumCard className="gradient-blue text-white !p-0 overflow-hidden relative shadow-lg" onClick={() => onOpen('faq')}>
        <div className="absolute right-[-20%] top-[-20%] opacity-10 mix-blend-screen"><Info size={200} /></div>
        <div className="p-8 relative z-10">
          <span className="text-[10px] font-black bg-white/20 text-white px-2.5 py-1 rounded mb-4 w-fit uppercase tracking-widest backdrop-blur-md border border-white/30 block">Support client</span>
          <h3 className="text-[24px] font-black mb-2 tracking-tight leading-none">Infos SAV / FAQ</h3>
          <p className="text-[14px] font-medium text-white/80 mb-6 leading-relaxed max-w-[90%]">Toutes les réponses concernant l'entretien et l'utilisation de votre BYD.</p>
          <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-[20px] p-4 flex items-center gap-3">
            <Search size={20} className="text-white/70" strokeWidth={2.5}/>
            <span className="text-[14px] font-medium text-white/70">Rechercher un sujet...</span>
          </div>
        </div>
      </PremiumCard>
    </div>

    <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Maintenance BYD</h3>
    <div className="grid grid-cols-2 gap-4 mb-10">
      <ExploreMiniCard title="Entretien & réparation" desc="Savoir-faire officiel" icon={WrenchIcon} onClick={() => onOpen('maintenance-info')} />
      <ExploreMiniCard title="Pièces d'origine" desc="Garantie constructeur" icon={Shield} onClick={() => onOpen('maintenance-info')} />
      <ExploreMiniCard title="Manuel d'utilisation" desc="Téléchargement PDF" icon={FileText} onClick={() => onOpen('manuals')} />
      <ExploreMiniCard title="Programme fidélité" desc="Avantages exclusifs" icon={Star} onClick={() => onOpen('loyalty')} />
    </div>

    <div className="flex justify-between items-end mb-4 px-1">
      <h3 className="text-[18px] font-black text-[var(--text)] tracking-tight">Offres du moment</h3>
    </div>
    
    {/* Horizontal Offers Scroll */}
    <div className="flex gap-4 overflow-x-auto hide-scrollbar mb-10 pb-4 -mx-6 px-6">
       {[
         { t: "Contrôle de printemps", d: "-20% sur entretien", color: "bg-[var(--warning)]" },
         { t: "Bilan Batterie Blade", d: "Diagnostic offert", color: "bg-[var(--success)]" },
         { t: "Accessoires d'origine", d: "-15% remise", color: "bg-[var(--primary)]" }
       ].map((o, i) => (
         <PremiumCard key={i} className="min-w-[240px] !p-5 cursor-pointer shadow-sm" onClick={() => onOpen('offers')}>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded text-white mb-3 inline-block ${o.color}`}>Offre</span>
            <h4 className="text-[16px] font-black text-[var(--text)] leading-tight mb-1">{o.t}</h4>
            <p className="text-[13px] font-bold text-[var(--accent)]">{o.d}</p>
         </PremiumCard>
       ))}
    </div>

    <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Boutique & Extras</h3>
    <div className="flex flex-col gap-4">
      <ExploreHorizontalCard title="Accessoires BYD" desc="Intérieur, extérieur, style..." icon={ShoppingBag} onClick={() => onOpen('accessories')} />
      <ExploreHorizontalCard title="Carte & Réseau BYD" desc="Localisez les centres SAV, showrooms et points de service BYD au Maroc." icon={Map} onClick={() => onOpen('map')} />
      <ExploreHorizontalCard title="Contact" desc="Joindre notre équipe dédiée." icon={Phone} onClick={() => onOpen('contact')} />
    </div>
  </div>
);

const ExploreMiniCard = ({ title, desc, icon: Icon, onClick }) => {
  const IconComponent = Icon;
  return (
    <PremiumCard onClick={onClick} className="!p-5 flex flex-col gap-3 justify-center items-start shadow-sm hover:shadow-md">
      <div className="w-12 h-12 bg-[var(--ice)] rounded-[16px] flex items-center justify-center text-[var(--primary)] border border-white shadow-inner">
        <IconComponent size={24} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className="text-[14px] font-black text-[var(--text)] leading-tight mb-1">{title}</h4>
        <p className="text-[11px] font-medium text-[var(--text-muted)] leading-tight">{desc}</p>
      </div>
    </PremiumCard>
  );
};

const ExploreHorizontalCard = ({ title, desc, icon: Icon, onClick }) => {
  const IconComponent = Icon;
  return (
    <div onClick={onClick} className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm border border-[var(--ice)] cursor-pointer active:scale-95 transition-transform">
       <div className="flex items-center gap-4">
         <div className="w-14 h-14 bg-[var(--bg-color)] rounded-[18px] flex items-center justify-center text-[var(--primary)] shadow-inner border border-[var(--ice)]">
           <IconComponent size={24} strokeWidth={2.5} />
         </div>
         <div>
           <div className="text-[16px] font-black text-[var(--text)] tracking-tight">{title}</div>
           <div className="text-[13px] font-medium text-[var(--text-muted)] mt-0.5">{desc}</div>
         </div>
       </div>
       <ChevronRight size={20} className="text-gray-300" />
    </div>
  );
};

const ProfileTab = ({ onNavigate, onOpen, vehicles, setVehicles, activeVehicleId, setActiveVehicleId, onOpenVehicleDetails }) => {
  return (
    <div className="flex flex-col animate-fade-in px-6 pt-16 pb-8">
      <h1 className="text-[32px] font-black text-[var(--text)] tracking-tight mb-8">Profil</h1>

      {/* Avatar Area */}
      <div className="flex items-center gap-5 mb-10">
        <div className="w-20 h-20 rounded-full gradient-blue flex items-center justify-center text-[24px] font-black text-white shadow-lg border-4 border-white relative">
          YA
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[var(--success)] rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h2 className="text-[20px] font-black text-[var(--text)] tracking-tight">Yassine El Amrani</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white border border-[var(--ice)] shadow-sm text-[var(--text-muted)] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest">Membre depuis 2023</span>
          </div>
        </div>
      </div>

      {/* Loyalty Mini-Card */}
      <div onClick={() => onOpen('loyalty')} className="mb-10 gradient-blue rounded-[32px] p-6 text-white shadow-[0_16px_32px_-8px_rgba(0,40,94,0.3)] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-white/20">
         <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--cyan)] rounded-full blur-[60px] opacity-30 mix-blend-screen pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
         
         <div className="flex justify-between items-start mb-6 relative z-10">
           <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-sm">
             <Star size={16} className="text-[var(--warning)] fill-[var(--warning)]" />
             <span className="font-bold text-[12px] tracking-wide text-white">BYD Silver</span>
           </div>
           <div className="text-right">
             <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1">Points VIP</div>
             <div className="text-[28px] font-black leading-none text-white drop-shadow-md">1 280</div>
           </div>
         </div>
         <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-3 shadow-inner relative z-10 border border-white/10">
           <div className="h-full bg-gradient-to-r from-[var(--warning)] to-yellow-300 rounded-full w-[64%] shadow-[0_0_12px_#F59E0B]"></div>
         </div>
         <div className="text-[11px] font-bold text-[var(--cyan)] uppercase tracking-widest relative z-10 drop-shadow-sm">720 pts avant le statut Gold</div>
      </div>

      {/* Saved Vehicles - IMPROVED */}
      <div className="mb-10">
         <div className="flex justify-between items-end mb-4 px-1">
           <h3 className="text-[18px] font-black text-[var(--text)] tracking-tight">Mes véhicules</h3>
           <button onClick={() => onOpen('add-vehicle-profile')} className="text-[13px] text-[var(--accent)] font-bold flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-[var(--ice)] hover:bg-[var(--ice)] transition-colors"><Plus size={16} strokeWidth={2.5}/> Ajouter</button>
         </div>
         
         <div className="flex flex-col gap-4">
           {vehicles.map((v) => (
             <PremiumCard key={v.id} onClick={() => onOpenVehicleDetails(v)} className={`relative flex flex-col !p-0 overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-all ${activeVehicleId === v.id ? 'border-2 !border-[var(--primary)]' : 'border border-[var(--ice)]'}`}>
               {/* Background Glow */}
               <div className="absolute right-0 top-0 w-32 h-32 bg-[var(--ice)] rounded-full blur-[40px] opacity-40 pointer-events-none group-hover:opacity-60 transition-opacity"></div>
               
               <div className="p-5 flex justify-between items-start z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="text-[18px] font-black text-[var(--text)] tracking-tight">{v.name}</div>
                      {activeVehicleId === v.id && (
                         <span className="text-[9px] bg-[#F0FDF4] border border-[#bbf7d0] text-[var(--success)] px-2 py-0.5 rounded-full uppercase tracking-widest font-black flex items-center gap-1 shadow-sm">
                           <CheckCircle2 size={10} strokeWidth={3}/> Principal
                         </span>
                      )}
                    </div>
                    <div className="text-[11px] font-bold text-[var(--text-muted)] tracking-widest uppercase mb-4">VIN: {v.vin}</div>
                    
                    <div className="flex items-center gap-3">
                       <div className="flex items-center gap-1.5 bg-[var(--bg-color)] px-3 py-1.5 rounded-[12px] border border-blue-100 shadow-inner">
                          <Activity size={14} className="text-[var(--primary)]" />
                          <span className="text-[13px] font-black text-[var(--primary)]">{v.km.toLocaleString()} km</span>
                       </div>
                    </div>
                  </div>
                  
                  <div className="w-32 h-20 relative flex items-center justify-center bg-white rounded-[16px] shadow-sm border border-[var(--ice)] shrink-0 ml-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute bottom-1 w-3/4 h-3 bg-black/20 rounded-full blur-md"></div>
                    <img src={v.img} alt={v.name} className="w-[140%] max-w-none object-contain drop-shadow-md z-10 translate-x-2" />
                  </div>
               </div>
               
               <div className="px-5 py-3 bg-[var(--bg-color)] border-t border-[var(--ice)] flex items-center justify-between group-hover:bg-[var(--ice)] transition-colors">
                  <span className="text-[12px] font-bold text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors">Voir ou gérer ce véhicule</span>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
               </div>
             </PremiumCard>
           ))}
         </div>
      </div>

      {/* Settings */}
      <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Préférences</h3>
      <div className="bg-white rounded-[32px] border border-[var(--ice)] overflow-hidden mb-8 shadow-sm">
        <ProfileRow icon={User} label="Informations personnelles" onClick={() => onOpen('personal-info')} />
        <ProfileRow icon={Bell} label="Notifications" onClick={() => onOpen('profile-notifications')} />
        <ProfileRow icon={Settings} label="Préférences de l'application" onClick={() => onOpen('app-settings')} />
        <ProfileRow icon={Shield} label="Confidentialité" onClick={() => onOpen('privacy')} />
      </div>

      <Button variant="secondary" icon={LogOut} fullWidth onClick={() => onNavigate('welcome')} className="!text-[var(--danger)] !border-red-100 mt-2 !bg-red-50/50 hover:!bg-red-50 shadow-none">
        Se déconnecter
      </Button>
    </div>
  );
};

const VehicleDetailsScreen = ({ vehicle, onClose, vehicles, setVehicles, activeVehicleId, setActiveVehicleId }) => {
  const [isEditingKm, setIsEditingKm] = useState(false);
  const [tempKm, setTempKm] = useState(vehicle.km.toString());
  const isActive = activeVehicleId === vehicle.id;

  const handleSave = () => {
    const newKm = parseInt(tempKm);
    if(!isNaN(newKm) && newKm >= 0) {
       setVehicles(vehicles.map(v => v.id === vehicle.id ? { ...v, km: newKm } : v));
    }
    setIsEditingKm(false);
  };

  return (
    <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
      <Header title="Fiche Véhicule" onBack={onClose} rightAction={<button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><X size={24} strokeWidth={2.5}/></button>} />
      
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10 animate-slide-in-right px-6 pt-4">
         {/* Hero Image */}
         <div className="relative h-48 rounded-[32px] overflow-hidden gradient-blue mb-8 shadow-[0_20px_40px_-10px_rgba(0,40,94,0.3)] flex flex-col items-center justify-end p-6 border border-white/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--cyan)_0%,transparent_60%)] opacity-30"></div>
            <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg border border-white/30 text-[10px] font-black text-white uppercase tracking-widest">
              Mon Garage
            </div>
            {isActive && (
              <div className="absolute top-4 right-4 bg-[var(--success)] shadow-sm px-3 py-1 rounded-lg text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} strokeWidth={3}/> Principal
              </div>
            )}
            <img src={vehicle.img} className="absolute top-6 w-[120%] max-w-none object-contain drop-shadow-[0_20px_20px_rgba(0,10,30,0.6)]" alt={vehicle.name} />
         </div>

         <h2 className="text-[28px] font-black text-[var(--text)] tracking-tight mb-2">{vehicle.name}</h2>
         <div className="flex items-center gap-3 mb-8">
           <span className="text-[12px] font-bold bg-white border border-[var(--ice)] px-3 py-1.5 rounded-lg text-[var(--text-muted)] flex items-center gap-1.5 shadow-sm uppercase tracking-widest">
             <span className="text-[var(--primary)]">VIN</span> {vehicle.vin}
           </span>
         </div>

         {/* Editable Mileage Card */}
         <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[var(--ice)] mb-6">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-[var(--ice)] text-[var(--primary)] rounded-[18px] flex items-center justify-center border border-blue-100 shadow-inner">
                   <Activity size={24} strokeWidth={2.5}/>
                 </div>
                 <div>
                   <h3 className="text-[16px] font-black text-[var(--text)] tracking-tight">Kilométrage actuel</h3>
                   <p className="text-[12px] text-[var(--text-muted)] font-medium mt-0.5">Suivi indispensable pour vos garanties</p>
                 </div>
              </div>
            </div>
            
            {isEditingKm ? (
              <div className="flex flex-col gap-3 animate-fade-in pt-4 border-t border-[var(--ice)]">
                <div className="relative">
                  <input 
                    type="number" 
                    value={tempKm} 
                    onChange={e => setTempKm(e.target.value)} 
                    className="w-full bg-[var(--bg-color)] border-2 border-[var(--cyan)] rounded-[16px] py-4 px-5 text-[18px] font-black text-[var(--text)] outline-none focus:ring-4 focus:ring-[var(--cyan)]/20 transition-all"
                    autoFocus
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[16px] font-bold text-[var(--text-muted)]">km</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <Button onClick={() => { setIsEditingKm(false); setTempKm(vehicle.km.toString()); }} variant="secondary" className="flex-1 !py-3 border-gray-200 text-gray-500 hover:bg-gray-50">Annuler</Button>
                  <Button onClick={handleSave} variant="primary" className="flex-1 !py-3 !bg-gradient-to-r !from-[#16A34A] !to-[#15803d] shadow-[0_8px_24px_rgba(22,163,74,0.4)]">Enregistrer</Button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center bg-[var(--bg-color)] rounded-[16px] p-4 border border-[var(--ice)] pt-4">
                <div className="text-[24px] font-black text-[var(--primary)]">{vehicle.km.toLocaleString()} <span className="text-[14px] text-[var(--text-muted)]">km</span></div>
                <button onClick={() => setIsEditingKm(true)} className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-[12px] shadow-sm border border-[var(--ice)] text-[13px] font-bold text-[var(--accent)] hover:bg-[var(--ice)] hover:border-blue-200 transition-colors active:scale-95">
                  <Edit2 size={16} strokeWidth={2.5}/> Mettre à jour
                </button>
              </div>
            )}
         </div>

         {/* Specifications / Info */}
         <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-[var(--bg-color)] rounded-[20px] p-4 border border-[var(--ice)] shadow-sm">
               <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Immatriculation</div>
               <div className="text-[14px] font-bold text-[var(--text)]">12345 | A | 1</div>
            </div>
            <div className="bg-[var(--bg-color)] rounded-[20px] p-4 border border-[var(--ice)] shadow-sm">
               <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">Dernière visite</div>
               <div className="text-[14px] font-bold text-[var(--text)]">24 Mai 2024</div>
            </div>
            <div className="bg-[var(--bg-color)] rounded-[20px] p-4 border border-[var(--ice)] shadow-sm col-span-2 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <WrenchIcon size={16} className="text-[var(--primary)]"/>
                 <span className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest">Centre habituel</span>
               </div>
               <span className="text-[14px] font-bold text-[var(--text)]">Casa - Ain Sebaâ</span>
            </div>
         </div>

         {/* Make Active Action */}
         <div className="mt-auto">
           <button 
             onClick={() => { if(!isActive) setActiveVehicleId(vehicle.id); }}
             disabled={isActive}
             className={`w-full py-4.5 rounded-[22px] font-black text-[15px] flex items-center justify-center gap-2 transition-all duration-300 shadow-sm border ${
               isActive 
                 ? 'bg-[#F0FDF4] border-[#bbf7d0] text-[var(--success)] opacity-80 cursor-not-allowed' 
                 : 'bg-white border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--ice)] active:scale-[0.98]'
             }`}
           >
             {isActive ? <><CheckCircle2 size={20} strokeWidth={2.5}/> Véhicule principal actuel</> : "Définir comme véhicule principal"}
           </button>
         </div>
      </div>
    </PremiumScreen>
  );
};

const ProfileRow = ({ icon: Icon, label, onClick }) => {
  const IconComponent = Icon;
  return (
    <div onClick={onClick} className="flex items-center justify-between p-5 border-b border-[var(--ice)] last:border-0 active:bg-[var(--bg-color)] transition-colors cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-[18px] bg-[var(--bg-color)] flex items-center justify-center text-[var(--primary)] border border-[var(--ice)] shadow-inner"><IconComponent size={20} strokeWidth={2.5}/></div>
        <span className="text-[15px] font-bold text-[var(--text)]">{label}</span>
      </div>
      <ChevronRight size={20} className="text-gray-300" />
    </div>
  );
};

// --- PROFILE OVERLAYS ---
const PersonalInfoScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
    <Header title="Informations" onBack={onClose} />
    <div className="px-6 py-6 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full gradient-blue flex items-center justify-center text-[32px] font-black text-white shadow-lg border-4 border-white mb-4">
            YA
          </div>
          <button className="absolute bottom-4 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[var(--primary)] shadow-md border border-[var(--ice)] active:scale-95 transition-transform">
            <WrenchIcon size={14} strokeWidth={3} />
          </button>
        </div>
        <p className="text-[13px] font-bold text-[var(--text-muted)]">Mettez à jour vos informations de contact</p>
      </div>

      <PremiumCard className="!p-6 mb-8">
        <Input label="Nom complet" defaultValue="Yassine El Amrani" />
        <Input label="Adresse e-mail" type="email" defaultValue="yassine.elamrani@example.com" />
        <Input label="Numéro de téléphone" type="tel" defaultValue="06 22 10 64 56" />
        <Input label="Adresse postale" defaultValue="Quartier Anfa, Casablanca" />
      </PremiumCard>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
      <Button onClick={onClose} fullWidth className="!py-4.5 !text-[16px]">Enregistrer les modifications</Button>
    </div>
  </PremiumScreen>
);

const ProfileNotificationsScreen = ({ onClose }) => {
  const [toggles, setToggles] = useState({ t1: true, t2: true, t3: false, t4: true });
  return (
    <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
      <Header title="Notifications" onBack={onClose} />
      <div className="px-6 py-6 flex-1 overflow-y-auto hide-scrollbar pb-10 animate-slide-in-right">
        <p className="text-[15px] font-medium text-[var(--text-muted)] mb-8 px-1">Choisissez les alertes que vous souhaitez recevoir sur votre appareil.</p>
        
        <h3 className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 px-2">Alertes SAV</h3>
        <ToggleRow icon={WrenchIcon} title="Rappels d'entretien" desc="Notifications pour vos prochains entretiens." active={toggles.t1} onToggle={() => setToggles({...toggles, t1: !toggles.t1})} />
        <ToggleRow icon={Car} title="Suivi de réparation" desc="Mises à jour lors du passage en atelier." active={toggles.t2} onToggle={() => setToggles({...toggles, t2: !toggles.t2})} />
        
        <h3 className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 mt-8 px-2">Bons plans BYD</h3>
        <ToggleRow icon={Gift} title="Offres exclusives" desc="Promotions sur les entretiens et accessoires." active={toggles.t3} onToggle={() => setToggles({...toggles, t3: !toggles.t3})} />
        <ToggleRow icon={Star} title="Programme Fidélité" desc="Alertes sur vos points et avantages Gold." active={toggles.t4} onToggle={() => setToggles({...toggles, t4: !toggles.t4})} />
      </div>
    </PremiumScreen>
  );
};

const AppSettingsScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
    <Header title="Préférences de l'App" onBack={onClose} />
    <div className="px-6 py-6 flex-1 overflow-y-auto hide-scrollbar pb-10 animate-slide-in-right">
      <p className="text-[15px] font-medium text-[var(--text-muted)] mb-8 px-1">Personnalisez votre expérience sur l'application BYD SAV Maroc.</p>
      
      <div className="flex flex-col gap-2 mb-8">
        <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Langue de l'interface</label>
        <div className="relative">
          <Globe size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <select className="w-full bg-white border border-[var(--ice)] shadow-[0_2px_10px_rgba(0,40,94,0.02)] rounded-[24px] pl-12 pr-5 py-4.5 text-[15px] font-bold text-[var(--text)] focus:outline-none appearance-none">
            <option>Français</option>
            <option>العربية</option>
            <option>English</option>
          </select>
          <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Unité de distance</label>
        <div className="flex gap-2">
          <button className="flex-1 py-4 rounded-[20px] text-[14px] font-black transition-colors gradient-blue text-white shadow-md">Kilomètres (km)</button>
          <button className="flex-1 py-4 rounded-[20px] text-[14px] font-black transition-colors bg-white border border-[var(--ice)] text-[var(--text-muted)] shadow-sm">Miles (mi)</button>
        </div>
      </div>

      <PremiumCard className="!p-5 flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--bg-color)] rounded-[18px] flex items-center justify-center text-[var(--primary)] border border-[var(--ice)] shadow-inner">
            <Smartphone size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[15px] font-black text-[var(--text)] tracking-tight">Thème Sombre</div>
            <div className="text-[12px] font-medium text-[var(--text-muted)] mt-0.5">Adapté aux écrans OLED</div>
          </div>
        </div>
        <div className="w-12 h-7 rounded-full flex items-center p-1 bg-gray-200 transition-colors">
          <div className="w-5 h-5 bg-white rounded-full shadow-sm"></div>
        </div>
      </PremiumCard>
    </div>
  </PremiumScreen>
);

const PrivacyScreen = ({ onClose }) => {
  const [toggles, setToggles] = useState({ t1: true, t2: false });
  return (
    <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
      <Header title="Confidentialité" onBack={onClose} />
      <div className="px-6 py-6 flex-1 overflow-y-auto hide-scrollbar pb-10 animate-slide-in-right">
        
        <div className="gradient-blue rounded-[32px] p-6 text-white mb-8 shadow-lg relative overflow-hidden border border-white/20">
          <div className="absolute -right-4 -bottom-4 opacity-10 mix-blend-screen pointer-events-none"><Lock size={120} fill="white" /></div>
          <div className="relative z-10">
            <h3 className="text-[20px] font-black tracking-tight mb-2">Vos données, votre contrôle</h3>
            <p className="text-[13px] font-medium text-white/80 leading-relaxed">
              BYD s'engage à protéger vos informations personnelles. Gérez les autorisations d'accès à vos données.
            </p>
          </div>
        </div>

        <h3 className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 px-2">Partage des données</h3>
        <ToggleRow icon={MapPin} title="Position en arrière-plan" desc="Requis pour l'assistance d'urgence." active={toggles.t1} onToggle={() => setToggles({...toggles, t1: !toggles.t1})} />
        <ToggleRow icon={Cpu} title="Analyse & Amélioration" desc="Partage des données techniques anonymisées." active={toggles.t2} onToggle={() => setToggles({...toggles, t2: !toggles.t2})} />
        
        <h3 className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4 mt-8 px-2">Actions liées au compte</h3>
        <div className="flex flex-col gap-3">
          <button className="w-full bg-white border border-[var(--ice)] rounded-[24px] p-5 flex items-center justify-between shadow-sm active:scale-95 transition-all">
            <span className="text-[15px] font-bold text-[var(--text)]">Télécharger mes données</span>
            <Download size={20} className="text-[var(--text-muted)]"/>
          </button>
          <button className="w-full bg-red-50 border border-red-100 rounded-[24px] p-5 flex items-center justify-between shadow-sm active:scale-95 transition-all">
            <span className="text-[15px] font-bold text-[var(--danger)]">Supprimer mon compte</span>
            <AlertTriangle size={20} className="text-[var(--danger)]"/>
          </button>
        </div>
      </div>
    </PremiumScreen>
  );
};

const AddVehicleProfileScreen = ({ onClose, onAdd }) => {
  const [model, setModel] = useState('ATTO 3');
  const [vin, setVin] = useState('');
  const [km, setKm] = useState('');

  const handleSave = () => {
    onAdd({
      id: Date.now(), 
      name: `BYD ${model}`,
      vin: vin || "LC00000000000",
      km: parseInt(km) || 0,
      img: model === 'ATTO 3' ? ASSETS.atto3 : model === 'HAN' ? ASSETS.han : ASSETS.seal
    });
    onClose();
  };

  return (
    <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
      <Header title="Nouveau Véhicule" onBack={onClose} rightAction={<button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><X size={24} strokeWidth={2.5}/></button>} />
      <div className="px-8 py-4 flex-1 overflow-y-auto hide-scrollbar flex flex-col animate-slide-in-right pb-32">
        <p className="text-[var(--text-muted)] text-[15px] font-medium mb-8">Ajoutez une nouvelle BYD à votre garage pour personnaliser votre expérience SAV.</p>
        
        <div className="flex flex-col gap-2 mb-5">
          <label className="text-[13px] font-black text-[var(--text)] uppercase tracking-wider ml-2 opacity-80">Modèle BYD</label>
          <div className="relative">
            <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[20px] px-5 py-4 text-[15px] font-bold text-[var(--primary)] focus:outline-none appearance-none">
              <option value="ATTO 3">BYD ATTO 3</option>
              <option value="SEAL">BYD SEAL</option>
              <option value="HAN">BYD HAN</option>
            </select>
            <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
          </div>
        </div>
        
        <Input label="Immatriculation" placeholder="Ex: 12345 | A | 1" />
        <Input label="Numéro de châssis (VIN)" placeholder="LC00000000000000" value={vin} onChange={(e) => setVin(e.target.value)} />
        <Input label="Kilométrage actuel" type="number" placeholder="ex: 15000" value={km} onChange={(e) => setKm(e.target.value)} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
        <Button onClick={handleSave} fullWidth className="!py-4.5 !text-[16px]">Enregistrer le véhicule</Button>
      </div>
    </PremiumScreen>
  );
};

const SelectVehicleScreen = ({ onClose, vehicles, activeVehicleId, onSelect }) => (
  <PremiumScreen className="h-full z-[80] fixed inset-0 flex flex-col">
    <Header title="Changer de véhicule" onBack={onClose} rightAction={<button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><X size={24} strokeWidth={2.5}/></button>} />
    <div className="px-6 py-6 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
      <p className="text-[15px] font-medium text-[var(--text-muted)] mb-8 px-1">Sélectionnez le véhicule actif pour votre session.</p>
      <div className="flex flex-col gap-4">
        {vehicles.map(v => (
           <PremiumCard key={v.id} onClick={() => onSelect(v.id)} className={`!p-5 flex items-center justify-between cursor-pointer ${activeVehicleId === v.id ? 'border-2 !border-[var(--primary)] shadow-md' : 'shadow-sm hover:shadow-md'}`}>
              <div className="flex items-center gap-5">
                <div className="w-24 h-16 bg-[var(--bg-color)] rounded-xl flex items-center justify-center border border-[var(--ice)] p-2 relative overflow-hidden">
                   <img src={v.img} alt={v.name} className="w-[140%] max-w-none object-contain drop-shadow-md relative z-10" />
                   <div className="absolute bottom-1 w-3/4 h-2 bg-black/20 rounded-full blur-sm"></div>
                </div>
                <div>
                   <div className="text-[16px] font-black text-[var(--text)] tracking-tight">{v.name}</div>
                   <div className="text-[13px] font-medium text-[var(--text-muted)] mt-1 bg-[var(--ice)] text-[var(--primary)] px-2 py-0.5 rounded-md inline-block">{v.km.toLocaleString()} km</div>
                </div>
              </div>
              {activeVehicleId === v.id ? <CheckCircle2 size={24} className="text-[var(--primary)]" strokeWidth={2.5}/> : <ChevronRight size={20} className="text-gray-300"/>}
           </PremiumCard>
        ))}
      </div>
    </div>
  </PremiumScreen>
);

// --- GLOBAL OVERLAYS ---

const BookingFlow = ({ onClose }) => {
  const [step, setStep] = useState(1);
  
  const renderStep = () => {
    switch(step) {
      case 1: return (
        <div className="animate-slide-in-right flex-1 overflow-y-auto hide-scrollbar pb-36">
          <p className="text-[16px] font-medium text-[var(--text-muted)] mb-8 leading-relaxed px-1">Sélectionnez le type d'intervention nécessaire pour votre véhicule.</p>
          <div className="grid grid-cols-2 gap-4 flex-1">
            {[
              { t: 'Entretien périodique', i: Calendar },
              { t: 'Pneus & freinage', i: Disc },
              { t: 'Batterie Blade', i: Battery },
              { t: 'Électronique', i: Cpu },
              { t: 'Climatisation', i: Wind },
              { t: 'Carrosserie', i: Car },
              { t: 'Pièces d’origine', i: Package },
              { t: 'Autre demande', i: WrenchIcon }
            ].map((s, i) => {
              const IconComponent = s.i;
              return (
                <PremiumCard key={i} onClick={() => setStep(2)} className="!p-5 text-center flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md border border-[var(--ice)]">
                   <div className="w-16 h-16 bg-[var(--bg-color)] rounded-[20px] flex items-center justify-center text-[var(--primary)] border border-white shadow-inner">
                     <IconComponent size={28} strokeWidth={2} />
                   </div>
                   <span className="text-[13px] font-black text-[var(--text)] leading-tight">{s.t}</span>
                </PremiumCard>
              );
            })}
          </div>
        </div>
      );
      case 2: return (
        <div className="animate-slide-in-right flex-1 overflow-y-auto hide-scrollbar pb-36 flex flex-col">
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-8 leading-relaxed px-1">Pour quel véhicule souhaitez-vous prendre ce rendez-vous ?</p>
           
           <div className="flex flex-col gap-5">
             <PremiumCard className="border-2 !border-[var(--primary)] shadow-[0_12px_24px_-8px_rgba(0,40,94,0.15)] relative !p-0 overflow-visible cursor-pointer" onClick={() => setStep(3)}>
               <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-blue flex items-center justify-center text-white z-20 shadow-md border-2 border-white"><Check size={18} strokeWidth={3}/></div>
               <div className="p-6 relative z-10 flex justify-between items-center h-32">
                 <div className="z-20">
                   <div className="text-[20px] font-black text-[var(--text)] tracking-tight">BYD ATTO 3</div>
                   <div className="text-[11px] font-bold text-[var(--text-muted)] mt-1 tracking-widest uppercase">VIN: LC0000000000</div>
                   <div className="text-[12px] font-black text-[var(--accent)] bg-[var(--ice)] px-3 py-1.5 rounded-lg inline-block mt-3 border border-blue-100">24 500 km</div>
                 </div>
                 <div className="w-36 h-full relative flex items-center justify-center">
                   <div className="absolute bottom-2 w-full h-4 bg-[var(--cyan)]/20 rounded-full blur-xl"></div>
                   <img src={ASSETS.atto3} alt="ATTO 3" className="w-[150%] max-w-none object-contain drop-shadow-xl z-10 translate-x-4 scale-110" />
                 </div>
               </div>
             </PremiumCard>

             <PremiumCard className="border border-[var(--ice)] bg-white opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all relative !p-0 overflow-visible cursor-pointer">
               <div className="p-6 relative z-10 flex justify-between items-center h-32">
                 <div className="z-20">
                   <div className="text-[18px] font-black text-[var(--text)] tracking-tight">BYD HAN</div>
                   <div className="text-[11px] font-bold text-[var(--text-muted)] mt-1 tracking-widest uppercase">VIN: LC9999999999</div>
                 </div>
                 <div className="w-36 h-full relative flex items-center justify-center">
                   <img src={ASSETS.han} alt="HAN" className="w-[140%] max-w-none object-contain drop-shadow-md z-10 translate-x-2" />
                 </div>
               </div>
             </PremiumCard>
           </div>

           <div className="mt-auto pt-8">
             <Button variant="secondary" fullWidth icon={Plus} onClick={() => setStep(3)}>Ajouter un autre véhicule</Button>
           </div>
        </div>
      );
      case 3: return (
        <div className="animate-slide-in-right flex flex-col flex-1 overflow-y-auto hide-scrollbar pb-36">
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1">Trouvez le centre SAV BYD certifié le plus proche.</p>
           <div className="relative mb-6">
             <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
             <input type="text" placeholder="Rechercher une ville..." className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[24px] pl-14 pr-5 py-4 text-[15px] font-bold focus:outline-none focus:border-[var(--cyan)] focus:ring-4 focus:ring-[var(--cyan)]/10" defaultValue="Casablanca" />
           </div>
           
           <div className="w-full h-44 bg-[var(--ice)] rounded-[32px] mb-6 relative overflow-hidden border-4 border-white shadow-sm shrink-0">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30 mix-blend-multiply"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-14 h-14 gradient-blue rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white z-10 animate-bounce"><WrenchIcon size={24} strokeWidth={2.5}/></div>
                <div className="bg-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg mt-2 border border-[var(--ice)]">BYD Casa Ain Sebaâ</div>
             </div>
             <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)]"><MapPin size={18}/></div>
           </div>

           <div className="flex flex-col gap-4">
              {[
                { n: "BYD Casa - Ain Sebaâ", d: "2.1 km", r: "4.8", a: "Aujourd'hui" },
                { n: "BYD Casa - Sidi Maârouf", d: "6.5 km", r: "4.5", a: "Demain" }
              ].map((c, i) => (
                <PremiumCard key={i} className="flex flex-col gap-4 !p-5 shrink-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[18px] font-black text-[var(--text)] tracking-tight">{c.n}</div>
                      <div className="text-[13px] font-bold text-[var(--text-muted)] flex items-center gap-2 mt-2">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {c.d}</span> 
                        <span className="text-gray-300">•</span> 
                        <span className="flex items-center gap-1"><Star size={14} className="text-[var(--warning)] fill-[var(--warning)]"/> {c.r}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-[#F0FDF4] text-[var(--success)] px-3 py-1.5 rounded-lg uppercase tracking-wider border border-green-100 shadow-sm">{c.a}</span>
                  </div>
                  <Button variant="outline" onClick={() => setStep(4)} className="!py-3.5 !text-[14px]">Choisir ce centre SAV</Button>
                </PremiumCard>
              ))}
           </div>
        </div>
      );
      case 4: return (
        <div className="animate-slide-in-right flex-1 overflow-y-auto hide-scrollbar pb-36">
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1">Choisissez la date et l'heure de votre rendez-vous.</p>
           
           <div className="bg-white rounded-[32px] border border-[var(--ice)] shadow-sm p-6 mb-8">
             <div className="flex items-center justify-between mb-6">
               <span className="text-[18px] font-black text-[var(--text)] tracking-tight">Mai 2024</span>
               <div className="flex gap-2">
                 <div className="w-8 h-8 rounded-full bg-[var(--bg-color)] flex items-center justify-center text-gray-400 cursor-not-allowed"><ChevronLeft size={18}/></div>
                 <div className="w-8 h-8 rounded-full bg-[var(--ice)] flex items-center justify-center text-[var(--primary)] cursor-pointer hover:bg-blue-100 transition-colors shadow-sm"><ChevronRight size={18}/></div>
               </div>
             </div>

             <div className="grid grid-cols-7 gap-y-4 gap-x-2">
               {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                 <div key={i} className="text-center text-[11px] font-black text-[var(--text-muted)] opacity-70">{d}</div>
               ))}
               
               <div className="col-span-2"></div>
               
               {Array.from({length: 31}).map((_, i) => {
                 const day = i + 1;
                 const isPast = day < 12;
                 const isWeekend = (day + 1) % 7 === 0 || (day + 2) % 7 === 0; // Samedi & Dimanche
                 const isSelected = day === 13;
                 const isDisabled = isPast || isWeekend;
                 const isLimited = day === 16 || day === 23 || day === 28;
                 
                 return (
                   <div key={day} className="flex justify-center relative group">
                     <div className={`w-9 h-9 flex items-center justify-center rounded-full text-[14px] font-bold transition-all ${
                       isSelected ? 'gradient-blue text-white shadow-md scale-110' :
                       isDisabled ? 'text-gray-300 pointer-events-none' :
                       'text-[var(--text)] hover:bg-[var(--ice)] cursor-pointer'
                     }`}>
                       {day}
                     </div>
                     {!isDisabled && !isSelected && (
                       <div className={`absolute -bottom-1.5 w-1.5 h-1.5 rounded-full ${isLimited ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'} transition-transform group-hover:scale-125`}></div>
                     )}
                   </div>
                 );
               })}
             </div>
             
             <div className="flex items-center justify-center gap-5 mt-6 border-t border-[var(--ice)] pt-4">
               <div className="flex items-center gap-1.5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)]"></div> Dispo
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]"></div> Limité
               </div>
             </div>
           </div>
           
           <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1">Créneaux du matin</h4>
           <div className="grid grid-cols-3 gap-3 mb-6">
             {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'].map((t, i) => (
               <div key={i} onClick={() => setStep(5)} className={`py-4 rounded-[20px] text-center text-[15px] font-black transition-all cursor-pointer shadow-sm ${i===3 ? 'bg-[var(--ice)] text-[var(--primary)] border-2 border-[var(--primary)]' : i===1||i===5 ? 'bg-gray-50 border border-gray-100 text-gray-400 opacity-50 cursor-not-allowed' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:border-blue-200'}`}>
                 {t}
               </div>
             ))}
           </div>
           <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1">Créneaux de l'après-midi</h4>
           <div className="grid grid-cols-3 gap-3">
             {['14:00', '14:30', '15:00', '16:00', '16:30'].map((t, i) => (
               <div key={`pm-${i}`} onClick={() => setStep(5)} className="py-4 rounded-[20px] text-center text-[15px] font-black transition-all cursor-pointer shadow-sm bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:border-blue-200">
                 {t}
               </div>
             ))}
           </div>
        </div>
      );
      case 5: return (
        <div className="animate-slide-in-right flex-1 overflow-y-auto hide-scrollbar pb-36 flex flex-col">
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-8 px-1">Personnalisez votre visite avec des options complémentaires exclusives.</p>
           <div className="flex flex-col gap-4 flex-1">
             {[
               { t: 'Diagnostic Batterie Blade', p: 'Offert', d: 'Contrôle certifié de l\'état de santé (SOH).' },
               { t: 'Nettoyage premium', p: '+ 150 DH', d: 'Lavage intégral à la main intérieur/extérieur.' },
               { t: 'Traitement clim.', p: '+ 200 DH', d: 'Purification antibactérienne du circuit.' },
               { t: 'Véhicule de courtoisie', p: '+ 300 DH', d: 'Mobilité garantie pendant l\'intervention.' }
             ].map((o, i) => (
               <label key={i} className={`flex items-start gap-4 p-5 rounded-[28px] border-2 shadow-sm cursor-pointer transition-colors ${i===0 ? 'bg-[var(--ice)] border-[var(--primary)]' : 'bg-white border-[var(--ice)] hover:border-blue-100'}`}>
                 <div className={`w-6 h-6 mt-1 rounded-[8px] flex items-center justify-center border-2 shrink-0 ${i===0 ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-gray-300 bg-white'}`}>
                   {i===0 && <Check size={16} className="text-white" strokeWidth={3}/>}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between items-center mb-1">
                     <span className="text-[16px] font-black text-[var(--text)] tracking-tight">{o.t}</span>
                     <span className={`text-[13px] font-black ${i===0 ? 'text-[var(--success)]' : 'text-[var(--primary)]'}`}>{o.p}</span>
                   </div>
                   <p className="text-[13px] font-medium text-[var(--text-muted)] leading-tight">{o.d}</p>
                 </div>
               </label>
             ))}
           </div>
           <div className="mt-auto pt-8">
             <Button onClick={() => setStep(6)} fullWidth>Continuer vers le résumé</Button>
           </div>
        </div>
      );
      case 6: return (
        <div className="animate-slide-in-right flex flex-col flex-1 overflow-y-auto hide-scrollbar pb-36">
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1">Vérifiez les détails avant de confirmer votre rendez-vous.</p>
           
           <PremiumCard className="flex-1 mb-8 !p-0 overflow-hidden flex flex-col shadow-lg border-[var(--ice)] shrink-0">
             <div className="p-6 bg-gradient-to-b from-[var(--ice)] to-white border-b border-[var(--ice)] relative">
               <div className="absolute right-4 top-4 opacity-10 text-[var(--primary)]"><FileText size={80}/></div>
               <div className="text-[11px] font-black text-[var(--primary)] uppercase tracking-widest mb-2 relative z-10">Facture proforma</div>
               <div className="text-[24px] font-black text-[var(--text)] tracking-tight relative z-10">Entretien périodique</div>
             </div>
             
             <div className="p-6 flex flex-col gap-6 flex-1">
               <SummaryRow icon={Car} label="Véhicule" value="BYD ATTO 3" />
               <SummaryRow icon={MapPin} label="Centre SAV" value="BYD Casablanca - Ain Sebaâ" />
               <SummaryRow icon={Calendar} label="Date & Heure" value="Mardi 13 Mai, 10:00" />
               <SummaryRow icon={Package} label="Options" value="Diag. Batterie Blade (Offert)" />
             </div>
             
             <div className="p-8 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-t border-[#bbf7d0] mt-auto flex items-end justify-between">
                <div>
                  <div className="text-[11px] font-black text-[var(--success)] uppercase tracking-widest mb-1">Estimation TTC</div>
                  <div className="text-[14px] font-bold text-green-700">Durée est. 1h30</div>
                </div>
                <div className="text-[32px] font-black text-[var(--text)] leading-none tracking-tight">1 250<span className="text-[16px] ml-1">DH</span></div>
             </div>
           </PremiumCard>
           
           <div className="mt-auto text-center shrink-0">
             <p className="text-[12px] text-[var(--text-muted)] mb-5 px-6 font-medium leading-relaxed">Ce coût est une estimation. Le prix final sera confirmé en atelier. Paiement sur place.</p>
             <Button onClick={() => setStep(7)} fullWidth className="!py-4.5 !text-[16px]">Confirmer définitivement</Button>
           </div>
        </div>
      );
      case 7: return (
        <div className="animate-slide-up flex flex-col items-center justify-center text-center flex-1 pb-36">
           <div className="relative mb-8">
             <div className="absolute inset-0 bg-[var(--success)] rounded-full blur-[40px] opacity-40 animate-pulse"></div>
             <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#16A34A] to-[#15803d] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(22,163,74,0.5)] relative z-10 border-4 border-white">
               <Check size={64} className="text-white" strokeWidth={3} />
             </div>
           </div>
           <h2 className="text-[36px] font-black text-[var(--text)] mb-4 tracking-tight leading-none">C'est confirmé !</h2>
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-8 max-w-[85%] leading-relaxed">Votre rendez-vous a bien été enregistré. Un e-mail récapitulatif vous a été envoyé.</p>
           
           <PremiumCard className="w-full !p-6 mb-10 flex flex-col gap-2 items-center bg-[var(--bg-color)] border-[var(--ice)] shadow-sm">
             <span className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest">Numéro de suivi</span>
             <span className="text-[24px] font-black text-[var(--primary)] tracking-tight">#BYD-8492</span>
           </PremiumCard>
           
           <div className="w-full flex flex-col gap-4">
             <Button variant="secondary" icon={Calendar} className="!py-4.5">Ajouter au calendrier</Button>
             <Button onClick={onClose} variant="outline" className="border-none bg-[var(--ice)] hover:bg-blue-100">Retour à l'accueil</Button>
           </div>
        </div>
      );
    }
  };

  const SummaryRow = ({ icon: Icon, label, value }) => {
    const IconComponent = Icon;
    return (
      <div className="flex gap-5 items-center">
        <div className="w-14 h-14 rounded-[20px] bg-[var(--bg-color)] border border-[var(--ice)] shadow-inner flex items-center justify-center shrink-0">
          <IconComponent size={24} className="text-[var(--primary)]" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">{label}</div>
          <div className="text-[16px] font-black text-[var(--text)] tracking-tight leading-none">{value}</div>
        </div>
      </div>
    );
  };

  return (
    <PremiumScreen className="bg-[var(--bg-color)] h-full z-50 fixed inset-0 flex flex-col">
      <Header 
        title={step === 7 ? "" : step === 3 ? "Choisir un centre" : step === 4 ? "Date & Créneau" : "Prendre rendez-vous"} 
        onBack={step > 1 && step < 7 ? () => setStep(step - 1) : onClose} 
        rightAction={<button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><X size={24} strokeWidth={2.5}/></button>}
        transparent={step===7}
      />
      {step < 7 && (
        <div className="px-8 pt-2 pb-6 shrink-0">
          <div className="flex gap-2 h-1.5">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className={`flex-1 rounded-full transition-colors ${i < step ? 'gradient-blue shadow-[0_0_8px_rgba(0,40,94,0.4)]' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
      )}
      <div className="px-8 flex-1 flex flex-col relative overflow-hidden">
        {renderStep()}
      </div>
    </PremiumScreen>
  );
};

const SimulatorScreen = ({ onClose, onBook }) => {
  const [step, setStep] = useState('simulator');
  const [km, setKm] = useState(30000);
  const [duration, setDuration] = useState(2);
  const [annualKm, setAnnualKm] = useState(15000);
  const [selectedCar, setSelectedCar] = useState('HAN');
  const [selectedPackage, setSelectedPackage] = useState('essentiel');

  const packages = {
    essentiel: {
      title: "Forfait Essentiel",
      basePrice: 1800,
      tag: "Entretien annuel",
      desc: "Couverture complète des entretiens périodiques préconisés par BYD, pour garantir la longévité de votre véhicule.",
      features: [
        { t: "Révisions annuelles incluses", i: Calendar },
        { t: "Diagnostic Batterie Blade certifié", i: Battery },
        { t: "Remplacement filtres habitacle/air", i: Wind }
      ]
    },
    confort: {
      title: "Forfait Confort",
      basePrice: 3200,
      tag: "Pièces d'usure",
      desc: "La tranquillité d'esprit avec le remplacement des pièces d'usure courantes en plus de l'entretien annuel.",
      features: [
        { t: "Forfait Essentiel inclus", i: CheckCircle2 },
        { t: "Remplacement plaquettes de frein", i: Disc },
        { t: "Remplacement balais d'essuie-glace", i: Wind }
      ]
    },
    premium: {
      title: "Forfait Premium",
      basePrice: 4900,
      tag: "Sérénité totale",
      desc: "Notre couverture maximale incluant l'assistance VIP prioritaire et un véhicule de courtoisie systématique.",
      features: [
        { t: "Forfait Confort inclus", i: CheckCircle2 },
        { t: "Véhicule de remplacement garanti", i: Car },
        { t: "Nettoyage intégral premium", i: Star }
      ]
    }
  };

  const carImages = {
    'ATTO 3': ASSETS.atto3,
    'HAN': ASSETS.han,
    'SEAL': ASSETS.seal
  };

  const currentPkg = packages[selectedPackage];
  const estimatedPrice = Math.round(currentPkg.basePrice * duration * (annualKm / 15000));

  const SummaryRow = ({ icon: IconComponent, label, value }) => (
    <div className="flex gap-5 items-center mb-5 last:mb-0">
      <div className="w-12 h-12 rounded-[16px] bg-[var(--bg-color)] border border-[var(--ice)] shadow-inner flex items-center justify-center shrink-0">
        <IconComponent size={20} className="text-[var(--primary)]" strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">{label}</div>
        <div className="text-[15px] font-black text-[var(--text)] tracking-tight leading-none">{value}</div>
      </div>
    </div>
  );

  let headerTitle = "Simulateur Forfaits SAV";
  if (step === 'summary') headerTitle = "Récapitulatif Forfait";
  if (step === 'center') headerTitle = "Choisir un centre";
  if (step === 'slot') headerTitle = "Date & Créneau";
  if (step === 'confirmation') headerTitle = "";

  const handleBack = () => {
    if (step === 'summary') setStep('simulator');
    else if (step === 'center') setStep('summary');
    else if (step === 'slot') setStep('center');
    else onClose();
  };

  const stepNumber = step === 'summary' ? 1 : step === 'center' ? 2 : step === 'slot' ? 3 : step === 'confirmation' ? 4 : 0;

  const renderStep = () => {
    switch(step) {
      case 'simulator': return (
        <>
          <div className="px-6 pt-6 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
             <div className="relative h-56 rounded-[36px] overflow-hidden gradient-blue mb-8 shadow-[0_20px_40px_-10px_rgba(0,40,94,0.3)] flex flex-col items-center justify-end p-6 border border-white/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--cyan)_0%,transparent_60%)] opacity-30"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
                
                <div className="absolute top-4 w-full flex justify-center gap-2 px-6 z-20">
                  {['ATTO 3', 'HAN', 'SEAL'].map(car => (
                    <button key={car} onClick={() => setSelectedCar(car)} className={`text-[11px] font-black px-4 py-1.5 rounded-full transition-all ${selectedCar === car ? 'bg-white text-[var(--primary)] shadow-sm scale-105' : 'bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30'}`}>
                      {car}
                    </button>
                  ))}
                </div>

                <img src={carImages[selectedCar]} className="absolute top-8 w-[140%] max-w-none object-contain drop-shadow-[0_30px_30px_rgba(0,10,30,0.8)] transition-opacity duration-300" alt={selectedCar} />
             </div>

             <PremiumCard className="mb-6 shadow-md">
               <div className="flex justify-between items-end mb-8">
                 <span className="text-[16px] font-black text-[var(--text)] tracking-tight">Kilométrage actuel</span>
                 <span className="text-[32px] font-black text-[var(--primary)] leading-none">{km.toLocaleString()} <span className="text-[16px] font-bold">km</span></span>
               </div>
               <div className="relative py-2">
                 <input 
                   type="range" min="0" max="150000" step="5000" value={km} 
                   onChange={(e) => setKm(parseInt(e.target.value))}
                   className="w-full h-4 bg-[var(--ice)] rounded-full appearance-none cursor-pointer accent-[var(--primary)] shadow-inner relative z-10"
                 />
               </div>
               <div className="flex justify-between mt-4 text-[12px] font-black text-[var(--text-muted)] px-1">
                 <span>0 km</span><span>150 000 km</span>
               </div>
             </PremiumCard>

             <h3 className="text-[18px] font-black text-[var(--text)] mb-4 tracking-tight px-1">Paramètres du contrat</h3>
             <div className="flex flex-col gap-4 mb-8">
                <div>
                  <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest">Durée</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(d => (
                      <button key={d} onClick={() => setDuration(d)} className={`flex-1 py-3 rounded-[20px] text-[13px] font-black transition-all shadow-sm ${duration === d ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:bg-[var(--ice)]'}`}>
                        {d} an{d > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center px-1 mb-2">
                    <span className="text-[13px] font-black text-[var(--text-muted)] uppercase tracking-widest">Kilométrage estimé</span>
                  </div>
                  <div className="flex gap-2">
                    {[10000, 15000, 20000, 30000].map(k => (
                      <button key={k} onClick={() => setAnnualKm(k)} className={`flex-1 py-3 rounded-[20px] text-[12px] font-black transition-all shadow-sm ${annualKm === k ? 'bg-[var(--primary)] text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:bg-[var(--ice)]'}`}>
                        {k/1000}k <span className="text-[10px] font-bold">/an</span>
                      </button>
                    ))}
                  </div>
                </div>
             </div>

             <div className="flex justify-between items-end mb-4 px-2">
                <h3 className="text-[20px] font-black text-[var(--text)] tracking-tight">Forfaits applicables</h3>
             </div>

             <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-[24px] border border-[var(--ice)] shadow-sm">
               {Object.keys(packages).map((pkgKey) => (
                 <button 
                   key={pkgKey} 
                   onClick={() => setSelectedPackage(pkgKey)}
                   className={`flex-1 py-3 rounded-[18px] text-[13px] font-black capitalize transition-all ${selectedPackage === pkgKey ? 'bg-[var(--primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:bg-[var(--ice)]'}`}
                 >
                   {pkgKey}
                 </button>
               ))}
             </div>
             
             <div className="gradient-blue rounded-[36px] p-8 text-white shadow-[0_24px_48px_-12px_rgba(0,40,94,0.4)] relative overflow-hidden border border-white/20 transition-all duration-300">
                <div className="absolute -right-10 -top-10 w-48 h-48 bg-[var(--cyan)] rounded-full blur-[60px] opacity-40 mix-blend-screen pointer-events-none"></div>
                
                {selectedPackage === 'essentiel' && (
                  <div className="absolute top-6 right-6 bg-[var(--warning)] text-white text-[11px] font-black px-3.5 py-1.5 rounded-[12px] uppercase tracking-wider shadow-sm border border-yellow-300/50">
                    Populaire
                  </div>
                )}
                
                <h4 className="text-[28px] font-black mb-2 tracking-tight">{currentPkg.title}</h4>
                <p className="text-[14px] font-medium text-white/80 mb-8 leading-relaxed max-w-[85%]">
                  {currentPkg.desc}
                </p>
                
                <div className="flex flex-col gap-4 mb-8">
                  {currentPkg.features.map((f, i) => {
                    const IconComponent = f.i;
                    return (
                      <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-[20px] border border-white/10">
                        <IconComponent size={20} className="text-[var(--cyan)] shrink-0" strokeWidth={2.5}/> 
                        <span className="text-[14px] font-bold">{f.t}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="glass-panel-dark rounded-[28px] p-6 flex items-end justify-between border-white/20 shadow-inner">
                  <div>
                    <div className="text-[11px] text-white/70 font-black uppercase tracking-widest mb-1">Estimation du contrat</div>
                    <div className="text-[36px] font-black leading-none tracking-tight">{estimatedPrice.toLocaleString()}<span className="text-[16px] font-bold text-white/80 ml-1">DH</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-white/70 font-black uppercase tracking-widest mb-2">Couverture</div>
                    <div className="text-[16px] font-black bg-white/20 px-3 py-1.5 rounded-lg border border-white/30">{duration} an{duration>1?'s':''}</div>
                  </div>
                </div>
             </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
             <Button onClick={() => setStep('summary')} fullWidth className="!py-4.5 !text-[16px]">Planifier ce forfait</Button>
          </div>
        </>
      );
      
      case 'summary': return (
        <>
          <div className="px-8 pt-4 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
            <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1 mt-2">Vérifiez les détails de votre forfait avant de poursuivre.</p>
            <PremiumCard className="mb-8 !p-0 overflow-hidden flex flex-col shadow-lg border-[var(--ice)] shrink-0">
              <div className="p-6 bg-gradient-to-b from-[var(--ice)] to-white border-b border-[var(--ice)] relative">
                <div className="text-[11px] font-black text-[var(--primary)] uppercase tracking-widest mb-2 relative z-10">Forfait choisi</div>
                <div className="text-[24px] font-black text-[var(--text)] tracking-tight relative z-10">{currentPkg.title}</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <SummaryRow icon={Car} label="Véhicule concerné" value={`BYD ${selectedCar}`} />
                <SummaryRow icon={MapPin} label="Kilométrage actuel" value={`${km.toLocaleString()} km`} />
                <SummaryRow icon={Calendar} label="Durée estimée" value={`${duration} an${duration > 1 ? 's' : ''}`} />
                <SummaryRow icon={WrenchIcon} label="Centre SAV recommandé" value="BYD Casablanca - Ain Sebaâ" />
                <div className="mt-5 border-t border-[var(--ice)] pt-5">
                  <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">Services inclus</div>
                  <div className="flex flex-col gap-3">
                    {currentPkg.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-[13px] font-bold text-[var(--text)]">
                        <CheckCircle2 size={16} className="text-[var(--success)] shrink-0 mt-0.5" />
                        <span className="leading-tight">{f.t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] border-t border-[#bbf7d0] mt-auto flex items-end justify-between">
                 <div>
                   <div className="text-[11px] font-black text-[var(--success)] uppercase tracking-widest mb-1">Prix estimatif</div>
                   <div className="text-[12px] font-bold text-green-700">TTC</div>
                 </div>
                 <div className="text-[28px] font-black text-[var(--text)] leading-none tracking-tight">{estimatedPrice.toLocaleString()}<span className="text-[14px] ml-1">DH</span></div>
              </div>
            </PremiumCard>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
            <Button onClick={() => setStep('center')} fullWidth className="!py-4.5 !text-[16px]">Choisir un centre SAV</Button>
          </div>
        </>
      );

      case 'center': return (
        <>
          <div className="px-8 pt-4 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
             <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1 mt-2">Trouvez le centre SAV BYD certifié le plus proche.</p>
             <div className="relative mb-6 shrink-0">
               <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
               <input type="text" placeholder="Rechercher une ville..." className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[24px] pl-14 pr-5 py-4 text-[15px] font-bold focus:outline-none focus:border-[var(--cyan)] focus:ring-4 focus:ring-[var(--cyan)]/10" defaultValue="Casablanca" />
             </div>
             
             <div className="w-full h-44 bg-[var(--ice)] rounded-[32px] mb-6 relative overflow-hidden border-4 border-white shadow-sm shrink-0">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30 mix-blend-multiply"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-14 h-14 gradient-blue rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white z-10 animate-bounce"><WrenchIcon size={24} strokeWidth={2.5}/></div>
                  <div className="bg-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg mt-2 border border-[var(--ice)]">BYD Casa Ain Sebaâ</div>
               </div>
               <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-[var(--primary)]"><MapPin size={18}/></div>
             </div>

             <div className="flex flex-col gap-4 pb-4">
                {[
                  { n: "BYD Casa - Ain Sebaâ", d: "2.1 km", r: "4.8", a: "Aujourd'hui" },
                  { n: "BYD Casa - Sidi Maârouf", d: "6.5 km", r: "4.5", a: "Demain" }
                ].map((c, i) => (
                  <PremiumCard key={i} className="flex flex-col gap-4 !p-5 shrink-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[18px] font-black text-[var(--text)] tracking-tight">{c.n}</div>
                        <div className="text-[13px] font-bold text-[var(--text-muted)] flex items-center gap-2 mt-2">
                          <span className="flex items-center gap-1"><MapPin size={14}/> {c.d}</span> 
                          <span className="text-gray-300">•</span> 
                          <span className="flex items-center gap-1"><Star size={14} className="text-[var(--warning)] fill-[var(--warning)]"/> {c.r}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-black bg-[#F0FDF4] text-[var(--success)] px-3 py-1.5 rounded-lg uppercase tracking-wider border border-green-100 shadow-sm">{c.a}</span>
                    </div>
                  </PremiumCard>
                ))}
             </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
            <Button onClick={() => setStep('slot')} fullWidth className="!py-4.5 !text-[16px]">Confirmer le centre</Button>
          </div>
        </>
      );

      case 'slot': return (
        <>
          <div className="px-8 pt-4 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
             <p className="text-[16px] font-medium text-[var(--text-muted)] mb-6 px-1 mt-2 shrink-0">Choisissez la date et l'heure de votre rendez-vous.</p>
             
             <div className="bg-white rounded-[32px] border border-[var(--ice)] shadow-sm p-6 mb-8 shrink-0">
               <div className="flex items-center justify-between mb-6">
                 <span className="text-[18px] font-black text-[var(--text)] tracking-tight">Mai 2024</span>
                 <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-full bg-[var(--bg-color)] flex items-center justify-center text-gray-400 cursor-not-allowed"><ChevronLeft size={18}/></div>
                   <div className="w-8 h-8 rounded-full bg-[var(--ice)] flex items-center justify-center text-[var(--primary)] cursor-pointer hover:bg-blue-100 transition-colors shadow-sm"><ChevronRight size={18}/></div>
                 </div>
               </div>

               <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                 {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                   <div key={i} className="text-center text-[11px] font-black text-[var(--text-muted)] opacity-70">{d}</div>
                 ))}
                 
                 <div className="col-span-2"></div>
                 
                 {Array.from({length: 31}).map((_, i) => {
                   const day = i + 1;
                   const isPast = day < 12;
                   const isWeekend = (day + 1) % 7 === 0 || (day + 2) % 7 === 0;
                   const isSelected = day === 13;
                   const isDisabled = isPast || isWeekend;
                   const isLimited = day === 16 || day === 23 || day === 28;
                   
                   return (
                     <div key={day} className="flex justify-center relative group">
                       <div className={`w-9 h-9 flex items-center justify-center rounded-full text-[14px] font-bold transition-all ${
                         isSelected ? 'gradient-blue text-white shadow-md scale-110' :
                         isDisabled ? 'text-gray-300 pointer-events-none' :
                         'text-[var(--text)] hover:bg-[var(--ice)] cursor-pointer'
                       }`}>
                         {day}
                       </div>
                       {!isDisabled && !isSelected && (
                         <div className={`absolute -bottom-1.5 w-1.5 h-1.5 rounded-full ${isLimited ? 'bg-[var(--warning)]' : 'bg-[var(--success)]'} transition-transform group-hover:scale-125`}></div>
                       )}
                     </div>
                   );
                 })}
               </div>
               
               <div className="flex items-center justify-center gap-5 mt-6 border-t border-[var(--ice)] pt-4">
                 <div className="flex items-center gap-1.5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--success)]"></div> Dispo
                 </div>
                 <div className="flex items-center gap-1.5 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--warning)]"></div> Limité
                 </div>
               </div>
             </div>
             
             <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1 shrink-0">Créneaux du matin</h4>
             <div className="grid grid-cols-3 gap-3 mb-6 shrink-0">
               {['08:30', '09:00', '09:30', '10:00', '10:30', '11:00'].map((t, i) => (
                 <div key={i} className={`py-4 rounded-[20px] text-center text-[15px] font-black transition-all cursor-pointer shadow-sm ${i===3 ? 'bg-[var(--ice)] text-[var(--primary)] border-2 border-[var(--primary)]' : i===1||i===5 ? 'bg-gray-50 border border-gray-100 text-gray-400 opacity-50 cursor-not-allowed' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:border-blue-200'}`}>
                   {t}
                 </div>
               ))}
             </div>
             <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1 shrink-0">Créneaux de l'après-midi</h4>
             <div className="grid grid-cols-3 gap-3 shrink-0">
               {['14:00', '14:30', '15:00', '16:00', '16:30'].map((t, i) => (
                 <div key={`pm-${i}`} className="py-4 rounded-[20px] text-center text-[15px] font-black transition-all cursor-pointer shadow-sm bg-white border border-[var(--ice)] text-[var(--text-muted)] hover:border-blue-200">
                   {t}
                 </div>
               ))}
             </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20">
            <Button onClick={() => setStep('confirmation')} fullWidth className="!py-4.5 !text-[16px]">Valider le créneau</Button>
          </div>
        </>
      );

      case 'confirmation': return (
        <div className="px-8 pt-10 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-up flex flex-col items-center text-center">
           <div className="relative mb-8 mt-10">
             <div className="absolute inset-0 bg-[var(--success)] rounded-full blur-[40px] opacity-40 animate-pulse"></div>
             <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#16A34A] to-[#15803d] flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(22,163,74,0.5)] relative z-10 border-4 border-white">
               <Check size={64} className="text-white" strokeWidth={3} />
             </div>
           </div>
           <h2 className="text-[32px] font-black text-[var(--text)] mb-4 tracking-tight leading-tight">Demande envoyée !</h2>
           <p className="text-[16px] font-medium text-[var(--text-muted)] mb-10 max-w-[90%] leading-relaxed">
             Votre demande de planification du forfait <span className="font-bold text-[var(--text)]">{currentPkg.title}</span> a bien été envoyée. Un conseiller BYD SAV confirmera votre rendez-vous.
           </p>
           <div className="w-full flex flex-col gap-4 mt-4">
             <Button onClick={onClose} fullWidth className="!py-4.5 !text-[16px]">Retour à l'accueil</Button>
           </div>
        </div>
      );
    }
  };

  return (
    <PremiumScreen className="bg-[var(--bg-color)] h-full z-50 fixed inset-0 flex flex-col">
      <Header 
        title={headerTitle} 
        onBack={handleBack} 
        rightAction={step !== 'simulator' && step !== 'confirmation' ? <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><X size={24} strokeWidth={2.5}/></button> : null}
        transparent={step === 'confirmation'}
      />
      {stepNumber > 0 && stepNumber < 4 && (
        <div className="px-8 pt-2 pb-4 shrink-0">
          <div className="flex gap-2 h-1.5">
            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className={`flex-1 rounded-full transition-colors ${i < stepNumber ? 'gradient-blue shadow-[0_0_8px_rgba(0,40,94,0.4)]' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {renderStep()}
      </div>
    </PremiumScreen>
  );
};

const EmergencyScreen = ({ onClose, onOpen }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0">
    <Header title="" onBack={onClose} transparent rightAction={<button onClick={onClose} className="w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 active:scale-95"><X size={28} strokeWidth={2.5}/></button>}/>
    <div className="flex-1 overflow-y-auto hide-scrollbar absolute inset-0 z-0">
      
      {/* Premium Hero Red Background */}
      <div className="bg-gradient-to-br from-[#991B1B] via-[#DC2626] to-[#7F1D1D] text-white pt-32 pb-20 px-8 relative overflow-hidden">
        <div className="absolute right-[-20%] top-[-10%] w-[140%] h-[120%] bg-[#EF4444] rounded-full blur-[100px] opacity-60 mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 pointer-events-none"></div>
        
        <div className="relative z-10 animate-slide-up flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-[32px] flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(255,255,255,0.3)] relative">
            <div className="absolute inset-0 bg-white/30 rounded-[30px] animate-ping"></div>
            <Phone size={48} className="text-white relative z-10" strokeWidth={2.5} />
          </div>
          <h2 className="text-[40px] font-black mb-3 tracking-tight leading-none">Assistance BYD</h2>
          <p className="text-white/90 text-[18px] font-medium max-w-[85%] leading-relaxed">Nous sommes là pour vous, <span className="font-black text-white">24h/24 et 7j/7</span>, en cas de besoin.</p>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20 animate-slide-up pb-12">
        <PremiumCard className="text-center !p-8 mb-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] border-t border-white">
          <p className="text-[36px] font-black text-[var(--text)] tracking-tight mb-1">05 22 10 64 56</p>
          <p className="text-[12px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-6">Appel gratuit depuis le Maroc</p>
          <Button variant="danger" fullWidth icon={Phone} className="!py-5 !text-[18px] shadow-[0_12px_24px_rgba(220,38,38,0.4)]">Appeler l'assistance</Button>
        </PremiumCard>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <button className="bg-white border border-[var(--ice)] rounded-[20px] p-4 flex flex-col items-center justify-center gap-2.5 shadow-sm active:scale-95 transition-all group hover:border-green-200">
             <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center text-[var(--success)] group-hover:scale-110 transition-transform"><MessageSquare size={22} strokeWidth={2.5}/></div>
             <span className="text-[13px] font-black text-[var(--text)]">WhatsApp</span>
          </button>
          <button className="bg-white border border-[var(--ice)] rounded-[20px] p-4 flex flex-col items-center justify-center gap-2.5 shadow-sm active:scale-95 transition-all group hover:border-blue-200" onClick={() => { if(onOpen) { onClose(); onOpen('contact'); } }}>
             <div className="w-12 h-12 bg-[var(--ice)] rounded-full flex items-center justify-center text-[var(--primary)] group-hover:scale-110 transition-transform"><WrenchIcon size={22} strokeWidth={2.5}/></div>
             <span className="text-[13px] font-black text-[var(--text)]">Centre SAV</span>
          </button>
        </div>

        <h3 className="text-[18px] font-black text-[var(--text)] mb-4 px-2 tracking-tight">Consignes de sécurité</h3>
        <div className="flex flex-col gap-3 mb-8">
           <div className="bg-white rounded-[20px] p-4 border border-[var(--ice)] shadow-sm flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-red-50 text-[var(--danger)] flex items-center justify-center font-black text-[14px] shrink-0">1</div>
              <p className="text-[14px] font-bold text-[var(--text)] leading-tight">Allumez vos feux de détresse pour signaler votre présence.</p>
           </div>
           <div className="bg-white rounded-[20px] p-4 border border-[var(--ice)] shadow-sm flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-[var(--warning)] flex items-center justify-center font-black text-[14px] shrink-0">2</div>
              <p className="text-[14px] font-bold text-[var(--text)] leading-tight">Enfilez votre gilet de sécurité avant de quitter le véhicule.</p>
           </div>
           <div className="bg-white rounded-[20px] p-4 border border-[var(--ice)] shadow-sm flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[var(--primary)] flex items-center justify-center font-black text-[14px] shrink-0">3</div>
              <p className="text-[14px] font-bold text-[var(--text)] leading-tight">Mettez-vous à l'abri, idéalement derrière la glissière.</p>
           </div>
        </div>

        <div className="bg-gradient-to-r from-[#F0FDF4] to-white rounded-[32px] p-6 border-l-4 border-l-[var(--success)] shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white rounded-[20px] flex items-center justify-center text-[var(--success)] shadow-sm border border-[var(--ice)]"><Shield size={24} strokeWidth={2.5}/></div>
             <span className="text-[18px] font-black text-[var(--text)] tracking-tight">Assistance garantie</span>
          </div>
          <p className="text-[14px] text-[var(--text-muted)] font-medium leading-relaxed px-1">
            En cas de panne immobilisante, BYD prend en charge le remorquage vers le centre agréé le plus proche selon vos conditions de garantie.
          </p>
        </div>
      </div>
    </div>
  </PremiumScreen>
);

const ChatbotScreen = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Bonjour Yassine ! Je suis votre assistant IA BYD. Comment puis-je vous accompagner aujourd'hui ?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const send = (text) => {
    if(!text.trim()) return;
    setMessages(prev => [...prev, { text, isBot: false }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Je trouve ces informations pour vous immédiatement. Souhaitez-vous que j'ouvre la carte interactive pour plus de précision ?", isBot: true }]);
    }, 1000);
  };

  return (
    <PremiumScreen className="h-full z-[70] fixed inset-0 flex flex-col">
      <div className="bg-white/80 backdrop-blur-2xl border-b border-[var(--ice)] pt-16 pb-4 px-6 flex items-center justify-between z-30 shadow-sm">
        <div className="flex items-center gap-5">
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm border border-[var(--ice)] active:scale-95 text-[var(--text)]"><ChevronLeft size={28} strokeWidth={2.5}/></button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-[22px] gradient-blue flex items-center justify-center text-white shadow-md border-2 border-white"><MessageSquare size={24} strokeWidth={2.5}/></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--success)] border-[3px] border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="text-[18px] font-black text-[var(--text)] tracking-tight">Assistant IA BYD</h2>
              <p className="text-[11px] text-[var(--success)] font-black uppercase tracking-widest mt-0.5">En ligne</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-6 relative z-10 pb-36">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'} animate-slide-up relative z-10`}>
            <div className={`max-w-[85%] p-5 rounded-[28px] text-[15px] font-medium leading-relaxed shadow-sm ${m.isBot ? 'bg-white border border-[var(--ice)] text-[var(--text)] rounded-tl-sm' : 'gradient-blue text-white rounded-tr-sm shadow-[0_12px_24px_-8px_rgba(0,40,94,0.3)]'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {messages.length === 1 && (
          <div className="flex flex-col gap-3 mt-4 animate-slide-up w-[85%] relative z-10">
            {["📍 Où trouver un centre SAV ?", "💰 Quel forfait pour 30 000 km ?", "🚨 Comment marche l'assistance ?", "📅 Prendre rendez-vous atelier"].map((s, i) => (
              <button key={i} onClick={() => send(s.replace(/^[^\s]+\s/, ''))} className="bg-white border border-[var(--ice)] text-[var(--primary)] text-[14px] font-bold px-6 py-4 rounded-[24px] shadow-sm active:scale-95 text-left w-fit hover:bg-[var(--ice)] transition-colors border-l-4 border-l-[var(--primary)]">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 glass-panel border-t border-[var(--ice)] rounded-t-[40px] z-20 shadow-[0_-20px_40px_rgba(0,40,94,0.05)]">
        <div className="flex gap-3 items-center">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--primary)] shrink-0 border border-[var(--ice)] shadow-sm active:scale-95">
            <Paperclip size={20} strokeWidth={2.5}/>
          </button>
          <div className="flex-1 bg-white rounded-[24px] flex items-center px-5 border border-[var(--ice)] shadow-inner h-14 relative">
            <input 
              type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Message..." 
              className="flex-1 bg-transparent py-4 text-[15px] font-bold focus:outline-none placeholder:text-gray-400"
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
            />
            <button className="absolute right-4 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors"><Mic size={20} strokeWidth={2.5}/></button>
          </div>
          <button onClick={() => send(input)} className="w-14 h-14 rounded-[24px] gradient-blue flex items-center justify-center text-white shrink-0 active:scale-95 shadow-[0_8px_16px_rgba(0,40,94,0.3)] border border-white/20">
            <ArrowRight size={24} strokeWidth={2.5}/>
          </button>
        </div>
      </div>
    </PremiumScreen>
  );
};

const InteractiveMapScreen = ({ onClose }) => {
  const centers = [
    { n: "BYD Casa Anfa", t: "Showroom & SAV", d: "2,1 km", v: "Casablanca", a: "Ouvert" },
    { n: "BYD Rabat Agdal", t: "Centre SAV", d: "85 km", v: "Rabat", a: "Ouvert" },
    { n: "BYD Marrakech", t: "Concession & SAV", d: "248 km", v: "Marrakech", a: "Fermé" },
    { n: "BYD Tanger", t: "Point de Service", d: "340 km", v: "Tanger", a: "Ouvert" },
    { n: "Assistance Mobile", t: "Dépannage 24/7", d: "Intervention rapide", v: "National", a: "Dispo" }
  ];

  return (
    <PremiumScreen className="h-full z-50 fixed inset-0 flex flex-col bg-[var(--bg-color)]">
      <Header title="Carte & Réseau" onBack={onClose} transparent />
      
      {/* Premium Full-width Map Visual (Background layer) */}
      <div className="absolute top-0 left-0 right-0 h-[45vh] bg-[#E8F0F8] overflow-hidden z-0">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-40 mix-blend-multiply"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(232,240,248,0.95)_100%)]"></div>
         
         {/* Main Active Pin */}
         <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center text-white shadow-[0_12px_24px_rgba(0,40,94,0.4)] border-4 border-white z-10 animate-bounce relative">
               <WrenchIcon size={28} strokeWidth={2.5}/>
               <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--success)] border-2 border-white rounded-full"></div>
            </div>
            <div className="w-4 h-4 bg-[var(--primary)] rotate-45 -mt-3 z-0 shadow-sm"></div>
            <div className="bg-white text-[12px] font-black uppercase tracking-widest px-4 py-2 rounded-[12px] shadow-lg mt-3 border border-[var(--ice)] text-[var(--primary)]">
              BYD Casa Anfa
            </div>
         </div>

         {/* Secondary Pins */}
         <div className="absolute top-[25%] left-[20%] w-6 h-6 bg-white/80 backdrop-blur-md rounded-full border-2 border-[var(--primary)]/30 flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 bg-[var(--primary)]/50 rounded-full"></div>
         </div>
         <div className="absolute top-[60%] right-[25%] w-6 h-6 bg-white/80 backdrop-blur-md rounded-full border-2 border-[var(--primary)]/30 flex items-center justify-center shadow-sm">
            <div className="w-2 h-2 bg-[var(--primary)]/50 rounded-full"></div>
         </div>
         
         {/* Floating Action Buttons on Map */}
         <div className="absolute bottom-10 right-6 flex flex-col gap-3">
           <button className="w-12 h-12 bg-white rounded-full shadow-[0_8px_16px_rgba(0,40,94,0.1)] flex items-center justify-center border border-[var(--ice)] text-[var(--text)] active:scale-95">
             <Map size={20} strokeWidth={2.5}/>
           </button>
           <button className="w-12 h-12 bg-white rounded-full shadow-[0_8px_16px_rgba(0,40,94,0.1)] flex items-center justify-center border border-[var(--ice)] text-[var(--primary)] active:scale-95">
             <MapPin size={22} strokeWidth={2.5}/>
           </button>
         </div>
      </div>

      {/* Bottom Sheet Overlay */}
      <div className="relative z-20 flex-1 flex flex-col mt-[35vh] bg-[var(--bg-color)] rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,40,94,0.08)] border-t border-white">
        
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-2 shrink-0"></div>

        {/* Floating Search Bar */}
        <div className="px-6 py-4 shrink-0">
          <div className="relative">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.5}/>
            <input type="text" placeholder="Rechercher un centre, showroom, ville..." className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[24px] pl-14 pr-5 py-4 text-[15px] font-bold focus:outline-none focus:border-[var(--cyan)] focus:ring-4 focus:ring-[var(--cyan)]/10 transition-all" />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-12 hide-scrollbar flex flex-col gap-4 pt-4">
           {centers.map((c, i) => (
             <PremiumCard key={i} className="!p-5 shadow-sm hover:shadow-md group flex items-center gap-4">
               <div className="w-14 h-14 rounded-[20px] bg-[var(--ice)] border border-white shadow-inner flex items-center justify-center text-[var(--primary)] shrink-0 group-hover:scale-105 transition-transform">
                 {c.n === "Assistance Mobile" ? <AlertTriangle size={24} strokeWidth={2.5}/> : <WrenchIcon size={24} strokeWidth={2.5}/>}
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-start mb-1">
                   <div className="text-[16px] font-black text-[var(--text)] tracking-tight">{c.n}</div>
                   <div className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${c.a==='Ouvert' || c.a==='Dispo' ? 'bg-[#F0FDF4] text-[var(--success)]' : 'bg-red-50 text-[var(--danger)]'}`}>{c.a}</div>
                 </div>
                 <div className="text-[12px] font-medium text-[var(--text-muted)] mb-3">{c.t}</div>
                 <div className="flex items-center justify-between">
                   <div className="text-[13px] font-black text-[var(--primary)] bg-[var(--ice)] px-2.5 py-1 rounded-lg border border-blue-100">{c.d}</div>
                   <div className="flex gap-2">
                     <button className="w-9 h-9 bg-white border border-[var(--ice)] rounded-full flex items-center justify-center text-[var(--text-muted)] shadow-sm hover:text-[var(--primary)] transition-colors"><Phone size={16} strokeWidth={2.5}/></button>
                     <button className="w-9 h-9 gradient-blue rounded-full flex items-center justify-center text-white shadow-sm hover:brightness-110 transition-all"><ArrowRight size={18} strokeWidth={2.5}/></button>
                   </div>
                 </div>
               </div>
             </PremiumCard>
           ))}
        </div>
      </div>
    </PremiumScreen>
  );
};

const FAQScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0">
    <Header title="Support & FAQ" onBack={onClose} />
    <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-10">
       <div className="relative mb-8">
         <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" strokeWidth={2.5}/>
         <input type="text" placeholder="Rechercher une réponse..." className="w-full bg-white border border-[var(--ice)] shadow-sm rounded-[24px] pl-14 pr-5 py-4.5 text-[15px] font-bold focus:outline-none focus:border-[var(--cyan)]" />
       </div>
       
       <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-10 pb-2 -mx-6 px-6">
         {['Populaires', 'Entretien', 'Batterie', 'Assistance', 'Garantie'].map((c, i) => (
           <span key={i} className={`px-5 py-2.5 rounded-[16px] text-[13px] font-bold whitespace-nowrap shadow-sm transition-colors ${i===0 ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)]'}`}>{c}</span>
         ))}
       </div>

       <div className="flex flex-col gap-4 mb-10">
         {[
           "Quels sont les intervalles d'entretien pour l'ATTO 3 ?",
           "Comment prendre rendez-vous en ligne ?",
           "Combien de temps dure une révision type ?",
           "Que comprend le forfait d'entretien essentiel ?",
           "Comment fonctionne l'assistance 24/7 au Maroc ?"
         ].map((q, i) => (
           <div key={i} className="bg-white rounded-[24px] border border-[var(--ice)] shadow-sm p-6 cursor-pointer active:scale-[0.98] transition-transform flex items-center justify-between">
             <span className="text-[15px] font-bold text-[var(--text)] pr-4 leading-tight">{q}</span>
             <div className="w-10 h-10 rounded-full bg-[var(--ice)] flex items-center justify-center shrink-0 text-[var(--primary)] border border-white shadow-inner">
               <ChevronDown size={20} strokeWidth={2.5} />
             </div>
           </div>
         ))}
       </div>

       <PremiumCard className="text-center !p-8 bg-gradient-to-br from-[var(--ice)] to-white border-[var(--ice)] shadow-md">
         <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center mx-auto mb-5 shadow-sm text-[var(--primary)] border border-blue-50">
           <Phone size={28} strokeWidth={2.5}/>
         </div>
         <p className="text-[20px] font-black text-[var(--text)] mb-2 tracking-tight">Besoin d'aide personnalisée ?</p>
         <p className="text-[14px] font-medium text-[var(--text-muted)] mb-8 max-w-[90%] mx-auto">Notre équipe support est disponible pour répondre à toutes vos questions.</p>
         <Button variant="primary" fullWidth className="!py-4.5 !text-[16px]">Nous contacter directement</Button>
       </PremiumCard>
    </div>
  </PremiumScreen>
);

const OffersScreen = ({ onClose, onBook }) => {
  const [activeFilter, setActiveFilter] = useState('Tout');
  
  const offers = [
    { t: "Contrôle de Printemps", d: "-20% sur le forfait entretien", desc: "Préparez votre BYD pour les beaux jours avec un diagnostic complet.", b: "Promotion", btn: "Profiter de l'offre", img: ASSETS.maintenance, cat: "Entretien" },
    { t: "Bilan Batterie Blade", d: "Offert ce mois-ci", desc: "Diagnostic certifié de l'état de santé de votre batterie haute tension.", b: "Gratuit", btn: "Réserver", color: 'bg-[var(--success)]', cat: "Batterie" },
    { t: "Accessoires d'origine", d: "-15% sur sélection", desc: "Personnalisez votre véhicule avec nos accessoires garantis constructeur.", b: "Boutique", btn: "Découvrir la boutique", cat: "Accessoires" }
  ];

  const filteredOffers = activeFilter === 'Tout' ? offers : offers.filter(o => o.cat === activeFilter);

  return (
    <PremiumScreen className="h-full z-50 fixed inset-0">
      <Header title="Offres Exclusives" onBack={onClose} />
      <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-10">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 pb-2 -mx-6 px-6">
           {['Tout', 'Entretien', 'Batterie', 'Accessoires'].map((f, i) => (
             <button 
               key={i} 
               onClick={() => setActiveFilter(f)}
               className={`px-5 py-2.5 rounded-[16px] text-[13px] font-bold whitespace-nowrap shadow-sm transition-colors ${activeFilter === f ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)]'}`}
             >
               {f}
             </button>
           ))}
         </div>
        {filteredOffers.map((o, i) => (
          <PremiumCard key={i} className="mb-6 relative overflow-hidden !p-0 flex flex-col shadow-md group cursor-pointer animate-fade-in" onClick={o.cat !== 'Accessoires' ? onBook : null}>
             {o.img && (
               <div className="h-40 relative overflow-hidden">
                 <img src={o.img} alt="Promo" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent"></div>
               </div>
             )}
             <div className={`p-8 relative z-10 ${o.img ? 'pt-0' : ''}`}>
               <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-lg text-white shadow-sm ${o.color || 'bg-[var(--warning)]'}`}>{o.b}</span>
               </div>
               <h3 className="text-[24px] font-black text-[var(--text)] tracking-tight mb-1">{o.t}</h3>
               <p className="text-[16px] font-black text-[var(--primary)] mb-4">{o.d}</p>
               <p className="text-[14px] font-medium text-[var(--text-muted)] mb-8 leading-relaxed">{o.desc}</p>
               <Button variant={o.cat === 'Accessoires' ? 'secondary' : 'primary'} className={`!py-4.5 !text-[15px] ${o.cat === 'Accessoires' ? 'border-[var(--ice)] shadow-sm' : ''}`} fullWidth>{o.btn}</Button>
             </div>
          </PremiumCard>
        ))}
      </div>
    </PremiumScreen>
  );
};

const AccessoriesScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0">
    <Header title="Boutique Accessoires" onBack={onClose} />
    <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-10">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-8 pb-2 -mx-6 px-6">
         {['Tous les articles', 'Intérieur', 'Extérieur', 'Entretien'].map((c, i) => (
           <span key={i} className={`px-5 py-2.5 rounded-[16px] text-[13px] font-bold whitespace-nowrap shadow-sm transition-colors ${i===0 ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)]'}`}>{c}</span>
         ))}
       </div>
       <div className="grid grid-cols-2 gap-4">
         {[
           { n: "Tapis 3D Premium", p: "850 DH", s: "En stock", c: "Intérieur" },
           { n: "Kit de nettoyage pro", p: "450 DH", s: "En stock", c: "Entretien" },
           { n: "Housse de protection", p: "1 200 DH", s: "En stock", c: "Extérieur" },
           { n: "Barres de toit", p: "2 100 DH", s: "Stock limité", c: "Extérieur" }
         ].map((a, i) => (
           <PremiumCard key={i} className="!p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-md transition-shadow">
             <div className="h-32 bg-[var(--bg-color)] rounded-[20px] flex items-center justify-center mb-5 border border-[var(--ice)] shadow-inner">
                <ShoppingBag size={40} className="text-[var(--primary)] opacity-40" />
             </div>
             <div>
               <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5">{a.c}</div>
               <div className="text-[15px] font-black text-[var(--text)] leading-tight mb-3 h-10 tracking-tight">{a.n}</div>
               <div className="text-[18px] font-black text-[var(--primary)] mb-2">{a.p}</div>
               <div className={`text-[10px] font-black uppercase tracking-widest mb-5 ${a.s==='En stock'?'text-[var(--success)]':'text-[var(--warning)]'}`}>{a.s}</div>
               <button className="w-full py-3 bg-[var(--ice)] text-[var(--primary)] text-[13px] font-bold rounded-[16px] hover:bg-blue-100 transition-colors shadow-sm">Ajouter au panier</button>
             </div>
           </PremiumCard>
         ))}
       </div>
    </div>
  </PremiumScreen>
);

const LoyaltyScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0">
    <Header title="Programme BYD Privilège" onBack={onClose} />
    <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-10">
      <div className="gradient-blue rounded-[40px] p-8 border border-white/20 shadow-[0_24px_48px_-12px_rgba(0,40,94,0.4)] mb-6 relative overflow-hidden text-white">
        <div className="absolute right-[-10%] top-[-20%] p-6 opacity-[0.1] mix-blend-screen pointer-events-none"><Star size={240} fill="white"/></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-[12px] font-black text-[var(--cyan)] uppercase tracking-widest mb-2">Points accumulés</div>
              <div className="text-[48px] font-black tracking-tight leading-none drop-shadow-md">1 280</div>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-300 text-[var(--primary-deep)] px-4 py-2 rounded-xl text-[14px] font-black shadow-lg uppercase tracking-wider border border-white/50">
              Silver
            </div>
          </div>
          <div className="mb-2 bg-black/20 p-4 rounded-[24px] border border-white/10 backdrop-blur-md">
            <div className="flex justify-between text-[11px] font-bold text-white/90 mb-3 uppercase tracking-wider">
              <span>Niveau actuel</span>
              <span>Gold (2000)</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[var(--warning)] to-yellow-300 rounded-full w-[64%] shadow-[0_0_12px_#F59E0B]"></div>
            </div>
            <div className="text-[13px] font-bold text-white mt-4 text-center">
              Plus que <span className="text-[var(--warning)] font-black">720 pts</span> avant le niveau supérieur.
            </div>
          </div>
        </div>
      </div>
      <button className="w-full mb-8 bg-white border border-[var(--ice)] rounded-[24px] p-4 flex items-center justify-between shadow-sm active:scale-95 transition-all group hover:shadow-md">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-[var(--bg-color)] rounded-[16px] flex items-center justify-center text-[var(--primary)] border border-[var(--ice)] group-hover:scale-105 transition-transform"><Info size={22} strokeWidth={2.5}/></div>
           <div className="text-left">
             <div className="text-[15px] font-black text-[var(--text)] tracking-tight">Comment ça marche ?</div>
             <div className="text-[13px] font-medium text-[var(--text-muted)] mt-0.5">En savoir plus sur le programme</div>
           </div>
        </div>
        <ChevronRight size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors"/>
      </button>
      <h3 className="text-[20px] font-black text-[var(--text)] mb-6 tracking-tight px-1">Récompenses exclusives</h3>
      <div className="flex flex-col gap-4">
        {[
          { t: "Réduction Entretien", d: "Valable sur votre prochain forfait périodique en centre.", pts: "500 pts" },
          { t: "Accessoires d'origine", d: "-10% de remise sur toute la boutique en ligne.", pts: "800 pts" },
          { t: "Diagnostic Batterie", d: "Contrôle complet offert par nos experts.", pts: "1000 pts" },
          { t: "Nettoyage Premium", d: "Service intérieur & extérieur complet offert.", pts: "1200 pts" }
        ].map((r, i) => (
          <PremiumCard key={i} className="flex justify-between items-center !p-6 shadow-sm cursor-pointer hover:shadow-md">
             <div className="flex gap-5 items-center">
               <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#FEF3C7] to-white flex items-center justify-center border border-yellow-100 shadow-sm shrink-0">
                 <Gift size={28} className="text-[var(--warning)]" strokeWidth={2.5}/>
               </div>
               <div className="max-w-[180px]">
                 <div className="text-[16px] font-black text-[var(--text)] mb-1 tracking-tight">{r.t}</div>
                 <div className="text-[13px] font-medium text-[var(--text-muted)] leading-tight">{r.d}</div>
               </div>
             </div>
             <button className="gradient-blue text-white text-[13px] font-bold px-4 py-2.5 rounded-xl shadow-md active:scale-95 whitespace-nowrap ml-2 border border-white/20">
               {r.pts}
             </button>
          </PremiumCard>
        ))}
      </div>
    </div>
  </PremiumScreen>
);

const MaintenanceInfoScreen = ({ onClose }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0">
    <Header title="Expertise Constructeur" onBack={onClose} />
    <div className="flex-1 overflow-y-auto px-6 py-4 hide-scrollbar pb-10 animate-slide-in-right">
       <div className="h-64 rounded-[36px] overflow-hidden mb-8 shadow-[0_20px_40px_-10px_rgba(0,40,94,0.3)] relative flex items-end p-8 border border-white/50">
          <img src={ASSETS.maintenance} alt="Maintenance BYD" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-deep)] via-[var(--primary)]/70 to-transparent"></div>
          <div className="relative z-10">
            <span className="bg-[var(--cyan)] text-[var(--primary-deep)] text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg mb-3 inline-block shadow-sm">Garantie qualité</span>
            <h2 className="text-[28px] font-black text-white leading-tight tracking-tight">L'excellence BYD pour votre véhicule.</h2>
          </div>
       </div>
       <p className="text-[16px] text-[var(--text-muted)] leading-relaxed mb-10 font-medium px-2">
         L'entretien officiel constructeur est la clé pour garantir la longévité et les performances exceptionnelles de votre BYD. Nos techniciens certifiés maîtrisent chaque détail de votre véhicule.
       </p>
       <h3 className="text-[20px] font-black text-[var(--text)] mb-6 tracking-tight px-1">Pourquoi choisir notre réseau ?</h3>
       <div className="flex flex-col gap-4 mb-10">
         <PremiumCard className="flex gap-5 !p-6 items-center shadow-sm">
           <div className="w-16 h-16 bg-[var(--ice)] rounded-[24px] flex items-center justify-center text-[var(--primary)] shrink-0 shadow-inner border border-white">
             <Shield size={32} strokeWidth={2.5}/>
           </div>
           <div>
             <h4 className="text-[18px] font-black text-[var(--text)] mb-1 tracking-tight">Pièces 100% d'origine</h4>
             <p className="text-[14px] font-medium text-[var(--text-muted)] leading-snug">Conçues spécifiquement pour votre modèle, assurant une sécurité et une fiabilité absolues.</p>
           </div>
         </PremiumCard>
         <PremiumCard className="flex gap-5 !p-6 items-center shadow-sm">
           <div className="w-16 h-16 bg-[#F0FDF4] rounded-[24px] flex items-center justify-center text-[var(--success)] shrink-0 border border-[#bbf7d0] shadow-inner">
             <Battery size={32} strokeWidth={2.5}/>
           </div>
           <div>
             <h4 className="text-[18px] font-black text-[var(--text)] mb-1 tracking-tight">Expertise Batterie Blade</h4>
             <p className="text-[14px] font-medium text-[var(--text-muted)] leading-snug">Diagnostic poussé et certifié de l'état de santé (SOH) de votre batterie haute tension.</p>
           </div>
         </PremiumCard>
       </div>
       <Button fullWidth onClick={onClose} className="!py-4.5 !text-[16px]">Prendre rendez-vous atelier</Button>
    </div>
  </PremiumScreen>
);

const ContactScreen = ({ onClose, onOpen }) => (
  <PremiumScreen className="h-full z-50 fixed inset-0 flex flex-col">
    <Header title="Contact & Support" onBack={onClose} />
    <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
      <div className="gradient-blue rounded-[36px] p-8 text-white mb-8 shadow-[0_24px_48px_-12px_rgba(0,40,94,0.4)] relative overflow-hidden border border-white/20">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[var(--cyan)] rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"></div>
        <div className="absolute right-4 bottom-4 opacity-10 mix-blend-screen pointer-events-none"><Phone size={150} fill="white" /></div>
        <div className="relative z-10">
          <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-black px-3.5 py-1.5 rounded-[10px] uppercase tracking-wider shadow-sm border border-white/30 mb-4 inline-block">
            À votre écoute
          </span>
          <h3 className="text-[28px] font-black tracking-tight mb-3 leading-none">Comment pouvons-nous vous aider ?</h3>
          <p className="text-[14px] font-medium text-white/80 mb-2 max-w-[90%] leading-relaxed">
            Notre équipe d'experts BYD est à votre disposition pour toute question ou assistance concernant votre véhicule.
          </p>
        </div>
      </div>
      <h3 className="text-[18px] font-black text-[var(--text)] mb-4 px-2 tracking-tight">Canaux de contact rapides</h3>
      <div className="flex flex-col gap-4 mb-8">
        <PremiumCard className="!p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#F0FDF4] rounded-[20px] flex items-center justify-center text-[var(--success)] shadow-inner border border-[#bbf7d0] group-hover:scale-105 transition-transform shrink-0">
              <Phone size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[16px] font-black text-[var(--text)] tracking-tight mb-1">Appel téléphonique</div>
              <div className="text-[13px] font-bold text-[var(--text-muted)]">05 22 10 64 56</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
        </PremiumCard>
        <PremiumCard className="!p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--ice)] rounded-[20px] flex items-center justify-center text-[var(--primary)] shadow-inner border border-white group-hover:scale-105 transition-transform shrink-0">
              <MessageSquare size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[16px] font-black text-[var(--text)] tracking-tight mb-1">WhatsApp BYD</div>
              <div className="text-[13px] font-bold text-[var(--text-muted)]">Chat direct avec un conseiller</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
        </PremiumCard>
        <PremiumCard className="!p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md group">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[var(--bg-color)] rounded-[20px] flex items-center justify-center text-[var(--primary)] shadow-inner border border-[var(--ice)] group-hover:scale-105 transition-transform shrink-0">
              <Mail size={24} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[16px] font-black text-[var(--text)] tracking-tight mb-1">Courrier électronique</div>
              <div className="text-[13px] font-bold text-[var(--text-muted)]">support@byd.ma</div>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-300 group-hover:text-[var(--primary)] transition-colors" />
        </PremiumCard>
      </div>
      <PremiumCard className="!p-6 bg-gradient-to-r from-[var(--ice)] to-white border-[var(--ice)] flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md" onClick={() => { onClose(); onOpen('faq'); }}>
         <div>
           <div className="text-[16px] font-black text-[var(--text)] mb-1 tracking-tight">Consulter la FAQ</div>
           <div className="text-[13px] font-medium text-[var(--text-muted)]">Trouvez des réponses rapides en ligne.</div>
         </div>
         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--primary)] border border-[var(--ice)]">
           <ArrowRight size={20} strokeWidth={2.5} />
         </div>
      </PremiumCard>
    </div>
  </PremiumScreen>
);

const RepairQuoteModal = ({ onClose, onAccept }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    setTimeout(() => {
      onAccept();
      onClose();
    }, 1500);
  };

  if (isAccepted) {
    return (
      <PremiumScreen className="h-full z-[100] fixed inset-0 bg-transparent">
        <div className="absolute inset-0 bg-[var(--primary-deep)]/70 backdrop-blur-md"></div>
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-color)] rounded-t-[48px] p-8 shadow-2xl flex flex-col items-center justify-center min-h-[50vh] animate-slide-up">
          <div className="w-24 h-24 rounded-full bg-[var(--success)] flex items-center justify-center text-white mb-6 animate-pulse ring-8 ring-green-100">
            <CheckCircle2 size={48} strokeWidth={2.5} />
          </div>
          <h3 className="text-[24px] font-black text-[var(--text)] mb-2 tracking-tight">Devis validé !</h3>
          <p className="text-[15px] font-medium text-[var(--text-muted)] text-center max-w-[85%]">Merci pour votre confirmation. Les travaux reprennent immédiatement.</p>
        </div>
      </PremiumScreen>
    );
  }

  return (
    <PremiumScreen className="h-full z-[100] fixed inset-0 bg-transparent">
      <div className="absolute inset-0 bg-[var(--primary-deep)]/70 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-color)] rounded-t-[48px] p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.3)] border-t border-white/50 animate-slide-up flex flex-col max-h-[90vh]">
        <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 shrink-0"></div>
        
        <div className="overflow-y-auto hide-scrollbar pb-8 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-yellow-100 text-[var(--warning)] px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><AlertTriangle size={12} strokeWidth={3}/> Action requise</span>
              </div>
              <h3 className="text-[24px] font-black text-[var(--text)] tracking-tight leading-tight mb-1">Devis complémentaire</h3>
              <p className="text-[13px] font-medium text-[var(--text-muted)] leading-relaxed max-w-[90%]">Validation requise pour poursuivre l’intervention</p>
            </div>
            <div className="bg-[var(--ice)] px-4 py-2 rounded-[16px] shadow-inner border border-white shrink-0">
              <span className="text-[16px] font-black text-[var(--primary)]">1 450 DH</span>
            </div>
          </div>

          <PremiumCard className="!p-5 my-6 flex flex-col gap-4 border-l-4 !border-l-[var(--warning)] shadow-sm">
             <div>
               <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5">Description de l'intervention</div>
               <div className="text-[14px] font-bold text-[var(--text)] leading-snug">Remplacement des plaquettes de frein avant suite à une usure prononcée détectée lors du diagnostic.</div>
             </div>
             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--ice)]">
                <div>
                   <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><Package size={14} className="text-[var(--primary)]"/> Pièces</div>
                   <div className="text-[14px] font-black text-[var(--text)]">850 DH</div>
                   <div className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Jeu de plaquettes AV</div>
                </div>
                <div>
                   <div className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1.5 flex items-center gap-1.5"><WrenchIcon size={14} className="text-[var(--primary)]"/> Main-d'œuvre</div>
                   <div className="text-[14px] font-black text-[var(--text)]">600 DH</div>
                   <div className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">1h30 estimée</div>
                </div>
             </div>
          </PremiumCard>

          <div className="flex items-center justify-between bg-white rounded-[20px] p-4 shadow-sm border border-[var(--ice)] mb-4 cursor-pointer hover:bg-gray-50 transition-colors">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[16px] bg-[var(--bg-color)] flex items-center justify-center text-[var(--primary)] border border-[var(--ice)] shadow-inner"><FileText size={20} strokeWidth={2.5}/></div>
                <div>
                   <div className="text-[14px] font-black text-[var(--text)] tracking-tight">Devis_OR-2026-00482.pdf</div>
                   <div className="text-[12px] font-medium text-[var(--text-muted)]">Document officiel (1.2 Mo)</div>
                </div>
             </div>
             <button className="text-[var(--primary)] w-10 h-10 flex items-center justify-center bg-[var(--ice)] rounded-full transition-transform active:scale-95 shadow-sm"><Download size={18} strokeWidth={2.5}/></button>
          </div>

          <div className="flex items-center justify-between bg-[#F0FDF4] rounded-[20px] p-5 border border-[#bbf7d0] mb-8 shadow-sm">
            <span className="text-[14px] font-black text-[var(--text)] tracking-tight">Délai estimé supplémentaire</span>
            <span className="text-[14px] font-black text-[var(--success)]">+ 45 minutes</span>
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <Button variant="primary" onClick={handleAccept} fullWidth className="!py-4.5 !text-[16px] shadow-[0_8px_24px_rgba(22,163,74,0.4)] !bg-gradient-to-r !from-[#16A34A] !to-[#15803d] border-t border-white/20">
              <CheckCircle2 size={22}/> Accepter le devis
            </Button>
            <div className="flex gap-3">
               <Button variant="secondary" onClick={onClose} className="flex-1 !py-4 !text-[14px] border-[var(--ice)] !text-[var(--danger)] bg-red-50/50 hover:bg-red-50"><X size={18}/> Refuser</Button>
               <Button variant="secondary" className="flex-1 !py-4 !text-[14px] border-[var(--ice)] text-[var(--primary)]"><Phone size={18}/> Être rappelé</Button>
            </div>
          </div>
        </div>
      </div>
    </PremiumScreen>
  );
};

const ReportPreviewModal = ({ report, onClose }) => {
  if (!report) return null;
  return (
    <PremiumScreen className="h-full z-[100] fixed inset-0 bg-transparent">
      <div className="absolute inset-0 bg-[var(--primary-deep)]/70 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-color)] rounded-t-[48px] p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.3)] border-t border-white/50 animate-slide-up flex flex-col max-h-[85vh]">
        <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-8 shrink-0"></div>
        
        <div className="overflow-y-auto hide-scrollbar pb-8 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-[24px] font-black text-[var(--text)] tracking-tight leading-tight mb-2">{report.title}</h3>
                <p className="text-[13px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{report.date}</p>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-[14px] shadow-sm border border-[var(--ice)] text-[13px] font-bold text-[var(--text-muted)]">
                <MapPin size={16} className="text-[var(--primary)]" /> {report.km}
              </div>
              <div className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2.5 rounded-[14px] shadow-sm border border-[#bbf7d0] text-[13px] font-bold text-[var(--success)]">
                <CheckCircle2 size={16} /> Terminé
              </div>
            </div>

            <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1">Détails des opérations</h4>
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[var(--ice)] mb-8 flex flex-col gap-4">
              {report.details.map((d, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--ice)] flex items-center justify-center text-[var(--primary)] shrink-0 border border-white shadow-inner"><Check size={14} strokeWidth={3}/></div>
                  <span className="text-[15px] font-bold text-[var(--text)]">{d}</span>
                </div>
              ))}
            </div>

            <h4 className="text-[15px] font-black text-[var(--text)] tracking-tight mb-4 px-1">Note de l'expert BYD</h4>
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-[var(--ice)] mb-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-[20px] bg-[var(--bg-color)] flex items-center justify-center text-[var(--primary)] shrink-0 border border-[var(--ice)]"><User size={20} strokeWidth={2.5} /></div>
              <p className="text-[14px] font-medium text-[var(--text-muted)] leading-relaxed italic pt-1">"{report.techNote}"</p>
            </div>
            
            <Button variant="primary" fullWidth icon={Download} className="!py-4.5 !text-[16px] shrink-0" onClick={onClose}>Télécharger le rapport PDF</Button>
        </div>
      </div>
    </PremiumScreen>
  );
};

const NotificationsOverlay = ({ onClose, onAction }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Rapport disponible", desc: "Votre dernier rapport SAV est disponible.", time: "Il y a 10 min", isUnread: true, icon: FileText, cat: 'document', tab: 'suivi', overlay: 'report-preview' },
    { id: 2, title: "Devis complémentaire", desc: "Une validation est requise pour continuer.", time: "Il y a 2h", isUnread: true, icon: AlertTriangle, cat: 'suivi', tab: 'suivi', overlay: 'repair-quote' },
    { id: 3, title: "Entretien recommandé", desc: "Votre prochain entretien approche à 30 000 km.", time: "Hier", isUnread: false, icon: WrenchIcon, cat: 'entretien', tab: 'services', overlay: 'simulator' },
    { id: 4, title: "Offre SAV", desc: "-20% sur le contrôle de printemps.", time: "Hier", isUnread: false, icon: Gift, cat: 'offre', tab: 'explorer', overlay: 'offers' },
    { id: 5, title: "Rendez-vous confirmé", desc: "Votre rendez-vous SAV est confirmé pour mardi.", time: "Lun", isUnread: false, icon: Calendar, cat: 'rdv', tab: 'accueil', overlay: null },
    { id: 6, title: "Programme fidélité", desc: "Vous avez gagné 120 points fidélité.", time: "Lun", isUnread: false, icon: Star, cat: 'fidelite', tab: 'profil', overlay: 'loyalty' },
    { id: 7, title: "Véhicule ajouté", desc: "Votre véhicule a bien été ajouté à votre garage.", time: "12 janv", isUnread: false, icon: Car, cat: 'compte', tab: 'profil', overlay: null }
  ]);

  const unreadCount = notifications.filter(n => n.isUnread).length;

  const handleNotificationClick = (n) => {
    setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, isUnread: false } : notif));
    onAction('navigate', n.overlay, n.tab);
  };

  const getBadgeStyle = (cat) => {
    switch(cat) {
      case 'suivi': return 'bg-yellow-50 text-[var(--warning)]';
      case 'entretien': return 'bg-blue-50 text-[var(--primary)]';
      case 'offre': return 'bg-purple-50 text-purple-600';
      case 'rdv': return 'bg-[#F0FDF4] text-[var(--success)]';
      case 'document': return 'bg-gray-100 text-[var(--text-muted)]';
      case 'fidelite': return 'bg-yellow-50 text-[var(--warning)]';
      default: return 'bg-[var(--ice)] text-[var(--primary)]';
    }
  };

  return (
    <div className="absolute inset-0 z-[60] flex flex-col animate-fade-in">
      <div className="absolute inset-0 bg-[var(--primary-deep)]/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative mt-24 bg-[var(--bg-color)] flex-1 rounded-t-[48px] flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.3)] border-t border-white/50">
         <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-4 shrink-0"></div>
         
         <div className="px-8 flex justify-between items-center mb-6 shrink-0">
           <div>
             <h2 className="text-[28px] font-black text-[var(--text)] tracking-tight leading-none mb-1.5">Notifications</h2>
             <p className="text-[13px] font-bold text-[var(--text-muted)]">
               {unreadCount > 0 ? <span className="text-[var(--primary)]">{unreadCount} nouvelle{unreadCount > 1 ? 's' : ''} alerte{unreadCount > 1 ? 's' : ''}</span> : 'Tout est à jour'}
             </p>
           </div>
           <button onClick={onClose} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-[var(--ice)] text-[var(--text)] active:scale-95"><X size={24} strokeWidth={2.5}/></button>
         </div>

         <div className="flex-1 overflow-y-auto px-6 pb-12 flex flex-col gap-3 hide-scrollbar">
           {notifications.map((n) => {
             const IconComponent = n.icon;
             return (
               <PremiumCard 
                 key={n.id} 
                 onClick={() => handleNotificationClick(n)}
                 className={`!p-5 cursor-pointer hover:shadow-md transition-shadow ${n.isUnread ? 'border-l-4 !border-l-[var(--primary)] bg-gradient-to-r from-white to-[var(--ice)]/40 shadow-sm' : 'opacity-80 shadow-none'}`}
               >
                 <div className="flex justify-between items-start mb-3">
                   <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${getBadgeStyle(n.cat)}`}>
                     <IconComponent size={12} strokeWidth={3}/> {n.cat}
                   </div>
                   <span className={`text-[11px] ${n.isUnread ? 'font-black text-[var(--primary)]' : 'font-bold text-[var(--text-muted)]'}`}>
                     {n.time}
                   </span>
                 </div>
                 <div className="flex items-start gap-4">
                   <div className="flex-1">
                     <h4 className={`text-[15px] tracking-tight mb-1 ${n.isUnread ? 'font-black text-[var(--text)]' : 'font-bold text-[var(--text)]'}`}>{n.title}</h4>
                     <p className={`text-[13px] leading-snug ${n.isUnread ? 'font-medium text-[var(--text-muted)]' : 'font-medium text-gray-400'}`}>{n.desc}</p>
                   </div>
                   {n.isUnread && <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full shrink-0 mt-2 shadow-[0_0_8px_rgba(0,40,94,0.4)] animate-pulse"></div>}
                 </div>
               </PremiumCard>
             );
           })}
         </div>
      </div>
    </div>
  );
};

const ManualsScreen = ({ onClose, activeVehicle }) => {
  const [activeTab, setActiveTab] = useState('Tous');

  const manuals = [
    { title: "Manuel du Propriétaire", desc: "Guide complet d'utilisation", size: "14.5 Mo", type: "PDF", icon: BookOpen, cat: "Manuels" },
    { title: "Guide de Démarrage Rapide", desc: "L'essentiel pour prendre la route", size: "2.3 Mo", type: "PDF", icon: Zap, cat: "Manuels" },
    { title: "Système Multimédia & Connectivité", desc: "Configuration du système DiLink", size: "5.1 Mo", type: "PDF", icon: Smartphone, cat: "Technologie" },
    { title: "Carnet d'Entretien & Garantie", desc: "Préconisations et couverture", size: "1.8 Mo", type: "PDF", icon: Shield, cat: "Entretien" },
    { title: "Tutoriel : Entretien optimal", desc: "Astuces pour préserver votre véhicule", size: "3:45", type: "Vidéo", icon: PlayCircle, cat: "Vidéos" },
    { title: "Tutoriel : Stationnement auto", desc: "Utilisation des caméras 360°", size: "2:10", type: "Vidéo", icon: PlayCircle, cat: "Vidéos" }
  ];

  const filteredManuals = activeTab === 'Tous' ? manuals : manuals.filter(m => m.cat === activeTab);

  return (
    <PremiumScreen className="h-full z-50 fixed inset-0 flex flex-col">
      <Header title="Manuels & Guides" onBack={onClose} />
      
      <div className="px-6 py-4 flex-1 overflow-y-auto hide-scrollbar pb-36 animate-slide-in-right">
        
        {/* En-tête de personnalisation du véhicule */}
        <div className="gradient-blue rounded-[36px] p-6 text-white mb-8 shadow-[0_24px_48px_-12px_rgba(0,40,94,0.4)] relative overflow-hidden border border-white/20">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[var(--cyan)] rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"></div>
          
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div>
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3.5 py-1.5 rounded-[10px] uppercase tracking-wider shadow-sm border border-white/30 mb-2 inline-block">
                Documentation
              </span>
              <h3 className="text-[22px] font-black tracking-tight leading-none">{activeVehicle.name}</h3>
            </div>
            <div className="w-24 h-16 relative flex items-center justify-center">
              <img src={activeVehicle.img} alt={activeVehicle.name} className="w-[150%] max-w-none object-contain drop-shadow-[0_10px_20px_rgba(0,10,30,0.8)] scale-110 translate-x-4" />
            </div>
          </div>
          
          <div className="relative">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" strokeWidth={2.5}/>
             <input type="text" placeholder="Rechercher un guide, un mot-clé..." className="w-full bg-black/20 border border-white/20 shadow-inner rounded-[20px] pl-12 pr-5 py-3.5 text-[14px] font-bold focus:outline-none focus:border-[var(--cyan)] focus:bg-white/20 transition-all placeholder:text-white/60 text-white" />
          </div>
        </div>

        {/* Filtres de catégories */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 pb-2 -mx-6 px-6">
           {['Tous', 'Manuels', 'Entretien', 'Technologie', 'Vidéos'].map((c, i) => (
             <button 
               key={i} 
               onClick={() => setActiveTab(c)}
               className={`px-5 py-2.5 rounded-[16px] text-[13px] font-bold whitespace-nowrap shadow-sm transition-colors ${activeTab === c ? 'gradient-blue text-white' : 'bg-white border border-[var(--ice)] text-[var(--text-muted)]'}`}
             >
               {c}
             </button>
           ))}
        </div>

        <h3 className="text-[18px] font-black text-[var(--text)] mb-4 px-2 tracking-tight">Documents disponibles</h3>
        
        {/* Liste des manuels */}
        <div className="flex flex-col gap-4">
          {filteredManuals.map((m, i) => (
            <PremiumCard key={i} className="!p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md group">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border shadow-inner shrink-0 group-hover:scale-105 transition-transform ${m.type === 'Vidéo' ? 'bg-[#FFFBEB] border-yellow-100 text-[var(--warning)]' : 'bg-[var(--bg-color)] border-[var(--ice)] text-[var(--primary)]'}`}>
                  <m.icon size={24} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-[15px] font-black text-[var(--text)] tracking-tight leading-tight mb-1">{m.title}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${m.type === 'Vidéo' ? 'bg-[var(--warning)] text-white' : 'bg-[var(--primary)] text-white'}`}>{m.type}</span>
                    <span className="text-[12px] font-bold text-[var(--text-muted)]">{m.size}</span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-sm border border-[var(--ice)] group-active:scale-95 transition-transform group-hover:bg-[var(--ice)] shrink-0">
                {m.type === 'Vidéo' ? <PlayCircle size={20} strokeWidth={2.5}/> : <Download size={18} strokeWidth={2.5}/>}
              </button>
            </PremiumCard>
          ))}
        </div>
      </div>
    </PremiumScreen>
  );
};

