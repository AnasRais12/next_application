import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-10 ">
      <div className=" ">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl pt-6  font-bold text-white mb-2">
              Terms and Conditions
            </h1>
            <p className="text-emerald-100 text-lg">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          <div className="p-6 px-2 md:p-8">
            <p className="text-lg text-gray-600 mb-6 border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r">
              Welcome to{' '}
              <span className="font-bold text-emerald-700">Shopease</span>.
              Please read these Terms and Conditions carefully before using our
              e-commerce platform.
            </p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="sm:p-6 p-3 md:p-8 space-y-10">
            <TermSection
              title="1. Introduction"
              content="These Terms and Conditions ('Terms') govern your use of our website and online store. By accessing or using our e-commerce services, you agree to be bound by these Terms. If you disagree with any part of the Terms, you must not use our platform."
            />

            <TermSection
              title="2. Account Registration"
              content={
                <>
                  In order to make purchases, you must create an account on our
                  website. You agree to provide accurate, current, and complete
                  information during the registration process and update your
                  information if necessary. You are responsible for maintaining
                  the confidentiality of your account credentials.
                </>
              }
            />

            <TermSection
              title="3. Orders and Payments"
              content={
                <>
                  <p className="mb-3">
                    By placing an order on our website, you are offering to
                    purchase products in accordance with these Terms. Once an
                    order is placed, you will receive an order confirmation
                    email. However, the contract is not considered complete
                    until we dispatch the goods.
                  </p>
                  <p>
                    All payments must be made in full at the time of placing an
                    order. We accept payments via credit cards, debit cards, and
                    other payment methods as indicated on the website. You
                    represent and warrant that you have the legal right to use
                    the payment method.
                  </p>
                </>
              }
            />

            <TermSection
              title="4. Pricing and Availability"
              content="All product prices are displayed on our website in the relevant currency and include applicable taxes unless stated otherwise. We strive to ensure that all product prices and product information are accurate; however, errors may occur. In such cases, we reserve the right to cancel or modify orders with incorrect pricing."
            />

            <TermSection
              title="5. Shipping and Delivery"
              content="We offer various shipping options, and the delivery charges will be calculated at checkout. Delivery times may vary depending on your location and the availability of the items you ordered. You will be notified of any delays or issues with shipping."
            />

            <TermSection
              title="6. Returns and Refunds"
              content={
                <>
                  <p className="mb-3">
                    We offer a return policy for products purchased on our
                    platform. Products can be returned within a specified period
                    (e.g., 30 days) from the date of delivery, subject to
                    certain conditions (e.g., items must be in their original
                    condition). Refunds will be issued once the returned product
                    is inspected and accepted.
                  </p>
                  <p>
                    Some items, such as perishable goods or intimate products,
                    may not be eligible for return. Please check the product
                    page for return eligibility before making a purchase.
                  </p>
                </>
              }
            />

            <TermSection
              title="7. Cancellations"
              content="You may cancel your order before it is shipped. If your order has already been processed or shipped, you will need to follow the return process. Please contact our support team if you wish to cancel your order."
            />

            <TermSection
              title="8. Product Information"
              content="We make every effort to display our products accurately, including their descriptions, prices, and images. However, due to differences in device settings and other factors, we cannot guarantee that colors or other details will appear exactly as shown on your device."
            />

            <TermSection
              title="9. User Conduct"
              content="By using our platform, you agree to act lawfully and respect the rights of other users. You are prohibited from engaging in fraudulent activities, using automated systems to place orders, or attempting to gain unauthorized access to any part of the website."
            />

            <TermSection
              title="10. Intellectual Property"
              content="All content on our website, including but not limited to text, images, logos, graphics, and software, is owned by Shopease and protected by copyright and intellectual property laws. You are not permitted to copy, modify, or distribute any content without express permission."
            />

            <TermSection
              title="11. Limitation of Liability"
              content="Our liability for any claims related to the use of our website or products is limited to the total amount paid for the product(s) in question. We are not responsible for any indirect, incidental, or consequential damages arising from your use of our services."
            />

            <TermSection
              title="12. Changes to Terms"
              content="We reserve the right to modify or update these Terms at any time. Changes will be posted on this page, and the date of the latest revision will be updated. Please review these Terms regularly."
            />

            <TermSection
              title="13. Governing Law"
              content="These Terms and Conditions are governed by the laws of [Your Country/State]. Any disputes arising from the use of our services will be resolved in the courts located in [Your City/State]."
            />

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-10">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">
                Contact Us
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <p className="font-medium text-emerald-600">Email:</p>
                  <p>support@shopease.com</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-600">Phone:</p>
                  <p>+92 1100-111111</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-600">Address:</p>
                  <p>123 Main Street, City, Country</p>
                </div>
                <div>
                  <p className="font-medium text-emerald-600">
                    Business Hours:
                  </p>
                  <p>Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Term Section Component
const TermSection = ({ title, content }) => (
  <section className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
    <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-4 flex items-start">
      <span className=" bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
        {title.split('.')[0]}
      </span>
      {title}
    </h2>
    <div className="text-gray-600 ml-11 space-y-3">
      {typeof content === 'string' ? <p>{content}</p> : content}
    </div>
  </section>
);

export default TermsAndConditions;
