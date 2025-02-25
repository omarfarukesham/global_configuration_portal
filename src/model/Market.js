class Market {
  constructor(data) {
    // console.log(data.marketCode);
    this.id = data.id;
    this.serial = data.serial;
    this.name = data.name;
    this.countryId = data.countryId;
    this.url = data.url || null;
    this.marketType = data.marketType;
    this.contactInformationIds = data.contactInformationIds || null;
    this.marketCode = data.marketCode;
    this.status = data.status;

    // Nested properties from the "country" object
    this.country = {
      id: data.country.id,
      name: data.country.name,
      isoCodeShort: data.country.isoCodeShort,
      isoCodeFull: data.country.isoCodeFull,
      dialCode: data.country.dialCode,
      currencies: data.country.currencies.map((currency) => ({
        id: currency.id,
        name: currency.name,
        code: currency.code,
        symbol: currency.symbol,
        isPrimary: currency.isPrimary,
      })),
      languages: data.country.languages.map((language) => ({
        id: language.id,
        name: language.name,
        code: language.code,
        isPrimary: language.isPrimary,
      })),
      status: data.country.status,
      createdAt: data.country.createdAt,
      updatedAt: data.country.updatedAt,
      createdBy: data.country.createdBy || null,
      updatedBy: data.country.updatedBy || null,
    };

    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.createdBy = data.createdBy || null;
    this.updatedBy = data.updatedBy || null;
  }
}

export default Market;
