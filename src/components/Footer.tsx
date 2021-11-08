import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                At TFP we build software that empowers women to take control of
                and better manage their health.
              </p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>
            Copyright © 2020{" "}
            <a href="https://tfp-fertility.com/en-de" target="_blank">
              Fertility
            </a>{" "}
            All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
