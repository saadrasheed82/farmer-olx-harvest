import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import CursorToggle from './CursorToggle';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{t('common.appName')}</h3>
            <p className="text-sm mb-4">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-blue-300 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
              <Youtube className="h-5 w-5 hover:text-red-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">{t('footer.quickLinks.about')}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">{t('footer.quickLinks.howItWorks')}</Link></li>
              <li><Link to="/safety-tips" className="hover:text-white">{t('footer.quickLinks.safetyTips')}</Link></li>
              <li><Link to="/success-stories" className="hover:text-white">{t('footer.quickLinks.successStories')}</Link></li>
              <li><Link to="/blog" className="hover:text-white">{t('footer.quickLinks.blog')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.support.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-white">{t('footer.support.helpCenter')}</Link></li>
              <li><Link to="/terms" className="hover:text-white">{t('footer.support.terms')}</Link></li>
              <li><Link to="/privacy" className="hover:text-white">{t('footer.support.privacy')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.contact.title')}</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {t('footer.contact.email')}
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {t('footer.contact.phone')}
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {t('footer.contact.address')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>{t('footer.copyright')}</p>
            <CursorToggle className="mt-4 md:mt-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
