import { MapPin, GraduationCap, Building, Award } from 'lucide-react';
import { AccountantProfile } from '../types';

interface ProfileCardProps {
  profile: AccountantProfile;
  style?: React.CSSProperties;
  className?: string;
}

const ProfileCard = ({ profile, style, className = '' }: ProfileCardProps) => {
  console.log('ProfileCard rendered for:', profile.name);

  const getExperienceBadgeClass = (experience: string) => {
    switch (experience) {
      case 'Junior':
        return 'experience-junior';
      case 'Mid-Level':
        return 'experience-mid';
      case 'Senior':
        return 'experience-senior';
      case 'Partner':
        return 'experience-partner';
      default:
        return 'experience-junior';
    }
  };

  return (
    <div 
      className={`swipe-card w-full max-w-sm mx-auto ${className}`}
      style={style}
    >
      {/* Profile Image */}
      <div className="relative h-80 overflow-hidden">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Experience Badge */}
        <div className="absolute top-4 right-4">
          <span className={`experience-badge ${getExperienceBadgeClass(profile.experience)}`}>
            {profile.experience}
          </span>
        </div>
        
        {/* Name and Age */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
          <p className="text-sm opacity-90">{profile.yearsExperience} years experience</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-4">
        {/* Specialization */}
        <div>
          <span className="professional-badge">
            {profile.specialization}
          </span>
        </div>

        {/* Company and Location */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-slate-600">
            <Building className="w-4 h-4" />
            <span className="text-sm">{profile.company}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">{profile.education}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-700 text-sm leading-relaxed">
          {profile.bio}
        </p>

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <div>
            <div className="flex items-center space-x-1 mb-2">
              <Award className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Certifications
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {profile.certifications.map((cert, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {profile.interests.length > 0 && (
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block">
              Interests
            </span>
            <div className="flex flex-wrap gap-1">
              {profile.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
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