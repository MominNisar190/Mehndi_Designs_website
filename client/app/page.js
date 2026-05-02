import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedDesigns from '@/components/home/FeaturedDesigns';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'Saniya Mehndi Designs — Let Your Hands Tell Your Beautiful Story',
  description:
    'Premium mehndi designs for bridal, festive, and everyday occasions. Book your appointment online.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <FeaturedDesigns />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
