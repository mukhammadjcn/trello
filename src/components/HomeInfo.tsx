import Icons from "./Icons";

function HomeInfo({ data }: any) {
  return (
    <div className="home__info-item">
      <div data-aos="fade-right" data-aos-duration="800">
        <h2 className="home__info-item_title">{data.title}</h2>
        <p className="home__info-item_info">{data.info}</p>
        <div className="">
          {data.ul && data.ul.length !== 0
            ? data.ul.map((el: any) => (
                <div key={el} className="home__info-item_info_ul">
                  <Icons name="check" />
                  <span>{el}</span>
                </div>
              ))
            : data.options && data.options.length !== 0
            ? data.options.map((el: any) => (
                <div key={el.title} className="home__info-item_info_options">
                  <Icons name={el.img} />
                  <div className="">
                    <h4>{el.title}</h4>
                    <span>{el.info}</span>
                  </div>
                </div>
              ))
            : ""}
        </div>
        <button className="btn">Discover More</button>
      </div>
      <img src={data.img} alt="" />
    </div>
  );
}

export default HomeInfo;
