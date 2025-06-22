// components/SocialLinks.tsx
'use client';
import { FaInstagram, FaFacebookF, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-5 mt-4 mb-4 text-gray-500">
      <a href="https://www.instagram.com/jumbozhang_1119" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <FaInstagram className="w-5 h-5 hover:text-pink-500 transition" />
      </a>
      <a href="https://www.facebook.com/share/16dF86WUGK/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <FaFacebookF className="w-5 h-5 hover:text-blue-600 transition" />
      </a>
      <a href="mailto:nycu150916.sc11@ncyu.edu.tw" aria-label="Email">
        <MdEmail className="w-5 h-5 hover:text-red-500 transition" />
      </a>
      <a href="https://github.com/JumboZhang1119" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <FaGithub className="w-5 h-5 hover:text-black dark:hover:text-white transition" />
      </a>
    </div>
  );
};

export default SocialLinks;
