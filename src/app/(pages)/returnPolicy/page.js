import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 ">
      <div className=" mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 md:p-8 xl:px-14 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl pt-6  font-bold text-white mb-2">
              Return & Refund Policy
            </h1>
            <p className="text-emerald-100 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="p-6 md:p-8 xl:px-14">
            <div className="flex items-start bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
              <svg className="w-6 h-6 text-emerald-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-gray-600">
                At <span className="font-bold text-emerald-700">Shopease</span>, we want you to be completely satisfied with your purchase. If you're not happy with your order, we'll make it right.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 md:p-8 xl:px-14 space-y-10">
            <PolicySection 
              title="1. Our Return Policy"
              content={
                <>
                  <p className="mb-3">We accept returns within <span className="font-semibold text-emerald-600">30 days</span> of the purchase date for most items. To be eligible for a return:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                    <li>The item must be unused and in its original condition</li>
                    <li>Original tags and packaging must be intact</li>
                    <li>A proof of purchase is required</li>
                  </ul>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
                    <p className="text-blue-700 font-medium">Note:</p>
                    <p className="text-blue-600">Some items are final sale and not eligible for return, including perishable goods, intimate apparel, and personalized items.</p>
                  </div>
                </>
              }
            />

            <PolicySection 
              title="2. How to Initiate a Return"
              content={
                <>
                  <p className="mb-4">To return an item, please follow these steps:</p>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <StepBox 
                      number="1"
                      title="Request Return"
                      description="Contact our support team or initiate return through your account"
                    />
                    <StepBox 
                      number="2"
                      title="Package Item"
                      description="Securely pack the item with original packaging"
                    />
                    <StepBox 
                      number="3"
                      title="Ship Back"
                      description="Use provided return label or ship to our warehouse"
                    />
                  </div>
                  <p className="text-sm text-gray-500">*Return shipping costs may apply unless the return is due to our error</p>
                </>
              }
            />

            <PolicySection 
              title="3. Refund Process"
              content={
                <>
                  <p className="mb-3">Once we receive your return:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
                    <li>We will inspect the returned item within <span className="font-medium">3-5 business days</span></li>
                    <li>Refunds will be processed to your original payment method</li>
                    <li>You will receive email confirmation when your refund is issued</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                    <p className="text-yellow-700 font-medium">Processing Times:</p>
                    <p className="text-yellow-600">Credit card refunds may take 5-10 business days to appear on your statement depending on your bank's processing time.</p>
                  </div>
                </>
              }
            />

            <PolicySection 
              title="4. Exchanges"
              content={
                <>
                  <p className="mb-3">We currently offer exchanges for:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-3">
                    <li>Different size of the same item (subject to availability)</li>
                    <li>Different color of the same item (subject to availability)</li>
                  </ul>
                  <p>To request an exchange, please contact our customer service team before returning your item.</p>
                </>
              }
            />

            <PolicySection 
              title="5. Damaged or Defective Items"
              content={
                <>
                  <p className="mb-3">If you receive a damaged or defective item:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Contact us within <span className="font-medium">48 hours</span> of delivery</li>
                    <li>Provide photos of the damage/defect</li>
                    <li>We will arrange for free return shipping and expedite your replacement</li>
                  </ul>
                </>
              }
            />

            <PolicySection 
              title="6. International Returns"
              content={
                <>
                  <p className="mb-3">For international orders:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Return shipping costs are the responsibility of the customer</li>
                    <li>Customs fees are non-refundable</li>
                    <li>Please mark the package as "Returned Goods" to avoid additional customs charges</li>
                  </ul>
                </>
              }
            />

            {/* FAQ Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <FAQItem 
                  question="How long does it take to process my refund?"
                  answer="Refunds are typically processed within 3-5 business days after we receive your return. The time it takes for the credit to appear in your account depends on your payment method and financial institution."
                />
                <FAQItem 
                  question="Can I return sale items?"
                  answer="Yes, sale items can be returned within the standard 30-day return period, provided they meet all return conditions."
                />
                <FAQItem 
                  question="What if I lost my receipt?"
                  answer="We can look up your purchase with your order number or the email address used to place the order. If you purchased as a guest, please contact us with details about your purchase."
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-10">
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Need Help With Your Return?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Customer Service Hours:</h4>
                  <p className="text-gray-600">Monday-Friday: 9AM - 6PM</p>
                  <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Contact Options:</h4>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium text-emerald-600">Email:</span> returns@shopease.com
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium text-emerald-600">Phone:</span> +92 1100-111111 (Option 2)
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium text-emerald-600">Live Chat:</span> Available on our website during business hours
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-white p-4 rounded border border-gray-300">
                <h4 className="font-medium text-gray-700 mb-2">Return Address:</h4>
                <p className="text-gray-600">Shopease Returns Center</p>
                <p className="text-gray-600">123 Commerce Way</p>
                <p className="text-gray-600">Karachi, 75500</p>
                <p className="text-gray-600">Pakistan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const PolicySection = ({ title, content }) => (
  <section className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
    <h2 className="text-xl md:text-2xl font-semibold text-emerald-700 mb-4">
      {title}
    </h2>
    <div className="text-gray-600 space-y-4">
      {content}
    </div>
  </section>
);

const StepBox = ({ number, title, description }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold mb-2">
      {number}
    </div>
    <h3 className="font-medium text-gray-700 mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <div className="border-b border-gray-100 pb-4 last:border-0">
    <h3 className="font-medium text-gray-800 mb-1">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);

export default ReturnPolicy;