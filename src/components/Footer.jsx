import React from "react";

const Footer = () => {
  const currentYear = new Date();
  return (
    <footer className="Footer">
      <p>Copyright &copy; {currentYear.getFullYear()}</p>
    </footer>
  );
};

export default Footer;
