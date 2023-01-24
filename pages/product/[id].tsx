import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IProduct } from 'types';
import db, { convertDocToObj } from 'utils/db';
import { ProductModel } from 'models/ProductModel';
import { useStoreCart } from 'store/cart';
import { MainLayout } from 'components/Layouts/MainLayout';
import { ProductPriceCard } from 'components/ProductItem/ProductPriceCard';
import { ProductDescription } from 'components/ProductItem/ProductDescription';

export default function Product({ product }: { product: IProduct | null }) {
  const router = useRouter();
  const addToCart = useStoreCart((s) => s.addItem);

  const addProductHandler = (product: IProduct) => {
    addToCart(product);
    router.push('/cart');
  };

  const content = !product ? (
    <div className='h-40 flex flex-col justify-center items-center'>
      <h1 className='text-xl mb-4'>Product not found...</h1>
      <Link href='/' className='text-blue-500'>
        Back
      </Link>
    </div>
  ) : (
    <>
      <div className='py-4'>
        <Link href='/' className='px-2 text-blue-500 hover:underline'>
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
            addToCart={() => addProductHandler(product)}
          />
        </div>
      </div>
    </>
  );

  return <MainLayout title={product?.name}>{content}</MainLayout>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  await db.connect();
  const data = await ProductModel.findById(params.id).lean();

  await db.disconnect();

  return {
    props: {
      product: data ? convertDocToObj(data) : null,
    },
  };
};
