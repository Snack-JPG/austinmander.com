"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar,
  Zap,
  Target,
  Star,
  Settings,
  ArrowRight,
  ExternalLink,
  Clock,
  DollarSign
} from "lucide-react";
import { BookingWidget } from "./booking-widget";
import { BOOKING_TYPES, type BookingType } from "@/lib/booking";

interface BookingCTAProps {
  bookingType?: BookingType['id'];
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  text?: string;
  showPrice?: boolean;
  showDuration?: boolean;
  modal?: boolean;
  context?: {
    page?: string;
    source?: string;
    leadScore?: number;
    userRole?: string;
    companySize?: string;
    timeOnSite?: number;
    previousInteractions?: string[];
  };
  className?: string;
  onClick?: () => void;
}

export function BookingCTA({
  bookingType,
  variant = 'primary',
  size = 'default',
  text,
  showPrice = false,
  showDuration = false,
  modal = true,
  context = {},
  className = "",
  onClick
}: BookingCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const getBookingIcon = (type?: BookingType['id']) => {
    switch (type) {
      case 'quickwin': return Zap;
      case 'demo': return Target;
      case 'strategy': return Star;
      case 'implementation': return Settings;
      default: return Calendar;
    }
  };

  const getDefaultText = (type?: BookingType['id']) => {
    if (text) return text;
    
    switch (type) {
      case 'quickwin': return 'Get £10k QuickWin';
      case 'demo': return 'See Change Radar Demo';
      case 'strategy': return 'Schedule Consultation';
      case 'implementation': return 'Plan Implementation';
      default: return 'Schedule Call';
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      primary: 'bg-teal hover:bg-teal/90 text-white',
      secondary: 'bg-secondary hover:bg-secondary/80',
      outline: 'border border-teal text-teal hover:bg-teal hover:text-white',
      ghost: 'hover:bg-teal/10 text-teal'
    };

    if (bookingType === 'quickwin' && variant === 'primary') {
      return 'bg-orange-500 hover:bg-orange-600 text-white';
    }

    return baseStyles[variant];
  };

  const Icon = getBookingIcon(bookingType);
  const buttonText = getDefaultText(bookingType);
  const booking = bookingType ? BOOKING_TYPES[bookingType] : null;

  const handleClick = () => {
    onClick?.();
    
    // Track CTA click
    import('@/lib/analytics').then(({ trackEvent }) => {
      trackEvent('booking_cta_click', {
        booking_type: bookingType || 'general',
        source: context.source || 'unknown',
        page: context.page || 'unknown'
      });
    });

    if (modal) {
      setModalOpen(true);
    } else {
      // Direct redirect to booking page
      window.location.href = `/book${bookingType ? `?type=${bookingType}` : ''}`;
    }
  };

  const buttonContent = (
    <>
      <Icon className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
      <span>{buttonText}</span>
      {showPrice && booking?.price && (
        <span className="ml-2 text-xs opacity-80">
          ({booking.price})
        </span>
      )}
      {showDuration && booking?.duration && (
        <span className="ml-2 text-xs opacity-80 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {booking.duration}m
        </span>
      )}
      <ArrowRight className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} ml-2`} />
    </>
  );

  if (modal) {
    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button
            size={size}
            className={`${getVariantStyles()} ${className}`}
            onClick={handleClick}
          >
            {buttonContent}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <BookingWidget
            context={context}
            defaultBookingType={bookingType}
            onBookingComplete={() => setModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Button
      size={size}
      className={`${getVariantStyles()} ${className}`}
      onClick={handleClick}
    >
      {buttonContent}
    </Button>
  );
}

// Specific CTA variants for common use cases
export function QuickWinCTA(props: Omit<BookingCTAProps, 'bookingType'>) {
  return (
    <BookingCTA
      {...props}
      bookingType="quickwin"
      variant={props.variant || 'primary'}
    />
  );
}

export function DemoCTA(props: Omit<BookingCTAProps, 'bookingType'>) {
  return (
    <BookingCTA
      {...props}
      bookingType="demo"
      variant={props.variant || 'secondary'}
    />
  );
}

export function StrategyCTA(props: Omit<BookingCTAProps, 'bookingType'>) {
  return (
    <BookingCTA
      {...props}
      bookingType="strategy"
      variant={props.variant || 'outline'}
    />
  );
}

// Context-aware booking CTA that automatically chooses the best option
export function SmartBookingCTA({
  context = {},
  primaryText,
  secondaryText,
  showAlternatives = false,
  className = ""
}: {
  context?: BookingCTAProps['context'];
  primaryText?: string;
  secondaryText?: string;
  showAlternatives?: boolean;
  className?: string;
}) {
  // Get recommendation based on context
  const getRecommendation = () => {
    const { leadScore = 0, page, source } = context;

    // High-intent contexts
    if (leadScore >= 70 || page === 'services' || source?.includes('quickwin')) {
      return 'quickwin';
    }
    
    // Product interest contexts
    if (page === 'about' || page === 'demo' || source?.includes('demo')) {
      return 'demo';
    }

    // Default to strategy for general interest
    return 'strategy';
  };

  const primaryBooking = getRecommendation();
  const alternatives: BookingType['id'][] = [];

  // Add alternatives
  if (primaryBooking !== 'quickwin') alternatives.push('quickwin');
  if (primaryBooking !== 'demo') alternatives.push('demo');
  if (primaryBooking !== 'strategy') alternatives.push('strategy');

  return (
    <div className={`space-y-3 ${className}`}>
      <BookingCTA
        bookingType={primaryBooking}
        text={primaryText}
        context={context}
        size="lg"
        className="w-full"
      />
      
      {showAlternatives && alternatives.length > 0 && (
        <div className="flex gap-2">
          {alternatives.slice(0, 2).map(booking => (
            <BookingCTA
              key={booking}
              bookingType={booking}
              variant="outline"
              size="sm"
              context={context}
              className="flex-1"
            />
          ))}
        </div>
      )}
      
      {secondaryText && (
        <p className="text-xs text-muted-foreground text-center">
          {secondaryText}
        </p>
      )}
    </div>
  );
}

// Floating action button for persistent CTA
export function FloatingBookingCTA({
  bookingType,
  context = {},
  position = 'bottom-right',
  visible = true
}: {
  bookingType?: BookingType['id'];
  context?: BookingCTAProps['context'];
  position?: 'bottom-right' | 'bottom-left';
  visible?: boolean;
}) {
  if (!visible) return null;

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <BookingCTA
        bookingType={bookingType}
        context={context}
        size="lg"
        className="shadow-lg hover:shadow-xl transition-shadow rounded-full px-6"
      />
    </div>
  );
}

// Inline text link version for use in content
export function BookingLink({
  bookingType,
  text,
  context = {},
  className = ""
}: {
  bookingType?: BookingType['id'];
  text?: string;
  context?: BookingCTAProps['context'];
  className?: string;
}) {
  return (
    <BookingCTA
      bookingType={bookingType}
      text={text}
      context={context}
      variant="ghost"
      size="sm"
      modal={true}
      className={`p-0 h-auto font-normal underline hover:no-underline ${className}`}
    />
  );
}