import { FC } from 'react';
import ProgressiveImage from 'react-progressive-graceful-image';
import surveyLabImg from '../../../assets/website/img/partners/SurveyLab-logo.png';
import surveyLabImgPlaceholder from '../../../assets/website/img/partners/SurveyLab-logo.png?lqip';

const partnersList = [
  {
    name: 'SurveyLab',
    image: surveyLabImg,
    imagePlaceholder: surveyLabImgPlaceholder,
    href: 'https://surveylab.com',
  },
];

const PartnersSection: FC = () => (
  <div className="mt-32">
    <div className="w-container mx-auto">
      <h4 className="uppercase font-lighter text-center text-lg">Współpracują z nami</h4>
      <div className="flex justify-center">
        {partnersList.map(({ name, image, imagePlaceholder, href }) => (
          <a key={href} href={href} target="_blank" rel="noreferrer noopener">
            <ProgressiveImage src={image} placeholder={imagePlaceholder}>
              {(src: string) => <img src={src} alt={name} className="h-24 object-contain" />}
            </ProgressiveImage>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default PartnersSection;
