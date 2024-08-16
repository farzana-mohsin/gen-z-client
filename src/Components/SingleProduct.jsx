const SingleProduct = ({ item }) => {
  const {
    productName,
    brandName,
    category,
    price,
    description,
    productCreationDate,
  } = item;

  return (
    <div className=''>
      <div className='card bg-base-100 w-96 shadow-xl'>
        <figure>
          <img
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title'>
            {productName}
            <div className='badge badge-secondary'>${price}</div>
          </h2>
          <p className='text-xs'>{description}</p>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>{brandName}</div>
            <div className='badge badge-outline'>{category}</div>
            <div className='badge badge-outline'>{productCreationDate}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
