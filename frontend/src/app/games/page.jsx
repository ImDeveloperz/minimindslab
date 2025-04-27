"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function GamesPage() {
  const games = [
    { name: "Memory Cards", path: "/memory-cards" },
    { name: "Pattern Builder", path: "/pattern-builder" },
  ];

  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('miniMindsUser');

    if (!storedUser) {
      router.push('/login');
      return;
    }

    setUserData(JSON.parse(storedUser));
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-100 to-blue-100">
        <div className="text-3xl text-purple-600 animate-bounce">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MiniMinds Lab - Games</title>
        <meta name="description" content="Play and learn with MiniMinds Lab games" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center bg-indigo-100 rounded-full text-4xl">
                {userData.avatar}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {userData.username}!</h2>
                <p className="text-indigo-600">Ready to learn something new today?</p>
              </div>
            </div>

            <p className="text-center text-gray-600 py-8 text-xl">
              Game selection page. Choose a learning adventure!
            </p>

            <div className="flex flex-col gap-6">
              {games.map(game => (
                <div
                  key={game.name}
                  className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all"
                  onClick={() => router.push(game.path)}
                >
                  <h3 className="text-xl font-bold text-indigo-800">{game.name}</h3>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('miniMindsUser');
              router.push('/login');
            }}
            className="mx-auto block px-6 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </main>
    </>
  );
}