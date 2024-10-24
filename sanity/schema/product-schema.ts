import { defineField, defineType } from "sanity";

export const product = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Flower Pots', value: 'flower_pots' },
          { title: 'Chakkars', value: 'chakkars' },
          { title: 'Rockets', value: 'rockets' },
          { title: 'Bombs', value: 'bombs' },
          { title: 'Twinkling Stars', value: 'twinkling_stars' },
          { title: 'Sparkles', value: 'sparkles' },
          { title: 'Wala', value: 'wala' },
          { title: 'Shots', value: 'shots' },
          { title: 'Bijili', value: 'bijili' },
          { title: 'Fancy', value: 'fancy' },
        ],
      },
    },
    // New field for video link
    {
      name: 'videoLink',
      title: 'Video Link',
      type: 'url',
      description: 'URL of the featured product video.',
    },
  ],
});
