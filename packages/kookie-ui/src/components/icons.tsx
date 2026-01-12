import React from 'react';

import type { ComponentPropsWithout, RemovedProps } from '../helpers/component-props.js';

type IconElement = React.ElementRef<'svg'>;
interface IconProps extends ComponentPropsWithout<'svg', RemovedProps | 'children'> {}

const ThickDividerHorizontalIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
      />
    </svg>
  );
});

ThickDividerHorizontalIcon.displayName = 'ThickDividerHorizontalIcon';

const ThickCheckIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
      />
    </svg>
  );
});
ThickCheckIcon.displayName = 'ThickCheckIcon';

const ChevronDownIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <path d="M0.135232 3.15803C0.324102 2.95657 0.640521 2.94637 0.841971 3.13523L4.5 6.56464L8.158 3.13523C8.3595 2.94637 8.6759 2.95657 8.8648 3.15803C9.0536 3.35949 9.0434 3.67591 8.842 3.86477L4.84197 7.6148C4.64964 7.7951 4.35036 7.7951 4.15803 7.6148L0.158031 3.86477C-0.0434285 3.67591 -0.0536285 3.35949 0.135232 3.15803Z" />
    </svg>
  );
});
ChevronDownIcon.displayName = 'ChevronDownIcon';

const ThickChevronRightIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.23826 0.201711C3.54108 -0.0809141 4.01567 -0.0645489 4.29829 0.238264L7.79829 3.98826C8.06724 4.27642 8.06724 4.72359 7.79829 5.01174L4.29829 8.76174C4.01567 9.06455 3.54108 9.08092 3.23826 8.79829C2.93545 8.51567 2.91909 8.04108 3.20171 7.73826L6.22409 4.5L3.20171 1.26174C2.91909 0.958928 2.93545 0.484337 3.23826 0.201711Z"
      />
    </svg>
  );
});
ThickChevronRightIcon.displayName = 'ThickChevronRightIcon';

const ThickChevronLeftIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.76174 0.201711C5.45892 -0.0809141 4.98433 -0.0645489 4.70171 0.238264L1.20171 3.98826C0.932757 4.27642 0.932757 4.72359 1.20171 5.01174L4.70171 8.76174C4.98433 9.06455 5.45892 9.08092 5.76174 8.79829C6.06455 8.51567 6.08091 8.04108 5.79829 7.73826L2.77591 4.5L5.79829 1.26174C6.08091 0.958928 6.06455 0.484337 5.76174 0.201711Z"
      />
    </svg>
  );
});
ThickChevronLeftIcon.displayName = 'ThickChevronLeftIcon';

const ThickDotIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
      <circle cx="4.5" cy="4.5" r="2" />
    </svg>
  );
});
ThickDotIcon.displayName = 'ThickDotIcon';

export { ChevronDownIcon, ThickCheckIcon, ThickChevronLeftIcon, ThickChevronRightIcon, ThickDividerHorizontalIcon, ThickDotIcon };
export type { IconProps };

// Additional minimal icons
const CloseIcon = React.forwardRef<IconElement, IconProps>((_props, _forwardedRef) => {
  return (
    <svg
      {..._props}
      ref={_forwardedRef}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
});
CloseIcon.displayName = 'CloseIcon';

const PaperclipIcon = React.forwardRef<IconElement, IconProps>((props, forwardedRef) => {
  return (
    <svg
      {...props}
      ref={forwardedRef}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" />
    </svg>
  );
});
PaperclipIcon.displayName = 'PaperclipIcon';

const FileIcon = React.forwardRef<IconElement, IconProps>((_props, _forwardedRef) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
});
FileIcon.displayName = 'FileIcon';

const FileTextIcon = React.forwardRef<IconElement, IconProps>((_props, _forwardedRef) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
});
FileTextIcon.displayName = 'FileTextIcon';

export { CloseIcon, PaperclipIcon, FileIcon, FileTextIcon };
