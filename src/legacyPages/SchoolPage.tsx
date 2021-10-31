import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useLazyQuery } from '@apollo/client';
import Layout from '../components/Layout';
import Container from '../components/Container';
import Breadcrumbs from '../components/Breadcrumbs';
import SchoolHeader from '../components/sections/SchoolPage/SchoolHeader';
import SchoolClasses from '../components/sections/SchoolPage/SchoolClasses';
import SchoolLocationMap from '../components/sections/SchoolPage/SchoolLocationMap';
import SchoolClassesFromPastYears from '../components/sections/SchoolPage/SchoolClassesFromPastYears';
import SchoolContact from '../components/sections/SchoolPage/SchoolContact';
import { ErrorInfo } from '../components/Info';
import useFavouriteSchools from '../hooks/useFavouriteSchools';
import SEO from '../components/SEO';
import { ISchoolNode, ISchoolPageQuery, ISchoolPageQueryVariables } from '../types/graphql';
import { getParsedClasses } from '../utils/schoolClasses';
import { SCHOOL_PAGE_QUERY } from '../api/graphql/queries';

const SchoolPage: FC<RouteComponentProps<{ schoolID: string }>> = ({ schoolID }) => {
  const { trackPageView } = useMatomo();

  const [getSchoolDetails, { data, error, loading }] = useLazyQuery<
    ISchoolPageQuery,
    ISchoolPageQueryVariables
  >(SCHOOL_PAGE_QUERY);

  const { isSchoolFavourite, toggleFavouriteSchool } = useFavouriteSchools();

  useEffect(() => {
    if (schoolID) {
      getSchoolDetails({
        variables: {
          schoolID,
        },
      });
      trackPageView({});
    }
  }, [getSchoolDetails, schoolID, trackPageView]);

  if (error)
    return (
      <Layout>
        <SEO title="Szkoła" />
        <Container>
          <Breadcrumbs steps={[['Wyszukiwarka szkół', '/schools'], ['Szkoła']]} />
          <ErrorInfo />
        </Container>
      </Layout>
    );

  if (!data || !data.school)
    return (
      <Layout>
        <SEO title="Szkoła" />
        <Container className="loading">
          <Breadcrumbs steps={[['Wyszukiwarka szkół', '/schools'], ['Szkoła']]} />
          <SchoolHeader
            isLoading
            description=""
            schoolName=""
            district=""
            isPublic={false}
            isFavourite={isSchoolFavourite}
            toggleFavourite={() => null}
          />
        </Container>
      </Layout>
    );

  if (error && (!data || !data.school))
    return (
      <Layout>
        <SEO title="Szkoła" />
        <Container className="loading">
          <Breadcrumbs steps={[['Wyszukiwarka szkół', '/schools'], ['Szkoła']]} />
          <ErrorInfo />
        </Container>
      </Layout>
    );

  const { school } = data as { school: ISchoolNode };

  const parsedClasses = getParsedClasses(school.classes);

  return (
    <Layout>
      <SEO title={school?.schoolName ?? ''} />
      <Container className={!school ? 'loading' : ''}>
        <Breadcrumbs steps={[['Wyszukiwarka szkół', '/schools'], [school?.schoolName ?? '']]} />

        <SchoolHeader
          isLoading={loading}
          schoolName={school?.schoolName as string}
          description=""
          district={school?.address?.district ?? ''}
          isPublic={school?.isPublic ?? false}
          isFavourite={isSchoolFavourite(schoolID || '')}
          toggleFavourite={() => toggleFavouriteSchool(schoolID || '')}
        />

        <SchoolClasses currentYearClasses={parsedClasses.currentYear} />
        <SchoolClassesFromPastYears classes={parsedClasses.pastYears} />
        <SchoolContact
          schoolName={school?.schoolName}
          address={school?.address}
          contact={school?.contact}
        />
      </Container>
      <SchoolLocationMap
        schoolName={school?.schoolName}
        schoolType={school?.schoolType}
        address={school?.address}
      />
    </Layout>
  );
};

export default SchoolPage;
