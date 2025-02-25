class Product {
  constructor(data) {
    // console.log(data);
    this.serial = data.serial;
    this.id = data.id;
    this.sku = data.sku;
    this.ean = data.ean;
    this.gtin = data.gtin;
    this.mpn = data.mpn;
    this.name = data.titles?.['EN'];
    this.titles = data.titles;
    this.priceUSD = data.prices?.['USD']?.['priceText'];
    this.brandId = data.brandId;
    this.brandName = data.brandName;
    this.sellerId = data.sellerId;
    this.sellerName = data.sellerName;
    this.isFeatured = data.isFeatured;
    this.isShippedFromEU = data.isShippedFromEU;
    this.publishedMarketCode = data.publishedMarketCode;
  }
}

export default Product;
