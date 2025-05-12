import MainLayout from '@/components/layout/MainLayout';
import { ArrowLeft, CircleCheck } from 'lucide-react';
import React from 'react';
import { IconLeft } from 'react-day-picker';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChangeDonationStatus } from '@/Api/donations/donations';

const DonationSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const updateDonationStatus = async () => {
      const donationId = searchParams.get('donationId');

      if (donationId) {
        try {
          const data = await ChangeDonationStatus(Number.parseInt(donationId), 'Approved');
          if (data.status === 200) {
            console.log('Donation status updated:', data);
          }
          else {
            console.error('Failed to update donation status:', data);
          }
        } catch (error) {
          console.error('Error updating donation status:', error);
        }
      }
    };

    updateDonationStatus();
  }, [searchParams]);

  return (
    <MainLayout>
      <main style={{ textAlign: 'center', padding: '2rem', fontFamily: 'Arial, sans-serif', color: '#333' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
          <CircleCheck size={100} fill='#4CAF50' className='text-white' />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#4CAF50' }}>Thank You!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your donation has been successfully processed.</p>
        <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>We greatly appreciate your support!</p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1.5rem',
            fontSize: '1.2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          <div className="flex items-center gap-2">
            <ArrowLeft />
            <p>Go Home</p>
          </div>
        </button>
      </main>
    </MainLayout >
  );
};

export default DonationSuccess;