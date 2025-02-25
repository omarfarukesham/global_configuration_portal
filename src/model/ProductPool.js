import Product from './Product';

class ProductPool {
  constructor(data) {
    // console.log(data);
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.productIds = data.productIds;
    this.productIdsLength = data.productIds ? data.productIds.length : 0;
    this.products = data?.products?.map(
      (e, index) => new Product({ ...e, serial: index + 1 }),
    );
    this.titles = data.titles;
    // this.name = data.titles?.['EN'];
    this.productSlug = data.productSlug;
  }
}

export default ProductPool;
