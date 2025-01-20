import React from 'react';
import TeamSection from '../components/Team/TeamSection';
import DotBackground from '../components/DotBackground/DotBg';
import TracingBeam from '../components/TracingBeams/TracingBeam';
import PageLayout from '../components/Layout/PageLayout';

const Team = () => {
  return (
    <PageLayout noDefaultPadding>
      <DotBackground>
        <div className="min-h-screen pt-16">
          <TracingBeam>
            <div className="px-4 md:px-8 pb-16">
                <TeamSection/>
            </div>
          </TracingBeam>
        </div>
      </DotBackground>
    </PageLayout>
  );
};

export default Team;