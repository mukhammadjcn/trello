import Amazon from "../images/aws.jpg";
import Airbnb from "../images/airbnb.jpg";
import Figma from "../images/figma.jpg";
import Paypal from "../images/paypal.jpg";
import Slack from "../images/slack.jpg";
import Spotify from "../images/spotify.jpg";
import Img1 from "../images/tab1.jpg";
import Img2 from "../images/tab2.jpg";
import Img3 from "../images/tab3.jpg";

export const companies = [Amazon, Airbnb, Figma, Paypal, Slack, Spotify];
export const categories = [
  {
    title: "Marketing",
    icon: "market",
  },
  {
    title: "Design",
    icon: "design",
  },
  {
    title: "Developent",
    icon: "development",
  },
  {
    title: "Customer service",
    icon: "custumer-service",
  },
  {
    title: "Health and care",
    icon: "medicine",
  },
  {
    title: "Automotive Jobs",
    icon: "car",
  },
];
export const infos = [
  {
    title: "Search for jobs",
    info: "To start searching for jobs, you can attend job fairs online or in person, use job boards and career websites or reach out directly to recruiters in a targeted company to broaden your network.",
    img: Img1,
    options: [],
    ul: [
      "Bring to the table win-win survival",
      "Capitalize on low hanging fruit to identify",
      "But I must explain to you how all this",
    ],
  },
  {
    title: "Build a good resume",
    info: "An efficient resume should promote your abilities and include tangible accomplishments that are relevant to the job you apply for. You should also prepare a cover letter that is concise and elaborates on how you can put your skills to use in the organization.",
    img: Img2,
    ul: [],
    options: [],
  },
  {
    title: "Perform during your interview",
    info: "",
    img: Img3,
    ul: [],
    options: [
      {
        title: "Awesome design",
        info: "Duis aute irure dolor reprehen derit in volu velit.",
        img: "option1",
      },
      {
        title: "Easy Customize",
        info: "Duis aute irure dolor reprehen derit in volu velit.",
        img: "option2",
      },
    ],
  },
];
