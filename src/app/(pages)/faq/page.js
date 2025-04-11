import React from 'react';

function FAQPage() {
  return (
    <div className=" min-h-screen bg-gray-50 pt-10">
    <div className=" mx-auto px-4 py-16 bg-gray-50 ">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-3">
          <span className="text-primary">Frequently Asked</span> Questions
        </h2>
        <p className="text-dark/80 text-xl max-w-2xl mx-auto">
          Find answers to common questions about our products and services
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {[
          {
            question: "What payment methods do you accept?",
            answer: "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for secure online payments."
          },
          {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
          },
          {
            question: "What is your return policy?",
            answer: "You can return most products within 30 days of purchase. Items must be unused, in original packaging with all tags attached. Some exclusions apply."
          },
          {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days. Express options (1-2 business days) are available at checkout for an additional fee."
          },
          {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship to over 50 countries worldwide. International delivery times vary between 7-14 business days depending on destination."
          },
          {
            question: "Can I modify or cancel my order?",
            answer: "You can modify or cancel your order within 1 hour of placement by contacting our customer support team immediately."
          },
          {
            question: "Are there any hidden fees?",
            answer: "No, we display all costs upfront including product price, taxes, and shipping fees before you complete your purchase."
          }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <details className="group">
              <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <h3 className="text-lg font-semibold text-dark">{item.question}</h3>
                <span className="text-primary transition-transform duration-300 group-open:rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-dark/80">
                <p>{item.answer}</p>
              </div>
            </details>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold text-dark mb-4">
          Still have questions?
        </h3>
        <p className="text-dark/80 mb-6 max-w-2xl mx-auto">
          Our customer support team is available 24/7 to assist you with any inquiries.
        </p>
        <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg shadow-md transition-colors">
          Contact Support
        </button>
      </div>
    </div>
    </div>
  );
}

export default FAQPage;