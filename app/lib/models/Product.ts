import { Schema, model, Document, Types, models } from "mongoose";

export interface ProductInput {
  // _id: string;
  // user: UserDocument["_id"];
  title: string;
  description: string;
  price: {
    current: number;
    original: number;
    discount: number;
  };

  displayImage: { url: string; alt: string };
  category: Types.ObjectId;

  merchant: Types.ObjectId;
  brand: Types.ObjectId;
  quantity: number;
  images: { url: string; alt: string }[];
}

export interface ProductDocument extends ProductInput, Document {
  createdAt: Date;
  updatedAt: Date;
  isValid: boolean;
  categoryName: string;
  brandName: string;
  merchantName: string;
  uniqueViews: [Types.ObjectId];
  quantitySold: number;
  tags: string[];
  isActive: boolean;
  isApproved: boolean;
  isDeleted: boolean;
  hasDiscount: boolean;
  ratings: [
    {
      userId: Types.ObjectId;
      rating: number;
      review: string;
      helpfulVotes: number;
      createdAt: Date;
    }
  ];
  views: number;
  variations: [
    {
      name: string;
      options: [string]; // Options for the variation (e.g., ["Small", "Medium", "Large"])
      images: [
        {
          url: string;
          alt: string;
        }
      ];
      priceAdjustments: [
        {
          option: string; // Option for which the adjustment applies (e.g., "Small")
          price: number; // Price adjustment for this option (e.g., -10 for a $10 discount)
        }
      ];
    }
  ];
}

const ProductSchema = new Schema<ProductDocument>(
  {
    title: { type: String, trim: true, uppercase: true, required: true },
    description: { type: String, trim: true, uppercase: true, required: true },
    price: {
      current: Number,
      original: Number,
      discount: Number,
    },
    isValid: { type: Boolean, default: false },
    displayImage: {
      url: String,
      alt: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    categoryName: String,
    brandName: String,
    merchantName: String,
    merchant: {
      type: Schema.Types.ObjectId,
      ref: "Merchant",
      required: true,
    },
    uniqueViews: [Schema.Types.ObjectId],
    quantity: { type: Number, required: true },
    quantitySold: { type: Number, default: 0 },
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    tags: [String],
    isActive: { type: Boolean, default: true },
    hasDiscount: { type: Boolean, default: false },
    ratings: [
      new Schema(
        {
          userId: Schema.Types.ObjectId,
          rating: Number,
          review: String,
          helpfulVotes: Number,
        },
        { timestamps: true }
      ),
    ],
    views: { type: Number, default: 0 },
    variations: [
      {
        name: String,
        options: [String], // Options for the variation (e.g., ["Small", "Medium", "Large"])
        images: [
          {
            url: String,
            alt: String,
          },
        ],
        priceAdjustments: [
          {
            option: String, // Option for which the adjustment applies (e.g., "Small")
            price: Number, // Price adjustment for this option (e.g., -10 for a $10 discount)
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
export default models.Product ||
  model<ProductDocument>("Product", ProductSchema);
