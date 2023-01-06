import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import admin1 from '../../assets/Loi.png'
import admin2 from "../../assets/Dat.png";
import admin3 from "../../assets/Bao.png";
import admin4 from "../../assets/Dung.png";


import "./About.css"

function AboutUsComponent() {
  const admins = [admin1, admin2, admin3, admin4];
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Nguyen Phuc Loi",
      title: "Project Leader",
      quote: `If you always do what you've always done, you'll always get what you've always got `,
    },
    {
      id: 2,
      name: "Nguyen Phat Dat",
      title: "Front-end, UI design, Design Director",
      quote: `Your most unhappy customers are your greatest source of learning.`,
    },
    {
      id: 3,
      name: "Tran Anh Bao",
      title: "Backend, Operation Director",
      quote:
        "If you want to grow you have to do something different from the majority of people.",
    },
    {
      id: 4,
      name: "Le Anh Dung",
      title: "Backend development and system design.",
      quote:
        "Success is not final; failure is not fatal: it is the courage to continue that counts.",
    },
  ]);
  const [index, setIndex] = React.useState(0);

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > people.length - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = people.length - 1;
      }
      return index;
    });
  };

  // useEffect(() => {
  //   const lastIndex = people.length - 1
  //   if (index < 0) {
  //     setIndex(lastIndex)
  //   }
  //   if (index > lastIndex) {
  //     setIndex(0)
  //   }
  // }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > people.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section" style={{position: 'absolute', top: '8rem', left: '30rem'}}>
      <div className="section-center">
        {people.map((person, person_index) => {
          const { id, image, name, title, quote } = person;

          let position = "nextSlide";
          if (person_index === index) {
            position = "activeSlide";
          }
          if (
            person_index === index - 1 ||
            (index === 0 && person_index === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article
              className={position}
              key={id}
              style={{ transition: ".5s" }}
            >
              <img src={`${admins[index]}`} alt={name} className="person-img" />
              <h4
                style={{
                  fontWeight: 700,
                  letterSpacing: ".05rem",
                  color: "rgb(80, 70, 229)",
                }}
              >
                {name}
              </h4>
              <p className="title">{title}</p>
              <p className="text" style={{ fontWeight: 600 }}>
                {quote}
              </p>
            </article>
          );
        })}
        <button className="prev" onClick={prevSlide}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={nextSlide}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default AboutUsComponent;
