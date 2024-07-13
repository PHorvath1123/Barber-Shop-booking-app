declare module 'react-router-hash-link' {
    import { LinkProps } from 'react-router-dom';
    import * as React from 'react';
  
    export class HashLink extends React.Component<LinkProps> {}
    export class NavHashLink extends React.Component<LinkProps> {}
  }