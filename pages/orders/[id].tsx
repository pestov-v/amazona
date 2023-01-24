import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IOrderResponse } from 'types';
import { getError } from 'utils/errors';
import { MainLayout } from 'components/Layouts/MainLayout';
import { OrderCard, OrderItemsTable, OrderPricesCard } from 'components/Order';
import { getPrices } from 'utils/helpers';
import dynamic from 'next/dynamic';

const OrderScreen = () => {
  const { query } = useRouter();

  const [order, setOrder] = useState<IOrderResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${query.id}`);
        const data = await res.json();

        setOrder(data);
      } catch (err) {
        setError(getError(err));
      } finally {
        setLoading(false);
      }
    };

    if (!order?._id || order._id !== query.id) fetchData();
  }, [query, order?._id]);

  if (loading) {
    return (
      <MainLayout>
        <h1 className='text-lg font-semibold'>Loading...</h1>
      </MainLayout>
    );
  }
  if (error) {
    <MainLayout>
      <h1 className='text-lg text-red-500'>{error}</h1>
    </MainLayout>;
  }
  if (!order) {
    return (
      <MainLayout>
        <h1 className='text-lg font-semibold'>Order not found.</h1>
      </MainLayout>
    );
  }

  const shippingContent = (
    <>
      <div>
        {order?.shippingAddress.name}, {order?.shippingAddress.address},{' '}
        {order?.shippingAddress.city}, {order?.shippingAddress.postalCode},{' '}
        {order?.shippingAddress.country}
      </div>
      {order?.isDelivered ? (
        <div className='alert-success'>
          Delivered at <>{order?.deliveredAt}</>
        </div>
      ) : (
        <div className='alert-error'>Not Delivered</div>
      )}
    </>
  );

  const paymentContent = (
    <div>
      <div>{order?.paymentMethod}</div>
      {order?.isPaid ? (
        <div className='alert-success'>
          Paid at <>{order.paidAt}</>
        </div>
      ) : (
        <div className='alert-error'>Not Paid</div>
      )}
    </div>
  );

  const prices = getPrices(order?.orderItems ?? []);

  return (
    <MainLayout title='Order'>
      <div className='grid md:grid-cols-4 md:gap-5'>
        <div className='overflow-x-auto md:col-span-3'>
          <OrderCard title='Shipping Address' content={shippingContent} />
          <OrderCard title='Payment Method' content={paymentContent} />
          <OrderCard
            title='Order Items'
            content={<OrderItemsTable items={order?.orderItems} />}
          />
        </div>
        <OrderPricesCard
          prices={prices}
          className='self-start'
          orderId={order._id}
          showPaidButton
        />
      </div>
    </MainLayout>
  );
};

export default dynamic(() => Promise.resolve(OrderScreen), { ssr: false });

OrderScreen.auth = true;
