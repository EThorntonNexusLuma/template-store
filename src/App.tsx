import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  Star,
  Sparkles,
  Shield,
  Zap,
  Crown,
  CheckCircle
} from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { LegalModals } from './components/LegalModals';
import { products } from './stripe-config';

function App() {
  // Debug log to verify App component mounts
  console.log('Nexus Luma App component mounted successfully');
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dailyPurchases, setDailyPurchases] = useState(0);

  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
      
      // Auto-hide navigation based on scroll direction
      if (scrollPosition > lastScrollY && scrollPosition > 100) {
        // Scrolling down - hide nav
        setNavVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding nav
      } else if (scrollPosition < lastScrollY) {
        // Scrolling up - show nav
        setNavVisible(true);
      }
      
      setLastScrollY(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Animate on load
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Daily purchases counter that updates every 24 hours based on date
  useEffect(() => {
    const generateDailyNumber = () => {
      // Get current date as seed to ensure same number for entire day
      const today = new Date();
      const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      
      // Create a simple hash from the date string for consistent randomness
      let hash = 0;
      for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      
      // Use the hash to generate a number between 89 and 347
      const seed = Math.abs(hash) % 1000000;
      const normalizedSeed = seed / 1000000; // Normalize to 0-1
      return Math.floor(normalizedSeed * (347 - 89 + 1)) + 89;
    };

    // Set the daily number based on current date
    setDailyPurchases(generateDailyNumber());

    // Check every hour to see if the date has changed
    const interval = setInterval(() => {
      const newNumber = generateDailyNumber();
      setDailyPurchases(newNumber);
    }, 3600000); // Check every hour (3600000 ms)

    return () => clearInterval(interval);
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const toggleProductLike = (productId: string) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  // Filter products based on search only
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-off-white">
      {/* Professional Gold Particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      {/* Professional Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'backdrop-professional-dark shadow-professional border-b border-gray-700/50' 
          : 'bg-transparent'
      } ${
        navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-3">
              <img 
                src="/Nexus Luma up copy.png" 
                alt="Nexus Luma Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain"
              />
              <div className="text-lg md:text-2xl font-bold text-gray-800 tracking-tight">
                <span className="font-light text-gray-200">NEXUS</span>
                <span className="ml-2 font-bold text-gradient">LUMA</span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('products')}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors relative group interactive-element min-h-[44px] flex items-center"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors relative group interactive-element min-h-[44px] flex items-center"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => setContactOpen(true)}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors relative group interactive-element min-h-[44px] flex items-center"
              >
                Support
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>

            <button 
              className="md:hidden p-2 text-gray-200 interactive-scale min-h-[44px] min-w-[44px] flex items-center justify-center" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && navVisible && (
          <div className="md:hidden backdrop-professional-dark border-t border-gray-700/50 p-6 animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('products')}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 text-left min-h-[44px] interactive-element"
              >
                Products
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 text-left min-h-[44px] interactive-element"
              >
                About
              </button>
              <button 
                onClick={() => setContactOpen(true)}
                className="text-gray-300 hover:text-gray-100 font-medium transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 text-left min-h-[44px] interactive-element"
              >
                Support
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-16">
        {/* Hero Section */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-gray-400" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">Premium Templates & Services</span>
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          
          <h1 className="mobile-hero-title sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
            Ready <span className="text-gradient">To Launch</span>
            <br />
            <span className="mobile-hero-subtitle sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200">Professional Templates</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Join 10,000+ entrepreneurs who've launched successful businesses with our templates. 
            <strong>No coding required</strong>, instant access, lifetime support included.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-sm text-gray-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>10,000+ Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Social Proof Banner */}
        <div className={`bg-gradient-to-r from-gray-800 to-gray-700 border border-green-600/30 rounded-2xl p-4 sm:p-6 mb-12 text-center ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-green-400 font-bold text-xl md:text-2xl">{dailyPurchases}</span>
          </div>
          <p className="text-green-300 font-medium text-sm md:text-base">purchased templates in the last 24 hours</p>
        </div>

        {/* Search Section */}
        <div id="products" className={`flex justify-center mb-12 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products and services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-gray-800 text-gray-200 placeholder-gray-400 shadow-sm hover:shadow-md transition-all duration-300 text-base min-h-[48px]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-20 ${isLoaded ? '' : 'opacity-0'}`}>
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 3)}s` }}
            >
              <ProductCard
                product={product}
                onLike={toggleProductLike}
                isLiked={likedProducts.has(product.id)}
              />
            </div>
          ))}
        </div>

        {/* About Section */}
        <section id="about" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient">Nexus Luma</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We've helped over 10,000 entrepreneurs launch successful businesses with our premium templates and services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-xl shadow-professional border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Access</h3>
              <p className="text-gray-300">Download immediately after purchase. No waiting, no delays.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-xl shadow-professional border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Quality</h3>
              <p className="text-gray-300">Hand-crafted designs with attention to every detail.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-800 rounded-xl shadow-professional border border-gray-700">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lifetime Support</h3>
              <p className="text-gray-300">Get help whenever you need it. We're here for you.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Professional Footer */}
      <footer className="relative z-10 bg-gradient-to-b from-black to-black border-t border-gray-800/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src="/Nexus Luma up copy.png" 
                alt="Nexus Luma Logo" 
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
              <div className="text-xl font-bold text-white tracking-tight">
                <span className="font-light text-white">NEXUS</span>
                <span className="ml-2 font-bold text-gradient">LUMA</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-8 text-sm">
              <button 
                onClick={() => setPrivacyOpen(true)}
                className="text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 min-h-[44px] interactive-element"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setTermsOpen(true)}
                className="text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 min-h-[44px] interactive-element"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => setContactOpen(true)}
                className="text-white hover:text-gray-300 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800 min-h-[44px] interactive-element"
              >
                Contact
              </button>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">
                <span className="text-white">© 2025 Nexus Luma. All rights reserved.</span>
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-white">Powered by <span className="text-gradient font-semibold">Nexus Luma</span></span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModals
        privacyOpen={privacyOpen}
        termsOpen={termsOpen}
        contactOpen={contactOpen}
        onClosePrivacy={() => setPrivacyOpen(false)}
        onCloseTerms={() => setTermsOpen(false)}
        onCloseContact={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;