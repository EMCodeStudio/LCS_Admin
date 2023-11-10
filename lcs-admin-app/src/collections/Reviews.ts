const Reviews = {
  slug: 'Reviewss',
  labels: {
    singular: 'Reviews',
    plural: 'Reviewss',
  },
  fields: [
    //example text field
    {
      name: 'myCustomUIField', // required
      type: 'ui', // required
      admin: {
        components: {
          Field: MyCustomUIField,
          Cell: MyCustomUICell,
        },
      },
    },

    
    {
      name: 'categoryCount',
      type: 'number',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            siblingData.categoryCount = undefined;
          },
        ],
        afterRead: [
          async ({ req, originalDoc }) => {
            const docQuery = await req.payload.find({
              collection: 'places',
              where: {
                categories: {
                  in: [originalDoc.id],
                },
              },
            });

            return docQuery.totalDocs;
          },
        ],
      },
    }
  ],
  admin: {
    useAsTitle: 'fieldName',
  },
  timestamps: true,
};

export default Reviews;