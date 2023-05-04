import React, { useEffect, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useAuth } from "../../hooks/AuthContext";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import "./dashboard.css";
import checkUser from "../../utilities/checkUser";
import checkDoc from "../../utilities/checkDoc";
import checkSoumissions from "../../utilities/checkSoumissions";
import NewSwiper from '../Swiper/NewSwiper';
import { toast } from 'react-toastify';
import useModal from "../../hooks/useModal";
import NewDocModal from "../Modals/NewDocModal";
import FilterDocuments from "../Filter/FilterDocuments";
import FilterSoumissions from "../Filter/FilterSoumissions";

export default function Dashboard() {

  const { currentUser, logout } = useAuth();
  sessionStorage.setItem("userEmail", currentUser.multiFactor.user.email);
  const infoUser = useSelector((state) => state.user.infoUser);
  const docList = useSelector((state) => state.doc.docList);
  const soumissions = useSelector((state) => state.doc.soumissions);
  const { isShowing: isNewDocShowing, toggle: toggleNewDoc } = useModal();
  const { search } = window.location;
  const insertSuccess = (new URLSearchParams(search)).get('success');
  var once = false

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSlug, setSelectedSlug] = useState();
  var filteredList = useMemo(getFilteredCategory, [selectedCategory, docList]);
  var filteredList2 = useMemo(getFilteredSlug, [selectedSlug, soumissions]);
  var filteredList3 = useMemo(getFilteredSlug2, [selectedSlug, soumissions]);
    
  useEffect(() => {
 
    if(!once){
      if (insertSuccess === "1") {
        const msg = sessionStorage.getItem("successMessage");
        if (msg !== "undefined" && msg !== "") {
          toast.success(msg);
          sessionStorage.setItem("successMessage", "")
        }
        once = true
      } 
    }

    checkUser();
    checkDoc();
    checkSoumissions();

  }, []);

  function openNewDocModal() {
    toggleNewDoc();
  }

  function getFilteredCategory() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return docList;
    }
    return docList.filter((item) => item.type === selectedCategory);
  }

  function getFilteredSlug() {
    // Si admin ou superadmin
    if(infoUser.role >= 1){
      if (!selectedSlug) {
        return soumissions.filter((item) => item.dateDeSoumission === null);
      }
      return soumissions.filter((item) => item.document.slug === selectedSlug && item.dateDeSoumission === null);
    }
    else {
      if (!selectedSlug) {
        return soumissions.filter((item) => item.dateDeSoumission === null && item.userId === infoUser.id);
      }
      return soumissions.filter((item) => item.document.slug === selectedSlug && item.dateDeSoumission === null && item.userId === infoUser.id);
    }
  }

  function getFilteredSlug2() {
    // Si admin ou superadmin
    if(infoUser.role >= 1){
      if (!selectedSlug) {
        return soumissions.filter((item) => item.dateDeSoumission !== null);
      }
      return soumissions.filter((item) => item.document.slug === selectedSlug && item.dateDeSoumission !== null);
    }
    else {
      if (!selectedSlug) {
        return soumissions.filter((item) => item.dateDeSoumission !== null && item.userId === infoUser.id);
      }
      return soumissions.filter((item) => item.document.slug === selectedSlug && item.dateDeSoumission === null && item.userId === infoUser.id);
    }
  }

  function handleCategoryChange(event) {
    var swiperWrapper = document.getElementsByClassName('swiper-wrapper')
    for(var s in swiperWrapper){
      if(s < 3){
        swiperWrapper[s]['style'].transform = "translate3d(0px, 0px, 0px)"
      }
    }
    setSelectedCategory(event.target.value);
  }

  function handleSlugChange(event) {
    var swiperWrapper = document.getElementsByClassName('swiper-wrapper')
    for(var s in swiperWrapper){
      if(s < 3){
        swiperWrapper[s]['style'].transform = "translate3d(0px, 0px, 0px)"
      }
    }
    setSelectedSlug(event.target.value);
  }

  // on affiche le contenu uniquement si on a des elements dans la liste
  if(docList) return (
    <>              
      <div className="dashboard-component">
        <Header></Header>
          <div className="dashboard-content">
            {infoUser.role >= 1 ? (
              <>
                <h1>Envoyer un document</h1>  
                <div className="filter">
                  <span>
                    <Icon.FilterCircleFill className="icon-filter"/>
                  </span>{" "}
                  <select
                    onChange={handleCategoryChange}
                  >                
                  <option value="">All</option>
                    <option value="Intégration">Intégration</option>
                    <option value="Management">Management</option>
                    <option value="Suivi de carrière">Suivi de carrière</option>
                  </select>
                </div>         
                  <NewSwiper classSwiper = 'swiper'>
                  {filteredList.length !== 0 
                    ? 
                      <>
                        {filteredList.map((element, index) => (
                          <>
                            <FilterDocuments id={element.id} intitule={element.intitule} type={element.type} key={index} />
                          </>
                        ))}
                      </>
                    : <h3 className="no-content">Pas de documents</h3> 
                  }
                  </NewSwiper>
                <Button
                    className="new-doc-button"
                    variant="primary"
                    onClick={openNewDocModal}
                  >
                    <span>
                      <Icon.ClipboardPlus />
                    </span>{" "}
                    Nouveau document
                  </Button>
              </>
            ) : (
              <></>
            )}

          {infoUser.role >= 1 
            ? <h1>Documents envoyés</h1>
            : <h1>Documents à soumettre</h1>
          }
          <div className="filter">
              <span>
                <Icon.FilterCircleFill className="icon-filter"/>
              </span>{" "}
              <select
                onChange={handleSlugChange}
              >                
                <option value="">All</option>
                <option value="suivi-integration-1-mois">Suivi d’intégration à 1 mois</option>
                <option value="suivi-integration-3-mois">Suivi d’intégration à 3 mois</option>
                <option value="suivi-integration-6-mois">Suivi d’intégration à 6 mois</option>
                <option value="pap">Point Avancement Projet (PAP)</option>
                <option value="pmp">Point Mensuel Projet (PMP)</option>
                <option value="fessionnel">Bilan professionnel</option>
                <option value="bilan-annuel">Bilan annuel</option>
                <option value="bilan-intermediaire">Bilan intermédiaire</option>
                </select>
            </div>
          <NewSwiper classSwiper = 'swiper'>
            {filteredList2.length !== 0 
              ? 
                <>
                  {filteredList2.map((element, index) => (
                    <>
                      {element.dateDeSoumission === null && infoUser.role >= 1 ? 
                        <>
                          <FilterSoumissions id={element.id} title={element.document.intitule} type={element.document.type} prenom={element.user.prenom} toUser={element.user} dateDeSoumission={element.dateDeSoumission} date={element.dateLimite} key={index} />
                        </>
                        : 
                        <></>
                      }
                      {element.dateDeSoumission === null && infoUser.id === element.userId && infoUser.role === 0 ?
                        <>
                          <FilterSoumissions id={element.id} title={element.document.intitule} type={element.document.type} prenom={element.user.prenom} date={element.dateLimite} key={index} />
                        </>
                        :
                        <></>
                      }
                    </>
                  ))}
                </>
              : <h3 className="no-content">Pas de documents</h3> 
            }
          </NewSwiper>

          {infoUser.role >= 1 
            ? <h1>Documents reçus</h1>
            : <h1>Document soumis</h1>
          }

          <NewSwiper classSwiper = 'swiper'>
            {filteredList3.length !== 0 
              ? 
                <>
                  {filteredList3.map((element, index) => (
                    <>
                      {element.dateDeSoumission !== null && infoUser.role >= 1 ? 
                        <>
                          <FilterSoumissions id={element.id} title={element.document.intitule} type={element.document.type} prenom={element.user.prenom} date={element.dateLimite} key={index} />
                        </>
                        : 
                        <></>
                      }
                      {element.dateDeSoumission !== null && infoUser.id === element.userId && infoUser.role === 0 ?
                        <>
                          <FilterSoumissions id={element.id} title={element.document.intitule} type={element.document.type} prenom={element.user.prenom} date={element.dateLimite} key={index} />
                        </>
                        :
                        <></>
                      }
                    </>
                  ))}
                </>
              : <h3 className="no-content">Pas de documents</h3> 
            }
          </NewSwiper>

        </div>
      </div>

      {isNewDocShowing &&
          <NewDocModal
            isShowing={isNewDocShowing}
            hide={toggleNewDoc}
          />
        }
    </>
  );
}
