import React from 'react';

export type TNavbarContext = {
  open: boolean;
  toggle: () => void;
  setOpen: () => void;
  setClose: () => void;
};

const NavbarContext = React.createContext<TNavbarContext>({
  open: false,
} as TNavbarContext);

NavbarContext.displayName = 'NavbarContext';

export default NavbarContext;
