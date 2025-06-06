import { Heart, MessageCircle, User, Sparkles, Bell } from 'lucide-react';

const Header = () => {
  console.log('Ultra-modern Header component rendered');
  
  return (
    <>
      {/* Status bar */}
      <div className="status-bar" />
      
      {/* Main header */}
      <header className="relative z-40 pt-12">
        <div className="glass-panel mx-4 mt-4 rounded-2xl">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo with modern styling */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-red-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-display text-xl">AccountMatch</h1>
                  <p className="text-xs text-gray-500 font-medium">Professional Network</p>
                </div>
              </div>
              
              {/* Modern navigation */}
              <div className="flex items-center space-x-2">
                <button className="interactive-element w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center relative">
                  <Bell className="w-5 h-5 text-gray-700" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <button className="interactive-element w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Heart className="w-5 h-5 text-gray-700" />
                </button>
                <button className="interactive-element w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-700" />
                </button>
                <button className="interactive-element w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;