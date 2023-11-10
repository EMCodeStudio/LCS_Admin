import payload from "payload";

export const queryRelations: any = async (data) => {
    const experiences = await payload.find({
      collection: "experiences",
      where: {
        // the 'in' operator is used when relations can be more than one
        category: { equals: data.id },
        // to add more query constraints use 'or', 'and' operator objects
      },
      depth: 0,
      limit: 0,
    });
  
    if (experiences?.docs) {
      return experiences?.totalDocs;
    }
  
    return 0;
  };