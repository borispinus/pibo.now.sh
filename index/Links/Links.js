import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/fontawesome-free-regular';
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';

import style from './Links.module.scss';

const links = [
  {
    name: 'email',
    href: 'mailto:bvpinus@gmail.com',
    icon: faEnvelope,
    text: 'bvpinus@gmail.com',
  },
  {
    name: 'github',
    href: 'https://github.com/borispinus',
    icon: faGithub,
    text: '@borispinus',
  },
  {
    name: 'tg',
    href: 'https://t.me/pinbor',
    icon: faTelegram,
    text: '@pinbor',
  },
];

const Links = ({ onHover }) => (
  <ul className={style.Links}>
    {links.map((link) => (
      <li key={link.name} className={style.link} onMouseEnter={onHover}>
        <a href={link.href}>
          <FontAwesomeIcon className={style.icon} icon={link.icon} />
          {link.text}
        </a>
      </li>
    ))}
  </ul>
);

Links.propTypes = {
  onHover: PropTypes.func.isRequired,
};

export { Links };
