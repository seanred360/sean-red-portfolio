import Meta from "../components/Meta";
import About from "../components/About";
import GitHubCornerButton from "../components/common/GitHubCornerButton";
import Header from "../components/Header";
import { useData } from "../components/DataContext";

import Spinner from "../components/common/Spinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Script from "next/script";

const Projects = dynamic(() => import("../components/Projects"), {
  loading: () => (
    <div style={{ margin: "auto", height: "300px" }}>
      <Spinner />
    </div>
  ),
});
const Skills = dynamic(() => import("../components/Skills"));
// const Experience = dynamic(() => import("../components/Experience"));
const Footer = dynamic(() => import("../components/Footer"));

const Home = ({ theme, onToggleTheme }) => {
  const { currentLang, setLang, primaryLang, secondaryLang, sharedData } =
    useData();

  const pageInfo = currentLang.page_info;
  const personalInfo = sharedData.personal_info;
  const sectionNames = pageInfo.section_names;
  const skillIcons = sharedData.skills.icons;
  const socialMedia = sharedData.personal_info.social_media;

  return (
    <>
      <Meta />
      <GitHubCornerButton />
      <Header
        theme={theme}
        onToggleTheme={onToggleTheme}
        currentLang={currentLang}
        primaryLang={primaryLang}
        secondaryLang={secondaryLang}
        setLang={setLang}
      />
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y9NQ5XB2T7`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y9NQ5XB2T7', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Suspense
        fallback={
          <div style={{ margin: "auto", height: "300px" }}>
            <Spinner />
          </div>
        }
      >
        <Projects
          sectionName={sectionNames.projects}
          projects={currentLang.projects}
          pageInfo={pageInfo}
        />
      </Suspense>
      <About
        sectionName={sectionNames.about}
        profilePic={personalInfo.image}
        bioHeader={pageInfo.bioHeader}
        bio={pageInfo.bio}
      />
      <Skills sectionName={sectionNames.skills} skillIcons={skillIcons} />
      {/* <Experience
        sectionName={sectionNames.experience}
        experience={currentLang.experience}
      /> */}
      <Footer socialMedia={socialMedia} personalInfo={personalInfo} />
    </>
  );
};

export default Home;