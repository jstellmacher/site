'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import CTASection from '../components/CTASection';
import IconSkills from '../components/IconSkills';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import ExperienceSection from '../components/Experience';
import SoftSkills from '../components/SoftSkills';
import ConditionalFloatingSquid from '../components/ConditionalFloatingSquid';
import FeedbackForm from '@/components/FeedbackForm';
import Dashboard from '../components/Dashboard'

const Page = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <Dashboard />
      {/* <HeroSection /> */}
      <CTASection />
      <IconSkills />
      <SoftSkills />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <FeedbackForm />
      <ConditionalFloatingSquid scrollY={scrollY} />
    </>
  );
};

export default Page;