"use client";

import { FaBlogger, FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (

        <div className="footer flex justify-between items-center w-full px-5 md:px-10 bg-blue-950 text-black">
            <div className="flex justify-center items-center py-5 mx-auto">
                <div className="pr-2">
                    <a href="https://www.linkedin.com/company/cyscomvit" target='_blank'>
<FaLinkedin size={26} color="#ffffff" />
                    </a>
                </div>
                <div className="md:px-2 px-2 ">
                    <a href="https://twitter.com/CyscomVit" target='_blank'>
<FaXTwitter size={26} color="#ffffff" />
                    </a>
                </div>
                <div className="md:px-2 px-2 ">
                    <a href="https://instagram.com/cyscomvit" target='_blank'>
                    <FaInstagram size={26} color="#ffffff" />
                    </a>
                </div>
                <div className="md:px-2 px-2 ">
                    <a href="https://blog.cyscomvit.com" target='_blank'>
                    <FaBlogger size={26} color="#ffffff" />
                    </a>
                </div>
                <div className="md:px-2 px-2 ">
                    <a href="https://github.com/cyscomvit" target='_blank'>
<FaGithub size={26} color="#ffffff" />
                    </a>
                </div>
                <div className="md:px-2 px-2 ">
                    <a href="https://discord.gg/9RyHCQgjAv" target='_blank'>
                    <FaDiscord size={26} color="#ffffff" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
