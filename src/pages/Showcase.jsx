import React from 'react';
import DotBackground from '../components/DotBackground/DotBg';
import TracingBeam from '../components/TracingBeams/TracingBeam';
import ExpandableCards from '../components/ExpandableCards/ExpandableCards';
import PageLayout from '../components/Layout/PageLayout';

const Showcase = () => {
  return (
    <PageLayout noDefaultPadding>
      <div className="pt-32">
        <TracingBeam>
          <div className="px-4 md:px-8 pb-16">
            <DotBackground>
              <ExpandableCards/>
            </DotBackground>
          </div>
        </TracingBeam>
      </div>
    </PageLayout>
  );
};

export default Showcase;