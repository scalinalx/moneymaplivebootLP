'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { validateEmail, validateName } from '@/utils/validation';
import type { LeadFormData, ApiResponse, Lead } from '@/types';

interface LeadFormProps {
  onSuccess: (leadData: Lead) => void;
  onError?: (error: string) => void;
  inline?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, onError, inline = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralId, setReferralId] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LeadFormData>();

  // Capture Rewardful referral ID when component mounts
  useEffect(() => {
    const getReferralId = () => {
      if (typeof window !== 'undefined' && window.rewardful) {
        window.rewardful('ready', () => {
          if (window.Rewardful?.referral) {
            setReferralId(window.Rewardful.referral);
            console.log('Rewardful referral ID captured:', window.Rewardful.referral);
          }
        });
      }
    };

    // Try immediately
    getReferralId();

    // Also try after a short delay in case Rewardful script is still loading
    const timeout = setTimeout(getReferralId, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);

    try {
      const submitData = {
        name: data.name.trim(),
        email: data.email,
        ...(referralId && { referralId }) // Only include referralId if it exists
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result: ApiResponse<Lead> = await response.json();

      if (result.success && result.data) {
        onSuccess(result.data);
      } else {
        const errorMessage = result.error || 'Failed to submit form';
        onError?.(errorMessage);
        setError('root', { message: errorMessage });
      }
    } catch {
      const errorMessage = 'Network error. Please try again.';
      onError?.(errorMessage);
      setError('root', { message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={inline ? 'w-full' : 'max-w-md mx-auto'}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={inline ? 'flex flex-col md:flex-row md:items-start gap-3' : 'space-y-6'}
      >
        {/* Hidden input for referral ID as recommended by Rewardful */}
        {referralId && (
          <input type="hidden" name="referral" value={referralId} />
        )}
        
        <div className={inline ? 'flex-1' : ''}>
          <Input
            label={inline ? undefined : 'Full Name'}
            required
            placeholder="Enter your full name"
            {...register('name', {
              required: 'Name is required',
              validate: (value) => validateName(value) || 'Name must be at least 2 characters'
            })}
            error={errors.name?.message}
            disabled={isSubmitting}
          />
        </div>

        <div className={inline ? 'flex-1' : ''}>
          <Input
            label={inline ? undefined : 'Email'}
            type="email"
            required
            placeholder="Enter your email address"
            {...register('email', {
              required: 'Email is required',
              validate: (value) => validateEmail(value) || 'Please enter a valid email address'
            })}
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </div>

        {errors.root && (
          <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${inline ? 'md:col-span-full' : ''}`}>
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="yellow"
          size="lg"
          loading={isSubmitting}
          className={inline ? 'md:w-auto whitespace-nowrap' : 'w-full'}
        >
          {isSubmitting ? 'Processing...' : "Save Your Seat for Dec 18-19"}
        </Button>
      </form>
    </div>
  );
}; 