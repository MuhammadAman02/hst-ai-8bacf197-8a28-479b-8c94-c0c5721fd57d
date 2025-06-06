import { Calculator, Heart, MessageCircle, User, Settings } from 'lucide-react';

const Header = () => {
  console.log('Modern Header component rendered');
  
  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-md mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">AccountMatch</h1>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <MessageCircle className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;