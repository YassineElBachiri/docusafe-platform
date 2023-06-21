import React from 'react';

function About() {
  return (
    <section className="gradient-bg-hero py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl text-center font-bold text-gray-200 mb-8">
          About Blockchain Transfer Document BDT
        </h2>
        <p className="text-lg text-center text-gray-400 mb-8">
          Blockchain Transfer Document BDT is a revolutionary platform that leverages the power of blockchain technology to provide seamless and secure money transfers. Our mission is to transform the way people send and receive funds across borders, making it faster, more affordable, and transparent.
        </p>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-[#60c5d4] rounded-lg shadow-md p-6">
              <h3 className="text-xl text-center font-bold mb-4">Secure and Transparent</h3>
              <p className="text-gray-600">
                With blockchain technology, every transaction is recorded on an immutable and transparent ledger, ensuring the highest level of security and eliminating the need for intermediaries.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-[#60c5d4] rounded-lg shadow-md p-6">
              <h3 className="text-xl text-center font-bold mb-4">Fast and Efficient</h3>
              <p className="text-gray-600">
                Our platform utilizes the power of blockchain to enable near-instantaneous money transfers, eliminating the delays and inefficiencies associated with traditional banking systems.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-[#60c5d4] rounded-lg shadow-md p-6">
              <h3 className="text-xl text-center font-bold mb-4">Global Reach</h3>
              <p className="text-gray-600">
                Blockchain Transfer BDT allows you to send and receive money globally, bridging the gap between different countries and currencies. No matter where you are, we've got you covered.
              </p>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-300 mt-8">
          If you have any questions or need assistance, our support team is always ready to help. Contact us at support@blockchaintransferbdt.com.
        </p>
      </div>
    </section>
  );
}

export default About;
