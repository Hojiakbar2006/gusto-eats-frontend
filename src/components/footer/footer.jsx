import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { ru, us, uz } from "../../utils/helper";
import logo from "../../assets/icons/logo.png";

import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Telegram,
  YouTube,
} from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export default function Footer() {
  const [lang, setLang] = React.useState("");

  const handleChange = (event) => {
    setLang(event.target.value);
  };
  return (
    <footer>
      <div className="left">
        <div>
          <Link to="/">
            <img width="150px" src={logo} alt="" />
          </Link>
          <p>
            Our job is to filling your tummy with delicious food and with fast
            and free delivery.
          </p>
          <div>
            <Link>
              <IconButton size="small">
                <Facebook sx={{ fontSize: 40 }} />
              </IconButton>
            </Link>
            <Link>
              <IconButton size="small">
                <Instagram sx={{ fontSize: 40 }} />
              </IconButton>
            </Link>
            <Link>
              <IconButton size="small">
                <YouTube sx={{ fontSize: 40 }} />
              </IconButton>
            </Link>
            <Link>
              <IconButton size="small">
                <Telegram sx={{ fontSize: 40 }} />
              </IconButton>
            </Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Store</p>
          <Link>About us</Link>
          <Link>Find store</Link>
          <Link>Categories</Link>
          <Link>Blogs</Link>
        </div>
        <div>
          <p className="footer-title">Information</p>
          <Link>Help center</Link>
          <Link>Money refund</Link>
          <Link>Shipping info</Link>
          <Link>Refunds</Link>
        </div>
        <div>
          <p className="footer-title">Support</p>
          <Link>Help center</Link>
          <Link>Documents</Link>
          <Link>Account restore</Link>
          <Link>My Orders</Link>
        </div>
        <div>
          <p className="footer-title">Support</p>
          <a href="tel:+998993250628">
            <Phone />
            +998 (99) 325-0628
          </a>
          <a href="mailto:hojiakbarnasriddinov2006@gmail.com">
            <Mail />
            hojiakbarnasriddinov2006@gmail.com
          </a>
        </div>
      </div>
      <div>
        <p>© 2018- 2023 Templatemount.All rights reserved.</p>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel size="small" id="demo-simple-select-label">
            Language
          </InputLabel>
          <Select
            sx={{ width: "100%" }}
            value={lang}
            label="Language"
            onChange={handleChange}
            size="small"
          >
            <MenuItem value={uz}>
              <figure>
                <img src={uz} alt="uz" /> UZ
              </figure>
            </MenuItem>
            <MenuItem value={ru}>
              <figure>
                <img src={ru} alt="ru" /> RU
              </figure>
            </MenuItem>
            <MenuItem value={us}>
              <figure>
                <img src={us} alt="us" /> US
              </figure>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    </footer>
  );
}
