import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./Search.module.css";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

type BookItem = {
    id: string;
    volumeInfo: {
        title: string;
        author?: string[];
        description?: string;
        publishedDatd: string;
        imageLinks?: {
            thumbnail?: string;
            smallThumbnail?: string;
        };
    };
};

// 사용자가 요청한 keyword를 받아서, 그것을 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일
// keyword를 쿼리스트링으로 받겠다

type ApiResponseType = { items: BookItem[] };

function Search() {
    // 사용자가 요청한 keyword를 받아서, 그것을 가지고 google API 요청을 하고, 받아온 결과를 화면에 출력해주는 일
    // keyword를 쿼리스트링으로 받겠다.

    // query string으로 들어온 값을 꺼내오기 위해서는 useSearchParams를 사용
    // useParams를 사용할 때는 const { id } = useParams();
    // useSearchParams는 useState와 사용법이 동일
    const [searchParams] = useSearchParams(); // queryString 내용이 params에 담겨 나옴
    // 이렇게 가져온 params라고 하는 state의 값은 객체
    const keyword = searchParams.get("keyword"); // "수학"이라는게 있을 수도 있지만, 없을 수도 있음 (수정할 수도 있는 내용이니까)

    // keyword 준비 됐으니, API를 통해 요청한 정보를 받아다가 화면에 출력만 해주면 됨
    const [list, setList] = useState<BookItem[]>([]); // []는 알겠어. 근데 그 안에 들어가는 요소의 타입이 뭐야?
    // 모르겠으니까, 요소는 없다고 생각할게 => never[]

    useEffect(() => {
        if (!keyword) {
            return;
        }

        fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=20&key=${API_KEY}`,
        ) // 앞으로 데이터를 받아서 이 array요소가 들어갈거니까 이걸로 해줘. 이걸 알려면 API를 띄워봐야함
            .then(response => response.json())
            .then((json: ApiResponseType) => {
                // 데이터를 받아왔고, 그거에 대해서 자바스크립트 형태로 가공도 했으니
                // 그걸 list라고 하는 state에 저장해야지
                setList(json.items);
            })
            .catch(err => {
                console.error(err);
            });
    }, [keyword]);

    return (
        <div className={styles.wrap}>
            <h3>검색 결과 : {keyword}</h3>

            {/* 검색 결과 (책 목록) 출력 */}
            {/* 데이터가 도착했는지 안했는지, 목록이 있는지 없는지 판단 해줘야 되나? */}
            {list.map((value, index) => (
                <Link key={index} to={`/detail/${value.id}`} className={styles.item}>
                    {value.volumeInfo.imageLinks ? (
                        <img
                            src={value.volumeInfo.imageLinks?.thumbnail}
                            alt={value.volumeInfo.title}
                            className={styles.cover}
                        />
                    ) : (
                        <div className={styles.noCover}>No Cover</div>
                    )}
                    <div>
                        <div className={styles.title}>{value.volumeInfo.title}</div>
                        {/*
                            array에서 사용할 수 있는 메소드 join(스트링)
                            각 요소를 순회해서 하나의 값을 리턴하는데
                            각 요소 사이에 [매개변수로 제공된 스트링]을 넣어준다.
                        */}
                        <div className={styles.authours}>{value.volumeInfo.author?.join(", ")}</div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Search;
