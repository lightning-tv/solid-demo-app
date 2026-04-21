import { Meta, StoryObj } from "storybook-solidjs-vite";
import ContentBlock from "../ContentBlock";

const meta: Meta<typeof ContentBlock> = {
  title: "Components/Content Block",
  component: ContentBlock,
  tags: ["!autodocs"]
};
export default meta;

type Story = StoryObj<typeof ContentBlock>;

export const Default: Story = {
  args: {
    content: {
      title: "The Great Adventure",
      description:
        "Embark on an epic journey through fantastical lands filled with wonder and mystery. Discover ancient secrets and forge unforgettable friendships."
    }
  }
};

export const WithMetadata: Story = {
  args: {
    content: {
      title: "Action Thriller",
      description:
        "An intense and gripping tale of espionage, betrayal, and redemption. High-stakes drama unfolds as heroes race against time to prevent catastrophe.",
      voteCount: 1250,
      voteAverage: 8.5,
      metaText: "2h 45m • PG-13"
    }
  }
};

export const WithBadges: Story = {
  args: {
    content: {
      title: "Award Winning Drama",
      description:
        "A powerful and moving story that explores the depths of human emotion. Winner of multiple international film festivals.",
      voteCount: 3840,
      voteAverage: 9.2,
      metaText: "2h 28m • R",
      badges: ["NEW", "TOP"]
    }
  }
};

export const WithMarquee: Story = {
  parameters: {
    chromatic: { disableSnapshot: true }
  },
  args: {
    marquee: true,
    content: {
      title: "This is a very long title that will marquee across the screen when enabled",
      description: "Long scrolling title demonstration. The title will animate when the marquee prop is set to true.",
      voteCount: 542,
      voteAverage: 7.8,
      metaText: "1h 52m • PG"
    }
  }
};

export const FullFeatured: Story = {
  args: {
    marquee: false,
    content: {
      title: "The Masterpiece",
      description:
        "An unforgettable cinematic experience that combines stunning visuals, compelling storytelling, and exceptional performances. A true gem of modern filmmaking.",
      voteCount: 5620,
      voteAverage: 9.7,
      metaText: "3h 12m PG-13",
      badges: ["FEATURED", "TOP", "NEW"]
    }
  }
};
