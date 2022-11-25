import React from "react";
import Board from "../components/Board";
import Header from "../components/Header";
import MetaDecorator from "../components/meta";

const Profile: React.FC = () => {
  return (
    <>
      <MetaDecorator
        description={`Profile`}
        imageAlt={`Profile`}
        imageUrl={
          "https://images.ctfassets.net/rz1oowkt5gyp/4kCNudjaBYj90CGgG7Lict/cbafa67336b2007278f50d99ceabfb22/Boards_2x.png?w=520"
        }
        title={"Profile"}
      />

      <Header />
      <Board />
    </>
  );
};

export default Profile;
