 import react,{useState} from 'react'
 import  useScreenValue  from '../feature/useScreenValue';



 const ReadMore = ({ children }) => {
    
    const screenSize = useScreenValue();
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    // Read More less functionality

    return (
        <p  className="p-2 text-gray-700 tracking-normal text-lg ">
      {isReadMore
        ? (screenSize === 'small' ? text.slice(0, 200) : text.slice(0, 563))
        : text
        }
            <span
                onClick={toggleReadMore}
                className="cursor-pointer text-red-500"
                
            >
                {isReadMore ? (
  <>
    ...Read more <i className="ri-arrow-down-wide-fill"></i>
  </>
) : (
  <>
    Show less <i className="ri-arrow-up-wide-line"></i>
  </>
)}

            </span>
        </p>
    );
};

export default ReadMore;