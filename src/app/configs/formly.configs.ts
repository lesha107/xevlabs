import { ConfigOption } from '@ngx-formly/core';
import { FormlyDatePickerComponent } from '../components/shared';

export const FORMLY_CONFIGS: ConfigOption = {
  validationMessages: [{ name: 'required', message: 'This field is required' }],

  types: [
    {
      name: 'date-picker',
      component: FormlyDatePickerComponent,
    },
  ],
};
