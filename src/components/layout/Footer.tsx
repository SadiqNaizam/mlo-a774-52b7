import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    console.log('Footer loaded');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/40">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
                <div className="text-center text-sm text-muted-foreground md:text-left">
                    <p>&copy; {currentYear} RFP Dashboard Elite. All rights reserved.</p>
                </div>
                <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
                    <Link to="/support" className="transition-colors hover:text-foreground">
                        Support
                    </Link>
                    <Link to="/terms" className="transition-colors hover:text-foreground">
                        Terms of Service
                    </Link>
                    <Link to="/privacy" className="transition-colors hover:text-foreground">
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;