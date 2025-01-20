import React from 'react';
import PageLayout from '../components/Layout/PageLayout';
import DotBackground from '../components/DotBackground/DotBg';

const Events = () => {
  return (
    <PageLayout>
        <DotBackground>
          <div className="min-h-screen">
            <h1 className="text-4xl text-center  font-bold text-white">Events</h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              This is the events page content.
            </p>
          </div>
        </DotBackground>
    </PageLayout>
  );
};

export default Events; 