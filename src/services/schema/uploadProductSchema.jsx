import Joi from 'joi';
import { markets } from '../fake/markets';

const marketDependentProp = (market, format = Joi.string().required()) => {
  return Joi.alternatives().conditional(Joi.ref(market), {
    is: Joi.string().valid('online', 'offline'),
    then: format,
    otherwise: Joi.optional(),
  });
};

let originalPrice = {},
  selectedMarkets = {},
  productName = {},
  salePrice = {},
  shippingCost = {},
  carrier = {},
  deliveryTime = {},
  shippingMethod = {},
  description = {},
  shortDescription = {};

markets.forEach((market) => {
  // all markets
  selectedMarkets[market.id] = Joi.string().valid(
    'online',
    'offline',
    'inactive',
  );

  // all product names
  productName[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
  ).label(`Name for ${market.name}`);

  // all original prices
  originalPrice[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.number().required(),
  ).label(`Price for ${market.name}`);

  // all sale prices
  salePrice[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.number().empty(''),
  ).label(`Price for ${market.name}`);

  shippingCost[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.number().empty(''),
  ).label(`Price for ${market.id}`);

  carrier[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.array().items(Joi.string()).empty(''), // add values
  ).label(`Carrier for ${market.id}`);

  deliveryTime[market.id] = marketDependentProp(
    // add values
    `...selectedMarkets.${market.id}`,
    Joi.object({
      from: Joi.number().empty(''),
      to: Joi.number().empty(''),
    }),
  );

  shippingMethod[market.id] = marketDependentProp(
    // add values
    `...selectedMarkets.${market.id}`,
    Joi.string().empty(''),
  );

  description[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.string().empty(''),
  );

  shortDescription[market.id] = marketDependentProp(
    `...selectedMarkets.${market.id}`,
    Joi.string().empty(''),
  );
});

const uploadProductSchema = Joi.object({
  selectedMarkets: Joi.object(selectedMarkets),

  productFeatured: Joi.boolean().default(false),

  // Basic information
  productName: productName,

  sku: Joi.string().required(),

  mpn: Joi.number().required(),

  eanGtin: Joi.number().min(100000000000).max(9999999999999).required(),

  hsCode: Joi.number().empty(''),

  taxRules: Joi.string().empty(''),

  stockStatus: Joi.string().valid('in-stock', 'out-of-stock', ''),

  stock: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Stock must be a number.',
      'number.min': 'Stock must be at least 0.',
    })
    .empty(''),

  inStockDate: Joi.date().optional().empty(''),

  visibility: Joi.array().items(Joi.string()).empty(''),

  height: Joi.number().min(0).optional().empty(''),

  width: Joi.number().min(0).optional().empty(''),

  length: Joi.number().min(0).optional().empty(''),

  weight: Joi.number().min(0).optional().empty(''),

  // Price
  originalPrice: Joi.object(originalPrice),

  salePrice: Joi.object(salePrice),

  // Shipping & Delivery
  shippingCost: Joi.object(shippingCost),

  deliveryTime: Joi.object(deliveryTime),

  carrier: Joi.object(carrier),

  shippingMethod: Joi.object(shippingMethod),

  shippedFromEU: Joi.boolean().empty(''),

  // Description
  description: Joi.object(description),

  shortDescription: Joi.object(shortDescription),

  // Images
  images: Joi.object({
    mainImage: Joi.any().empty(),
    extraImages: Joi.array().items(Joi.any()).empty(null),
  }),

  // video
  video: Joi.any().empty(''),
  videoUrl: Joi.string().empty(''),
  videoTitle: Joi.string().empty(''),
  videoMetaDescription: Joi.string().empty(''),
  thumbnail: Joi.any().empty(''),

  // Category & Attributes
  category: Joi.string().empty(''),
  attributeSet: Joi.string().empty(''), // add values

  // Specification
  specification: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      row: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
        }),
      ),
    }),
  ),

  // SEO
  urlKey: Joi.string().empty(''),
  metaTitle: Joi.string().empty(''),
  metaKeywords: Joi.string().empty(''),
  metaDescription: Joi.string().empty(''),
  includeInHTMLSitemap: Joi.boolean(),
  useInCrossLinking: Joi.boolean(),
  includeInXMLSitemap: Joi.boolean(),
  metaRobots: Joi.string().empty(''),
  crossDomainStore: Joi.string().empty(''),
  crossDomainUrl: Joi.string().empty(''),
  canonical: Joi.string().empty(''),
  canonicalUrl: Joi.string().empty(''),
  openGraph: Joi.string().empty(''),
  openGraphText: Joi.string().empty(''),

  // Related Products
  relatedProducts: Joi.array().items(Joi.string()),
  recommendedProducts: Joi.array().items(Joi.string()),
  crossSellProducts: Joi.array().items(Joi.string()),

  // Add more here
});

export default uploadProductSchema;
