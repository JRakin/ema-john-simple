import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitCardForm from './SplitCardForm';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe(
  'pk_test_51HaOgZC7K76Kd1XthspWDlsDST9WIXKNrTp6Vry6xM3iZqLCkGTb3Lgpuag0z5h6Z8CCOa2jTSz0q2bjp0Tezk9E00bpBBcNqQ'
);

const ProcessPayment = ({ handlePayment }) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
    </Elements>
  );
};

export default ProcessPayment;
