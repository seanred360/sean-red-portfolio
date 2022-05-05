import { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
// import HoverVideoPlayer from "react-hover-video-player";
// import Image from "next/image";
// import Spinner from "../components/common/Spinner";

const Projects = ({ sectionName, projects, pageInfo }) => {
  const [modalData, setModalData] = useState();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (data) => {
    setShowModal(true);
    setModalData(data);
  };

  const projectsMap = projects.map((project) => {
    return (
      <div className="project" key={project.title}>
        <div className="wrapper">
          <div className="photo" onClick={() => handleShowModal(project)}>
            <video muted autoPlay={"autoplay"} loop>
              <source src={project.preview} type="video/webm" />
            </video>
            <span className="project-date --accent-background1 --secondary-text">
              {project.startDate}
            </span>
            <p className="project-title --third-text">{project.title}</p>
          </div>
        </div>
      </div>
    );
  });

  // const projectsMap = projects.map((project) => {
  //   return (
  //     <div className="project" key={project.title}>
  //       <div className="wrapper">
  //         <div className="photo" onClick={() => handleShowModal(project)}>
  //           <HoverVideoPlayer
  //             style={{ width: "280px", height: "187px" }}
  //             videoSrc={project.preview}
  //             preload="metadata"
  //             unloadVideoOnPaused
  //             pausedOverlay={
  //               <Image
  //                 src={"/" + project.images[0]}
  //                 alt={project.title}
  //                 layout="fill"
  //                 objectFit="cover"
  //               />
  //             }
  //             loadingOverlay={<Spinner />}
  //           />
  //           <span className="project-date --accent-background1">
  //             {project.startDate}
  //           </span>
  //           <p className="project-title --primary-text">{project.title}</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  return (
    <section className="projects-section --secondary-background --primary-text">
      <h1 className="section-title">
        <span>{sectionName}</span>
      </h1>
      <div className="projects-group">{projectsMap}</div>
      {modalData && (
        <ProjectDetailsModal
          show={showModal}
          onHide={() => setShowModal(false)}
          data={modalData}
        />
      )}
    </section>
  );
};

export default Projects;
