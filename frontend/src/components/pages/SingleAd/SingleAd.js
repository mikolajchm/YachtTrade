import { getAdById } from "../../../redux/adsRedux";
import { useParams } from "react-router";
import { useSelector } from "react-redux";


const SingleAd = () => {
  
  const adParam = useParams();
  const ad = useSelector(state => getAdById(state, adParam.id));

  return (
    <div>
      <h1>{ad.title}</h1>
    </div>
  )
};

export default SingleAd;