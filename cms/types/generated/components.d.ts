import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCtaLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_links';
  info: {
    displayName: 'CTA Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedExperiencePillar extends Struct.ComponentSchema {
  collectionName: 'components_shared_experience_pillars';
  info: {
    displayName: 'Experience Pillar';
    icon: 'list';
  };
  attributes: {
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    group: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    tier: Schema.Attribute.String;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_items';
  info: {
    displayName: 'Gallery Item';
    icon: 'picture';
  };
  attributes: {
    category: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_options';
  info: {
    displayName: 'Option';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPairing extends Struct.ComponentSchema {
  collectionName: 'components_shared_pairings';
  info: {
    displayName: 'Pairing';
    icon: 'utensils';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    region: Schema.Attribute.String & Schema.Attribute.Required;
    whisky: Schema.Attribute.String;
  };
}

export interface SharedPillar extends Struct.ComponentSchema {
  collectionName: 'components_shared_pillars';
  info: {
    displayName: 'Pillar';
    icon: 'layer-group';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
  };
}

export interface SharedTastingProfile extends Struct.ComponentSchema {
  collectionName: 'components_shared_tasting_profiles';
  info: {
    displayName: 'Tasting Profile';
    icon: 'chart-pie';
  };
  attributes: {
    fruit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
    oak: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
    smoke: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
    spice: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
    sweetness: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<50>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.cta-link': SharedCtaLink;
      'shared.experience-pillar': SharedExperiencePillar;
      'shared.faq-item': SharedFaqItem;
      'shared.gallery-item': SharedGalleryItem;
      'shared.option': SharedOption;
      'shared.pairing': SharedPairing;
      'shared.pillar': SharedPillar;
      'shared.seo': SharedSeo;
      'shared.tasting-profile': SharedTastingProfile;
    }
  }
}
