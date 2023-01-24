import { FC, useEffect } from 'react';
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
} from '@paypal/react-paypal-js';
import { getError } from 'utils/errors';
import { toast } from 'react-toastify';

interface IProps {
  prices: {
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
  };
  className?: string;
  onSubmit?: () => void;
  loading?: boolean;
  showButton?: boolean;
  buttonTitle?: string;
  showPaidButton?: boolean;
  isPaid?: boolean;
  orderId?: string;
}
export const OrderPricesCard: FC<IProps> = (props) => {
  const { className = '', onSubmit = () => {}, loading, orderId } = props;
  const { itemsPrice, taxPrice, shippingPrice, totalPrice } = props.prices;
  const { showButton, buttonTitle = '', showPaidButton, isPaid } = props;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      const res = await fetch('/api/keys/paypal');
      const clientId = await res.json();
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': clientId,
          currency: 'USD',
        },
      });
      paypalDispatch({
        type: 'setLoadingStatus',
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    };
    loadPaypalScript();
  }, [paypalDispatch]);

  const createOrder = (_data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((clientId) => clientId);
  };
  const onApprove = (_data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        // TODO: Dispatch PAY_REQUEST
        const res = await fetch(`/api/orders/${orderId}/pay`, {
          method: 'PUT',
          body: details,
        });
        const data = await res.json();

        console.log('onApprove', data);

        // TODO: Dispatch PAY_SUCCESS
      } catch (err) {
        toast.error(getError(err));
      }
    });
  };
  const onError = () => {};

  const paidButton = showPaidButton && !isPaid && (
    <li>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      )}
    </li>
  );

  return (
    <div className={`card p-5 ${className}`}>
      <h2 className='mb-3 text-xl text-center'>Order Summary</h2>

      <ul>
        <li className='mb-2 flex justify-between'>
          <strong>Items</strong>
          <span>${itemsPrice}</span>
        </li>

        <li className='mb-2 flex justify-between'>
          <strong>Tax</strong>
          <span>${taxPrice}</span>
        </li>

        <li className='mb-2 flex justify-between'>
          <strong>Shipping</strong>
          <span>${shippingPrice}</span>
        </li>

        <li className='mb-4 flex justify-between'>
          <strong>Subtotal</strong>
          <span>${totalPrice}</span>
        </li>

        {showButton && (
          <li>
            <button
              className='primary-button w-full'
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? 'Loading...' : buttonTitle}
            </button>
          </li>
        )}

        {paidButton}
      </ul>
    </div>
  );
};
