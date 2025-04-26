"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import confetti from 'canvas-confetti';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedData = localStorage.getItem('miniMindsUser');
    
    if (!storedData) {
      router.push('/login');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Add a slight delay before showing content for animation purposes
      setTimeout(() => {
        setIsLoading(false);
        
        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        // Trigger stats animation after a short delay
        setTimeout(() => {
          setAnimateStats(true);
        }, 600);
      }, 800);
      
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Clear sparkle animation
    const element = document.getElementById('avatar-container');
    if (element) element.classList.add('scale-out');
    
    // Add slight delay before logout for animation
    setTimeout(() => {
      localStorage.removeItem('miniMindsUser');
      router.push('/login');
    }, 300);
  };

  // Placeholder stats data
  const userStats = {
    points: Math.floor(Math.random() * 1500),
    gamesPlayed: Math.floor(Math.random() * 25),
    badges: Math.floor(Math.random() * 12)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100">
        <div className="text-4xl text-indigo-500 animate-bounce">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Profile | MiniMinds Lab</title>
        <meta name="description" content="View your MiniMinds Lab profile" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-4">
        <div className="max-w-lg mx-auto">
          {/* Header bar */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-extrabold text-indigo-600">MiniMinds Lab</h1>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              Log Out
            </button>
          </div>
          
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 transform transition-all duration-500 hover:shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
              <div 
                id="avatar-container"
                className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-6xl transform transition-all duration-300 hover:rotate-12 hover:scale-110 shadow-lg"
              >
                {userData?.avatar || '👤'}
              </div>
            </div>
            
            <div className="p-6 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-1">{userData?.username || 'User'}</h2>
              <p className="text-gray-500 text-sm mb-6">Session ID: {userData?.sessionId || 'Unknown'}</p>
              
              <div className="mb-6 bg-indigo-50 p-4 rounded-2xl">
                <p className="text-lg font-semibold text-indigo-800 mb-1">Learning Explorer</p>
                <p className="text-indigo-600 text-sm">Keep collecting stars and badges!</p>
              </div>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Points Card */}
            <div 
              className={`bg-gradient-to-br from-amber-100 to-amber-200 p-6 rounded-2xl shadow-md transform transition-all duration-500 ${
                animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="text-xl font-bold text-amber-800">Total Points</h3>
              <p className="text-3xl font-extrabold text-amber-700">{userStats.points}</p>
            </div>
            
            {/* Games Card */}
            <div 
              className={`bg-gradient-to-br from-emerald-100 to-emerald-200 p-6 rounded-2xl shadow-md transform transition-all duration-500 ${
                animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="text-4xl mb-2">🎮</div>
              <h3 className="text-xl font-bold text-emerald-800">Games Played</h3>
              <p className="text-3xl font-extrabold text-emerald-700">{userStats.gamesPlayed}</p>
            </div>
            
            {/* Badges Card */}
            <div 
              className={`bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl shadow-md transform transition-all duration-500 ${
                animateStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="text-4xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-blue-800">Badges</h3>
              <p className="text-3xl font-extrabold text-blue-700">{userStats.badges}</p>
            </div>
          </div>
          
          {/* Achievements Section */}
          <div className={`bg-white rounded-3xl shadow-lg p-6 transition-all duration-700 transform ${animateStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Recent Achievements</h3>
            
            <div className="space-y-4">
              {[
                { icon: '🧩', title: 'Puzzle Master', desc: 'Completed 5 puzzles' },
                { icon: '🧮', title: 'Math Wizard', desc: 'Solved 10 math problems' },
                { icon: '📚', title: 'Bookworm', desc: 'Read 3 stories' },
              ].map((achievement, index) => (
                <div key={index} className="flex items-center p-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <h4 className="font-bold text-indigo-800">{achievement.title}</h4>
                    <p className="text-sm text-indigo-600">{achievement.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow hover:shadow-lg transform hover:scale-102 transition-all duration-300 font-bold">
              Play More Games!
            </button>
          </div>
          
          <div className="text-center text-indigo-400 mt-8 text-sm">
            MiniMinds Lab - Making learning fun!
          </div>
        </div>
      </main>
    </>
  );
}