const Footer = () => {
  return (
    <footer className="flex flex-col w-full items-center pt-4">
      <div className="page-width-container flex w-full border-b border-gray pb-4">
        <nav className="flex w-full justify-around space-x-10 font-thin">
          <ul className="footer-item-list w-full grid grid-cols-2 md:grid-cols-3 justify-items-center">
            <li>About Us</li>
            <li>Why Choose Us?</li>
            <li>Contact Us</li>
            <li>Terms and Privacy</li>
            <li>News</li>
            <li>Leadership</li>
          </ul>
        </nav>
      </div>
      <div className="mt-2 mb-1 font-thin text-sm">
        &#169; 2023 by A'isamuddin
      </div>
    </footer>
  );
};

export default Footer;
