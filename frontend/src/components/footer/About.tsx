import { Link } from 'react-router-dom';
import FacebookIcon from '@assets/images/icons/social_media/facebook_icon.svg';
import TwitterIcon from '@assets/images/icons/social_media/twitter_icon.svg';
import InstagramIcon from '@assets/images/icons/social_media/instagram_icon.svg';
import RedditIcon from '@assets/images/icons/social_media/reddit_icon.svg';
import DiscordIcon from '@assets/images/icons/social_media/discord_icon.svg';

export default function About() {
    return (
        <div className="footer-about">
            <div className="footer-about-information">
                <Link to='/'>Contact</Link>
                <Link to='/'>About</Link>
                <Link to='/'>Privacy Policy</Link>
                <Link to='/'>Careers</Link>
            </div>
            <div className="footer-about-socials">
                <Link to='/'>
                    <img
                        src={FacebookIcon}
                        alt="Facebook icon"
                    />
                </Link>
                <Link to='/'>
                    <img
                        src={TwitterIcon}
                        alt="Twitter icon"
                    />
                </Link>
                <Link to='/'>
                    <img
                        src={InstagramIcon}
                        alt="Instagram icon"
                    />
                </Link>
                <Link to='/'>
                    <img
                        src={RedditIcon}
                        alt="Reddit icon"
                    />
                </Link>
                <Link to='/'>
                    <img
                        src={DiscordIcon}
                        alt="Discord icon"
                    />
                </Link>
            </div>
        </div>
    );
}
