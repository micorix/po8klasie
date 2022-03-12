import { FC, useMemo } from 'react';
import SchoolPageMenu from './SchoolPageMenu';
import schoolInfoSections from './schoolInfoSections/schoolInfoSections';
import { SchoolInfoConfig } from '../../../config/types';

interface SchoolPageContentProps {
  schoolInfoConfig: SchoolInfoConfig;
}

const SchoolPageContent: FC<SchoolPageContentProps> = ({
  schoolInfoConfig: { enabledSchoolInfoSectionIds },
}) => {
  const sectionConfigs = useMemo(
    () => enabledSchoolInfoSectionIds.map((sectionId) => schoolInfoSections[sectionId]),
    [enabledSchoolInfoSectionIds],
  );
  return (
    <div className="w-container mx-auto grid md:grid-cols-5">
      <div className="">
        <SchoolPageMenu sectionConfigs={sectionConfigs} />
      </div>
      <div className="col-span-4 pt-5">
        {sectionConfigs.map(({ SectionComponent, id }) => (
          <SectionComponent key={id} />
        ))}
      </div>
    </div>
  );
};

export default SchoolPageContent;
