import { MapPin, Briefcase, GraduationCap, Star, Verified, TrendingUp } from 'lucide-react';
import { AccountantProfile } from '../types';

interface ProfileCardProps {
  profile: AccountantProfile;
  style?: React.CSSProperties;
  className?: string;
}

const ProfileCard = ({ profile, style, className = '' }: ProfileCardProps) => {
  console.log('Ultra-modern ProfileCard rendered for:', profile.name);

  const getExperienceGradient = (experience: string) => {
    switch (experience) {
      case 'Junior':
        return 'from-blue-500 to-cyan-400';
      case 'Mid-Level':
        return 'from-purple-500 to-pink-400';
      case 'Senior':
        return 'from-orange-500 to-red-400';
      case 'Partner':
        return 'from-yellow-400 to-orange-400';
      default:
        return 'from-gray-500 to-gray-400';
    }
  };

  return (
    <div 
      className={`modern-card w-full max-w-sm mx-auto animate-float-in ${className}`}
      style={style}
    >
      {/* Hero section with modern overlay */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Floating status indicators */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <div className="glass-panel px-3 py-1.5 rounded-full">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">Online</span>
            </div>
          </div>
          
          <div className={`glass-panel px-3 py-1.5 rounded-full bg-gradient-to-r ${getExperienceGradient(profile.experience)}`}>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-white" />
              <span className="text-white text-xs font-bold">{profile.experience}</span>
            </div>
          </div>
        </div>

        {/* Modern profile info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-3xl font-black text-white tracking-tight">{profile.name}</h2>
              <Verified className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="flex items-center space-x-4 text-white/90">
              <span className="text-lg font-semibold">{profile.age}</span>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm font-medium">{profile.yearsExperience}y exp</span>
              </div>
            </div>
            
            <div className="modern-badge bg-white/20 backdrop-blur-md border-white/30 text-white">
              {profile.specialization}
            </div>
          </div>
        </div>
      </div>

      {/* Content section with modern cards */}
      <div className="p-6 space-y-4">
        {/* Company info card */}
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-heading text-lg">{profile.company}</h3>
              <p className="text-body text-sm">{profile.location}</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
        </div>

        {/* Education card */}
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-heading text-sm">{profile.education}</h3>
              <p className="text-body text-xs">Education</p>
            </div>
          </div>
        </div>

        {/* Bio with modern styling */}
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-body text-sm leading-relaxed">{profile.bio}</p>
        </div>

        {/* Certifications with modern badges */}
        {profile.certifications.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-heading text-sm">Certifications</h3>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="modern-badge"
                >
                  {cert}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interests with modern styling */}
        {profile.interests.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-heading text-sm">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;