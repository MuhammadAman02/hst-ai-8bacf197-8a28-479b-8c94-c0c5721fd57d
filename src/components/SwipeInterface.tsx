import { useState, useRef } from 'react';
import { Heart, X, Star } from 'lucide-react';
import ProfileCard from './ProfileCard';
import MatchModal from './MatchModal';
import { AccountantProfile } from '../types';

// Mock data for accountant profiles
const mockProfiles: AccountantProfile[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
    specialization: 'Tax Accounting',
    experience: 'Mid-Level',
    company: 'Deloitte',
    location: 'New York, NY',
    certifications: ['CPA', 'EA'],
    bio: 'Passionate about helping businesses optimize their tax strategies. Love hiking and trying new restaurants in my free time.',
    yearsExperience: 5,
    education: 'MBA in Accounting, NYU Stern',
    interests: ['Hiking', 'Cooking', 'Financial Planning', 'Yoga']
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    age: 32,
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
    specialization: 'Forensic Accounting',
    experience: 'Senior',
    company: 'KPMG',
    location: 'Chicago, IL',
    certifications: ['CPA', 'CFE', 'CFF'],
    bio: 'Forensic accountant with a passion for uncovering financial mysteries. When not analyzing data, you can find me playing chess or rock climbing.',
    yearsExperience: 8,
    education: 'MS Forensic Accounting, DePaul University',
    interests: ['Chess', 'Rock Climbing', 'Mystery Novels', 'Data Analytics']
  },
  {
    id: '3',
    name: 'Emily Johnson',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
    specialization: 'Audit & Assurance',
    experience: 'Junior',
    company: 'PwC',
    location: 'San Francisco, CA',
    certifications: ['CPA (in progress)'],
    bio: 'Recent graduate excited about building a career in audit. Love exploring the Bay Area food scene and practicing photography.',
    yearsExperience: 2,
    education: 'BS Accounting, UC Berkeley',
    interests: ['Photography', 'Food', 'Travel', 'Sustainability']
  },
  {
    id: '4',
    name: 'David Kim',
    age: 35,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    specialization: 'Management Accounting',
    experience: 'Senior',
    company: 'Ernst & Young',
    location: 'Los Angeles, CA',
    certifications: ['CMA', 'CPA'],
    bio: 'Strategic finance professional helping companies make data-driven decisions. Enjoy surfing, craft beer, and weekend coding projects.',
    yearsExperience: 10,
    education: 'MBA Finance, UCLA Anderson',
    interests: ['Surfing', 'Craft Beer', 'Programming', 'Investing']
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
    specialization: 'Financial Reporting',
    experience: 'Mid-Level',
    company: 'Grant Thornton',
    location: 'Miami, FL',
    certifications: ['CPA', 'CISA'],
    bio: 'Financial reporting specialist with a love for precision and detail. Passionate about salsa dancing and volunteering at local nonprofits.',
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
  const cardRef = useRef<HTMLDivElement>(null);

  console.log('SwipeInterface rendered, currentIndex:', currentIndex, 'profiles length:', profiles.length);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (action: 'like' | 'pass' | 'super-like') => {
    console.log('Swipe action:', action, 'for profile:', currentProfile?.name);
    
    if (!currentProfile) return;

    // Simulate match (30% chance for likes)
    if (action === 'like' && Math.random() < 0.3) {
      setMatchedProfile(currentProfile);
      setIsMatch(true);
    }

    // Move to next profile
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
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
    
    cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotation}deg)`;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !cardRef.current) return;
    
    setIsDragging(false);
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = e.clientX - centerX;
    
    if (Math.abs(deltaX) > 100) {
      // Trigger swipe
      if (deltaX > 0) {
        cardRef.current.classList.add('animate-swipe-right');
        handleSwipe('like');
      } else {
        cardRef.current.classList.add('animate-swipe-left');
        handleSwipe('pass');
      }
    } else {
      // Snap back
      cardRef.current.style.transform = '';
    }
  };

  if (currentIndex >= profiles.length) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-professional rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">No More Profiles</h2>
          <p className="text-slate-600 mb-6">Check back later for new accountants in your area!</p>
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setProfiles(mockProfiles);
            }}
            className="bg-gradient-professional text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Cards Stack */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        <div className="relative w-full max-w-sm">
          {/* Next card (background) */}
          {profiles[currentIndex + 1] && (
            <div className="absolute inset-0 transform scale-95 opacity-50">
              <ProfileCard profile={profiles[currentIndex + 1]} />
            </div>
          )}
          
          {/* Current card */}
          {currentProfile && (
            <div
              ref={cardRef}
              className={`relative z-10 cursor-grab active:cursor-grabbing ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <ProfileCard profile={currentProfile} />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-6 p-6 bg-white/80 backdrop-blur-md">
        <button 
          onClick={() => handleSwipe('pass')}
          className="action-button pass-button"
        >
          <X className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => handleSwipe('super-like')}
          className="action-button super-like-button"
        >
          <Star className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => handleSwipe('like')}
          className="action-button like-button"
        >
          <Heart className="w-6 h-6" />
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