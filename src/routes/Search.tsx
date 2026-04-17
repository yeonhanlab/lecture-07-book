import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        author?: string[];
        description?: string;
        imageLinks?: {
            thumbnail?: string;
            small?: string;
        }
    }
}


function Search() {
    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용

    // useParams를 사용할 때는 const { id } = useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [params, setParams] = useSearchParams();    // queryString 내용이 params에 담겨 나옴
    const k = params.get("keyword");     // "수학"이라는게 있을 수도 있지만, 없을 수도 있음 (수정할 수도 있는 내용이니까)

    // keyword 준비 됐으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    const [loading] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(``)
    }, []);

    return <></>;
}

export default Search;