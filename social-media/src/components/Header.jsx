import React from "react";

function Header(props) {
  const VariableHeading = `h${props.size}`;
  return <VariableHeading>{props.children}</VariableHeading>;
}

export default Header;
