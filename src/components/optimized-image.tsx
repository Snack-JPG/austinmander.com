'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  fill?: boolean;
  style?: React.CSSProperties;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = '100vw',
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  fill = false,
  style,
  objectFit = 'cover',
}: OptimizedImageProps): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Generate a simple blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=';

  if (fill) {
    return (
      <div 
        ref={imgRef} 
        className={cn('relative overflow-hidden', className)}
        style={style}
      >
        {isInView && (
          <>
            {/* Skeleton loader */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
            
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              onLoad={handleLoad}
              className={cn(
                'transition-opacity duration-300',
                isLoaded ? 'opacity-100' : 'opacity-0'
              )}
              style={{ objectFit }}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div 
      ref={imgRef} 
      className={cn('relative overflow-hidden', className)}
      style={{ ...style, width, height }}
    >
      {isInView && (
        <>
          {/* Skeleton loader */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
          
          <Image
            src={src}
            alt={alt}
            width={width || 500}
            height={height || 500}
            sizes={sizes}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={blurDataURL || defaultBlurDataURL}
            onLoad={handleLoad}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        </>
      )}
    </div>
  );
}

// Specialized components for common use cases

export function HeroImage(props: Omit<OptimizedImageProps, 'priority' | 'sizes'>): React.JSX.Element {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="100vw"
      quality={90}
    />
  );
}

export function ThumbnailImage(props: Omit<OptimizedImageProps, 'sizes'>): React.JSX.Element {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      quality={70}
    />
  );
}

export function AvatarImage(props: Omit<OptimizedImageProps, 'sizes'>): React.JSX.Element {
  return (
    <OptimizedImage
      {...props}
      sizes="64px"
      quality={80}
      className={cn('rounded-full', props.className)}
    />
  );
}

export function BackgroundImage({ 
  children, 
  ...props 
}: OptimizedImageProps & { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="relative">
      <OptimizedImage
        {...props}
        fill
        className={cn('absolute inset-0 -z-10', props.className)}
      />
      {children}
    </div>
  );
}