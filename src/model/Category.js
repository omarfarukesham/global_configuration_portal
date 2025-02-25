class Category {
  constructor(data) {
    // console.log(data);
    this.serial = data.serial;
    this.id = data.id;
    this.categoryId = data.categoryId;
    this.name = data.name;
    this.status = data.status;
  }
}

export default Category;
