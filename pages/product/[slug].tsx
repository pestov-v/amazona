import Link from 'next/link';
import { useRouter } from 'next/router';
import data from 'utils/data';
import { Layout } from 'components/Layout';
import Image from 'next/image';

export default function Product() {
  const { query } = useRouter();
  const { slug } = query;

  const product = data.products.find((p) => p.slug === slug);
  const inStock = product?.countInStock > 0;

  const content = !product ? (
    <div className='h-40 flex justify-center items-center'>
      Product not found...
    </div>
  ) : (
    <>
      <div className='py-4'>
        <Link href='/'>back</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
          />
        </div>

        <div>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className='card p-5'>
            <div className='flex justify-between font-semibold mb-2'>
              <span>Price</span>
              <span>${product.price}</span>
            </div>
            <div className='flex justify-between font-semibold mb-2'>
              <span>Status</span>
              <span className={inStock ? 'text-green-600' : 'text-red-500'}>
                {inStock ? 'In stock' : 'Unavailable'}
              </span>
            </div>
            <button className='primary-button w-full'>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );

  return <Layout title={product.name}>{content}</Layout>;
}
