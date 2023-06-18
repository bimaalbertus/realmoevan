import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { selectMarvel } from "../features/movie/movieSlice";

const MCU = (props) => {
  const movies = useSelector(selectMarvel);
  console.log(movies, ":🛢️");

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block", background: "linear-gradient(to left, #000, rgba(0,0,0,0.0))" }}
        onClick={onClick}
      >
        NEXT
      </button>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <button
        className={className}
        style={{ ...style, display: "block", background: "linear-gradient(to right, #000, rgba(0,0,0,0.0))" }}
        onClick={onClick}
      >
        BACK
      </button>
    );
  }

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
    <h2>Marvel</h2>
      <Content {...settings}>
      {movies &&
        movies.map((movie, key) => (
          <div>
          <Wrap key={key}>
            {movie.id}
            <Link to={`/film=` + movie.id}>
              <span>
              <img src={movie.cardImg} alt={movie.title} />
              </span>
            </Link>
          </Wrap>
          </div>
        ))}
        </Content>
  </Container>
  );
};

const Container = styled.div`
  padding-left: 35px;
  padding-right: 55px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 40px;
  }

  h2 {
    margin-left: 30px;
  }
`;

const Content = styled(Slider)`
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    
}
&:hover button{
        opacity: 1;
        transition: opacity 0.2s ease 0s;
    }
ul li button {
    display: none;
}
.slick-list {
  overflow: initial;
}

.slick-prev{
left: -3vw;
width: 8vh;
height: 22.5vh;
top: 7.1vw;
}
.slick-next{
  right: -3.8vw;
width: 8vh;
height: 22.5vh;
top: 7.1vw;
}

@media (max-width : 700px){
  .slick-prev{
    left: -11vw;
    width: 6vh;
    height: 23vh;
    top: 31vw;
  }
  .slick-next{
    right: -11vw;
    width: 6vh;
    height: 23vh;
    top: 31vw;
  }
}
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 15px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  @media (max-width: 768px) {

    &:hover {
      z-index: 9999;
      transform: scale(1.2);
    }
  }

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 0;
    top: 0;
  }

  &:hover {
    z-index: 9999;
    transform: scale(1.2);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default MCU;