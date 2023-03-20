import React from 'react';

const NavbarContext = React.createContext({
  open: false,
  toggle: () => {},
  setOpen: () => {},
  setClose: () => {},
});

NavbarContext.displayName = 'NavbarContext';

export default NavbarContext;
