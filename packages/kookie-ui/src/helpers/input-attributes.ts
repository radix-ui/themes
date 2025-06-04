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

// Includes all text-like inputs, e.g. text, email, password, number, date, etc.
type InputTextualAttributes =
  | 'autoCapitalize'
  | 'autoComplete'
  | 'defaultValue'
  | 'disabled'
  | 'form'
  | 'list'
  | 'maxLength'
  | 'minLength'
  | 'min'
  | 'multiple'
  | 'max'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'step'
  | 'type'
  | 'value';

type InputRadioAttributes =
  | 'checked'
  | 'defaultChecked'
  | 'defaultValue'
  | 'disabled'
  | 'form'
  | 'name'
  | 'required'
  | 'value';

type NotInputRadioAttributes = Exclude<InputAttributes, InputRadioAttributes>;
type NotInputTextualAttributes = Exclude<InputAttributes, InputTextualAttributes>;

export type {
  InputAttributes,
  InputRadioAttributes,
  InputTextualAttributes,
  NotInputRadioAttributes,
  NotInputTextualAttributes,
};
