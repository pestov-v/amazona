import { IProduct } from 'types';
import db from 'utils/db';
import { ProductModel } from 'models/ProductModel';
import { MainLayout } from 'components/Layouts/MainLayout';
import { ProductItem } from 'components/ProductItem/ProductItem';

export default function Home(props: { products: IProduct[] }) {
  const { products } = props;

  return (
    <MainLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const productsDB = await ProductModel.find().lean();
  const products = productsDB.map(db.convertDocToObj);
  await db.disconnect();

  return {
    props: {
      products,
    },
  };
};
