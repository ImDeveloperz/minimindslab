'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'http://localhost:8000'; // Update this to your FastAPI server URL

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const avatars = ['👧', '👦', '🧑‍🚀', '👩‍🎨', '🧙‍♂️', '🦸‍♀️'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !selectedAvatar) {
      setError('Please enter a username and select an avatar');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/session/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          avatar: selectedAvatar,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create session');
      }
      
      const userData = await response.json();
      
      // Store session ID in localStorage
      localStorage.setItem('miniMindsUser', JSON.stringify(userData));
      
      // Redirect to games page
      router.push('/games');
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };
  
  const handleGuestLogin = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/session/guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create guest session');
      }
      
      const userData = await response.json();
      
      // Store session ID in localStorage
      localStorage.setItem('miniMindsUser', JSON.stringify(userData));
      
      // Redirect to games page
      router.push('/games');
    } catch (error) {
      setError(error.message);
      setIsSubmitting(false);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    if (error) setError('');
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className={`bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 ${isSubmitting ? 'scale-95 opacity-80' : 'scale-100'}`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">MiniMinds Lab</h1>
            <p className="text-indigo-100">Let's explore and learn together!</p>
          </div>
          
          {/* Form Content */}
          <div className="p-8">
            {isSubmitting ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-bounce text-5xl mb-6">🚀</div>
                <p className="text-xl font-medium text-indigo-600">Getting ready for adventure...</p>
              </div>
            ) : (
              <>
                {/* Guest Login Button */}
                <button 
                  onClick={handleGuestLogin}
                  className="w-full py-4 mb-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  🎮 Quick Guest Login
                </button>
                
                <div className="relative flex items-center py-2 mb-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">or create account</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {/* Username Input */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                      Pick a cool username
                    </label>
                    <input
                      id="username" 
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg"
                      placeholder="3-12 characters"
                    />
                  </div>
                  
                  {/* Avatar Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-3">
                      Choose your avatar
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar}
                          type="button"
                          onClick={() => handleAvatarSelect(avatar)}
                          className={`h-20 text-4xl flex items-center justify-center rounded-xl transition-all duration-200 
                            ${selectedAvatar === avatar 
                              ? 'bg-indigo-500 shadow-lg scale-105' 
                              : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {avatar}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
                      {error}
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-2xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                  >
                    Let's Play! ✨
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}