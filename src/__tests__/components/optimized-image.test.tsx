import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { OptimizedImage, HeroImage, ThumbnailImage, AvatarImage } from '@/components/optimized-image';
import '@testing-library/jest-dom';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Intersection Observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver as any;

describe('OptimizedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with required props', () => {
    render(
      <OptimizedImage
        src="/test-image.jpg"
        alt="Test image"
        width={500}
        height={300}
      />
    );

    const image = screen.getByRole('img', { name: 'Test image' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('renders with priority prop and skips lazy loading', () => {
    render(
      <OptimizedImage
        src="/priority-image.jpg"
        alt="Priority image"
        width={500}
        height={300}
        priority={true}
      />
    );

    const image = screen.getByRole('img', { name: 'Priority image' });
    expect(image).toBeInTheDocument();
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test"
        width={500}
        height={300}
        className="custom-class"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('renders with fill prop', () => {
    const { container } = render(
      <OptimizedImage
        src="/fill-image.jpg"
        alt="Fill image"
        fill={true}
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('relative', 'overflow-hidden');
  });

  it('calls onLoad callback when image loads', async () => {
    const onLoad = jest.fn();
    
    render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test"
        width={500}
        height={300}
        onLoad={onLoad}
        priority={true}
      />
    );

    const image = screen.getByRole('img');
    
    // Simulate image load
    const loadEvent = new Event('load');
    image.dispatchEvent(loadEvent);

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalled();
    });
  });

  it('uses custom quality setting', () => {
    render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test"
        width={500}
        height={300}
        quality={90}
        priority={true}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('quality', '90');
  });
});

describe('HeroImage', () => {
  it('renders with priority and high quality', () => {
    render(
      <HeroImage
        src="/hero.jpg"
        alt="Hero image"
        width={1920}
        height={1080}
      />
    );

    const image = screen.getByRole('img', { name: 'Hero image' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('priority', 'true');
    expect(image).toHaveAttribute('quality', '90');
  });
});

describe('ThumbnailImage', () => {
  it('renders with responsive sizes', () => {
    render(
      <ThumbnailImage
        src="/thumbnail.jpg"
        alt="Thumbnail"
        width={300}
        height={200}
      />
    );

    const image = screen.getByRole('img', { name: 'Thumbnail' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('sizes');
  });
});

describe('AvatarImage', () => {
  it('renders with rounded style', () => {
    const { container } = render(
      <AvatarImage
        src="/avatar.jpg"
        alt="Avatar"
        width={64}
        height={64}
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('rounded-full');
  });

  it('combines custom className with rounded style', () => {
    const { container } = render(
      <AvatarImage
        src="/avatar.jpg"
        alt="Avatar"
        width={64}
        height={64}
        className="border-2"
      />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('rounded-full', 'border-2');
  });
});