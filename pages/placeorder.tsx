import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { IOrderResponse } from 'types';
import { useStoreCart } from 'store/cart';
import { getPrices } from 'utils/helpers';
import { getError } from 'utils/errors';
import { MainLayout } from 'components/Layouts/MainLayout';
import { CheckoutWizard } from 'components/CheckoutWizard';
import { OrderCard, OrderItemsTable, OrderPricesCard } from 'components/Order';

const PlaceorderScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const clearItems = useStoreCart((s) => s.clearItems);
  const items = useStoreCart((s) => s.items);
  const shippingAddress = useStoreCart((s) => s.shippingAddress);
  const paymentMethod = useStoreCart((s) => s.paymentMethod);

  if (items.length === 0) {
    return (
      <div className='flex items-center'>
        <h1 className='mr-2'>Cart is empty</h1>
        <Link href='/' className='text-blue-500'>
          Go shopping
        </Link>
      </div>
    );
  }
  const shippingContent = (
    <div>
      {shippingAddress.name}, {shippingAddress.address}, {shippingAddress.city},{' '}
      {shippingAddress.postalCode}, {shippingAddress.country}
    </div>
  );

  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = getPrices(items);

  const placeOrderHandler = async () => {
    setLoading(true);
    try {
      const body = {
        orderItems: items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as IOrderResponse;

      clearItems();
      router.push(`/orders/${data._id}`);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title='Place Order'>
      <CheckoutWizard activeStep={3} />
      <h1 className='text-2xl mb-4 font-semibold'>Place Order</h1>

      <div className='grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <OrderCard
            title='Shipping Address'
            content={shippingContent}
            link='/shipping'
            linkTitle='Edit'
          />
          <OrderCard
            title='Payment Method'
            content={<div>{paymentMethod}</div>}
            link='/payment'
            linkTitle='Edit'
          />
          <OrderCard
            title='Order Items'
            content={<OrderItemsTable items={items} />}
            link='/cart'
            linkTitle='Edit'
          />
        </div>

        <OrderPricesCard
          prices={{
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
          }}
          className='self-start'
          loading={loading}
          onSubmit={placeOrderHandler}
          showButton
          buttonTitle='Place Order'
        />
      </div>

      <button
        className='default-button mt-4'
        type='button'
        onClick={() => {
          router.push('/payment');
        }}
      >
        Back
      </button>
    </MainLayout>
  );
};

export default PlaceorderScreen;

PlaceorderScreen.auth = true;
