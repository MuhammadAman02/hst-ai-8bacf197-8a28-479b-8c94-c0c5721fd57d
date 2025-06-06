import Header from '../components/Header';
import SwipeInterface from '../components/SwipeInterface';

const Index = () => {
  console.log('Ultra-modern Index page rendered');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100 relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-xl"></div>
      </div>
      
      <Header />
      <SwipeInterface />
    </div>
  );
};

export default Index;