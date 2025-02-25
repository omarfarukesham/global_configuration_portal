class CustomizeCategories {
  // console.log(data)
  constructor(data) {
    this.serial = data.serial;
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.isFeatured = data.isFeatured;
    this.productPoolId = data.productPoolId;
    this.productPoolName = data.productPoolName;
    this.description = data.description;
    this.customizedParentCategoryName = data.customizedParentCategoryName;
    this.icon = data.icon;
    this.code = data.code;
    this.slug = data.slug;
    this.thumbnail = data.thumbnail;
    this.bannerPage = data.bannerPage;
  }
}

export default CustomizeCategories;
