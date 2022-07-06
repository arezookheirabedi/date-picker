import React, {useEffect} from "react";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoToTop from "../../components/Home/GoToTop";
import AboutProject from "../../components/Home/AboutProject";
import ProgressProject from "../../components/Home/ProgressProject";
import Contributors from "../../components/Home/Contributors";
import Faq from "../../components/Home/Faq";

const Home: React.FC<any> = () => {
  // eslint-disable-next-line
  const progressBar = (progressVal: any, totalPercentageVal = 100, id: any) => {

    const r = window.screen.width > 415 ? 377 : 282;
    const strokeVal = (progressVal * r) / 100;
    const x: any = document.querySelector(`.progress-bar__circle--${id} .progress-bar__circle-prog`);
    // eslint-disable-next-line
    x.style.strokeDasharray = strokeVal + " 999";
    const numb: any = document.querySelector(`.progress-bar__circle--${id} + .progress-bar__text`);

    let counter = 0;
    setInterval(() => {
      if (counter === progressVal) {
        clearInterval();
      } else {
        counter += 1;
        // eslint-disable-next-line
        numb.textContent = counter.toLocaleString('fa') + "%";
      }
    }, 10);
  };
  useEffect(() => {
    progressBar(60, 100, 4);
    progressBar(70, 100, 5);
    progressBar(75, 100, 6);
    const target = document.querySelector("#progress-project") as HTMLInputElement;
    const element = document.querySelector(".go-to-top") as HTMLInputElement;
    let showProgress = true;
    const handleScroll = () => {
      if (window.scrollY > target.getBoundingClientRect().top) {
        element.classList.remove("d-none");
        element.classList.add("d-block");
        if (showProgress) {
          progressBar(80, 100, 1);
          progressBar(85, 100, 2);
          progressBar(100, 100, 3);

          showProgress = false;
        }
      } else if (window.scrollY < target.getBoundingClientRect().top) {
        element.classList.add("d-none");
        element.classList.remove("d-block");
      }
    };
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <GoToTop/>
      <Navigation/>
      <Header/>

      <main>
        <AboutProject/>
        <ProgressProject progressBarF={progressBar}/>
        <Contributors/>
        <Faq/>
      </main>

      <Footer hasContactUsComponent/>
    </>
  )
}


export default Home;