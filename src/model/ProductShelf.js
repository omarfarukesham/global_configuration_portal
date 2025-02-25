class ProductShelf {
  constructor(data) {
    // console.log(data);
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.productPoolId = data.productPoolId;
    this.productPoolName = data.productPoolName;
    this.description = data.description;
    this.marketCode = data.marketCode;
    this.code = data.code;
  }
}

export default ProductShelf;
