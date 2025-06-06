import { X, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { AccountantProfile } from '../types';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AccountantProfile | null;
}

const MatchModal = ({ isOpen, onClose, profile }: MatchModalProps) => {
  console.log('Modern MatchModal rendered, isOpen:', isOpen, 'profile:', profile?.name);

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full mx-4 overflow-hidden animate-fade-scale shadow-2xl">
        {/* Celebration Header */}
        <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-8 text-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
            <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-6 h-6 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <div className="mb-6 relative">
              <div className="w-20 h-20 gradient-success rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">It's a Match!</h2>
            <p className="text-white/90 text-lg">
              You and {profile.name} liked each other
            </p>
          </div>
        </div>

        {/* Profile Preview */}
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <img 
                src={profile.photo} 
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900">{profile.name}</h3>
              <p className="text-purple-600 font-semibold">{profile.specialization}</p>
              <p className="text-gray-600 text-sm">{profile.company}</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105">
              <MessageCircle className="w-6 h-6" />
              <span>Send Message</span>
            </button>
            
            <button 
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-all duration-300"
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