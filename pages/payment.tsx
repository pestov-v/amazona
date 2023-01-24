import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStoreCart } from 'store/cart';
import { MainLayout } from 'components/Layouts/MainLayout';
import { CheckoutWizard } from 'components/CheckoutWizard';
import { PaymentMethod } from 'types';

const PaymentScreen = () => {
  const router = useRouter();

  const paymentMethod = useStoreCart((s) => s.paymentMethod);
  const shippingAddress = useStoreCart((s) => s.shippingAddress);
  const setPaymentMethod = useStoreCart((s) => s.setPaymentMethod);

  useEffect(() => {
    if (!shippingAddress?.address) router.push('/shipping');
  }, [shippingAddress?.address, router]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    router.push('/placeorder');
  };

  const payMethods = Object.values(PaymentMethod);

  return (
    <MainLayout title='Payment'>
      <CheckoutWizard activeStep={2} />

      <form className='mx-auto max-w-md pt-4' onSubmit={submitHandler}>
        <h1 className='text-2xl mb-8 font-semibold'>Payment Method</h1>
        <div className='mb-8'>
          {payMethods.map((payment) => (
            <div className='mb-4' key={payment}>
              <label className='cursor-pointer flex items-center gap-2 max-w-fit'>
                <input
                  type='radio'
                  name='paymentMethod'
                  className='outline-none focus:ring-0'
                  id={payment}
                  onChange={() => setPaymentMethod(payment)}
                  checked={payment === paymentMethod}
                />
                <span>{payment}</span>
              </label>
            </div>
          ))}
        </div>
        <div className='mb-4 flex justify-between'>
          <button
            onClick={() => {
              router.push('/shipping');
            }}
            type='button'
            className='default-button'
          >
            Back
          </button>
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </MainLayout>
  );
};

export default PaymentScreen;

PaymentScreen.auth = true;
