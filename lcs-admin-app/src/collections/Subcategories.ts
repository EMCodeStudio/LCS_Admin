import payload from "payload";
import { CollectionConfig, FieldHook } from "payload/types";














// Definir una interfaz para representar la estructura de los resultados
interface ResultItem {
    contentType: string;
    productType: string;
    serviceType: string;
}

const setStateCategoryContentType: FieldHook = async ({ data }) => {
    try {
        const fieldCategoryId = data ? data.CategoriaSubcategoria : undefined;
        console.log('DATOS CATEGORIAs: ', fieldCategoryId);

        if (fieldCategoryId && fieldCategoryId.length > 0) {
            const categoryIds = fieldCategoryId.map((item: { relationTo: string; value: string }) => item.value);

            const categoryResponse = await payload.find({
                collection: 'categorias',
                where: {
                    id: {
                        in: categoryIds,
                    }
                }
            })

            let finalResult: ResultItem = {
                contentType: '',
                productType: 'NoProduct',
                serviceType: 'NoService',
            }

            categoryResponse.docs.forEach(doc => {
                const CategoryData = doc.TipoCategoria;

                if (CategoryData === 'products') {
                    finalResult.productType = 'Product';
                } else if (CategoryData === 'services') {
                    finalResult.serviceType = 'Service';
                }
            })

            if (finalResult.productType === 'Product' && finalResult.serviceType === 'Service') {
                finalResult.contentType = 'ProductService';
            } else if (finalResult.productType === 'Product' && finalResult.serviceType !== 'Service') {
                finalResult.contentType = 'Product';
            } else if (finalResult.productType !== 'Product' && finalResult.serviceType === 'Service') {
                finalResult.contentType = 'Service';
            } else {
                finalResult.contentType = 'NoProductService';
            }

            console.log('RESULT TIPOS DE CATEGORIA: ', finalResult)

            const firstValue = Object.values(finalResult)[0].toString();
            console.log('RESULT PRIMER VALOR: ', firstValue);
            return firstValue;
        }
    } catch (error) {
        console.error('Error:', error);
    }
};



















const Subcategories: CollectionConfig = {
    slug: 'subcategorias',
    access: {
        read: () => true
    },
    admin: {
        useAsTitle: 'NombreSubcategoria',
        defaultColumns: ['NombreSubcategoria', 'CategoriaSubcategoria', 'EstadoSubcategoria'],
        group: 'INVENTARIO'
    },
    labels: {
        singular: 'Subcategoria',
        plural: 'Subcategorias',
    },
    fields: [
        {
            name: 'NombreSubcategoria',
            label: 'Nombre de la Subcategoria',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                placeholder: 'Nombre aqui'
            }
        },
        {
            name: "CategoriaSubcategoria",
            label: "Nombre de la Categoria",
            type: 'relationship',
            relationTo: ['categorias'],
            hasMany: true,
            required: true
        },
        {
            name: "TipoCategoriaSubcategoria", // GUARDA TRUE SI CONTIENE PRODUCTO O FALSE SI ES SERVICIOS
            type: "text",
            label: "Tipo de Contenido",
            required: false,
            hidden: false,
            admin: {
                readOnly: true,
            },
            access: {
                update: () => true,
            },
            hooks: {
                beforeChange: [setStateCategoryContentType],
                afterRead: [setStateCategoryContentType]
            }
        },
        {
            name: "EstadoSubcategoria",
            type: "select",
            label: "Estado de la Subcategoria",
            hasMany: false,
            options: [
                {
                    label: "Publica",
                    value: "published",
                },
                {
                    label: "No Publica",
                    value: "draft",
                },
            ],
            defaultValue: 'published',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],
    timestamps: true,
}

export default Subcategories;