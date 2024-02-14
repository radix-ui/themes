// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

type InputAttributes =
  | 'accept'
  | 'alt'
  | 'autocapitalize'
  | 'autocomplete'
  | 'capture'
  | 'checked'
  | 'defaultChecked'
  | 'defaultValue'
  | 'dirname'
  | 'disabled'
  | 'form'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'height'
  | 'list'
  | 'max'
  | 'maxlength'
  | 'min'
  | 'minlength'
  | 'multiple'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'popovertarget'
  | 'popovertargetaction'
  | 'readonly'
  | 'required'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'value'
  | 'width';

type InputCommonAttributes = 'disabled' | 'form' | 'name' | 'required' | 'defaultValue' | 'value';
type InputRadioAttributes = InputCommonAttributes | 'defaultChecked' | 'checked';

type NotInputRadioAttributes = Exclude<InputAttributes, InputRadioAttributes>;

export type {
  InputAttributes,
  InputCommonAttributes,
  InputRadioAttributes,
  NotInputRadioAttributes,
};
