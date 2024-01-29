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
      <div>
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
        <div>
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
        <p>© 2024- 2030 All rights reserved.</p>
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
