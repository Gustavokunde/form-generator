import { array, mixed, object, string } from 'yup';

export const metadataValidation = object().shape({
  label: string().trim().required('Field is required'),
  viewType: string().trim().required('Field is required'),
  sections: array()
    .of(
      object().shape({
        name: string().trim().required('Field is required'),
        rows: array()
          .of(
            object().shape({
              fields: array()
                .of(
                  object()
                    .shape({
                      fieldType: string().trim().required('Field is required'),
                      size: mixed()
                        .oneOf(['Small', 'Medium', 'Large', 'Extra-Large'])
                        .required(),
                    })
                    .required()
                )
                .required(),
            })
          )
          .required(),
      })
    )
    .required(),
});
