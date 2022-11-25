import React from "react";
import HomeInfo from "../components/HomeInfo";
import { companies, infos } from "../assets/data/HomePage";
import MetaDecorator from "../components/meta";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <>
      <MetaDecorator
        description={`This is trello clone website )`}
        imageAlt={`This is trello clone website )`}
        imageUrl={
          "https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=520"
        }
        title={"Trello clone Home page"}
      />

      <Header />

      {/* Home main top section */}
      <div className="home__main">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-duration="1500">
            <h1 className="home__main-title">
              Join us & Explore <br /> Thousands of Jobs
            </h1>
            <p className="home__main-label">
              Find Jobs, Employment & Career Opportunities
            </p>
          </div>
        </div>
      </div>

      {/* Home compaines mini section */}
      <div className="home__companies">
        <div className="container">
          {companies.map((el: any, index: number) => (
            <div
              className="home__companies-item"
              key={el}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <img src={el} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* Home info section */}
      <div className="home__info">
        <div className="container">
          {infos.map((el) => (
            <HomeInfo data={el} key={el.title} className="home__info-item" />
          ))}
        </div>
      </div>

      {/* Email subscription section */}
      <div className="home__email">
        <div className="container">
          <h2 data-aos="fade-up" data-aos-duration="1500">
            Subscribe Our Newsletter
          </h2>
          <p data-aos="fade-up" data-aos-duration="1500">
            Advertise your jobs to millions of monthly users and search 15.8
            million CVs in our database.
          </p>
          <div
            data-aos="fade-up"
            data-aos-duration="1500"
            className="home__email-box"
          >
            <input type="email" placeholder="Your e-mail ?" />
            <button className="btn">Subscribe</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
