import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import Promise from '@/components/home/Promise';
import Featured from '@/components/home/Featured';
import AboutTeaser from '@/components/home/AboutTeaser';
import Testimonials from '@/components/home/Testimonials';
import InstagramFeed from '@/components/home/InstagramFeed';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Promise />
      <AboutTeaser />
      <Featured />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
