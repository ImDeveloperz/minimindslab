import Head from 'next/head';
import LoginForm from '@/components/LoginForm';

export default function Login() {
  return (
    <>
      <Head>
        <title>MiniMinds Lab - Login</title>
        <meta name="description" content="Login to MiniMinds Lab - A fun learning platform for kids" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <LoginForm />
      </main>
    </>
  );
}