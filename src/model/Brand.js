class Brand {
  constructor(data) {
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.description = data.description;
    this.logo = data.logo;
    this.isFeatured = data.isFeatured;
    this.showInBrandSlider = data.showInBrandSlider;
    this.pageTitle = data.pageTitle;
    this.shortDescription = data.shortDescription;
    this.position = data.position;
  }
}

export default Brand;
