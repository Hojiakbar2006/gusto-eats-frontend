import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { ru, us, uz } from "../../../utils/helper";
import {
  FacebookFilled,
  MailOutlined,
  PhoneFilled,
  YoutubeFilled,
  InstagramFilled,
} from "@ant-design/icons";
import { Select, Layout } from "antd";

const { Footer } = Layout;
const { Option } = Select;

export default function AppFooter() {
  const [lang, setLang] = React.useState(uz);

  const handleChange = (value) => {
    setLang(value);
  };

  return (
    <Footer className="footer">
      <div className="social-media-links">
        <div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.instagram.com/hojiakbar____0628/"
          >
            <InstagramFilled style={{ fontSize: 40 }} />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.youtube.com/@hojiakbar-developer"
          >
            <YoutubeFilled style={{ fontSize: 40 }} />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://t.me/hojiakbar_0628"
          >
            {/* <TelegramFilled style={{ fontSize: 40 }} /> */}
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="https://www.facebook.com/hojiakbar.developer"
          >
            <FacebookFilled style={{ fontSize: 40 }} />
          </Link>
        </div>
        <div className="contact-info">
          <a href="tel:+998993250628">
            <PhoneFilled /> +998 (99) 325-0628
          </a>
          <a href="mailto:hojiakbarnasriddinov2006@gmail.com">
            <MailOutlined /> hojiakbarnasriddinov2006@gmail.com
          </a>
        </div>
      </div>
      <div>
        <div className="copyright">
          <p>© 2024-2030 All rights reserved.</p>
        </div>
        <div className="language-selector">
          <Select
            value={lang}
            onChange={handleChange}
            style={{ width: 120 }}
            size="large"
          >
            <Option value={uz}>
              <img src={uz} alt="uz" /> UZ
            </Option>
            <Option value={ru}>
              <img src={ru} alt="ru" /> RU
            </Option>
            <Option value={us}>
              <img src={us} alt="us" /> US
            </Option>
          </Select>
        </div>
      </div>
    </Footer>
  );
}
