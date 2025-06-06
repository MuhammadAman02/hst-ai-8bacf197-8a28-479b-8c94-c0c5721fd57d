import { MapPin, GraduationCap, Building, Award, Briefcase, Star } from 'lucide-react';
import { AccountantProfile } from '../types';

interface ProfileCardProps {
  profile: AccountantProfile;
  style?: React.CSSProperties;
  className?: string;
}

const ProfileCard = ({ profile, style, className = '' }: ProfileCardProps) => {
  console.log('Modern ProfileCard rendered for:', profile.name);

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Junior':
        return 'from-blue-500 to-cyan-500';
      case 'Mid-Level':
        return 'from-purple-500 to-pink-500';
      case 'Senior':
        return 'from-orange-500 to-red-500';
      case 'Partner':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      className={`profile-card w-full max-w-sm mx-auto animate-fade-scale ${className}`}
      style={style}
    >
      {/* Hero Image Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={profile.photo} 
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Experience Badge */}
        <div className="absolute top-6 right-6">
          <div className={`experience-badge bg-gradient-to-r ${getExperienceColor(profile.experience)} shadow-lg`}>
            <Star className="w-3 h-3 mr-1" />
            {profile.experience}
          </div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">{profile.name}</h2>
            <p className="text-white/90 text-lg font-medium">{profile.age} years old</p>
            <div className="flex items-center space-x-2 text-white/80">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">{profile.yearsExperience} years experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-6">
        {/* Specialization */}
        <div className="text-center">
          <span className="skill-badge text-lg font-semibold px-6 py-2">
            {profile.specialization}
          </span>
        </div>

        {/* Company & Location */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{profile.company}</p>
              <p className="text-sm text-gray-600">Company</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{profile.location}</p>
              <p className="text-sm text-gray-600">Location</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{profile.education}</p>
              <p className="text-sm text-gray-600">Education</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Certifications */}
        {profile.certifications.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Certifications</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map((cert, index) => (
                <span 
                  key={index}
                  className="cert-badge"
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
            <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200"
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