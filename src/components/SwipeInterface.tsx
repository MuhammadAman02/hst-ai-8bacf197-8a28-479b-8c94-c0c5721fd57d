import { useState, useRef } from 'react';
import { Heart, X, Star, RotateCcw } from 'lucide-react';
import ProfileCard from './ProfileCard';
import MatchModal from './MatchModal';
import { AccountantProfile } from '../types';

// Mock data with better images
const mockProfiles: AccountantProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=700&fit=crop&crop=face',
    specialization: 'Tax Accounting',
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
  const cardRef = useRef<HTMLDivElement>(null);

  console.log('Modern SwipeInterface rendered, currentIndex:', currentIndex);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (action: 'like' | 'pass' | 'super-like') => {
    console.log('Swipe action:', action, 'for profile:', currentProfile?.name);
    
    if (!currentProfile) return;

    // Simulate match (40% chance for likes and super-likes)
    if ((action === 'like' || action === 'super-like') && Math.random() < 0.4) {
      setMatchedProfile(currentProfile);
      setIsMatch(true);
    }

    // Add swipe animation
    if (cardRef.current) {
      if (action === 'like' || action === 'super-like') {
        cardRef.current.classList.add('animate-swipe-right');
      } else {
        cardRef.current.classList.add('animate-swipe-left');
      }
    }

    // Move to next profile after animation
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      if (cardRef.current) {
        cardRef.current.classList.remove('animate-swipe-right', 'animate-swipe-left');
        cardRef.current.style.transform = '';
      }
    }, 300);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX - dragOffset.x;
    const deltaY = e.clientY - centerY - dragOffset.y;
    
    const rotation = deltaX * 0.1;
    const opacity = Math.max(0.7, 1 - Math.abs(deltaX) / 200);
    
    cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
    cardRef.current.style.opacity = opacity.toString();

    // Show swipe direction indicator
    if (Math.abs(deltaX) > 50) {
      setSwipeDirection(deltaX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    setIsDragging(false);
    setSwipeDirection(null);
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = e.clientX - centerX;
    
    if (Math.abs(deltaX) > 120) {
      // Trigger swipe
      if (deltaX > 0) {
        handleSwipe('like');
      } else {
        handleSwipe('pass');
      }
    } else {
      // Snap back with smooth animation
      cardRef.current.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '1';
      
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
      }, 300);
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setProfiles([...mockProfiles]);
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center animate-slide-up">
          <div className="w-32 h-32 gradient-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Heart className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No More Profiles</h2>
          <p className="text-gray-600 mb-8 text-lg">Check back later for new accountants in your area!</p>
          <button 
            onClick={resetStack}
            className="action-btn like-btn w-auto px-8 py-4 rounded-2xl text-lg font-semibold"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Cards Stack */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="relative w-full max-w-sm">
          {/* Background cards for depth */}
          {profiles[currentIndex + 2] && (
            <div className="absolute inset-0 transform scale-90 opacity-30 rotate-1">
              <ProfileCard profile={profiles[currentIndex + 2]} />
            </div>
          )}
          
          {/* Next card */}
          {profiles[currentIndex + 1] && (
            <div className="absolute inset-0 transform scale-95 opacity-60 -rotate-1">
              <ProfileCard profile={profiles[currentIndex + 1]} />
            </div>
          )}
          
          {/* Current card */}
          {currentProfile && (
            <div
              ref={cardRef}
              className={`relative z-10 cursor-grab active:cursor-grabbing transition-transform ${
                isDragging ? '' : 'hover:scale-105'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <ProfileCard profile={currentProfile} />
              
              {/* Swipe Direction Indicators */}
              {swipeDirection && (
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                  swipeDirection === 'right' ? 'bg-green-500/20' : 'bg-red-500/20'
                } rounded-3xl transition-all duration-200`}>
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
                    swipeDirection === 'right' ? 'bg-green-500' : 'bg-red-500'
                  } shadow-2xl`}>
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

      {/* Modern Action Buttons */}
      <div className="flex justify-center items-center space-x-8 p-8 glass-dark rounded-t-3xl">
        <button 
          onClick={() => handleSwipe('pass')}
          className="action-btn pass-btn"
          disabled={isDragging}
        >
          <X className="w-7 h-7" />
        </button>
        
        <button 
          onClick={() => handleSwipe('super-like')}
          className="action-btn super-like-btn"
          disabled={isDragging}
        >
          <Star className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => handleSwipe('like')}
          className="action-btn like-btn"
          disabled={isDragging}
        >
          <Heart className="w-7 h-7" />
        </button>
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