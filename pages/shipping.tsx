import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { IAddress } from 'types';
import { useTextInput } from 'hooks';
import { useStoreCart } from 'store/cart';
import { TextInput } from 'components/ui';
import { CheckoutWizard } from 'components/CheckoutWizard';
import { MainLayout } from 'components/Layouts/MainLayout';

const ShippingScreen = () => {
  const router = useRouter();
  const saveAddress = useStoreCart((s) => s.saveShippingAddress);
  const shippingAddress = useStoreCart((s) => s.shippingAddress);

  const formData = {
    name: useTextInput({
      isRequired: true,
      filters: ['name'],
      validators: ['name'],
    }),
    address: useTextInput({
      isRequired: true,
      validators: ['min_3'],
    }),
    city: useTextInput({
      isRequired: true,
      validators: ['min_3'],
      filters: ['name'],
    }),
    postalCode: useTextInput({
      isRequired: true,
      filters: ['numbers'],
      validators: ['min_3'],
    }),
    country: useTextInput({
      isRequired: true,
      validators: ['min_3'],
      filters: ['name'],
      validateOnChange: true,
    }),
  };

  useEffect(() => {
    if (!shippingAddress) return;
    const { name, address, city, postalCode, country } = shippingAddress;
    formData.name.setValue(name);
    formData.address.setValue(address);
    formData.city.setValue(city);
    formData.postalCode.setValue(postalCode.toString());
    formData.country.setValue(country);
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.entries(formData).reduce(
      (acc, [key, val]) => ({
        ...acc,
        [key]: key === 'postalCode' ? +val.value : val.value,
      }),
      {}
    ) as IAddress;

    saveAddress(data);
    router.push('/payment');
  };

  const isFormValid = Object.values(formData).every(
    (v) => v.isDirty && v.isValid
  );

  return (
    <MainLayout title='Shipping'>
      <CheckoutWizard activeStep={1} />

      <form className='mx-auto max-w-screen-sm' onSubmit={submitHandler}>
        <h1 className='text-2xl mb-4 font-semibold'>Shipping Address</h1>
        <TextInput
          label='Full Name'
          {...formData.name.inputProps}
          errors={formData.name.errors}
        />
        <TextInput
          label='Address'
          {...formData.address.inputProps}
          errors={formData.address.errors}
        />
        <TextInput
          label='City'
          {...formData.city.inputProps}
          errors={formData.city.errors}
        />
        <TextInput
          label='Postal Code'
          {...formData.postalCode.inputProps}
          errors={formData.postalCode.errors}
        />
        <TextInput
          label='Country'
          {...formData.country.inputProps}
          errors={formData.country.errors}
        />
        <button className='primary-button mt-4' disabled={!isFormValid}>
          Next
        </button>
      </form>
    </MainLayout>
  );
};

export default ShippingScreen;

ShippingScreen.auth = true;
