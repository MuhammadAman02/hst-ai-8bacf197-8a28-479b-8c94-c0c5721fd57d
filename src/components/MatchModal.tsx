import { X, MessageCircle, Heart, Sparkles, Star, Send } from 'lucide-react';
import { AccountantProfile } from '../types';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AccountantProfile | null;
}

const MatchModal = ({ isOpen, onClose, profile }: MatchModalProps) => {
  console.log('Ultra-modern MatchModal rendered, isOpen:', isOpen, 'profile:', profile?.name);

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="modern-card max-w-sm w-full mx-4 overflow-hidden animate-bounce-in">
        {/* Celebration header with modern design */}
        <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-8 text-center overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className={`absolute w-2 h-2 bg-white rounded-full animate-pulse`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white interactive-element"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <div className="mb-6 relative">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse-glow">
                <Heart className="w-12 h-12 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 animate-spin">
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
              <div className="absolute -bottom-2 -left-2 animate-bounce">
                <Star className="w-6 h-6 text-yellow-200" />
              </div>
            </div>
            
            <h2 className="text-4xl font-black text-white mb-3 tracking-tight">It's a Match!</h2>
            <p className="text-white/90 text-lg font-medium">
              You and {profile.name} connected
            </p>
          </div>
        </div>

        {/* Profile preview with modern styling */}
        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-heading text-xl">{profile.name}</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-bold">
                {profile.specialization}
              </p>
              <p className="text-body text-sm">{profile.company}</p>
            </div>
          </div>

          {/* Modern action buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg interactive-element shadow-xl flex items-center justify-center space-x-3">
              <Send className="w-6 h-6" />
              <span>Send Message</span>
            </button>
            
            <button 
              onClick={onClose}
              className="w-full glass-panel text-gray-700 py-4 rounded-2xl font-semibold text-lg interactive-element"
            >
              Keep Exploring
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-violet-600">{profile.yearsExperience}</div>
              <div className="text-xs text-gray-600 font-medium">Years Exp</div>
            </div>
            <div className="glass-panel rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-purple-600">{profile.certifications.length}</div>
              <div className="text-xs text-gray-600 font-medium">Certs</div>
            </div>
            <div className="glass-panel rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-pink-600">{profile.interests.length}</div>
              <div className="text-xs text-gray-600 font-medium">Interests</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;