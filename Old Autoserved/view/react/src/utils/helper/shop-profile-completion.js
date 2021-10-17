export default shop => {
  let result = [];

  if (shop) {
    const {
      avatar,
      banner,
      address,
      type,
      contact,
      description,
      operations,
      features,
      amenities,
      payment_method
    } = shop;
    result = [
      {
        title: 'Shop Logo',
        done: avatar !== null
      },
      {
        title: 'Shop Banner',
        done: banner !== null
      },
      {
        title: 'Address',
        done: address !== null
      },
      {
        title: 'Shop Type',
        done: type !== null
      },
      {
        title: 'Contact Number',
        done: contact !== null
      },
      {
        title: 'Description',
        done: description !== null
      },
      {
        title: 'Operating Hours',
        done: operations !== null
      },
      {
        title: 'Features',
        done: features !== null
      },
      {
        title: 'Amenities',
        done: amenities !== null
      },
      {
        title: 'Payment Method',
        done: payment_method !== null
      }
    ];
  }
  return result;
};
