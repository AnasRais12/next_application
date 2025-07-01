import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-10  ">
      <div className=" mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header with accent color */}
          <div className="bg-[#047857] p-6 md:p-8 xl:px-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl pt-6  font-bold text-white text-center">
              Privacy Policy
            </h1>
            <p className="mt-4 text-white/90 text-center max-w-2xl mx-auto">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 xl:px-14 space-y-8">
            <section className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                At <span className="text-[#047857] font-medium">Shopease</span>,
                we are committed to protecting your privacy. This Privacy Policy
                outlines how we collect, use, and protect your personal
                information when you visit our website and use our services.
              </p>
            </section>

            {/* Policy Sections */}
            <div className="space-y-10">
              <Section
                title="1. Information We Collect"
                content={
                  <>
                    <p className="text-gray-600 mb-3">
                      We collect personal information when you visit our
                      website, make a purchase, create an account, or interact
                      with us in other ways. This information may include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {[
                        'Name',
                        'Email address',
                        'Phone number',
                        'Billing and shipping address',
                        'Payment information (e.g., credit card details)',
                        'Order history',
                        'IP address and device information',
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                }
              />

              <Section
                title="2. How We Use Your Information"
                content={
                  <>
                    <p className="text-gray-600 mb-3">
                      The information we collect is used for the following
                      purposes:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {[
                        'To process and fulfill your orders',
                        'To communicate with you about your orders, promotions, or customer service inquiries',
                        'To improve our website and services',
                        'To send you marketing communications (with your consent)',
                        'To comply with legal obligations and protect our rights',
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </>
                }
              />

              <Section
                title="3. How We Protect Your Information"
                content={
                  <p className="text-gray-600">
                    We implement a variety of security measures to ensure the
                    protection of your personal information. These include
                    encryption, secure payment processing, and access control to
                    safeguard against unauthorized access, alteration, or
                    destruction of your personal data.
                  </p>
                }
              />

              <Section
                title="4. Sharing Your Information"
                content={
                  <>
                    <p className="text-gray-600 mb-3">
                      We do not sell, trade, or rent your personal information
                      to third parties. However, we may share your information
                      with trusted third-party service providers who help us
                      operate our website and fulfill your orders, including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {[
                        'Payment processors',
                        'Shipping carriers',
                        'Marketing and analytics partners',
                        'Customer support providers',
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-gray-600 mt-3">
                      We ensure that these third parties comply with our privacy
                      standards and use your data only for the purposes for
                      which it was provided.
                    </p>
                  </>
                }
              />

              <Section
                title="5. Cookies and Tracking Technologies"
                content={
                  <p className="text-gray-600">
                    We use cookies and similar technologies to enhance your
                    experience on our website. Cookies are small files that are
                    stored on your device to help us remember your preferences,
                    improve functionality, and analyze user behavior. You can
                    control the use of cookies through your browser settings.
                  </p>
                }
              />

              <Section
                title="6. Your Rights"
                content={
                  <>
                    <p className="text-gray-600 mb-3">
                      Depending on your location, you may have the following
                      rights regarding your personal information:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {[
                        'The right to access the information we hold about you',
                        'The right to correct any inaccurate or incomplete information',
                        'The right to request the deletion of your personal information',
                        'The right to object to the processing of your personal information',
                        'The right to withdraw consent for marketing communications',
                      ].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="text-gray-600 mt-3">
                      To exercise any of these rights, please contact us at the
                      information below. We will respond to your request in
                      accordance with applicable data protection laws.
                    </p>
                  </>
                }
              />

              <Section
                title="7. Data Retention"
                content={
                  <p className="text-gray-600">
                    We retain your personal information only for as long as
                    necessary to fulfill the purposes outlined in this Privacy
                    Policy, including for legal, accounting, or reporting
                    requirements. Once your data is no longer needed, we will
                    securely delete or anonymize it.
                  </p>
                }
              />

              <Section
                title="8. Changes to This Privacy Policy"
                content={
                  <p className="text-gray-600">
                    We may update this Privacy Policy from time to time. When we
                    do, we will post the updated version on our website, and the
                    date of the latest revision will be reflected at the top of
                    this page. We encourage you to review this policy
                    periodically for any changes.
                  </p>
                }
              />

              <Section
                title="9. Contact Us"
                content={
                  <>
                    <p className="text-gray-600 mb-4">
                      If you have any questions or concerns about this Privacy
                      Policy or how we handle your personal information, please
                      contact us at:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="space-y-2 text-gray-600">
                        <p className="flex items-start">
                          <span className="inline-block w-20 font-medium text-[#047857]">
                            Email:
                          </span>
                          <span>admin@shopease.com</span>
                        </p>
                        <p className="flex items-start">
                          <span className="inline-block w-20 font-medium text-[#047857]">
                            Phone:
                          </span>
                          <span>+92 1100-111111</span>
                        </p>
                        <p className="flex items-start">
                          <span className="inline-block w-20 font-medium text-[#047857]">
                            Address:
                          </span>
                          <span>123 Main Street, City, Country</span>
                        </p>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Section component
const Section = ({ title, content }) => (
  <section className="space-y-3">
    <h2 className="text-xl font-semibold text-[#047857]">{title}</h2>
    {content}
  </section>
);

export default PrivacyPolicy;
