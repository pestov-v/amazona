import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import data from 'utils/data';
import { useStoreCart } from 'store/cart';
import { Layout } from 'components/Layouts/MainLayout';
import { ProductPriceCard } from 'components/ProductItem/ProductPriceCard';
import { ProductDescription } from 'components/ProductItem/ProductDescription';

export default function Product() {
  const { query } = useRouter();
  const { slug } = query;
  const addToCart = useStoreCart((s) => s.addItem);
  const product = data.products.find((p) => p.slug === slug);

  const content = !product ? (
    <div className='h-40 flex justify-center items-center'>
      Product not found...
    </div>
  ) : (
    <>
      <div className='py-4'>
        <Link href='/' className='px-2'>
          Continue shoping
        </Link>
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
          <ProductDescription {...product} />
        </div>

        <div>
          <ProductPriceCard
            price={product.price}
            inStock={product?.countInStock > 0}
            addToCart={() => addToCart(product)}
          />
        </div>
      </div>
    </>
  );

  return <Layout title={product?.name}>{content}</Layout>;
}
