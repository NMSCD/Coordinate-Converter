import type { ElementFunctions } from './elementLogic/elementFunctions';
import { convert, copy } from './main';
import { switchTheme } from './themeSwitch';

export const elementFunctions: ElementFunctions[] = [
  {
    element: 'themeSwitch',
    handler: 'click',
    func: function () {
      switchTheme();
    },
  },
  {
    element: 'dataInput',
    handler: 'input',
    func: function () {
      convert((this as unknown as HTMLInputElement).value);
    },
  },
  {
    element: 'copyBtn',
    handler: 'click',
    func: function () {
      copy(this as unknown as HTMLButtonElement);
    },
  },
];
