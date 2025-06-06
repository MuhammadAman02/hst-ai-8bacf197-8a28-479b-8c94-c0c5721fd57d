import { useState, useRef, useEffect } from 'react';
import { Heart, X, Star, RotateCcw, Zap } from 'lucide-react';
import ProfileCard from './ProfileCard';
import MatchModal from './MatchModal';
import { AccountantProfile } from '../types';

// Enhanced mock data
const mockProfiles: AccountantProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=700&fit=crop&crop=face',
    specialization: 'Tax Strategy',
    experience: 'Mid-Level',
    company: 'Deloitte',
    location: 'New York, NY',
    certifications: ['CPA', 'EA'],
    bio: 'Passionate about helping businesses optimize their tax strategies. I believe in making complex financial concepts accessible and actionable.',
    yearsExperience: 5,
    education: 'MBA in Accounting, NYU Stern',
    interests: ['Hiking', 'Cooking', 'Financial Planning', 'Yoga']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    age: 32,
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=700&fit=crop&crop=face',
    specialization: 'Forensic Accounting',
    experience: 'Senior',
    company: 'KPMG',
    location: 'Chicago, IL',
    certifications: ['CPA', 'CFE', 'CFF'],
    bio: 'Forensic accountant with a passion for uncovering financial mysteries and ensuring corporate transparency.',
    yearsExperience: 8,
    education: 'MS Forensic Accounting, DePaul University',
    interests: ['Chess', 'Rock Climbing', 'Mystery Novels', 'Data Analytics']
  },
  {
    id: '3',
    name: 'Emily Johnson',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=700&fit=crop&crop=face',
    specialization: 'Audit & Assurance',
    experience: 'Junior',
    company: 'PwC',
    location: 'San Francisco, CA',
    certifications: ['CPA (in progress)'],
    bio: 'Recent graduate excited about building a career in audit. Love exploring innovative approaches to traditional accounting practices.',
    yearsExperience: 2,
    education: 'BS Accounting, UC Berkeley',
    interests: ['Photography', 'Food', 'Travel', 'Sustainability']
  },
  {
    id: '4',
    name: 'David Kim',
    age: 35,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=700&fit=crop&crop=face',
    specialization: 'Management Accounting',
    experience: 'Senior',
    company: 'Ernst & Young',
    location: 'Los Angeles, CA',
    certifications: ['CMA', 'CPA'],
    bio: 'Strategic finance professional helping companies make data-driven decisions. Passionate about the intersection of technology and finance.',
    yearsExperience: 10,
    education: 'MBA Finance, UCLA Anderson',
    interests: ['Surfing', 'Craft Beer', 'Programming', 'Investing']
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=700&fit=crop&crop=face',
    specialization: 'Financial Reporting',
    experience: 'Mid-Level',
    company: 'Grant Thornton',
    location: 'Miami, FL',
    certifications: ['CPA', 'CISA'],
    bio: 'Financial reporting specialist with a love for precision and detail. Committed to helping organizations maintain financial transparency.',
    yearsExperience: 6,
    education: 'MS Accounting, University of Miami',
    interests: ['Salsa Dancing', 'Volunteering', 'Beach Volleyball', 'Reading']
  }
];

const SwipeInterface = () => {
  const [profiles, setProfiles] = useState<AccountantProfile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<AccountantProfile | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [swipeIntensity, setSwipeIntensity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  console.log('Ultra-modern SwipeInterface rendered, currentIndex:', currentIndex);

  const currentProfile = profiles[currentIndex];

  useEffect(() => {
    // Add haptic feedback simulation
    const addHapticFeedback = () => {
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    };

    if (swipeDirection) {
      addHapticFeedback();
    }
  }, [swipeDirection]);

  const handleSwipe = (action: 'like' | 'pass' | 'super-like') => {
    console.log('Swipe action:', action, 'for profile:', currentProfile?.name);
    
    if (!currentProfile) return;

    // Enhanced match probability
    if ((action === 'like' || action === 'super-like') && Math.random() < 0.5) {
      setMatchedProfile(currentProfile);
      setIsMatch(true);
    }

    // Modern swipe animation
    if (cardRef.current) {
      if (action === 'like' || action === 'super-like') {
        cardRef.current.classList.add('animate-swipe-right');
      } else {
        cardRef.current.classList.add('animate-swipe-left');
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      if (cardRef.current) {
        cardRef.current.classList.remove('animate-swipe-right', 'animate-swipe-left');
        cardRef.current.style.transform = '';
      }
      setSwipeDirection(null);
      setSwipeIntensity(0);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: touch.clientX - rect.left - rect.width / 2,
        y: touch.clientY - rect.top - rect.height / 2
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = touch.clientX - centerX - dragOffset.x;
    const deltaY = touch.clientY - centerY - dragOffset.y;
    
    const rotation = deltaX * 0.1;
    const opacity = Math.max(0.8, 1 - Math.abs(deltaX) / 300);
    const scale = Math.max(0.95, 1 - Math.abs(deltaX) / 1000);
    
    cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg) scale(${scale})`;
    cardRef.current.style.opacity = opacity.toString();

    // Enhanced swipe feedback
    const intensity = Math.min(100, Math.abs(deltaX) / 2);
    setSwipeIntensity(intensity);

    if (Math.abs(deltaX) > 60) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    setIsDragging(false);
    
    const touch = e.changedTouches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = touch.clientX - centerX;
    
    if (Math.abs(deltaX) > 120) {
      if (deltaX > 0) {
        handleSwipe('like');
      } else {
        handleSwipe('pass');
      }
    } else {
      // Smooth snap back
      cardRef.current.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '1';
      
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
        setSwipeDirection(null);
        setSwipeIntensity(0);
      }, 400);
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setProfiles([...mockProfiles]);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center animate-bounce-in">
          <div className="w-32 h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-pulse-glow">
            <Heart className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-display mb-4">All Caught Up!</h2>
          <p className="text-body mb-8 max-w-sm mx-auto">You've seen all the amazing accountants in your area. Check back soon for new connections!</p>
          <button 
            onClick={resetStack}
            className="fab fab-like w-auto px-8 py-4 rounded-2xl"
          >
            <RotateCcw className="w-6 h-6 mr-2 text-white" />
            <span className="text-white font-semibold">Restart</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Cards container */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="relative w-full max-w-sm">
          {/* Background cards with modern stacking */}
          {profiles[currentIndex + 2] && (
            <div className="absolute inset-0 transform scale-90 opacity-20 rotate-2 blur-sm">
              <ProfileCard profile={profiles[currentIndex + 2]} />
            </div>
          )}
          
          {profiles[currentIndex + 1] && (
            <div className="absolute inset-0 transform scale-95 opacity-50 -rotate-1">
              <ProfileCard profile={profiles[currentIndex + 1]} />
            </div>
          )}
          
          {/* Current card with enhanced interactions */}
          {currentProfile && (
            <div
              ref={cardRef}
              className={`relative z-10 cursor-grab active:cursor-grabbing transition-transform ${
                isDragging ? '' : 'hover:scale-105'
              }`}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <ProfileCard profile={currentProfile} />
              
              {/* Enhanced swipe indicators */}
              {swipeDirection && (
                <div className={`swipe-indicator rounded-3xl ${
                  swipeDirection === 'right' ? 'swipe-like' : 'swipe-reject'
                }`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transform scale-${Math.min(150, 100 + swipeIntensity) / 100} ${
                    swipeDirection === 'right' 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-br from-red-400 to-pink-500'
                  }`}>
                    {swipeDirection === 'right' ? (
                      <Heart className="w-12 h-12 text-white" />
                    ) : (
                      <X className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ultra-modern floating action buttons */}
      <div className="relative">
        <div className="glass-panel mx-4 mb-8 rounded-3xl p-6">
          <div className="flex justify-center items-center space-x-6">
            <button 
              onClick={() => handleSwipe('pass')}
              className="fab fab-reject"
              disabled={isDragging}
            >
              <X className="w-7 h-7 text-white" />
            </button>
            
            <button 
              onClick={() => handleSwipe('super-like')}
              className="fab fab-super"
              disabled={isDragging}
            >
              <Zap className="w-6 h-6 text-white" />
            </button>
            
            <button 
              onClick={() => handleSwipe('like')}
              className="fab fab-like"
              disabled={isDragging}
            >
              <Heart className="w-7 h-7 text-white" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 flex justify-center">
            <div className="flex space-x-1">
              {profiles.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index < currentIndex 
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600' 
                      : index === currentIndex
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 scale-125'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match Modal */}
      <MatchModal 
        isOpen={isMatch}
        onClose={() => setIsMatch(false)}
        profile={matchedProfile}
      />
    </div>
  );
};

export default SwipeInterface;