import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { ICartProduct, IProduct } from 'types';
import { useStoreCart } from 'store/cart';
import { Dropdown } from 'components/ui';
import { MainLayout } from 'components/Layouts/MainLayout';
import { Modal } from 'components/Modal';

const CartScreen = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useStoreCart((s) => s.items);
  const removeItem = useStoreCart((s) => s.removeItem);
  const changeQuantity = useStoreCart((s) => s.changeQuantity);

  const [itemForRemove, setItemForRemove] = useState<null | IProduct>(null);
  const [showDeleteModal, setShowDeletModal] = useState(false);
  const handleCloseModal = () => setShowDeletModal(false);

  const handleChangeQuantity = (id: string, quantity: number | string) => {
    changeQuantity(
      id,
      typeof quantity === 'string' ? parseInt(quantity) : quantity
    );
    toast.success('Product updated in the cart!');
  };

  const handleRemove = (product: ICartProduct) => {
    setItemForRemove(product);
    setShowDeletModal(true);
  };
  const handleRemoveItem = () => {
    removeItem(itemForRemove._id);
    handleCloseModal();
  };
  const checkoutHandler = () => {
    if (session?.user) return router.push('/shipping');
    router.push('login?redirect=/shipping');
  };

  return (
    <MainLayout title='Shoping Cart'>
      <h1 className='text-xl mb-4'>Shoping Cart</h1>
      {items.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <Link href='/' className='text-blue-500'>
            Go to shoping
          </Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5 h-[var(--cart-content-height)] pb-8'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-w-full table-auto'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  {['Quantity', 'Price', 'Action'].map((item) => (
                    <th key={item} className='p-5 text-center w-[8rem]'>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {items.map((i) => (
                  <tr key={i._id} className='border-b'>
                    <td>
                      <Link
                        href={`/product/${i._id}`}
                        className='flex items-center'
                      >
                        <Image
                          src={i.image}
                          alt={i.name}
                          width={50}
                          height={50}
                        />
                        <span className='ml-4 font-semibold'>{i.name}</span>
                      </Link>
                    </td>

                    <td className='p-5'>
                      <Dropdown
                        onChange={(q) => handleChangeQuantity(i._id, q)}
                        data={[...Array(i.countInStock)].map((_, i) => i + 1)}
                        value={i.quantity}
                      />
                    </td>

                    <td className='p-5 text-center'>${i.price}</td>
                    <td className='p-5 text-center  '>
                      <button type='button' onClick={() => handleRemove(i)}>
                        <XCircleIcon
                          className='
                            h-5 w-5
                            stroke-red-500
                            stroke-2
                            hover:stroke-red-800
                            transition-colors'
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='card p-5 self-start'>
            <ul>
              <li>
                <div className='pb-3 flex justify-between'>
                  Subtotal (
                  {items.reduce((acc, curr) => acc + curr.quantity, 0)}) : $
                  {items.reduce(
                    (acc, curr) => acc + curr.quantity * curr.price,
                    0
                  )}
                </div>
              </li>
              <li>
                <button
                  className='primary-button w-full'
                  onClick={checkoutHandler}
                >
                  CheckOut
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={handleCloseModal}
          onSave={handleRemoveItem}
          title='Remove Product'
          content={`Do you realy whant to remove product ${itemForRemove.name}?`}
          saveButtonTitle='Remove'
        />
      )}
    </MainLayout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
