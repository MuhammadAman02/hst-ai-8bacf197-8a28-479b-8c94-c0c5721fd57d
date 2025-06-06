import { X, MessageCircle, Heart } from 'lucide-react';
import { AccountantProfile } from '../types';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AccountantProfile | null;
}

const MatchModal = ({ isOpen, onClose, profile }: MatchModalProps) => {
  console.log('MatchModal rendered, isOpen:', isOpen, 'profile:', profile?.name);

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full mx-4 overflow-hidden animate-card-enter">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-center">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="mb-4">
            <Heart className="w-16 h-16 text-white mx-auto animate-pulse-gentle" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">It's a Match!</h2>
          <p className="text-white/90 text-sm">
            You and {profile.name} liked each other
          </p>
        </div>

        {/* Profile Preview */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img 
              src={profile.photo} 
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-slate-600 text-sm">{profile.specialization}</p>
              <p className="text-slate-500 text-xs">{profile.company}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Send Message</span>
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchModal;