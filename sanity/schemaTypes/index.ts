import { type SchemaTypeDefinition } from "sanity";
import { product } from "../schema/product-schema";
import { order } from "../schema/order";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, order],
};
