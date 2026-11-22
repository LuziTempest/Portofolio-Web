import { ActivitiesSection } from '@/components/sections/activities-section';
import { ExperienceSection } from '@/components/sections/experience-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProfileSection } from '@/components/sections/profile-section';
import { WorkSection } from '@/components/sections/work-section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function HomePage() {
  return (
    <>
      <main id="main-content" className="page-enter" tabIndex={-1}>
        <HeroSection />
        <ProfileSection />
        <WorkSection />
        <ExperienceSection />
        <ActivitiesSection />
      </main>
      <ScrollReveal />
    </>
  );
}
