import Header from '../components/Header';
import SwipeInterface from '../components/SwipeInterface';

const Index = () => {
  console.log('Index page rendered');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <SwipeInterface />
    </div>
  );
};

export default Index;