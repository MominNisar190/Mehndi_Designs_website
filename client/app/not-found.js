import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-serif text-8xl text-gold-500 mb-4">404</h1>
        <h2 className="font-serif text-2xl text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-gold">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
