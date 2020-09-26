import { FormlySelectComponent } from 'src/app/components/shared/formly';

import { ConfigOption } from '@ngx-formly/core';
import { options } from '../pages/admin-panel/selectOptions';

export const FORMLY_CONFIGS: ConfigOption = {
  validationMessages: [{ name: 'required', message: 'This field is required' }],

  types: [
    // {
    //   name: 'my-select',
    //   component: FormlySelectComponent,
    // },
    {
      name: 'my-select',
      extends: 'select',
      defaultOptions: {
        templateOptions: {
          label: 'Filter by role',
          options: [
            { value: 'admin', label: 'admin' },
            { value: 'user', label: 'user' },
          ],
        },
      },
    },
  ],
};
