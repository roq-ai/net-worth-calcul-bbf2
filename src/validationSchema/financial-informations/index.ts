import * as yup from 'yup';

export const financialInformationValidationSchema = yup.object().shape({
  data: yup.string().required(),
  organization_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
