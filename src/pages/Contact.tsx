
import React from 'react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <MainLayout>
      <div className="bg-hope-gray py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-hope-dark-gray mb-6 text-center">Contact Us</h1>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-hope-orange/10 p-4 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-hope-orange" />
                </div>
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
                <a href="mailto:support@hopegivers.org" className="text-hope-orange hover:underline">support@hopegivers.org</a>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-hope-orange/10 p-4 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-hope-orange" />
                </div>
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Mon-Fri from 9am to 5pm</p>
                <a href="tel:+18001234567" className="text-hope-orange hover:underline">+1 (800) 123-4567</a>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <div className="bg-hope-orange/10 p-4 rounded-full mb-4">
                  <MapPin className="h-6 w-6 text-hope-orange" />
                </div>
                <h3 className="font-medium mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Our headquarters</p>
                <address className="text-hope-orange not-italic">
                  123 Hope Street<br />
                  San Francisco, CA 94103
                </address>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">Send us a message</h2>
              
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium">Name</label>
                    <input 
                      id="name" 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 text-sm font-medium">Subject</label>
                  <input 
                    id="subject" 
                    type="text" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-hope-orange/50"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  className="bg-hope-orange hover:bg-hope-dark-orange text-white py-3 px-6 w-full md:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
